import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const MoleculeCluster = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  const atoms = [
    { pos: [0, 0, 0] as [number, number, number], size: 0.18, color: "#0e7490" },
    { pos: [0.6, 0.4, 0.2] as [number, number, number], size: 0.1, color: "#2dd4bf" },
    { pos: [-0.5, 0.5, -0.3] as [number, number, number], size: 0.1, color: "#2dd4bf" },
    { pos: [0.3, -0.6, 0.4] as [number, number, number], size: 0.1, color: "#5eead4" },
    { pos: [-0.4, -0.4, -0.2] as [number, number, number], size: 0.1, color: "#5eead4" },
    { pos: [0.7, -0.2, -0.5] as [number, number, number], size: 0.08, color: "#99f6e4" },
  ];

  const bonds: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [3, 5]];

  return (
    <group ref={groupRef}>
      {atoms.map((a, i) => (
        <mesh key={i} position={a.pos}>
          <sphereGeometry args={[a.size, 16, 16]} />
          <meshStandardMaterial color={a.color} emissive={a.color} emissiveIntensity={0.25} transparent opacity={0.6} />
        </mesh>
      ))}
      {bonds.map((b, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...atoms[b[0]].pos),
          new THREE.Vector3(...atoms[b[1]].pos),
        ]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#115e59", transparent: true, opacity: 0.3 }))} />;
      })}
    </group>
  );
};

const AddonsScene = () => (
  <div className="absolute inset-0 opacity-25 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.08} />
        <pointLight position={[2, 2, 3]} intensity={0.3} color="#2dd4bf" />
        <MoleculeCluster />
      </Suspense>
    </Canvas>
  </div>
);

export default AddonsScene;
