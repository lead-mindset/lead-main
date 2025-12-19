import { Stars } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export function SpaceBackground() {
  const starsRef = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    starsRef.current.rotation.y += delta * 0.01
    starsRef.current.rotation.x += delta * 0.002
  })

  return (
    <group ref={starsRef}>
      <Stars
        radius={10}
        depth={50}
        count={3000}
        factor={5}
        saturation={1}
        fade
        speed={0.05}
      />
    </group>
  )
}
