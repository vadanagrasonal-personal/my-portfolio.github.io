"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const projectsData = [
  {
    id: 1,
    name: "City Management System",
    category: ["backend", "frontend"],
    position: [-0.4, -0.9, 1],
    color: "#ff9900",
    description:
      "Comprehensive City Management System to manage zone- and city-based accounts, products, consumption tracking, user contacts, and secure authentication with role-based access control and real-time reporting.",
    technologies: [
      "Laravel",
      "MySQL",
      "Firebase OTP",
      "REST API",
      "PDF Generation"
    ],
    // github: "https://github.com/your-username/city-management-system",
    // demo: "https://your-demo-link.com",
    // image: "/projects/city-management-system.png",
  },
  {
    id: 2,
    name: "E-Commerce System",
    category: "backend",
    position: [1.6, -1.5, 1],
    color: "#ff00ff",
    description:
      "Comprehensive E-Commerce platform built with Laravel supporting multi-authentication, product management, advanced search, multi-device login, role-based access, reporting, and automation features.",
    technologies: [
      "Laravel",
      "MySQL",
      "REST APIs",
      "Excel Import/Export",
      "PDF Generation",
      "QR Code Integration",
      "Email Scheduling",
      "Multi-Authentication",
      "Role-Based Permissions"
    ],
    // github: "https://github.com/your-username/ecommerce-system",
    // demo: "https://your-demo-link.com",
    // image: "/projects/ecommerce-system.png",
  },
  {
    id: 3,
    name: "Stavya Spine Hospital ERP",
    category: ["frontend", "backend"],
    position: [2, 2, 1],
    color: "#bbd11a",
    description:
      "Full-scale Hospital Management ERP built for a spine & orthopaedic specialty hospital. Digitizes end-to-end patient lifecycle, clinical assessments, radiology workflows, billing, inventory, reporting, and role-based access with a highly normalized MySQL schema (200+ tables). Supports advanced spine scoring systems, automated diagnostics workflows, and enterprise-grade security.",
    technologies: [
      "Laravel",
      "PHP","Firebase","TeleCRM",
      "MySQL",
      "REST APIs",
      "React",
      "jQuery",
      "Bootstrap"
    ],
    // github: "https://github.com/your-username/stavya-erp",
    // demo: "https://your-demo-link.com",
    // image: "/projects/stavya-erp.png"
  },
  {
    id: 4,
    name: "API Based Platform",
    category: "backend",
    position: [3, 0.1, 1],
    color: "#7c3aed",
    description:
      "Scalable Laravel-based platform with secure APIs for authentication, search, category content management, multimedia handling, real-time notifications, and admin panel automation.",
    technologies: [
      "Laravel",
      "MySQL",
      "REST APIs",
      "Firebase Notifications",
      "Firebase OTP",
      "Excel Import/Export",
      "Third-Party Validation"
    ],
    // github: "https://github.com/your-username/api-platform",
    // demo: "https://your-demo-link.com",
    // image: "/projects/api-platform.png",
  },
  {
    id: 5,
    name: "METIS Hospital Management System",
    category: "backend",
    position: [-0.6, 1,1],
    color: "#00b894",
    description:
      "Scalable Hospital Management System managing patient lifecycle, OPD/IPD workflows, doctor scheduling, billing, revenue sharing, insurance payments, bulk imports, and role-based access with high-volume transactional data.",
    technologies: [
      "Laravel",
      "MySQL",
      "REST APIs",
      "Role-Based Permissions",
      "Billing Systems",
      "Bulk Data Import",
      "Audit Logging",
      "Relational Database Design"
    ],
    // github: "https://github.com/your-username/metis-hms",
    // demo: "https://your-demo-link.com",
    // image: "/projects/metis-hms.png",
  },
  {
    id: 6,
    name: "2Brain – Business Operations System",
    category: "backend",
    position: [-1, 2.6, 1],
    color: "#df123b",
    description:
      "Centralized business operations platform managing customers, materials, quotations, sales orders, purchase orders, production workflows, contractors, document management, and role-based access with transactional integrity.",
    technologies: [
      "Laravel",
      "MySQL",
      "REST APIs",
      "RBAC",
      "GST Calculations",
      "Order Management",
      "Document Management",
      "Background Jobs",
      "Caching",
      "Audit Logging"
    ],
    // github: "https://github.com/your-username/2brain-system",
    // demo: "https://your-demo-link.com",
    // image: "/projects/2brain.png",
  },
  {
    id: 7,
    name: "Biomatrix – WordPress Content & Form Platform",
    category: "wordpress",
    position: [-5, 2, 1],
    color: "#f6d015",
    description:
      "WordPress-based content and form management platform handling structured content entities, taxonomies, user accounts, comments, system configuration, background task scheduling, transactional form submissions, and email diagnostics using a normalized MySQL schema.",
    technologies: [
      "WordPress",
      "PHP",
      "MySQL",
      "WPForms",
      "Action Scheduler",
      "WP Mail SMTP",
      "REST APIs",
      "Plugin Architecture",
      "Relational Database Design"
    ],
    // github: "https://github.com/your-username/biomatrix-platform",
    // demo: "https://your-demo-link.com",
    // image: "/projects/biomatrix.png",
  },
  {
    id: 8,
    name: "Soham Hospital Management & Billing System",
    category: "wordpress",
    position: [-3.5, -0.4, 1],
    color: "#00cec9",
    description:
      "WordPress-based hospital management platform handling patient inquiries, online forms, appointment workflows, secure payments, automated background jobs, email tracking, user management, and audit logging using a normalized relational database.",
    technologies: [
      "WordPress",
      "PHP",
      "MySQL",
      "WPForms",
      "Payment Gateway Integration",
      "Action Scheduler",
      "WP Mail SMTP",
      "Relational Database Design",
      "Audit Logging",
      "Background Jobs"
    ],
    // github: "https://github.com/your-username/soham-hms",
    // demo: "https://your-demo-link.com",
    // image: "/projects/soham-hms.png",
  },
  {
    id: 9,
    name: "Culture Crust – Restaurant & Online Ordering Management System",
    category: "backend",
    position: [-3.0, -2, 1],
    color: "#f566b7",
    description:
      "Full-scale Restaurant & Online Ordering Management System built on WordPress with centralized order handling, secure payments, dynamic forms, automated background tasks, role-based permissions, and scalable relational database architecture.",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Online Payment Gateway",
      "Action Scheduler",
      "SMTP Integration",
      "Dynamic Forms",
      "Role-Based Authentication",
      "Relational Database Design",
      "Audit Logging"
    ],
    // github: "https://github.com/your-username/culture-crust",
    // demo: "https://your-demo-link.com",
    // image: "/projects/culture-crust.png",
  }
]

