import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// 4-phase breathing cycle (4.5 s)
function breathCycle(t: number): number {
  const p = (t % 4.5) / 4.5;
  if (p < 0.38) return p / 0.38;
  if (p < 0.50) return 1.0;
  if (p < 0.88) return 1.0 - (p - 0.50) / 0.38;
  return 0.0;
}

// Build cylinder mesh between two 3-D points
function makeTube(
  from: THREE.Vector3,
  to: THREE.Vector3,
  r: number,
  color: string,
  opacity: number
): THREE.Mesh {
  const dir = to.clone().sub(from);
  const len = dir.length();
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(r * 0.9, r, len, 8),
    new THREE.MeshStandardMaterial({
      color, emissive: color,
      emissiveIntensity: 0.60,
      transparent: true, opacity, roughness: 0.28,
    })
  );
  mesh.position.copy(mid);
  mesh.quaternion.copy(quat);
  return mesh;
}

// Generate nodes scattered inside an ellipsoidal lung volume
function genLungNodes(
  cx: number,
  rx: number, ry: number, rz: number,
  count: number,
  cardiacNotch: boolean
): [number, number, number][] {
  const pts: [number, number, number][] = [];
  let tries = 0;
  while (pts.length < count && tries < count * 8) {
    tries++;
    const x = (Math.random() * 2 - 1) * rx;
    const y = (Math.random() * 2 - 1) * ry;
    const z = (Math.random() * 2 - 1) * rz;
    // Inside ellipsoid check
    if ((x/rx)*(x/rx) + (y/ry)*(y/ry) + (z/rz)*(z/rz) > 1.0) continue;
    // Cardiac notch on left lung (medial edge, mid-height)
    if (cardiacNotch && x > rx * 0.40 && y > -ry * 0.25 && y < ry * 0.55) continue;
    pts.push([cx + x, y, z]);
  }
  return pts;
}

