'use client'

import { AdaptiveDpr, Float, Html, Line, Sparkles } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import type {
  ArchitectureVisualNode,
  ProjectSlug,
  SandboxCommand,
  SandboxOutcome,
  SandboxStatus,
  VisualSceneState,
} from '@/types/portfolio'

interface ThreeSceneProps {
  state: VisualSceneState
  paused: boolean
  onProjectSelect: (slug: ProjectSlug) => void
  onSandboxCommand: (command: SandboxCommand) => SandboxOutcome
}

const projectNodes: Array<{
  slug: ProjectSlug
  color: string
  position: [number, number, number]
}> = [
  { slug: 'yomora', color: '#8b5cf6', position: [-3.2, 1.8, 0.2] },
  { slug: 'hermes-news', color: '#22d3ee', position: [3.5, 1.15, -0.5] },
  { slug: 'solar-beat-lab', color: '#f472b6', position: [-2.5, -2, 0.7] },
  {
    slug: 'orbitafire-vision',
    color: '#fb923c',
    position: [3, -1.85, -0.3],
  },
]

function Core({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    if (group.current) {
      group.current.rotation.y += delta * 0.18
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.1
    }
    if (inner.current) inner.current.rotation.z -= delta * 0.32
  })

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1.12, 0.16, 180, 18, 2, 3]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={2.4}
          metalness={0.7}
          roughness={0.2}
          wireframe
        />
      </mesh>
      <mesh ref={inner} rotation={[Math.PI / 2.6, 0, 0]}>
        <icosahedronGeometry args={[0.82, 1]} />
        <meshStandardMaterial
          color="#070a12"
          emissive="#22d3ee"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.05}
          wireframe
        />
      </mesh>
      <pointLight color="#8b5cf6" intensity={18} distance={8} />
    </group>
  )
}

function ProjectNode({
  slug,
  color,
  position,
  active,
  reducedMotion,
  onSelect,
}: {
  slug: ProjectSlug
  color: string
  position: [number, number, number]
  active: boolean
  reducedMotion: boolean
  onSelect: (slug: ProjectSlug) => void
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!mesh.current || reducedMotion) return
    mesh.current.rotation.x += delta * 0.35
    mesh.current.rotation.y += delta * 0.5
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.1) * 0.06
    mesh.current.scale.setScalar(active ? pulse * 1.25 : pulse)
  })

  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(slug)
  }

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.25}
      floatIntensity={reducedMotion ? 0 : 0.35}
    >
      <mesh
        ref={mesh}
        position={position}
        onClick={select}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = ''
        }}
      >
        <octahedronGeometry args={[active ? 0.38 : 0.28, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 3.2 : 1.5}
          metalness={0.75}
          roughness={0.18}
        />
      </mesh>
    </Float>
  )
}

function architecturePosition(
  node: Pick<ArchitectureVisualNode, 'x' | 'y' | 'kind'>,
): [number, number, number] {
  const depth = {
    client: 0.15,
    module: 0,
    database: -0.16,
    external: -0.28,
    queue: 0.24,
    cloud: -0.08,
  }[node.kind]
  return [(node.x - 50) / 12, (50 - node.y) / 13, depth]
}

function ArchitectureGeometry({ kind }: Pick<ArchitectureVisualNode, 'kind'>) {
  if (kind === 'database') {
    return <cylinderGeometry args={[0.29, 0.29, 0.24, 24]} />
  }
  if (kind === 'queue') return <torusGeometry args={[0.25, 0.09, 12, 28]} />
  if (kind === 'external') return <icosahedronGeometry args={[0.3, 0]} />
  if (kind === 'client') return <boxGeometry args={[0.48, 0.34, 0.2]} />
  if (kind === 'cloud') return <dodecahedronGeometry args={[0.31, 0]} />
  return <octahedronGeometry args={[0.31, 0]} />
}

