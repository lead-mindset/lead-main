import { useScroll } from "@react-three/drei"

export const Overlay = () => {
  const scroll = useScroll()

  const holdStart = 0.5      // 2 / 4
  const holdLength = 0.25    // 1 page

  const hold = scroll.range(holdStart, holdLength)

  const isVisible = scroll.visible(holdStart, holdLength)

  const translateY = -hold * window.innerHeight

  return (
    <div className=" w-screen">

     <h1 style={{ position: 'absolute', top: `100vh`, right: '20vw', fontSize: '25em', color: 'white', transform: `translate3d(0,-100%,0)` }}>all</h1>
        <h1 style={{ position: 'absolute', top: '180vh', left: '10vw' }}>hail</h1>
        <h1 style={{ position: 'absolute', top: '0vh', right: '10vw' }}>thee,</h1>
        <h1 style={{ position: 'absolute', top: '350vh', left: '10vw' }}>thoth</h1>
        <h1 style={{ position: 'absolute', top: '450vh', right: '10vw' }}>
          her
          <br />
          mes.
        </h1>

    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg px-8 py-6">
      {children}
    </div>
  )
}
