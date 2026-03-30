import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const DataFlow = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { nodes, connections, particles } = useMemo(() => {
    // Central hub + satellite nodes representing data flow
    const n: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 1.5 + Math.random() * 0.8;
      const y = (Math.random() - 0.5) * 2;
      n.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
    }
    // Outer ring
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.3;
      const r = 2.8 + Math.random() * 0.5;
      n.push(new THREE.Vector3(Math.cos(angle) * r, (Math.random() - 0.5) * 1.5, Math.sin(angle) * r));
    }

    const c: [number, number][] = [];
    // Connect center to inner ring
    for (let i = 1; i <= count; i++) c.push([0, i]);
    // Connect some inner to outer
    for (let i = count + 1; i < n.length; i++) {
      c.push([Math.floor(Math.random() * count) + 1, i]);
    }

    // Flowing particles
    const pCount = 150;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 3.5;
      pPos[i * 3] = Math.cos(angle) * r;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pPos[i * 3 + 2] = Math.sin(angle) * r;
    }

    return { nodes: n, connections: c, particles: pPos };
  }, []);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.04;
    if (particlesRef.current) particlesRef.current.rotation.y = -t * 0.02;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[i === 0 ? 0.1 : 0.04, 12, 12]} />
          <meshStandardMaterial
            color={i === 0 ? "#0d9488" : "#134e4a"}
            emissive="#2dd4bf"
            emissiveIntensity={i === 0 ? 0.3 : 0.15}
            transparent opacity={i === 0 ? 0.6 : 0.4}
          />
        </mesh>
      ))}
      {connections.map((c, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([nodes[c[0]], nodes[c[1]]]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#134e4a", transparent: true, opacity: 0.06 }))} />;
      })}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial color="#2dd4bf" size={0.02} transparent opacity={0.2} sizeAttenuation />
      </points>
    </group>
  );
};

const DataFlowBg = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.04} />
        <pointLight position={[3, 2, 4]} intensity={0.15} color="#2dd4bf" />
        <DataFlow />
      </Suspense>
    </Canvas>
  </div>
);

export default DataFlowBg;