const Lungs = () => {
  const groupRef   = useRef<THREE.Group>(null);
  const nodeMeshes = useRef<THREE.Mesh[]>([]);
  const diaphRef   = useRef<THREE.Mesh>(null);

  const { lungNodes, bronchialMeshes, vesselLines } = useMemo(() => {
    // ── NODE CLOUDS: 3D points scattered inside each lung volume ──
    const leftNodes  = genLungNodes(-0.78, 0.50, 0.84, 0.36, 160, true);
    const rightNodes = genLungNodes( 0.78, 0.56, 0.84, 0.38, 180, false);
    const allNodes = [
      ...leftNodes.map(p => ({ pos: p, side: "L" as const })),
      ...rightNodes.map(p => ({ pos: p, side: "R" as const })),
    ];

    // ── VESSEL LINES between close nodes ──
    const vlines: THREE.Line[] = [];
    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        // Only connect same-side nodes
        if (allNodes[i].side !== allNodes[j].side) continue;
        const d = Math.hypot(
          allNodes[i].pos[0] - allNodes[j].pos[0],
          allNodes[i].pos[1] - allNodes[j].pos[1],
          allNodes[i].pos[2] - allNodes[j].pos[2]
        );
        if (d < 0.24 && Math.random() > 0.82) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...allNodes[i].pos),
            new THREE.Vector3(...allNodes[j].pos),
          ]);
          vlines.push(new THREE.Line(geo,
            new THREE.LineBasicMaterial({
              color: "#22d3ee", transparent: true, opacity: 0.07,
            })
          ));
        }
      }
    }

    // ── BRONCHIAL TREE ──
    type Seg = { from: THREE.Vector3; to: THREE.Vector3; r: number; color: string; opacity: number };
    const segs: Seg[] = [
      // Trachea
      { from: new THREE.Vector3(0, 1.10, 0.06), to: new THREE.Vector3(0, 0.38, 0.04), r: 0.056, color: "#075985", opacity: 0.88 },
      // Left main bronchus
      { from: new THREE.Vector3(0, 0.38, 0.04), to: new THREE.Vector3(-0.52, 0.14, 0.04), r: 0.040, color: "#0369a1", opacity: 0.82 },
      // Right main bronchus
      { from: new THREE.Vector3(0, 0.38, 0.04), to: new THREE.Vector3(0.46, 0.20, 0.04), r: 0.040, color: "#0369a1", opacity: 0.82 },
      // Left lobar
      { from: new THREE.Vector3(-0.52, 0.14, 0.04), to: new THREE.Vector3(-0.72, 0.46, 0.03), r: 0.026, color: "#0284c7", opacity: 0.74 },
      { from: new THREE.Vector3(-0.52, 0.14, 0.04), to: new THREE.Vector3(-0.66, -0.20, 0.03), r: 0.024, color: "#0284c7", opacity: 0.72 },
      // Right lobar
      { from: new THREE.Vector3(0.46, 0.20, 0.04), to: new THREE.Vector3(0.64, 0.50, 0.03), r: 0.026, color: "#0284c7", opacity: 0.74 },
      { from: new THREE.Vector3(0.46, 0.20, 0.04), to: new THREE.Vector3(0.60, 0.06, 0.03), r: 0.022, color: "#0284c7", opacity: 0.70 },
      { from: new THREE.Vector3(0.46, 0.20, 0.04), to: new THREE.Vector3(0.56, -0.22, 0.03), r: 0.022, color: "#0284c7", opacity: 0.70 },
      // Left segmental
      { from: new THREE.Vector3(-0.72, 0.46, 0.03), to: new THREE.Vector3(-0.86, 0.64, 0.0),  r: 0.016, color: "#0ea5e9", opacity: 0.64 },
      { from: new THREE.Vector3(-0.72, 0.46, 0.03), to: new THREE.Vector3(-0.92, 0.36, 0.0),  r: 0.014, color: "#0ea5e9", opacity: 0.60 },
      { from: new THREE.Vector3(-0.66, -0.20, 0.03), to: new THREE.Vector3(-0.80, -0.42, 0.0), r: 0.016, color: "#0ea5e9", opacity: 0.62 },
      { from: new THREE.Vector3(-0.66, -0.20, 0.03), to: new THREE.Vector3(-0.74, -0.08, 0.10), r: 0.013, color: "#38bdf8", opacity: 0.55 },
      // Right segmental
      { from: new THREE.Vector3(0.64, 0.50, 0.03), to: new THREE.Vector3(0.82, 0.66, 0.0),  r: 0.016, color: "#0ea5e9", opacity: 0.64 },
      { from: new THREE.Vector3(0.64, 0.50, 0.03), to: new THREE.Vector3(0.90, 0.40, 0.0),  r: 0.014, color: "#0ea5e9", opacity: 0.60 },
      { from: new THREE.Vector3(0.60, 0.06, 0.03), to: new THREE.Vector3(0.82, 0.14, 0.0),  r: 0.013, color: "#38bdf8", opacity: 0.58 },
      { from: new THREE.Vector3(0.56, -0.22, 0.03), to: new THREE.Vector3(0.76, -0.42, 0.0), r: 0.015, color: "#0ea5e9", opacity: 0.60 },
      { from: new THREE.Vector3(0.56, -0.22, 0.03), to: new THREE.Vector3(0.70, -0.10, 0.10), r: 0.012, color: "#38bdf8", opacity: 0.54 },
      // Sub-segmental tips
      { from: new THREE.Vector3(-0.86, 0.64, 0.0), to: new THREE.Vector3(-0.94, 0.78, 0.04), r: 0.009, color: "#7dd3fc", opacity: 0.50 },
      { from: new THREE.Vector3(-0.80, -0.42, 0.0), to: new THREE.Vector3(-0.88, -0.60, 0.05), r: 0.009, color: "#7dd3fc", opacity: 0.48 },
      { from: new THREE.Vector3(0.82, 0.66, 0.0), to: new THREE.Vector3(0.92, 0.80, 0.04),  r: 0.009, color: "#7dd3fc", opacity: 0.50 },
      { from: new THREE.Vector3(0.76, -0.42, 0.0), to: new THREE.Vector3(0.86, -0.60, 0.05), r: 0.009, color: "#7dd3fc", opacity: 0.48 },
    ];

    const bronchialMeshes = segs.map(s => makeTube(s.from, s.to, s.r, s.color, s.opacity));
    return { lungNodes: allNodes, bronchialMeshes, vesselLines: vlines };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const b = breathCycle(t);

    // Slow rotation to show 3D depth
    groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.25;

    // Animate nodes
    nodeMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.32 + b * 0.52 + Math.sin(t * 1.1 + i * 0.13) * 0.10;
    });

    // Diaphragm descends on inhale
    if (diaphRef.current) {
      diaphRef.current.position.y = -0.88 - b * 0.09;
      (diaphRef.current.material as THREE.MeshStandardMaterial).opacity = 0.18 + b * 0.10;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.06, 0]}>

      {/* 3-D node cloud — same approach as heart/brain */}
      {lungNodes.map((n, i) => (
        <mesh key={`ln-${i}`} position={n.pos}
          ref={(el) => { if (el) nodeMeshes.current[i] = el; }}>
          <sphereGeometry args={[0.026, 7, 7]} />
          <meshStandardMaterial
            color={n.side === "L" ? "#22d3ee" : "#38bdf8"}
            emissive={n.side === "L" ? "#0891b2" : "#0ea5e9"}
            emissiveIntensity={0.35}
            transparent opacity={0.70}
            roughness={0.28} metalness={0.14}
          />
        </mesh>
      ))}

      {/* Pulmonary vessel lines */}
      {vesselLines.map((v, i) => <primitive key={`vl-${i}`} object={v} />)}

      {/* Bronchial tree */}
      {bronchialMeshes.map((m, i) => <primitive key={`br-${i}`} object={m} />)}

      {/* Carina (bifurcation node) */}
      <mesh position={[0, 0.38, 0.04]}>
        <sphereGeometry args={[0.064, 10, 10]} />
        <meshStandardMaterial color="#075985" emissive="#0369a1"
          emissiveIntensity={0.70} transparent opacity={0.85} roughness={0.28} />
      </mesh>

      {/* Diaphragm dome */}
      <mesh ref={diaphRef} position={[0, -0.88, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1.12, 22, 10, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <meshStandardMaterial
          color="#0c4a6e" emissive="#0369a1"
          emissiveIntensity={0.22} transparent opacity={0.20}
          roughness={0.5} side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ambient glow halos */}
      <mesh position={[-0.78, 0, 0]}>
        <sphereGeometry args={[0.76, 12, 12]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee"
          emissiveIntensity={1} transparent opacity={0.028}
          side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <mesh position={[0.78, 0, 0]}>
        <sphereGeometry args={[0.82, 12, 12]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8"
          emissiveIntensity={1} transparent opacity={0.028}
          side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
};

const PartnersScene = () => (
  <div className="w-full h-[300px]">
    <Canvas
      camera={{ position: [0, 0.15, 3.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.07} />
        <pointLight position={[3, 3, 3]}   intensity={1.3} color="#22d3ee" />
        <pointLight position={[-3, 1, -3]} intensity={0.55} color="#0ea5e9" />
        <pointLight position={[0, -3, 2]}  intensity={0.30} color="#0284c7" />
        <Lungs />
      </Suspense>
    </Canvas>
  </div>
);

export default PartnersScene;
