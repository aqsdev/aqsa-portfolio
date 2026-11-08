import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

const DURATION_MS = 600;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  // Once the entrance finishes, the inline transition is cleared so a
  // card's own hover transition (e.g. transition-transform duration-300)
  // isn't stuck inheriting the slower entrance easing forever.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), delay + DURATION_MS + 100);
    return () => clearTimeout(t);
  }, [visible, delay]);

  const style: CSSProperties = settled
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity ${DURATION_MS}ms ${EASING}, transform ${DURATION_MS}ms ${EASING}`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      };

  return (
    <Tag ref={ref} data-visible={visible} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
