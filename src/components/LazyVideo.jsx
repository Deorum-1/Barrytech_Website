import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
  src,
  webmSrc,
  poster,
  className = "",
  eager = false,
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(eager);

  // Load when near the viewport; pause when far away
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "400px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start playback once sources are in the DOM
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    el.load();
    el.play().catch(() => {});
  }, [active]);

  return (
    <video
      ref={ref}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload={active ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
    >
      {active && webmSrc && <source src={webmSrc} type="video/webm" />}
      {active && <source src={src} type="video/mp4" />}
    </video>
  );
}
