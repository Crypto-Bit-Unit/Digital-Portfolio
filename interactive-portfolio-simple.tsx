"use client"
import { useState, useEffect, useRef, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

// Simulated portfolio data
const projects = [
  {
    id: 1,
    title: "Neuomorphic Dashboard",
    description:
      "A unique admin interface with depth and tactility. This dashboard provides an intuitive way to visualize complex data with a modern design approach that emphasizes shadows and subtle gradients to create a sense of physical depth.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    color: "#2dd4bf",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "Immersive Learning Platform",
    description:
      "Educational platform with interactive 3D elements that transform traditional learning into an engaging experience. Students can manipulate virtual objects, explore complex concepts through spatial visualization, and track their progress through gamified elements.",
    tags: ["Next.js", "Three.js", "TypeScript"],
    color: "#8b5cf6",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
  {
    id: 3,
    title: "Ambient Music Generator",
    description:
      "AI-powered tool for creating atmospheric soundscapes based on mood, environment, and user preferences. The application uses machine learning to analyze patterns in ambient music and generates unique compositions that adapt to the user's input parameters.",
    tags: ["TensorFlow.js", "Web Audio API", "React"],
    color: "#f43f5e",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
  {
    id: 4,
    title: "Generative Art Engine",
    description:
      "Algorithm-based tool for creating unique visual patterns that can be customized through various parameters. Users can adjust complexity, color schemes, and animation properties to generate artwork that can be exported as high-resolution images or animations.",
    tags: ["Canvas API", "p5.js", "Node.js"],
    color: "#f97316",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
  },
]
 /*------------------------------------------------------------------------------*/
const experience = [
  {
    year: "2022",
    title: "11th grade 1st Semester.",
    company: "Top 8 in Reading and Writing Skills.",
  },
  {
    year: "2022",
    title: "11th Grade First Semester.",
    company: "With Honors.",
  },
  {
    year: "2024",
    title: "12th Grade",
    company: "Graduating with Highest honors.",
]
 /*------------------------------------------------------------------------------*/
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Brand Co",
    quote:
      "Working with this developer was a game-changer for our company. The attention to detail and creative solutions exceeded our expectations.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "TechLaunch",
    quote:
      "Incredibly responsive and professional. Delivered our project on time and with features we hadn't even thought of. Highly recommended!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emma Rodriguez",
    role: "Product Manager",
    company: "SaaS Platform",
    quote:
      "The developer's ability to translate our complex requirements into an intuitive interface was impressive. Our users love the result.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "David Kim",
    role: "Creative Director",
    company: "Design Studio",
    quote:
      "Rare to find a developer with both technical expertise and an eye for design. The collaborative process was smooth and the outcome was exceptional.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]
 /*------------------------------------------------------------------------------*/
const activities = [
  {
    id: 1,
    category: "Volunteer Work",
    title: "Community Garden Project",
    description: "Led a team of 15 volunteers to establish a community garden in an underserved neighborhood",
    date: "June 2023",
    impact: "Created sustainable food source for 50+ families",
    status: "Completed",
  },
  {
    id: 2,
    category: "Professional Development",
    title: "Web Accessibility Certification",
    description: "Completed comprehensive training on creating accessible web applications",
    date: "March 2023",
    impact: "Implemented accessibility improvements across 5 major projects",
    status: "Completed",
  },
  {
    id: 3,
    category: "Leadership",
    title: "Tech Mentorship Program",
    description: "Mentored 8 junior developers through structured 6-month program",
    date: "Jan - June 2023",
    impact: "All mentees successfully completed their first major projects",
    status: "Completed",
  },
  {
    id: 4,
    category: "Education",
    title: "Advanced React Patterns Workshop",
    description: "Developed and delivered workshop on advanced React patterns and performance optimization",
    date: "April 2023",
    impact: "Trained 30+ developers, resulting in measurable performance improvements",
    status: "Completed",
  },
  {
    id: 5,
    category: "Community",
    title: "Local Tech Meetup Organizer",
    description: "Organize monthly tech meetups focusing on emerging technologies",
    date: "Ongoing",
    impact: "Built community of 200+ local developers and facilitated networking opportunities",
    status: "In Progress",
  },
  {
    id: 6,
    category: "Open Source",
    title: "Accessibility Plugin Contribution",
    description: "Developing open-source plugin for improving web accessibility testing",
    date: "July 2023 - Present",
    impact: "Tool currently used by 500+ developers worldwide",
    status: "In Progress",
  },
]

// Remove the custom cursor completely
// Replace CustomCursor component with a simplified version that doesn't use hooks or state
const CustomCursor = memo(({ cursorText }: { cursorText: string }) => {
  // Return null - effectively disabling the custom cursor
  return null
})

CustomCursor.displayName = "CustomCursor"

// Animated background particles component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#22c55e"]
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    // Animation loop
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.3
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, []) // Empty dependency array - only run once

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
}

// Navigation node component - optimized to prevent blinking
interface NavNodeProps {
  id: string
  label: string
  x: number
  y: number
  color?: string
  active?: boolean
  onClick: () => void
}

const NavNode = memo(({ id, label, x, y, color = "#4f46e5", active = false, onClick }: NavNodeProps) => (
  <motion.div
    className={`absolute cursor-pointer select-none ${active ? "z-10" : "z-0"}`}
    style={{ top: `${y}%`, left: `${x}%` }}
    initial={{ scale: 0 }}
    animate={{
      scale: active ? 1.2 : 1,
      opacity: active ? 1 : 0.7,
    }}
    whileHover={{ scale: 1.2, opacity: 1 }}
    onClick={onClick}
    transition={{ duration: 0.3 }}
  >
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute w-10 h-10 rounded-full opacity-30"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <div className="w-5 h-5 rounded-full z-10" style={{ backgroundColor: color }}></div>
      <div className="absolute whitespace-nowrap px-3 py-1 bg-gray-800 text-white rounded-full -bottom-8">{label}</div>
    </div>
  </motion.div>
))

NavNode.displayName = "NavNode"

// Main portfolio component

// Fix the mouse position effect to use a throttled update
// Add this function at the top level, outside of any component
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

const InteractivePortfolioSimple = () => {
  const [activeSection, setActiveSection] = useState("intro")
  const [cursorText, setCursorText] = useState("")
  const [isExploring, setIsExploring] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  const setSection = useCallback((section: string, text = "") => {
    setActiveSection(section)
    setCursorText(text)
  }, [])

  const startExploring = useCallback(() => {
    setIsExploring(true)
    setTimeout(() => setSection("map"), 800)
  }, [setSection])

  const toggleDarkMode = useCallback(() => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("portfolio-theme", newMode ? "dark" : "light")
  }, [isDarkMode])

  // Then update the mouse position effect in the InteractivePortfolio component:
  // Handle mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      // Calculate mouse position as percentage of screen
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
    }, 50) // Only update every 50ms

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow key navigation
      if (activeSection === "map") {
        switch (e.key) {
          case "ArrowUp":
            setSection("about")
            break
          case "ArrowRight":
            setSection("projects")
            break
          case "ArrowDown":
            setSection("testimonials")
            break
          case "ArrowLeft":
            setSection("contact")
            break
        }
      } else if (e.key === "Escape") {
        // Escape key to go back to map
        if (selectedProject) {
          setSelectedProject(null)
        } else {
          setSection("map")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, selectedProject, setSection])

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
    }
  }, [])

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Scroll animation for longer sections
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const items = container.querySelectorAll(".animate-on-scroll")

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.8

        if (isVisible) {
          item.classList.add("animate-visible")
        }
      })
    }

    // Use a timeout to ensure the DOM is ready
    const timer = setTimeout(() => {
      handleScroll()
    }, 100)

    container.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection])

  // Section components
  const IntroSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center text-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight leading-tight"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="block">Digital</span>
        <span className="block">Reading</span>
        <span className="block">Portfolio</span>
      </motion.h1>
      <motion.div
        className="text-xl md:text-3xl mb-8 text-gray-600 dark:text-gray-300"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Design the Future
      </motion.div>
      <motion.button
        className="mt-8 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-xl font-medium transition-all hover:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={startExploring}
      >
        Enter Portfolio
      </motion.button>
    </motion.div>
  )
 /*------------------------------------------------------------------------------*/
  const MapSection = () => (
    <motion.div
      className="h-full w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background grid effect with parallax */}
      {/* In the MapSection component, update the background grid div: */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="absolute top-5 left-5 text-2xl font-semibold">Content Map</div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Navigation nodes */}
      <NavNode
        id="about"
        label="About Me"
        x={25}
        y={30}
        color="#06b6d4"
        active={activeSection === "about"}
        onClick={() => setSection("about")}
      />
      <NavNode
        id="projects"
        label="Projects"
        x={65}
        y={40}
        color="#8b5cf6"
        active={activeSection === "projects"}
        onClick={() => setSection("projects")}
      />
      <NavNode
        id="testimonials"
        label="Testimonials"
        x={15}
        y={70}
        color="#f59e0b"
        active={activeSection === "testimonials"}
        onClick={() => setSection("testimonials")}
      />
      <NavNode
        id="contact"
        label="Contact"
        x={80}
        y={75}
        color="#f43f5e"
        active={activeSection === "contact"}
        onClick={() => setSection("contact")}
      />
      <NavNode
        id="reflections"
        label="Reflection"
        x={50}
        y={20}
        color="#3b82f6"
        active={activeSection === "reflections"}
        onClick={() => setSection("reflections")}
      />
      <NavNode
        id="activities"
        label="Activities"
        x={40}
        y={50}
        color="#10b981"
        active={activeSection === "activities"}
        onClick={() => setSection("activities")}
      />

      <motion.div
        className="absolute bottom-5 left-5 text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Click on a node to navigate or use arrow keys
      </motion.div>
    </motion.div>
  )
  /*------------------------------------------------------------------------------*/

  const AboutSection = () => (
    <motion.div
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-start p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-xl mb-6">
          Paul is a dedicated Computer Science student at FEU Institute of Technology, is passionate about technology, problem-solving, strategic thinking, and critical analysis, bringing a well-rounded perspective to challenges. 
        </p>
        <p className="text-lg mb-8">
          Another thing about Paul, he is an analytical thinker who enjoys analyzing complex problems, identifying patterns, and learning through coding, enhancing his craft, and project collaboration. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <motion.div
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-bold mb-2">Elementary</h3>
            <p>
              I am a proud alumnus of Pasig City's La Immaculada Concepcion School.  My academic and personal development were greatly influenced by my time at La Immaculada, which gave me a solid foundation in English.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-6 text-white"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-bold mb-2">HighSchool</h3>
            <p>
              I am a recent graduate with high honors in Arellano University in Pasig City.  I gained a solid foundation in Science and Math during my academic experience, which has stoked my interest in Computers and the fields of Technology. 
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <div className="mt-12 max-w-2xl mx-auto animate-on-scroll">
        <h3 className="text-xl font-bold mb-6 text-center">Academic Highlights</h3>

        <div className="relative border-l-2 border-purple-500 pl-8 ml-4 space-y-10">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className="absolute -left-12 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <div className="text-sm text-purple-500 font-bold mb-1">{item.year}</div>
              <div className="font-bold text-lg">{item.title}</div>
              <div className="text-gray-600 dark:text-gray-300 mb-1">{item.company}</div>
              <div className="text-gray-500 dark:text-gray-400">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )
 /*------------------------------------------------------------------------------*/
  const ProjectsSection = () => (
    <motion.div
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-start p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg transition-all hover:shadow-xl perspective-1000"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="h-2 w-full" style={{ backgroundColor: project.color }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: `${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>

            <p className="mb-4">{selectedProject.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: `${selectedProject.color}30`,
                      color: selectedProject.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg"
              >
                View Live
              </a>
              <a
                href={selectedProject.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                View Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
 /*------------------------------------------------------------------------------*/
  const TestimonialsSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      <h2 className="text-3xl font-bold mb-8">Client Testimonials</h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
            <p className="italic text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )
 /*------------------------------------------------------------------------------*/
  const ContactSection = () => (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-md w-full mx-auto text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Connect With Me!!
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <button
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium"
            onClick={() => alert("Form submitted!")}
          >
            Send Message
          </button>
        </form>

        <div className="flex justify-center space-x-6 mt-8">
          <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors duration-300">
            GitHub
          </a>
          <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors duration-300">
            Instagram
          </a>
          <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors duration-300">
            Twitter
          </a>
          <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors duration-300">
            LinkedIn
          </a>
        </div>
      </motion.div>

      <motion.button
        className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setSection("map")}
      >
        Back to Map
      </motion.button>
    </motion.div>
  )
 /*------------------------------------------------------------------------------*/
  const ReflectionsSection = () => (
    <motion.div
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-start p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Computer Science Degree Reflections</h2>

        <div className="space-y-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Foundational Learning</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The core computer science curriculum provided me with a strong foundation in algorithms, data structures,
              and computational thinking. These fundamentals have proven invaluable throughout my career, enabling me to
              approach complex problems with a structured mindset and develop efficient solutions regardless of the
              technology stack.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Theoretical vs. Practical</h3>
            <p className="text-gray-700 dark:text-gray-300">
              While theoretical knowledge from courses like Discrete Mathematics and Theory of Computation initially
              seemed abstract, they've provided me with the mental models to understand complex systems and
              technologies. However, I found that supplementing my degree with practical projects and internships was
              crucial for developing the hands-on skills needed in the industry.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Collaborative Development</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Group projects and team-based assignments taught me the importance of collaboration, version control, and
              clear communication. These soft skills have been just as important as technical knowledge in my
              professional career, especially when working in agile environments with cross-functional teams.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">Continuous Learning</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Perhaps the most valuable lesson from my CS degree was learning how to learn. The field evolves rapidly,
              and my education instilled in me the ability to adapt to new technologies, languages, and paradigms. This
              growth mindset has been essential for staying relevant in an ever-changing technological landscape.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-bold mb-3 text-yellow-600 dark:text-yellow-400">Ethical Considerations</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Courses on ethics in computing and discussions about the societal impact of technology have shaped how I
              approach my work. Understanding the responsibility that comes with building digital products has guided me
              to prioritize accessibility, privacy, and inclusivity in everything I create.
            </p>
          </motion.div>
        </div>

        <motion.button
          className="mt-12 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full mx-auto block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => setSection("map")}
        >
          Back to Map
        </motion.button>
      </motion.div>
    </motion.div>
  )
 /*------------------------------------------------------------------------------*/
  const ActivitiesSection = () => (
    <motion.div
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-start p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Activities & Accomplishments</h2>

        <div className="mb-6">
          <div className="flex justify-end mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search activities..."
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                className="w-5 h-5 absolute right-3 top-2.5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Activity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Impact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {activities.map((activity, index) => (
                  <motion.tr
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor:
                            activity.category === "Volunteer Work"
                              ? "#10b98130"
                              : activity.category === "Professional Development"
                                ? "#8b5cf630"
                                : activity.category === "Leadership"
                                  ? "#f43f5e30"
                                  : activity.category === "Education"
                                    ? "#f59e0b30"
                                    : activity.category === "Community"
                                      ? "#06b6d430"
                                      : "#6366f130",
                          color:
                            activity.category === "Volunteer Work"
                              ? "#10b981"
                              : activity.category === "Professional Development"
                                ? "#8b5cf6"
                                : activity.category === "Leadership"
                                  ? "#f43f5e"
                                  : activity.category === "Education"
                                    ? "#f59e0b"
                                    : activity.category === "Community"
                                      ? "#06b6d4"
                                      : "#6366f1",
                        }}
                      >
                        {activity.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{activity.impact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.button
          className="mt-8 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full mx-auto block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => setSection("map")}
        >
          Back to Map
        </motion.button>
      </motion.div>
    </motion.div>
  )

  return (
    <div className={`relative w-full h-screen bg-white text-gray-900 overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      {/* Loading screen */}
      {isLoading ? (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, delay: 1 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        <>
          {/* Particle background */}
          <ParticleBackground />

          {/* Custom cursor with optimized rendering */}
          {!isMobile && <CustomCursor cursorText={cursorText} />}

          {/* Main content */}
          <div className="relative w-full h-full overflow-hidden dark:bg-gray-900 dark:text-gray-100">
            <AnimatePresence mode="wait">
              {activeSection === "intro" && <IntroSection key="intro" />}
              {activeSection === "map" && <MapSection key="map" />}
              {activeSection === "about" && <AboutSection key="about" />}
              {activeSection === "projects" && <ProjectsSection key="projects" />}
              {activeSection === "testimonials" && <TestimonialsSection key="testimonials" />}
              {activeSection === "contact" && <ContactSection key="contact" />}
              {activeSection === "reflections" && <ReflectionsSection key="reflections" />}
              {activeSection === "activities" && <ActivitiesSection key="activities" />}
            </AnimatePresence>
          </div>

          {/* Mobile navigation for smaller screens - only visible on touch devices */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 z-40">
              <div className="flex justify-around">
                {["map", "about", "projects", "testimonials", "reflections", "activities", "contact"].map((section) => (
                  <button
                    key={section}
                    className={`p-2 rounded-full ${activeSection === section ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" : ""}`}
                    onClick={() => setSection(section)}
                  >
                    <div className="capitalize text-xs">{section}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default InteractivePortfolioSimple

