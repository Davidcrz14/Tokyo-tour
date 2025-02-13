import { motion } from "framer-motion"
import PropTypes from 'prop-types'
import { memo, useCallback, useEffect, useState } from "react"

const sections = ["hero", "tours", "inspire"]

const NumberIndicator = memo(({ index, activeSection }) => {
  return (
    <motion.div
      key={index}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1
      }}
    >
      {/* Línea decorativa */}
      <motion.div
        className="absolute -left-8 top-1/2 h-[1px] bg-red-500"
        initial={{ width: 0 }}
        animate={{ width: activeSection === index ? 24 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Número */}
      <motion.div
        className="relative z-10 font-mono"
        animate={{
          scale: activeSection === index ? 1.2 : 1,
          color: activeSection === index ? "#EF4444" : "#FFFFFF"
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-2xl font-bold tracking-wider">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Círculo de fondo */}
      <motion.div
        className="absolute inset-0 bg-red-500 rounded-full -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: activeSection === index ? 0.15 : 0,
          scale: activeSection === index ? 1.5 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute inset-0 bg-red-500 rounded-full opacity-0 -z-10"
        whileHover={{ opacity: 0.1, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
})

NumberIndicator.propTypes = {
  index: PropTypes.number.isRequired,
  activeSection: PropTypes.number.isRequired
}

NumberIndicator.displayName = 'NumberIndicator'

export const PageIndicator = memo(() => {
  const [activeSection, setActiveSection] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const sections = document.querySelectorAll("section")

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (
        scrollPosition >= sectionTop - windowHeight / 3 &&
        scrollPosition < sectionTop + sectionHeight - windowHeight / 3
      ) {
        setActiveSection(index)
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-8">
        {sections.map((_, index) => (
          <NumberIndicator
            key={index}
            index={index}
            activeSection={activeSection}
          />
        ))}
      </div>
    </div>
  )
})

PageIndicator.displayName = 'PageIndicator'

export default PageIndicator

