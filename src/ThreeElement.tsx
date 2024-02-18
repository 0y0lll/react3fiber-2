import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"
import { degToRad } from "three/src/math/MathUtils.js"
import { useControls } from "leva"

export const ThreeElement = () => {
	const { scene } = useThree()
	const ref = useRef<Mesh>(null)

	// 오브젝트를 움직이는 frame
	useFrame((delta) => {})

	const box = useControls({
		rotation: { value: 0, min: -360, max: 360, step: 1 },
	})

	return (
		<>
			<directionalLight position={[5, 5, 5]} />

			<mesh ref={ref} rotation={[degToRad(45), box.rotation, 0]}>
				<boxGeometry />
				<meshStandardMaterial color="green" />
			</mesh>
		</>
	)
}
