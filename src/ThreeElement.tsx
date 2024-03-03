import { useFrame, useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { useEffect, useRef } from "react"
import { DoubleSide, Group, Mesh } from "three"

export const ThreeElement = () => {
	const { scene } = useThree()
	const ref = useRef<Mesh>(null)
	const groupRef = useRef<Group>(null)
	// const ref2 = useRef<Mesh>(null)
	// const ref3 = useRef<Mesh>(null)

	// 오브젝트를 움직이는 frame
	useFrame((delta) => {
		// scene.rotation.x += 0.01
		// groupRef.current.rotation.x += delta
	})

	const controls = useControls({
		radius: { value: 1, min: 0.1, max: 10, step: 0.1 },
		seg: { value: 32, min: 1, max: 100, step: 1 },
		thetaStart: { value: 0, min: 0, max: 360, step: 1 },
		thetaLength: { value: Math.PI * 2, min: 0, max: 360, step: 1 },
		thickness: { value: 0.1, min: 0.1, max: 10, step: 0.1 },

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
		ref.current!.geometry = ref.current!.geometry

		const length = groupRef.current!.children.length

		for (let index = 0; index < length; index++) {
			const mesh = groupRef.current!.children[index] as Mesh
			mesh.geometry = ref.current!.geometry
			mesh.position.x = (index % (length / 2)) * 2 - 4
			mesh.position.z = 0

			if (index >= length / 2) {
				mesh.position.z = 2
			}
		}
	}, [])

	return (
		<>
			<directionalLight position={[5, 5, 5]} intensity={2} />

			<mesh ref={ref} position={[0, 0, 0]}>
				<torusKnotGeometry args={[0.5, 0.2]} />
				<meshBasicMaterial visible={true} color="green" />
			</mesh>

			<group ref={groupRef}>
				<mesh>
					<boxGeometry />
					<meshBasicMaterial wireframe />
				</mesh>

				<mesh>
					<boxGeometry />
					<meshBasicMaterial
						color="blue"
						visible={true}
						transparent={true} // 투명 여부
						opacity={1} // transparent가 true여야 opacity를 줄 수 있다
						side={DoubleSide} // 사이드 렌더링 여부. frontSide: 바깥쪽, backSide: 안쪽
						alphaTest={0.5}
						depthTest={true} // 거리값 테스트. 앞에거 무시하고 뒤에거 보여줌
						depthWrite={true} // 카메라에서 얼마나 먼지 계산한 값을 버퍼에 가지고 있고, 내가 설정한 geometry에는 적용하지 않겠다
						fog={true}
					/>
				</mesh>

				<mesh>
					<boxGeometry />
					<meshLambertMaterial
						color="yellow"
						visible={true}
						transparent={true} // 투명 여부
						opacity={1} // transparent가 true여야 opacity를 줄 수 있다
						side={DoubleSide} // 사이드 렌더링 여부. frontSide: 바깥쪽, backSide: 안쪽
						alphaTest={0.5}
						depthTest={true} // 거리값 테스트. 앞에거 무시하고 뒤에거 보여줌
						depthWrite={true} // 카메라에서 얼마나 먼지 계산한 값을 버퍼에 가지고 있고, 내가 설정한 geometry에는 적용하지 않겠다
						fog={true}
					/>
				</mesh>

				<mesh>
					<boxGeometry />
					<meshPhongMaterial
						color="yellow"
						visible={true}
						transparent={true} // 투명 여부
						opacity={1} // transparent가 true여야 opacity를 줄 수 있다
						side={DoubleSide} // 사이드 렌더링 여부. frontSide: 바깥쪽, backSide: 안쪽
						alphaTest={0.5}
						depthTest={true} // 거리값 테스트. 앞에거 무시하고 뒤에거 보여줌
						depthWrite={true} // 카메라에서 얼마나 먼지 계산한 값을 버퍼에 가지고 있고, 내가 설정한 geometry에는 적용하지 않겠다
						fog={true}
						emissive={"black"}
						specular={"#fff"} // 반사광
						shininess={10}
						flatShading={true} // 단면 렌더링
					/>
				</mesh>

				<mesh>
					{/* 각 단면(노말 벡터)가 받는 색을 RGB로 표현한 것 */}
					<meshNormalMaterial />
				</mesh>

				{/* PBR 방식(물리 기반 렌더링 방식) */}
				{/* 정반사, 난반사를 물리적인 방식으로 렌더링 하는 것 */}
				<mesh>
					<meshStandardMaterial
						color="red"
						depthTest={true}
						depthWrite={true}
						// roughness={1} // 거칠기
						metalness={1} // 금속 표현
					/>
				</mesh>

				<mesh>
					<meshPhysicalMaterial
						color="white"
						depthTest={true}
						depthWrite={true}
						transparent={true}
						clearcoat={1}
						clearcoatRoughness={0}
						transmission={1}
						thickness={controls.thickness}
						ior={2.33} // 굴절률
					/>
				</mesh>

				<mesh>
					<meshDepthMaterial />
				</mesh>

				<mesh>
					<meshBasicMaterial />
				</mesh>

				<mesh>
					<meshBasicMaterial />
				</mesh>
			</group>
			{/* <mesh ref={ref2}>
				<meshStandardMaterial color="green" />
			</mesh> */}
		</>
	)
}
