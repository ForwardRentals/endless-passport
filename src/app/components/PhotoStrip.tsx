import React, { useState } from "react";
import { motion } from "motion/react";

/**
 * PhotoStrip — always renders exactly `count` filled slots.
 *
 * Pass a `pool` larger than `count` (e.g. 3× as many) as a buffer.
 * If any image fails to load its slot is replaced by the next working
 * photo in the pool, so the grid is never left with an empty white box.
 */
export function PhotoStrip({
  pool,
  count,
  aspect = "aspect-video",
  animate = true,
  className,
  imgClassName,
  linkUrl,
}: {
  pool: string[];
  count: number;
  /** Tailwind aspect-ratio class, e.g. "aspect-video" or "aspect-square" */
  aspect?: string;
  /** Whether to use scroll-triggered fade-in animation */
  animate?: boolean;
  className?: string;
  imgClassName?: string;
  /** Optional URL to link each photo to */
  linkUrl?: string;
}) {
  const [failed, setFailed] = useState<Set<number>>(new Set());

  // Walk the pool in order; collect the first `count` non-failed photos
  const displayed: Array<{ src: string; poolIdx: number }> = [];
  for (let i = 0; i < pool.length && displayed.length < count; i++) {
    if (!failed.has(i)) displayed.push({ src: pool[i], poolIdx: i });
  }

  const wrapWithLink = (content: React.ReactNode, key: number | string) => {
    if (!linkUrl) return content;
    return (
      <a
        key={key}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  };

  return (
    <>
      {displayed.map(({ src, poolIdx }, i) =>
        animate ? (
          wrapWithLink(
            <motion.div
              key={poolIdx}
              className={`${aspect} overflow-hidden rounded-lg ${className ?? ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={src}
                alt="Brian's travels"
                className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${imgClassName ?? ""}`}
                onError={() => setFailed((prev) => new Set([...prev, poolIdx]))}
              />
            </motion.div>,
            poolIdx
          )
        ) : (
          wrapWithLink(
            <div
              key={poolIdx}
              className={`${aspect} overflow-hidden rounded-lg ${className ?? ""}`}
            >
              <img
                src={src}
                alt="Brian's travels"
                className={`w-full h-full object-cover ${imgClassName ?? ""}`}
                onError={() => setFailed((prev) => new Set([...prev, poolIdx]))}
              />
            </div>,
            poolIdx
          )
        )
      )}
    </>
  );
}