function ProjectPlanet({ project, onClick, isSelected }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isSelected ? 0.2 : 0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.6, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.2} />
      </mesh>

      <Text position={[0, -0.8, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {project.name}
      </Text>
    </group>
  )
}

// Fallback 2D grid view
function FallbackProjectGrid({ projects, onProjectClick }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onProjectClick(project)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4">
              <div
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-4xl"
                style={{ backgroundColor: project.color + "20" }}
              >
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

interface ProjectGalaxyProps {
  selectedFilter: string
}

export default function ProjectGalaxy({ selectedFilter }: ProjectGalaxyProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === "all") return true

    // Normalize category to array (handles string + array)
    const categories = Array.isArray(project.category)
      ? project.category
      : project.category.split(",").map(c => c.trim())

    return categories.includes(selectedFilter)
  });

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  const handleCanvasError = () => {
    setCanvasError(true)
    setWebglSupported(false)
  }

  return (
    <div className="relative w-full h-full">
      {webglSupported && !canvasError ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {filteredProjects.map((project) => (
            <ProjectPlanet
              key={project.id}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} maxDistance={10} minDistance={3} />
        </Canvas>
      ) : (
        <FallbackProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="grid">
                {/* <div>
                  <img
                    src={selectedProject.image || "/placeholder.svg?height=200&width=300"}
                    alt={selectedProject.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div> */}

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>

                  <p className="text-white/80 mb-4">{selectedProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="glass-morphism border-purple-400 text-purple-400 hover:bg-purple-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
