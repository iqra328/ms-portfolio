import React from 'react';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls, Sparkles } from '@react-three/drei';

export function Sculpture() {
  const group = useRef();
  const moduleRefs = useRef([]);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.34) * 0.1 + 0.28;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.11;
    moduleRefs.current.forEach((module, index) => {
      if (!module) return;
      module.rotation.y -= delta * (0.6 + index * 0.08);
      module.rotation.x = Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.18;
    });
  });
  const stackModules = [
    { position: [1.7, .7, .15], color: '#48b06a', rotation: [0.12, -.35, .1] },
    { position: [-1.5, .76, .15], color: '#f4f2e9', rotation: [.08, .32, -.1] },
    { position: [-1.35, -1.05, .1], color: '#61dafb', rotation: [.12, -.2, .12] },
    { position: [1.38, -1.08, .05], color: '#d8fa56', rotation: [-.08, .2, -.1] },
  ];
  return (
    <group ref={group} rotation={[0.28, 0, 0]}>
      <mesh rotation={[1.25, 0, 0]}>
        <torusGeometry args={[1.85, .018, 12, 100]} />
        <meshBasicMaterial color="#d8fa56" transparent opacity={.62} />
      </mesh>
      <mesh rotation={[.88, .72, .42]}>
        <torusGeometry args={[1.48, .025, 12, 100]} />
        <meshBasicMaterial color="#f4f2e9" transparent opacity={.32} />
      </mesh>
      <Float speed={1.5} rotationIntensity={.12} floatIntensity={.28}>
        <mesh scale={.62} rotation={[.3, .7, .2]}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshTransmissionMaterial backside samples={4} thickness={.7} chromaticAberration={.08} transmission={.9} roughness={.12} color="#d8fa56" />
        </mesh>
      </Float>
      <mesh scale={.23} rotation={[.2, .4, .1]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#f4f2e9" metalness={.7} roughness={.16} />
      </mesh>
      {stackModules.map((item, index) => (
        <group key={item.color} position={item.position} rotation={item.rotation} ref={(node) => { moduleRefs.current[index] = node; }}>
          <mesh>
            <boxGeometry args={[.62, .62, .22]} />
            <meshStandardMaterial color={item.color} metalness={.5} roughness={.22} emissive={item.color} emissiveIntensity={.12} />
          </mesh>
          <mesh position={[0, 0, .13]} scale={[.45, .45, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#101712" transparent opacity={.42} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.9], fov: 34 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 4, 5]} intensity={3.4} color="#f4f2e9" />
      <pointLight position={[-3, -2, 2]} intensity={8} color="#d8fa56" />
      <pointLight position={[2, 1, 3]} intensity={5} color="#61dafb" />
      <Sparkles count={75} scale={[5.5, 4.5, 3]} size={2.2} speed={.35} color="#d8fa56" />
      <Sculpture />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.7} rotateSpeed={0.7} />
    </Canvas>
  );
}
