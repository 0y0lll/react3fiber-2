import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { Mesh } from 'three'

export const ThreeElement = () => {
	const { scene } = useThree()
	const ref = useRef<Mesh>(null)
	const ref2 = useRef<Mesh>(null)

	// 오브젝트를 움직이는 frame
	useFrame((delta) => {
		// scene.rotation.x += 0.01
		// groupRef.current.rotation.x += delta
	})

	const boxControls = useControls({
		radius: { value: 1, min: 0.1, max: 10, step: 0.1 },
		seg: { value: 32, min: 1, max: 100, step: 1 },
		thetaStart: { value: 0, min: 0, max: 360, step: 1 },
		thetaLength: { value: Math.PI * 2, min: 0, max: 360, step: 1 },

		// width: { value: 1, min: 0.1, max: 10, step: 0.1 },
		// height: { value: 1, min: 0.1, max: 10, step: 0.1 },
		// depth: { value: 1, min: 0.1, max: 10, step: 0.1 },
		// widthSeg: { value: 1, min: 1, max: 10, step: 1 },
		// heightSeg: { value: 1, min: 1, max: 10, step: 1 },
		// depthSeg: { value: 1, min: 1, max: 10, step: 1 },
	})

	useEffect(() => {
		// geometry 공유
		// ref2.current.geometry = ref.current.geometry
	}, [])

	return (
		<>
			<directionalLight position={[5, 5, 5]} />

			{/* <Cone position={[-6, 0, 0]}>
				<meshStandardMaterial color="blue" />
			</Cone>

			<Sphere position={[-4, 0, 0]}>
				<meshStandardMaterial color="red" />
			</Sphere>

			<Box position={[-2, 0, 0]}>
				<meshStandardMaterial color="white" />
			</Box>

			<mesh geometry={new BoxGeometry(1, 1, 1)}>
				<meshStandardMaterial color="blue" />
			</mesh> */}

			<mesh ref={ref} position={[0, 0, 0]}>
				{/* <boxGeometry
					args={[
						boxControls.width,
						boxControls.height,
						boxControls.depth,
						boxControls.widthSeg,
						boxControls.heightSeg,
						boxControls.depthSeg,
					]}
				/> */}
				{/* <circleGeometry
					args={[
						boxControls.radius,
						boxControls.seg,
						degToRad(boxControls.thetaStart),
						degToRad(boxControls.thetaLength),
					]}
				/> */}
				{/* <meshStandardMaterial wireframe color="white" /> */}
				<boxGeometry />
				<meshBasicMaterial wireframe />
			</mesh>

			{/* <mesh ref={ref2}>
				<meshStandardMaterial color="green" />
			</mesh> */}
		</>
	)
}
