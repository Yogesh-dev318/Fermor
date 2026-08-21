import { useEffect, useRef } from 'react'

/**
 * ShaderBackground renders a full-viewport WebGL canvas behind all content.
 * It paints a slow, organic simplex-noise gradient in the paper/green palette
 * that reacts subtly to the pointer — the ambient "Paper and Ink" backdrop.
 *
 * If WebGL is unavailable, the component renders nothing and the page falls
 * back to the solid surface color from the body styles.
 */
export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
    if (!gl) return

    // Respect reduced-motion: render a single static frame.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // On small / coarse-pointer devices, render a single static frame to save battery.
    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    const staticFrame = reduceMotion || isMobile

    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      // Cap canvas resolution on mobile for performance.
      const scale = isMobile ? 0.5 : 1
      const tw = Math.round(w * scale)
      const th = Math.round(h * scale)
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw
        canvas.height = th
      }
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null
    resizeObserver?.observe(canvas)
    syncSize()

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;

        float n1 = snoise(uv * 2.0 + u_time * 0.05);
        float n2 = snoise(uv * 3.0 - u_time * 0.03 + mouse * 0.5);

        vec3 color1 = vec3(0.98, 0.98, 0.96);
        vec3 color2 = vec3(0.92, 0.96, 0.94);
        vec3 accent = vec3(0.24, 0.56, 0.35);

        float mask = smoothstep(-1.0, 1.0, n1 + n2);
        vec3 finalColor = mix(color1, color2, mask);

        float dist = distance(uv, mouse);
        float glow = smoothstep(0.4, 0.0, dist) * 0.05;
        finalColor = mix(finalColor, accent, glow);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    if (!program) return
    const vs = compile(gl.VERTEX_SHADER, vsSource)
    const fs = compile(gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    const onMouseMove = (event: MouseEvent) => {
      if (staticFrame) return
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (event.clientX - rect.left) / rect.width
      const ny = 1.0 - (event.clientY - rect.top) / rect.height
      mouse.x = nx * canvas.width
      mouse.y = ny * canvas.height
    }
    window.addEventListener('mousemove', onMouseMove)

    let rafId = 0
    const render = (t: number) => {
      if (typeof ResizeObserver === 'undefined') syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, t * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!staticFrame) rafId = requestAnimationFrame(render)
    }
    render(0)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeObserver?.disconnect()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
