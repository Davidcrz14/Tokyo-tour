import { motion, useScroll, useTransform } from "framer-motion"
import { Play } from "lucide-react"
import { memo, useEffect, useRef } from "react"

export const Inspire = memo(() => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  useEffect(() => {
    const textAnimation = async () => {
      const elements = document.querySelectorAll('.inspire-text .word')

      for (const [index, word] of elements.entries()) {
        await new Promise(resolve => setTimeout(resolve, index * 150))
        word.style.opacity = '1'
        word.style.transform = 'translateY(0)'
      }
    }

    textAnimation()

    return () => {}
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 to-black"
      id="inspire"
    >
      <motion.img
        src="/images/temple.webp"
        alt="Mountains with galaxy sky"
        className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
        style={{ scale }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          y,
          opacity: textOpacity,
          transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        <div className="text-center">
          <h2 className="inspire-text text-7xl font-bold mb-8 leading-tight tracking-tighter">
            {["VIAJA", "Y", "INSPIRA", "TU", "VIDA"].map((word, index) => (
              <motion.span
                key={index}
                className="word inline-block mx-4"
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {index === 2 ? (
                  <span className="text-red-500 drop-shadow-lg">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h2>

          <motion.button
            className="relative play-button flex items-center space-x-4 rounded-full px-8 py-4 bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{
                rotate: 360,
                scale: 1.2,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-semibold text-white">
              Explorar más
            </span>

            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>
      </motion.div>
{/*el de abajo se la come*/}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/90 to-transparent"
        style={{ opacity: textOpacity }}
      />
    </motion.section>
  )
})
//uwu
Inspire.displayName = 'Inspire'

export default Inspire
