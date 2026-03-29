import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const NetworkGrid = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const { nodes, edges } = useMemo(() => {
    const n: [number, number, number][] = [];
    const e: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const gridSize = 5;
    const spacing = 1.2;

    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let z = -gridSize; z <= gridSize; z += 2) {
        const y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.5;
        n.push([x * spacing * 0.5, y, z * spacing * 0.5]);
      }
    }

    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        const dist = Math.sqrt(
          (n[i][0] - n[j][0]) ** 2 + (n[i][1] - n[j][1]) ** 2 + (n[i][2] - n[j][2]) ** 2
        );
        if (dist < 1.8) {
          e.push({ start: n[i], end: n[j] });
        }
      }
    }
    return { nodes: n, edges: e };
  }, []);

  const lineObjects = useMemo(() => {
    return edges.map((edge) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...edge.start),
        new THREE.Vector3(...edge.end),
      ]);
      return new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.2 })
      );
    });
  }, [edges]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if ((child as THREE.Mesh).isMesh) {
        child.position.y = nodes[i]?.[1] + Math.sin(t * 0.5 + i * 0.3) * 0.15;
      }
    });
    groupRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {lineObjects.map((line, i) => (
        <primitive key={`l-${i}`} object={line} />
      ))}
    </group>
  );
};

const AboutScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#34d399" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#06b6d4" />
        <NetworkGrid />
      </Suspense>
    </Canvas>
  </div>
);

export default AboutScene;
