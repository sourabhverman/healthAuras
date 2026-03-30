import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  const { nodes, edges } = useMemo(() => {
    const n: THREE.Vector3[] = [];
    // Create layered neural network structure
    const layers = [4, 6, 8, 6, 4];
    layers.forEach((count, layer) => {
      for (let i = 0; i < count; i++) {
        const x = (layer - 2) * 1.8;
        const y = (i - (count - 1) / 2) * 0.9;
        const z = (Math.random() - 0.5) * 0.6;
        n.push(new THREE.Vector3(x, y, z));
      }
    });

    const e: [number, number][] = [];
    let offset = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const nextOffset = offset + layers[l];
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          if (Math.random() > 0.4) {
            e.push([offset + i, nextOffset + j]);
          }
        }
      }
      offset = nextOffset;
    }
    return { nodes: n, edges: e };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.06) * 0.05;
    }
    nodesRef.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.15 + Math.sin(t * 0.8 + i * 0.4) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => { if (el) nodesRef.current[i] = el; }} position={n}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#1a5c4c" emissive="#2dd4bf" emissiveIntensity={0.2} transparent opacity={0.5} />
        </mesh>
      ))}
      {edges.map((e, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([nodes[e[0]], nodes[e[1]]]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#134e4a", transparent: true, opacity: 0.08 }))} />;
      })}
    </group>
  );
};

const NeuralNetworkBg = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.05} />
        <pointLight position={[4, 3, 5]} intensity={0.2} color="#2dd4bf" />
        <NeuralNetwork />
      </Suspense>
    </Canvas>
  </div>
);

export default NeuralNetworkBg;
