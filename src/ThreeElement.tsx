import { degToRad } from "three/src/math/MathUtils.js"

export const ThreeElement = () => {
	return (
		<>
			<directionalLight position={[5, 5, 5]} />

			<mesh rotation={[degToRad(30), degToRad(45), 0]}>
				<boxGeometry />
				<meshStandardMaterial color="green" />
			</mesh>
		</>
	)
}
