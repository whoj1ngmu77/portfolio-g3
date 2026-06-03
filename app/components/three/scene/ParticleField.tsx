"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Points } from "three";
import type { DeviceCapability } from "@/app/types";

interface ParticleFieldProps {
  capability: DeviceCapability;
}

export default function ParticleField({ capability }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);
  const count = capability === "medium" ? 400 : 800;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;  // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;   // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;  // z
      spd[i] = 0.0002 + Math.random() * 0.0004;
    }

    return { positions: pos, speeds: spd };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0xc4b0e8,
        size: 0.03,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      // Drift upward slowly
      let y = pos.getY(i) + speeds[i];
      // Wrap at top
      if (y > 4) y = -4;
      pos.setY(i, y);

      // Gentle horizontal drift
      let x = pos.getX(i) + Math.sin(Date.now() * 0.0001 + i) * 0.0005;
      pos.setX(i, x);
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}