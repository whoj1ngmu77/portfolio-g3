"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";
import type { DeviceCapability } from "@/app/types";

interface CloudProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  opacity: number;
}

interface CloudLayerProps {
  capability: DeviceCapability;
}

function Cloud({ position, scale, speed, opacity }: CloudProps) {
  const groupRef = useRef<Group>(null);
  const startX = useRef(position[0]);
  const elapsed = useRef(Math.random() * 100);

  // Shared billboard geometry
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 0.5), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xc4b0e8,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [opacity]
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta * speed;
    // Drift across — reset when off screen
    const drift = (elapsed.current % 30) / 30;
    groupRef.current.position.x = startX.current + drift * 18 - 9;
    // Billboard — always face camera
    groupRef.current.quaternion.copy(state.camera.quaternion);
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Three overlapping planes per cloud for soft shape */}
      <mesh geometry={geometry} material={material} />
      <mesh
        geometry={geometry}
        material={material}
        position={[0.4, 0.1, 0]}
        scale={[0.7, 0.7, 1]}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={[-0.3, 0.08, 0]}
        scale={[0.6, 0.6, 1]}
      />
    </group>
  );
}

export default function CloudLayer({ capability }: CloudLayerProps) {
  const cloudCount = capability === "medium" ? 5 : 8;

  const clouds: CloudProps[] = useMemo(() => {
    const base: CloudProps[] = [
      { position: [-6,  1.5, -4], scale: 1.4, speed: 0.18, opacity: 0.10 },
      { position: [ 4,  2.2, -5], scale: 1.8, speed: 0.12, opacity: 0.08 },
      { position: [-3,  0.8, -3], scale: 1.0, speed: 0.22, opacity: 0.09 },
      { position: [ 7,  1.2, -6], scale: 2.2, speed: 0.09, opacity: 0.07 },
      { position: [-8,  1.8, -5], scale: 1.6, speed: 0.14, opacity: 0.08 },
      { position: [ 2,  3.0, -7], scale: 2.5, speed: 0.07, opacity: 0.06 },
      { position: [-4,  0.5, -2], scale: 0.9, speed: 0.25, opacity: 0.07 },
      { position: [ 5,  0.9, -3], scale: 1.1, speed: 0.20, opacity: 0.09 },
    ];
    return base.slice(0, cloudCount);
  }, [cloudCount]);

  // Below-island mist plane
  const mistMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x2d1b69,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <group>
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
      {/* Mist sheet below island */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[40, 40]} />
        <primitive object={mistMaterial} attach="material" />
      </mesh>
    </group>
  );
}