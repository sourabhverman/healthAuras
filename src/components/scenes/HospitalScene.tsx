import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const GridSystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  const { nodes, connections } = useMemo(() => {
    const n: THREE.Vector3[] = [];
    const c: [number, number][] = [];
    // 4x3 grid of departments
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        n.push(new THREE.Vector3((col - 1.5) * 0.9, (row - 1) * 0.9, 0));
      }
    }
    // Connect adjacent nodes
    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        if (n[i].distanceTo(n[j]) < 1.1) c.push([i, j]);
      }
    }
    return { nodes: n, connections: c };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    nodesRef.current.forEach((m, i) => {
      if (!m) return;
      const glow = 0.2 + Math.sin(t * 0.8 + i * 0.5) * 0.15;
      (m.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => { if (el) nodesRef.current[i] = el; }} position={n}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#164e63" emissive="#0e7490" emissiveIntensity={0.3} transparent opacity={0.5} roughness={0.6} />
        </mesh>
      ))}
      {connections.map((c, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([nodes[c[0]], nodes[c[1]]]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#134e4a", transparent: true, opacity: 0.2 }))} />;
      })}
    </group>
  );
};

const HospitalScene = () => (
  <div className="absolute inset-0 opacity-25 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.08} />
        <pointLight position={[2, 2, 3]} intensity={0.3} color="#0e7490" />
        <GridSystem />
      </Suspense>
    </Canvas>
  </div>
);

export default HospitalScene;
