import { Environment, useHelper } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import {
	DirectionalLight,
	DirectionalLightHelper,
	DoubleSide,
	Group,
	MathUtils,
	Mesh,
	SpotLight,
	SpotLightHelper,
} from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'

export const LightElement = () => {
	const ref = useRef<Mesh>(null)
	const groupRef = useRef<Group>(null)

	// const matcap = useTexture('./images/635D52_A9BCC0_B1AEA0_819598.png')

	const directionalLightRef = useRef<DirectionalLight>(null!)
	useHelper(directionalLightRef, DirectionalLightHelper)

	const spotLightRef = useRef<SpotLight>(null!)
	useHelper(spotLightRef, SpotLightHelper)

	useEffect(() => {
		ref.current!.geometry = ref.current!.geometry

		const length = groupRef.current!.children.length

		for (let index = 0; index < length; index++) {
			const mesh = groupRef.current!.children[index] as Mesh
			mesh.geometry = ref.current!.geometry
			mesh.position.x = (index % (length / 2)) * 2 - 2
			mesh.position.z = 0

			if (index >= length / 2) {
				mesh.position.z = 2
			}
		}
	}, [])

	return (
		<>
			{/* intensity: 광도 */}

			{/* 주변광, 간접광으로, 얕게 빛이 깔린다 */}
			{/* <ambientLight color="#fff" intensity={0.5} /> */}

			{/* 색이 두개인 주변광, 간접광. 돔 라이트 */}
			{/* <hemisphereLight args={['blue', 'pink', 5]} /> */}

			{/* 방향이 있는 직사광선(햇빛) */}
			{/* <directionalLight
				castShadow
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-mapSize={[512, 512]} // shadow 해상도
				ref={directionalLightRef}
				color="green"
				position={[0, 5, 0]}
				intensity={10}
				target-position={[0, 0, 2]}
			/> */}

			{/* 백열등처럼 사방으로 퍼지는 빛 */}
			<pointLight
				castShadow
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-mapSize={[512, 512]}
				color="green"
				position={[0, 5, 0]}
				intensity={10}
				distance={100}
			/>

			{/* 핀조명, 무대조명 */}
			{/* <spotLight
				ref={spotLightRef}
				color="green"
				position={[0, 5, 0]}
				intensity={300}
				distance={5}
				angle={degToRad(40)}
				target-position={[0, 0, 0]}
				penumbra={0.5}
			/> */}

			{/* <Environment
				files="./images/evening_road_01_puresky_4k.hdr"
				background
			/> */}

			{/* 바닥에 깔 놈 */}
			<mesh
				rotation-x={MathUtils.degToRad(-90)}
				position-y={-1}
				receiveShadow
			>
				<planeGeometry args={[15, 15]} />
				<meshStandardMaterial color="#425844" side={DoubleSide} />
			</mesh>

			<mesh ref={ref} position={[0, 0, 0]}>
				<torusKnotGeometry args={[0.5, 0.2]} />
				<meshBasicMaterial visible={true} color="green" />
			</mesh>

			<group ref={groupRef}>
				<mesh castShadow receiveShadow>
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

				<mesh castShadow receiveShadow>
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
						emissive={'black'}
						specular={'#fff'} // 반사광
						shininess={10}
						flatShading={true} // 단면 렌더링
					/>
				</mesh>

				{/* PBR 방식(물리 기반 렌더링 방식) */}
				{/* 정반사, 난반사를 물리적인 방식으로 렌더링 하는 것 */}
				<mesh castShadow receiveShadow>
					<meshStandardMaterial
						color="red"
						depthTest={true}
						depthWrite={true}
						// roughness={1} // 거칠기
						metalness={1} // 금속 표현
					/>
				</mesh>

				<mesh castShadow receiveShadow>
					<meshPhysicalMaterial
						color="white"
						depthTest={true}
						depthWrite={true}
						transparent={true}
						clearcoat={1}
						clearcoatRoughness={0}
						transmission={1}
						thickness={0.5}
						ior={2.33} // 굴절률
					/>
				</mesh>

				<mesh castShadow receiveShadow>
					<meshToonMaterial />
				</mesh>
			</group>
			{/* <mesh ref={ref2}>
				<meshStandardMaterial color="green" />
			</mesh> */}
		</>
	)
}
