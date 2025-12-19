import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import { useLayoutEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"

export function SphereIntro() {
    const sphereRef = useRef<THREE.Mesh>(null!)
    const tl = useRef<gsap.core.Timeline>()
    const scroll = useScroll()
    const materialRef = useRef<any>(null!)


    useFrame(() => {
        if (!tl.current) return

        const p = scroll.range(0, 1 / scroll.pages)
        tl.current.seek(p * tl.current.duration())

    })

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true })

            tl.current.set(sphereRef.current.position, { z: -3 })
            tl.current.set(sphereRef.current.scale, { x: 1, y: 1, z: 1 })

            tl.current.to(sphereRef.current.position, {
                z: 0.2,
                duration: 1,
                ease: "power2.out",
            })

            tl.current.to(
                sphereRef.current.scale,
                {
                    x: 10,
                    y: 10,
                    z: 10,
                    duration: 1,
                    ease: "power2.inOut",
                },
                0
            )
        })

        return () => ctx.revert()
    }, [])


    return (
        <mesh ref={sphereRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
                wireframe
                transparent
                opacity={1}
                side={THREE.BackSide}
            />
        </mesh>
    )
}
