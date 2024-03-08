import { Canvas } from '@react-three/fiber'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { InteractionElement } from './InteractionElement'

function App() {
	const color = useControls({
		value: '#9ec7ce',
	})

	const grid = useControls({
		segment: { value: 10, min: 2, max: 100, step: 1 },
	})

	return (
		<Canvas
			shadows
			camera={{
				near: 1,
				far: 100, // 멀리 있는 것 까지 렌더링 할 수치
				fov: 75,
				position: [5, 5, 5],
			}}
		>
			<color attach="background" args={[color.value]} />
			<OrbitControls />
			<axesHelper args={[5]} />
			<gridHelper args={[20, grid.segment]} />

			<InteractionElement />
		</Canvas>
	)
}

export default App
