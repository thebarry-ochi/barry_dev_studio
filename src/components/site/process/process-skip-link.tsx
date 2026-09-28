"use client";

import { useEffect, useRef, useState } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { ArrowDownIcon } from "@phosphor-icons/react";

export function ProcessSkipLink() {
  const link = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  useEffect(() => {
    const element = link.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // A short downward nudge, a spring return, then a quiet pause.
    // Wait for the motion preference before starting, including after hydration.
    if (visible && reducedMotion === false && !hovered && !focused) {
      let firstBounce = true;
      void api.start({
        to: async (next) => {
          await next({ y: 6, delay: firstBounce ? 700 : 2200, config: { tension: 300, friction: 24, clamp: true } });
          firstBounce = false;
          await next({ y: 0, config: { tension: 240, friction: 10, clamp: false } });
        },
        loop: true,
      });
    } else {
      api.set({ y: 0 });
    }
    return () => { api.stop(true); api.set({ y: 0 }); };
  }, [api, visible, reducedMotion, hovered, focused]);

  return (
    <a ref={link} href="#work" className="process-skip"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <animated.div className="process-skip-content" style={{ transform: y.to(value => `translateY(${value}px)`) }}>
        <span className="process-skip-icon"><ArrowDownIcon size={22} aria-hidden="true" /></span>
        View selected work
      </animated.div>
    </a>
  );
}
