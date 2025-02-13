import PropTypes from 'prop-types'
import { Suspense, lazy, memo } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Navbar } from "./components/Navbar"
import Loader from "./components/loading"

// Lazy load components
const Hero = lazy(() => import("./components/Hero").then(module => ({ default: module.Hero })))
const PopularTours = lazy(() => import("./components/PopularTours").then(module => ({ default: module.PopularTours })))
const Inspire = lazy(() => import("./components/Inspire").then(module => ({ default: module.Inspire })))
const PageIndicator = lazy(() => import("./components/PageIndicator").then(module => ({ default: module.PageIndicator })))

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="w-full h-screen flex items-center justify-center bg-black text-white">
    <Loader />
  </div>
))

LoadingFallback.displayName = 'LoadingFallback'

// Error fallback component
const ErrorFallback = memo(({ error }) => (
  <div className="w-full h-screen flex items-center justify-center bg-black text-white">
    <div className="text-2xl text-red-500">Error: {error.message}</div>
  </div>
))

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }).isRequired
}

ErrorFallback.displayName = 'ErrorFallback'

const App = memo(() => {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <PopularTours />
          <Inspire />
          <PageIndicator />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
})

App.displayName = 'App'

export default App
