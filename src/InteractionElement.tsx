import { ThreeEvent } from '@react-three/fiber'
import { Color } from 'three'

export const InteractionElement = () => {
	const clickFunc = (e: ThreeEvent<MouseEvent>) => {
		console.log('e', e)
		e.object.material.color = new Color('green')
	}

	return (
		<>
			<ambientLight />
			<directionalLight intensity={5} />

			<mesh
				onClick={(e) => clickFunc(e)}
				// onContextMenu={(e) => console.log('context menu')}
				// onDoubleClick={(e) => console.log('double click')}
				// onWheel={(e) => console.log('wheel spins')}
				// onPointerUp={(e) => console.log('up')}
				// onPointerDown={(e) => console.log('down')}
				// onPointerOver={(e) => console.log('over')}
				// onPointerOut={(e) => console.log('out')}
				// onPointerEnter={(e) => console.log('enter')}
				// onPointerLeave={(e) => console.log('leave')}
				// onPointerMove={(e) => console.log('move')}
				// onPointerMissed={() => console.log('missed')}
				// onUpdate={(self) => console.log('props have been updated')}
			>
				<boxGeometry />
				<meshBasicMaterial />
			</mesh>
		</>
	)
}
