import type { Variants } from 'framer-motion'

/** Container variant that staggers its children's entrance. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
}

/** Item variant paired with staggerContainer — fade + slide up. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}
