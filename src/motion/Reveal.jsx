import { motion, useReducedMotion } from 'framer-motion'
import { motionTokens } from './motionTokens'

export default function Reveal({
  children,
  as: Comp = motion.div,
  delay = 0,
  y = 14,
  once = true,
  amount = 0.25,
  className,
  style,
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <Comp className={className} style={style}>
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: motionTokens.duration.base,
        ease: motionTokens.ease.out,
        delay,
      }}
    >
      {children}
    </Comp>
  )
}

