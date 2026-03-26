import React, { useRef, useEffect, useCallback } from "react";
import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import projects from "./data/projects";
import "./App.css";

const SCROLL_DURATION = 1200;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function App() {
  const appRef = useRef(null);
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);

  const getSnapTargets = useCallback(() => {
    const container = appRef.current;
    if (!container) return [];
    const header = container.querySelector(".header");
    const cards = container.querySelectorAll(".project-card");
    const targets = [];
    if (header) targets.push(0);
    cards.forEach((card) => {
      const top = card.offsetTop - (container.clientHeight - card.offsetHeight) / 2;
      targets.push(Math.max(0, top));
    });
    return targets;
  }, []);

  const animateScroll = useCallback((container, from, to) => {
    const start = performance.now();
    const distance = to - from;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      container.scrollTop = from + distance * easeInOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAnimating.current = false;
      }
    }

    isAnimating.current = true;
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const container = appRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isAnimating.current) return;

      const targets = getSnapTargets();
      if (targets.length === 0) return;

      if (e.deltaY > 0 && currentIndex.current < targets.length - 1) {
        currentIndex.current += 1;
      } else if (e.deltaY < 0 && currentIndex.current > 0) {
        currentIndex.current -= 1;
      } else {
        return;
      }

      animateScroll(container, container.scrollTop, targets[currentIndex.current]);
    };

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimating.current) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 30) return;

      const targets = getSnapTargets();
      if (targets.length === 0) return;

      if (deltaY > 0 && currentIndex.current < targets.length - 1) {
        currentIndex.current += 1;
      } else if (deltaY < 0 && currentIndex.current > 0) {
        currentIndex.current -= 1;
      } else {
        return;
      }

      animateScroll(container, container.scrollTop, targets[currentIndex.current]);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [getSnapTargets, animateScroll]);

  return (
    <div className="app" ref={appRef}>
      <Header />
      <main className="feed">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Teo Hedelin</p>
      </footer>
    </div>
  );
}

export default App;
