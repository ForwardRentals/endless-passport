import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** "up" | "down" | "left" | "right" | "fade" | "scale" */
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  amount?: number;
}

const directionMap = {
  up:    { y: 40,   x: 0,    scale: 1 },
  down:  { y: -40,  x: 0,    scale: 1 },
  left:  { y: 0,    x: 60,   scale: 1 },
  right: { y: 0,    x: -60,  scale: 1 },
  fade:  { y: 0,    x: 0,    scale: 1 },
  scale: { y: 0,    x: 0,    scale: 0.88 },
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  amount = 0.15,
}: AnimateInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const { y, x, scale } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger wrapper — wraps children and staggers each direct child */
export function StaggerIn({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { y, x, scale } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden: {},
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden:  { opacity: 0, y, x, scale },
                visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
