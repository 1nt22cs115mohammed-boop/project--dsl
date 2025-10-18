// src/primitives/Wall.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Wall {
    constructor(options = {}) {
        this.options = {
            width: 4,
            height: 3,
            depth: 0.2,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            material: { color: 0xC4A484 },
            ...options
        };

        this.mesh = null;
        this.openings = [];
    }

    generate() {
        const geometry = new THREE.BoxGeometry(
            this.options.width,
            this.options.height,
            this.options.depth
        );

        const material = new THREE.MeshStandardMaterial(this.options.material);
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.position.set(...this.options.position);
        this.mesh.rotation.set(...this.options.rotation);

        this.mesh.userData = {
            type: 'wall',
            dimensions: {
                width: this.options.width,
                height: this.options.height,
                depth: this.options.depth
            },
            openings: this.openings
        };

        return this.mesh;
    }

    addOpening(shape, position, depth = 0.3) {
        this.openings.push({ shape, position, depth });

        // For now, just mark the opening - actual boolean operations would need CSG
        const openingHelper = new THREE.Mesh(
            new THREE.BoxGeometry(shape.width, shape.height, depth),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            })
        );

        openingHelper.position.set(
            position.x,
            position.y,
            position.z
        );

        this.mesh.add(openingHelper);

        return this;
    }

    getDimensions() {
        return this.options;
    }
}
