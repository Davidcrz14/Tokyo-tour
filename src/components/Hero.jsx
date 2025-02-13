import { motion, useScroll, useTransform } from "framer-motion";
import PropTypes from 'prop-types';
import { memo, useRef } from "react";
import { PageIndicator } from "./PageIndicator";

const HeroText = memo(({ text }) => {
  const parts = text.split("TOKYO");
  return (
    <motion.h1
      className="hero-title text-8xl font-bold leading-none mb-6 text-outline"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1,
        delayChildren: 0.05,
        staggerChildren: 0.05
      }}
    >
      {parts.map((part, index) => (
        <span key={index}>
          {Array.from(part).map((char, i) => (
            <motion.span
              key={i}
              className="char inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {index < parts.length - 1 && (
            <motion.span className="text-red-700">
              {Array.from("TOKYO").map((char, i) => (
                <motion.span
                  key={i}
                  className="char inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </span>
      ))}
    </motion.h1>
  );
});

HeroText.propTypes = {
  text: PropTypes.string.isRequired
}

HeroText.displayName = 'HeroText'

const ScrollIndicator = memo(() => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2 }}
  >
    <div className="w-6 h-10 border-2 border-white rounded-full p-1">
      <motion.div
        className="w-1 h-2 bg-white rounded-full mx-auto"
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  </motion.div>
))

ScrollIndicator.displayName = 'ScrollIndicator'

export const Hero = memo(() => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen overflow-hidden japanese-pattern"
      style={{ opacity: opacity }}
    >
      <motion.img
        src="/images/tokio.png"
        alt="Torii Gate in Japan"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ scale: scale }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.6, 0.01, -0.05, 0.9],
          scale: {
            duration: 1.5,
            ease: "easeInOut"
          }
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      <motion.div
        className="absolute inset-0 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <HeroText text="VISIT TOKYO" />
          <motion.p
            className="hero-subtitle mt-4 text-xl text-gray-200 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Descubre la magia de la ciudad más fascinante de Asia
          </motion.p>
        </div>
      </motion.div>

      <PageIndicator />
      <ScrollIndicator />
    </motion.section>
  )
})

Hero.displayName = 'Hero'

export default Hero
