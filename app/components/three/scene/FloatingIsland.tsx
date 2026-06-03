"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Mesh } from "three";

export default function FloatingIsland() {
  const islandRef = useRef<Mesh>(null);
  const rootsRef = useRef<Mesh>(null);

  // Slow breathing motion
  useFrame((_, delta) => {
    if (islandRef.current) {
      islandRef.current.position.y =
        Math.sin(Date.now() * 0.0004) * 0.08;
    }
    if (rootsRef.current) {
      rootsRef.current.position.y =
        Math.sin(Date.now() * 0.0004) * 0.08 - 0.55;
    }
  });

  // Island top surface — slightly displaced plane vertices
  const topGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(3.2, 3.6, 0.35, 16, 3);
    // Displace top vertices slightly for organic feel
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0) {
        pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.18);
        pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.18);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Under-island tapered base
  const baseGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(2.2, 0.8, 1.2, 12);
  }, []);

  // Hanging root tendrils — thin cylinders
  const rootGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.05, 0.02, 1.4, 5);
  }, []);

  const rootPositions: [number, number, number][] = useMemo(() => {
    return [
      [-1.2, 0, -0.4],
      [0.6, 0, -0.8],
      [1.4, 0, 0.3],
      [-0.4, 0, 0.9],
      [0.0, 0, -0.2],
      [-1.6, 0, 0.6],
      [1.0, 0, 0.8],
    ];
  }, []);

  return (
    <group position={[0, -0.6, 0]}>
      {/* Main island body */}
      <mesh
        ref={islandRef}
        geometry={topGeometry}
        castShadow={false}
        receiveShadow={false}
      >
        <meshLambertMaterial color={0x2d1b69} />
      </mesh>

      {/* Tapered base */}
      <mesh position={[0, -0.72, 0]} geometry={baseGeometry}>
        <meshLambertMaterial color={0x1a1040} />
      </mesh>

      {/* Ground surface colour */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[3.15, 3.15, 0.05, 16]} />
        <meshLambertMaterial color={0x4ecdc4} transparent opacity={0.12} />
      </mesh>

      {/* Hanging roots */}
      {rootPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={i === 0 ? rootsRef : undefined}
          position={[pos[0], -1.1, pos[2]]}
          geometry={rootGeometry}
        >
          <meshLambertMaterial color={0x2d1b69} />
        </mesh>
      ))}
    </group>
  );
}