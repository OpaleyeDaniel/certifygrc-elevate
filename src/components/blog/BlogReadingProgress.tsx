import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function BlogReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setVisible(v > 0.01));
    return unsub;
  }, [scrollYProgress]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)",
        boxShadow: "0 0 8px rgba(99,102,241,0.5)",
      }}
    />
  );
}
