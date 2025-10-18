// src/core/Utilities.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Utilities {
    static createMaterial(type = 'standard', options = {}) {
        const defaultOptions = {
            color: 0x888888,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
            ...options
        };

        switch (type) {
            case 'basic':
                return new THREE.MeshBasicMaterial(defaultOptions);
            case 'phong':
                return new THREE.MeshPhongMaterial(defaultOptions);
            case 'physical':
                return new THREE.MeshPhysicalMaterial(defaultOptions);
            case 'wireframe':
                return new THREE.MeshBasicMaterial({
                    wireframe: true,
                    color: 0x000000
                });
            default:
                return new THREE.MeshStandardMaterial(defaultOptions);
        }
    }

    static generateUVs(geometry) {
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        const size = new THREE.Vector3();
        bbox.getSize(size);

        const position = geometry.getAttribute('position');
        const uvs = [];

        for (let i = 0; i < position.count; i++) {
            const x = position.getX(i);
            const y = position.getY(i);
            const z = position.getZ(i);

            // Simple planar projection
            const u = (x - bbox.min.x) / size.x;
            const v = (y - bbox.min.y) / size.y;
            uvs.push(u, v);
        }

        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        return geometry;
    }

    static snapToGrid(value, gridSize = 0.1) {
        return Math.round(value / gridSize) * gridSize;
    }

    static degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    static radToDeg(radians) {
        return radians * (180 / Math.PI);
    }

    static createGridHelper(size = 10, divisions = 10, color1 = 0x444444, color2 = 0x888888) {
        const gridHelper = new THREE.GridHelper(size, divisions, color1, color2);
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.5;
        return gridHelper;
    }

    static createAxisHelper(size = 1) {
        const axesHelper = new THREE.AxesHelper(size);
        return axesHelper;
    }
}
