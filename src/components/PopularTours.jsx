import anime from "animejs"
import { motion, useScroll, useTransform } from "framer-motion"
import PropTypes from 'prop-types'
import { memo, useEffect, useRef } from "react"

const tours = [
  {
    id: 1,
    title: "Templos de Kioto",
    description: "Explora la antigua capital imperial",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000",
    links: [
      { name: "Descubriendo Kioto", url: "https://lacapillacultural.com/descubriendo-kioto-tesoros-culturales-de-la-antigua-capital/" },
      { name: "Monumentos históricos", url: "https://es.wikipedia.org/wiki/Monumentos_hist%C3%B3ricos_de_la_antigua_Kioto" },
      { name: "17 templos bonitos", url: "https://dosmochilasymedia.com/templos-mas-bonitos-que-ver-en-kioto/" },
      { name: "Historia de los templos", url: "https://mundowanderlust.com/es/post/historia-templos-kioto-tradiciones-antiguas-influencias-culturales/" }
    ]
  },
  {
    id: 2,
    title: "Monte Fuji",
    description: "Majestuoso símbolo de Japón",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1000",
    links: [
      { name: "Guía oficial de Japón", url: "https://www.japan.travel/es/spot/745/" }
    ]
  },
  {
    id: 3,
    title: "Shibuya Tokyo",
    description: "El corazón moderno de Tokyo",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1000",
    links: [
      { name: "Guía oficial de Tokyo", url: "https://www.gotokyo.org/es/destinations/western-tokyo/shibuya/index.html" }
    ]
  },
  {
    id: 4,
    title: "Jardines Zen",
    description: "Paz y tranquilidad tradicional",
    image: "https://images.unsplash.com/photo-1463736932348-4915535cf6f9?q=80&w=1000",
    links: [
      { name: "Jardines Zen de Kioto", url: "https://kyoto.travel/es/see-and-do/temples-shrines.html" },
      { name: "Templo Ginkaku-ji", url: "https://lacapillacultural.com/descubriendo-kioto-tesoros-culturales-de-la-antigua-capital/" }
    ]
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
}

const TourCard = memo(({ tour, index }) => {
  return (
    <motion.div
      key={tour.id}
      custom={index}
      variants={cardVariants}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative group rounded-lg overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm h-[400px]"
    >
      <div className="w-full h-full">
        <motion.img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          layoutId={`tour-image-${tour.id}`}
        />
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 p-6 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="tour-title text-2xl font-bold mb-2 text-shadow">{tour.title}</h3>
        <p className="text-gray-300 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {tour.description}
        </p>
        <div className="flex flex-col space-y-2 mt-4">
          {tour.links && tour.links.map((link, linkIndex) => (
            <motion.a
              key={linkIndex}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-500 text-white rounded-full text-sm opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
})

TourCard.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
  }).isRequired,
  index: PropTypes.number.isRequired,
}

TourCard.displayName = 'TourCard'

const DecorativeElement = memo(({ className, animate, transition, children }) => (
  <motion.div
    className={className}
    animate={animate}
    transition={transition}
  >
    {children}
  </motion.div>
))

DecorativeElement.propTypes = {
  className: PropTypes.string,
  animate: PropTypes.object,
  transition: PropTypes.object,
  children: PropTypes.node,
}

DecorativeElement.displayName = 'DecorativeElement'

export const PopularTours = memo(() => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  useEffect(() => {
    const animation = anime({
      targets: ".tour-title",
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1200,
      easing: "easeOutExpo",
      delay: anime.stagger(100),
    })

    return () => {
      if (animation && animation.pause) {
        animation.pause()
      }
    }
  }, [])

  return (
    <>
      <section ref={containerRef} className="min-h-screen pt-16 pb-32 japanese-pattern relative overflow-hidden" id="tours">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"
          style={{ opacity }}
        />

        <DecorativeElement
          className="absolute top-20 right-10 w-32 h-32 opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-red-500">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 80c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"/>
          </svg>
        </DecorativeElement>

        <DecorativeElement
          className="absolute bottom-20 left-10 w-24 h-24 opacity-20"
          animate={{
            rotate: -360,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-red-500">
            <path d="M0 0h40v40H0zM60 0h40v40H60zM0 60h40v40H0zM60 60h40v40H60z"/>
          </svg>
        </DecorativeElement>

        <div className="container relative z-10">
          <motion.h2
            className="section-title text-5xl mb-16 text-shadow-red"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            TOURS POPULARES
          </motion.h2>

          <div className="relative">
            {/* Línea decorativa */}
            <motion.div
              className="absolute -left-4 top-1/2 w-8 h-[2px] bg-red-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
            />

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {tours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </motion.div>

            {/* Línea decorativa derecha */}
            <motion.div
              className="absolute -right-4 top-1/2 w-8 h-[2px] bg-red-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </section>
    </>
  )
})

PopularTours.displayName = 'PopularTours'

export default PopularTours
