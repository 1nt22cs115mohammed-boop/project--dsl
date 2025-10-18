// src/primitives/Pyramid.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Pyramid {
    constructor(options = {}) {
        this.options = {
            baseSize: 2,
            height: 1,
            segments: 4,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            material: { color: 0xFFD700 },
            ...options
        };

        this.mesh = null;
    }

    generate() {
        const geometry = new THREE.ConeGeometry(
            this.options.baseSize / 2,
            this.options.height,
            this.options.segments
        );

        const material = new THREE.MeshStandardMaterial(this.options.material);
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.position.set(...this.options.position);
        this.mesh.rotation.set(...this.options.rotation);

        this.mesh.userData = {
            type: 'pyramid',
            dimensions: {
                baseSize: this.options.baseSize,
                height: this.options.height
            }
        };

        return this.mesh;
    }

    setBaseSize(size) {
        this.options.baseSize = size;
        return this.regenerate();
    }

    setHeight(height) {
        this.options.height = height;
        return this.regenerate();
    }

    regenerate() {
        if (this.mesh && this.mesh.parent) {
            this.mesh.parent.remove(this.mesh);
        }
        return this.generate();
    }
}
