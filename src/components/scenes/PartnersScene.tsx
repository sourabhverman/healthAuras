import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Lungs = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { leftLung, rightLung, bronchi } = useMemo(() => {
    const left: [number, number, number][] = [];
    const right: [number, number, number][] = [];
    const b: { start: [number, number, number]; end: [number, number, number] }[] = [];

    // Generate lung shapes (ellipsoidal clusters)
    const genLung = (offsetX: number, arr: [number, number, number][]) => {
      for (let i = 0; i < 100; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const rx = 0.6 + Math.random() * 0.1;
        const ry = 1.0 + Math.random() * 0.1;
        const rz = 0.5 + Math.random() * 0.1;
        const x = rx * Math.sin(phi) * Math.cos(theta) + offsetX;
        const y = ry * Math.cos(phi) * 0.8;
        const z = rz * Math.sin(phi) * Math.sin(theta);
        arr.push([x, y, z]);
      }
    };

    genLung(-0.8, left);
    genLung(0.8, right);

    // Bronchial tree
    const branchPoints: [number, number, number][] = [
      [0, 1.2, 0], // trachea top
      [0, 0.6, 0], // split point
      [-0.4, 0.2, 0], // left branch
      [0.4, 0.2, 0],  // right branch
      [-0.6, -0.2, 0],
      [-0.3, -0.3, 0.1],
      [0.6, -0.2, 0],
      [0.3, -0.3, 0.1],
      [-0.7, -0.5, -0.1],
      [0.7, -0.5, -0.1],
    ];

    const connections = [[0,1],[1,2],[1,3],[2,4],[2,5],[3,6],[3,7],[4,8],[6,9]];
    connections.forEach(([a, c]) => {
      b.push({ start: branchPoints[a], end: branchPoints[c] });
    });

    return { leftLung: left, rightLung: right, bronchi: b };
  }, []);

  const bronchiLines = useMemo(() => {
    return bronchi.map((br) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...br.start),
        new THREE.Vector3(...br.end),
      ]);
      return new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: "#06b6d4", transparent: true, opacity: 0.5 })
      );
    });
  }, [bronchi]);

  // Alveoli connections within each lung
  const alveoli = useMemo(() => {
    const lines: THREE.Line[] = [];
    const allNodes = [...leftLung, ...rightLung];
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        const dist = Math.sqrt(
          (allNodes[i][0] - allNodes[j][0]) ** 2 +
          (allNodes[i][1] - allNodes[j][1]) ** 2 +
          (allNodes[i][2] - allNodes[j][2]) ** 2
        );
        if (dist < 0.25 && Math.random() > 0.85) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...allNodes[i]),
            new THREE.Vector3(...allNodes[j]),
          ]);
          lines.push(
            new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.06 }))
          );
        }
      }
    }
    return lines;
  }, [leftLung, rightLung]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;

    // Breathing animation
    const breath = 1 + Math.sin(t * 0.8) * 0.05;
    groupRef.current.scale.set(breath, 1 + Math.sin(t * 0.8) * 0.03, breath);
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Left lung */}
      {leftLung.map((pos, i) => (
        <mesh key={`l-${i}`} position={pos}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Right lung */}
      {rightLung.map((pos, i) => (
        <mesh key={`r-${i}`} position={pos}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Trachea */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 12]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} transparent opacity={0.4} />
      </mesh>

      {bronchiLines.map((line, i) => (
        <primitive key={`b-${i}`} object={line} />
      ))}

      {alveoli.map((line, i) => (
        <primitive key={`a-${i}`} object={line} />
      ))}
    </group>
  );
};

const PartnersScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 0.5, 3.5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={0.7} color="#06b6d4" />
        <pointLight position={[-3, -1, -3]} intensity={0.4} color="#34d399" />
        <Lungs />
      </Suspense>
    </Canvas>
  </div>
);

export default PartnersScene;
