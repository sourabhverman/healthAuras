import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const FlowNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, edges } = useMemo(() => {
    const n = [
      { pos: new THREE.Vector3(0, 0, 0), size: 0.14 },
      { pos: new THREE.Vector3(-1.2, 0.6, 0), size: 0.1 },
      { pos: new THREE.Vector3(1.2, 0.5, 0), size: 0.1 },
      { pos: new THREE.Vector3(-0.8, -0.8, 0), size: 0.1 },
      { pos: new THREE.Vector3(1, -0.7, 0), size: 0.1 },
      { pos: new THREE.Vector3(0, 1.2, 0), size: 0.08 },
      { pos: new THREE.Vector3(-1.8, -0.2, 0), size: 0.07 },
      { pos: new THREE.Vector3(1.8, 0, 0), size: 0.07 },
    ];
    const e = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 5], [1, 6], [2, 5], [2, 7], [3, 6], [4, 7],
    ];
    return { nodes: n, edges: e };
  }, []);

  const pulseRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.05;
    pulseRef.current.forEach((m, i) => {
      if (!m) return;
      const s = 1 + Math.sin(t * 1.5 + i * 0.8) * 0.15;
      m.scale.set(s, s, s);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => { if (el) pulseRef.current[i] = el; }} position={n.pos}>
          <sphereGeometry args={[n.size, 16, 16]} />
          <meshStandardMaterial color={i === 0 ? "#0e7490" : "#115e59"} emissive={i === 0 ? "#0e7490" : "#115e59"} emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>
      ))}
      {edges.map((e, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([nodes[e[0]].pos, nodes[e[1]].pos]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#134e4a", transparent: true, opacity: 0.25 }))} />;
      })}
    </group>
  );
};

const ClinicScene = () => (
  <div className="absolute inset-0 opacity-25 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.08} />
        <pointLight position={[2, 2, 3]} intensity={0.3} color="#0d9488" />
        <FlowNetwork />
      </Suspense>
    </Canvas>
  </div>
);

export default ClinicScene;
