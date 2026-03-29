import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const ConnectedNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1;
      const y = (Math.random() - 0.5) * 2;
      positions.push([Math.cos(angle) * radius, y, Math.sin(angle) * radius]);
    }
    // Center nodes
    positions.push([0, 0.5, 0], [0, -0.5, 0], [0.5, 0, 0.5]);
    return positions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;

    nodesRef.current.forEach((mesh, i) => {
      if (mesh) {
        const t = state.clock.elapsedTime;
        const base = nodePositions[i];
        mesh.position.y = base[1] + Math.sin(t * 0.8 + i * 0.5) * 0.15;
        const s = 1 + Math.sin(t * 1.5 + i) * 0.15;
        mesh.scale.setScalar(s);
      }
    });
  });

  const lines = useMemo(() => {
    const result: THREE.Line[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = Math.sqrt(
          (nodePositions[i][0] - nodePositions[j][0]) ** 2 +
          (nodePositions[i][1] - nodePositions[j][1]) ** 2 +
          (nodePositions[i][2] - nodePositions[j][2]) ** 2
        );
        if (dist < 2.5) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...nodePositions[i]),
            new THREE.Vector3(...nodePositions[j]),
          ]);
          const opacity = Math.max(0.05, 0.3 - dist * 0.1);
          result.push(
            new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#06b6d4", transparent: true, opacity }))
          );
        }
      }
    }
    return result;
  }, [nodePositions]);

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) nodesRef.current[i] = el; }}
          position={pos}
        >
          <sphereGeometry args={[i >= 12 ? 0.12 : 0.08, 16, 16]} />
          <meshStandardMaterial
            color={i >= 12 ? "#34d399" : "#06b6d4"}
            emissive={i >= 12 ? "#34d399" : "#06b6d4"}
            emissiveIntensity={i >= 12 ? 1 : 0.6}
          />
        </mesh>
      ))}
      {lines.map((line, i) => (
        <primitive key={`l-${i}`} object={line} />
      ))}
    </group>
  );
};

const PartnersScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.7} color="#34d399" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#06b6d4" />
        <ConnectedNodes />
      </Suspense>
    </Canvas>
  </div>
);

export default PartnersScene;