function ArchitectureNode({
  node,
  accent,
  sandboxStatus,
  reducedMotion,
  onSandboxCommand,
}: {
  node: ArchitectureVisualNode
  accent: string
  sandboxStatus: SandboxStatus
  reducedMotion: boolean
  onSandboxCommand: (command: SandboxCommand) => SandboxOutcome
}) {
  const mesh = useRef<THREE.Mesh>(null)
  const color =
    node.state === 'failed'
      ? '#fb7185'
      : node.state === 'current'
        ? '#f8fafc'
        : node.state === 'available'
          ? '#22d3ee'
          : accent

  useFrame((frame, delta) => {
    if (!mesh.current || reducedMotion) return
    mesh.current.rotation.y += delta * (node.state === 'current' ? 0.85 : 0.24)
    const pulse =
      node.state === 'current' || node.state === 'failed'
        ? 1 + Math.sin(frame.clock.elapsedTime * 3) * 0.1
        : 1
    mesh.current.scale.setScalar(pulse)
  })

  return (
    <group position={architecturePosition(node)}>
      {node.start && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.025, 8, 32]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
      )}
      <mesh
        ref={mesh}
        onClick={(event) => {
          event.stopPropagation()
          if (sandboxStatus === 'idle') {
            onSandboxCommand({ type: 'start', nodeId: node.id })
          } else if (node.state !== 'current') {
            onSandboxCommand({ type: 'hop', nodeId: node.id })
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = ''
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
      >
        <ArchitectureGeometry kind={node.kind} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={
            node.state === 'current' || node.state === 'failed' ? 2.8 : 1.25
          }
          metalness={0.68}
          roughness={0.2}
          wireframe={node.state === 'visited'}
        />
      </mesh>
      <Html
        center
        distanceFactor={8}
        position={[0, -0.52, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span className={`three-node-label is-${node.state}`}>
          {node.label}
        </span>
      </Html>
    </group>
  )
}

function ArchitectureScene({
  state,
  onSandboxCommand,
}: Pick<ThreeSceneProps, 'state' | 'onSandboxCommand'>) {
  const signal = state.architecture
  const positions = useMemo(
    () =>
      Object.fromEntries(
        (signal?.nodes ?? []).map((node) => [
          node.id,
          architecturePosition(node),
        ]),
      ) as Record<string, [number, number, number]>,
    [signal],
  )

  if (!signal) return null

  const edgeColor = {
    idle: '#334155',
    visited: '#8b5cf6',
    current: '#f8fafc',
    available: '#22d3ee',
    failed: '#fb7185',
  } as const

  return (
    <>
      <color attach="background" args={['#070a12']} />
      <fog attach="fog" args={['#070a12', 6, 15]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 6, 7]} intensity={2.2} color="#dbeafe" />
      <pointLight color={signal.accent} intensity={10} distance={9} />
      {signal.edges.map((edge) => (
        <Line
          color={edgeColor[edge.state]}
          key={edge.id}
          lineWidth={
            edge.state === 'current' || edge.state === 'failed' ? 1.8 : 0.7
          }
          opacity={edge.state === 'idle' ? 0.24 : 0.85}
          points={[positions[edge.from], positions[edge.to]]}
          transparent
        />
      ))}
      {signal.nodes.map((node) => (
        <ArchitectureNode
          accent={signal.accent}
          key={node.id}
          node={node}
          onSandboxCommand={onSandboxCommand}
          reducedMotion={state.reducedMotion}
          sandboxStatus={signal.status}
        />
      ))}
      <Sparkles
        count={state.quality === 'low' ? 28 : 64}
        scale={[10, 7, 4]}
        size={1.2}
        speed={state.reducedMotion ? 0 : 0.08}
        color={signal.accent}
      />
      <AdaptiveDpr pixelated />
    </>
  )
}

function AmbientScene({
  state,
  onProjectSelect,
}: Pick<ThreeSceneProps, 'state' | 'onProjectSelect'>) {
  const paths = useMemo(
    () =>
      projectNodes.map((node) => [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...node.position),
      ]),
    [],
  )

  return (
    <>
      <color attach="background" args={['#070a12']} />
      <fog attach="fog" args={['#070a12', 6, 15]} />
      <ambientLight intensity={0.34} />
      <directionalLight position={[4, 7, 6]} intensity={2} color="#dbeafe" />
      <Core reducedMotion={state.reducedMotion} />
      {projectNodes.map((node, index) => (
        <group key={node.slug}>
          <Line
            points={paths[index]}
            color={node.color}
            lineWidth={state.activeProject === node.slug ? 1.3 : 0.45}
            transparent
            opacity={state.mode === 'architecture' ? 0.75 : 0.28}
          />
          <ProjectNode
            {...node}
            active={state.activeProject === node.slug}
            reducedMotion={state.reducedMotion}
            onSelect={onProjectSelect}
          />
        </group>
      ))}
      <Sparkles
        count={state.quality === 'low' ? 48 : 110}
        scale={[12, 8, 6]}
        size={1.8}
        speed={state.reducedMotion ? 0 : 0.16}
        color="#c4b5fd"
      />
      <AdaptiveDpr pixelated />
    </>
  )
}

export default function ThreeScene({
  state,
  paused,
  onProjectSelect,
  onSandboxCommand,
}: ThreeSceneProps) {
  const dpr: [number, number] =
    state.quality === 'low'
      ? [0.7, 1]
      : state.quality === 'high'
        ? [1, 1.75]
        : [0.8, 1.4]

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.2, 7.5], fov: 48 }}
      dpr={dpr}
      frameloop={paused || state.reducedMotion ? 'demand' : 'always'}
      gl={{
        antialias: state.quality !== 'low',
        alpha: false,
        powerPreference: 'high-performance',
      }}
    >
      {state.mode === 'architecture' ? (
        <ArchitectureScene state={state} onSandboxCommand={onSandboxCommand} />
      ) : (
        <AmbientScene state={state} onProjectSelect={onProjectSelect} />
      )}
    </Canvas>
  )
}
