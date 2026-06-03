"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function AtmosphericFog() {
  const { scene } = useThree();

  useEffect(() => {
    // Exponential fog — dusk colour matching --dusk CSS token
    scene.fog = new THREE.FogExp2(0x1a1040, 0.018);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}