import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";
export default function CameraAnimation() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 10, 0);
        camera.lookAt(0, 0, 0);


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#scroll-section",
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(camera.position, {
            z: 8,
            y: 1,
            onUpdate: () => camera.lookAt(0, 0, 0),
        })
            .to(camera.position, {
                x: 3,
                z: 6,
                onUpdate: () => camera.lookAt(0, 0, 0),
            })
            .to(camera.position, {
                x: 0,
                y: 4,
                z: 10,
                onUpdate: () => camera.lookAt(0, 0, 0),
            });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [camera]);

    return null;
}
