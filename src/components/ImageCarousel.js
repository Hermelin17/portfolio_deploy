import React, { useState, useEffect, useCallback } from "react";

const DURATION = 700;
const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

const SLOT_STYLES = {
  "-2": { x: -190, scale: 0.8, opacity: 0 },
  "-1": { x: -95, scale: 0.8, opacity: 0.5 },
  "0": { x: 0, scale: 1, opacity: 1 },
  "1": { x: 95, scale: 0.8, opacity: 0.5 },
  "2": { x: 190, scale: 0.8, opacity: 0 },
};

function getStyle(slot, animate) {
  const s = SLOT_STYLES[String(slot)] || SLOT_STYLES["2"];
  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "65%",
    aspectRatio: "16 / 9",
    borderRadius: 12,
    overflow: "hidden",
    background: "rgba(0, 0, 0, 0.3)",
    transform: `translate(-50%, -50%) translateX(${s.x}%) scale(${s.scale})`,
    opacity: s.opacity,
    transition: animate
      ? `transform ${DURATION}ms ${EASING}, opacity ${DURATION}ms ${EASING}`
      : "none",
    zIndex: slot === 0 ? 2 : 1,
    boxShadow: slot === 0 ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
  };
}

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [captionFading, setCaptionFading] = useState(false);

  const wrap = useCallback(
    (n) => ((n % images.length) + images.length) % images.length,
    [images.length]
  );

  const navigate = useCallback(
    (dir) => {
      if (phase !== "idle") return;
      setCaptionFading(true);
      setPhase(dir === "next" ? "prepare-left" : "prepare-right");
    },
    [phase]
  );

  useEffect(() => {
    if (phase === "prepare-left" || phase === "prepare-right") {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase(phase === "prepare-left" ? "slide-left" : "slide-right");
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "slide-left" || phase === "slide-right") {
      const timer = setTimeout(() => {
        setCurrent((prev) =>
          phase === "slide-left" ? wrap(prev + 1) : wrap(prev - 1)
        );
        setPhase("idle");
        setCaptionFading(false);
      }, DURATION + 50);
      return () => clearTimeout(timer);
    }
  }, [phase, wrap]);

  if (!images || images.length === 0) return null;

  let entries;
  switch (phase) {
    case "prepare-left":
      entries = [
        { offset: -1, slot: -1, anim: false },
        { offset: 0, slot: 0, anim: false },
        { offset: 1, slot: 1, anim: false },
        { offset: 2, slot: 2, anim: false },
      ];
      break;
    case "slide-left":
      entries = [
        { offset: -1, slot: -2, anim: true },
        { offset: 0, slot: -1, anim: true },
        { offset: 1, slot: 0, anim: true },
        { offset: 2, slot: 1, anim: true },
      ];
      break;
    case "prepare-right":
      entries = [
        { offset: -2, slot: -2, anim: false },
        { offset: -1, slot: -1, anim: false },
        { offset: 0, slot: 0, anim: false },
        { offset: 1, slot: 1, anim: false },
      ];
      break;
    case "slide-right":
      entries = [
        { offset: -2, slot: -1, anim: true },
        { offset: -1, slot: 0, anim: true },
        { offset: 0, slot: 1, anim: true },
        { offset: 1, slot: 2, anim: true },
      ];
      break;
    default:
      entries = [
        { offset: -1, slot: -1, anim: false },
        { offset: 0, slot: 0, anim: false },
        { offset: 1, slot: 1, anim: false },
      ];
  }

  return (
    <div className="carousel">
      <div className="carousel-track">
        <div className="carousel-viewport">
          {entries.map(({ offset, slot, anim }) => {
            const idx = wrap(current + offset);
            const item = images[idx];
            const src = item.src;
            const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(src);
            const mediaStyle = {
              width: "100%",
              height: "100%",
              objectFit: item.tall ? "contain" : "cover",
              display: "block",
            };
            return (
              <div key={offset} style={getStyle(slot, anim)}>
                {isVideo ? (
                  <video
                    src={src}
                    muted
                    autoPlay
                    loop
                    playsInline
                    draggable={false}
                    style={mediaStyle}
                  />
                ) : (
                  <img
                    src={src}
                    alt={images[idx].caption}
                    draggable={false}
                    style={mediaStyle}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => navigate("prev")}
          aria-label="Previous"
        >
          &#8249;
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => navigate("next")}
          aria-label="Next"
        >
          &#8250;
        </button>
      </div>

      <p
        className={`carousel-caption ${captionFading ? "carousel-caption-hidden" : ""}`}
      >
        {images[current].caption}
      </p>
    </div>
  );
}

export default ImageCarousel;
