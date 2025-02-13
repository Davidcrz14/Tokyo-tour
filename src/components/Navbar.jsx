import { Search } from "lucide-react"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/50 to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-red-500 font-bold text-xl">
          Bliss Travel
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {["INICIO", "NOSOTROS", "TOURS", "GALERÍA", "RESEÑAS", "CONTACTO"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-red-500 transition-colors duration-300 text-sm tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="p-2 hover:text-red-500 transition-colors duration-300">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}
