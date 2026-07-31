interface CountUpProps {
  to: number
  from?: number
  direction?: 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
  startWhen?: boolean
  separator?: string
  enableBlur?: boolean
  onStart?: () => void
  onEnd?: () => void
}

declare const CountUp: React.FC<CountUpProps>

export default CountUp
