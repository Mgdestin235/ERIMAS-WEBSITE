'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const { pointer } = state
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, pointer.y * 0.22 + scrollRef.current * 0.7, 0.04)
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, pointer.x * 0.32, 0.04)
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, -scrollRef.current * 1.3, 0.06)
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, pointer.x * 0.25, 0.05)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={meshRef} scale={1.7}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#2b5ea3"
          emissive="#37c096"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.6}
          distort={0.3}
          speed={1.4}
        />
      </mesh>
    </Float>
  )
}

/**
 * Scène 3D légère (React Three Fiber) : forme flottante réagissant au
 * mouvement de la souris (parallax) et à la profondeur de scroll. Chargée
 * dynamiquement (ssr: false) par le composant Hero3D qui l'englobe.
 */
export default function Hero3DCanvas() {
  const scrollRef = useRef(0)

  useEffect(() => {
    function onScroll() {
      scrollRef.current = Math.min(window.scrollY / (window.innerHeight || 1), 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={0.9} color="#37c096" />
      <FloatingShape scrollRef={scrollRef} />
    </Canvas>
  )
}
