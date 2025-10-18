// src/primitives/Window.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Window {
    constructor(options = {}) {
        this.options = {
            width: 1.2,
            height: 1.5,
            frameWidth: 0.05,
            frameDepth: 0.1,
            paneThickness: 0.02,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            frameMaterial: { color: 0x8B4513 },
            glassMaterial: {
                color: 0x87CEEB,
                transparent: true,
                opacity: 0.3
            },
            ...options
        };

        this.mesh = null;
    }

    generate() {
        const group = new THREE.Group();

        // Window frame
        const frameGroup = this.createFrame();
        group.add(frameGroup);

        // Glass panes
        const glassGroup = this.createGlass();
        group.add(glassGroup);

        group.position.set(...this.options.position);
        group.rotation.set(...this.options.rotation);

        group.userData = {
            type: 'window',
            dimensions: this.options
        };

        this.mesh = group;
        return this.mesh;
    }

    createFrame() {
        const frameGroup = new THREE.Group();
        const frameMaterial = new THREE.MeshStandardMaterial(this.options.frameMaterial);

        // Horizontal frames
        const topFrame = new THREE.Mesh(
            new THREE.BoxGeometry(this.options.width, this.options.frameWidth, this.options.frameDepth),
            frameMaterial
        );
        topFrame.position.y = this.options.height / 2 - this.options.frameWidth / 2;

        const bottomFrame = new THREE.Mesh(
            new THREE.BoxGeometry(this.options.width, this.options.frameWidth, this.options.frameDepth),
            frameMaterial
        );
        bottomFrame.position.y = -this.options.height / 2 + this.options.frameWidth / 2;

        // Vertical frames
        const leftFrame = new THREE.Mesh(
            new THREE.BoxGeometry(this.options.frameWidth, this.options.height, this.options.frameDepth),
            frameMaterial
        );
        leftFrame.position.x = -this.options.width / 2 + this.options.frameWidth / 2;

        const rightFrame = new THREE.Mesh(
            new THREE.BoxGeometry(this.options.frameWidth, this.options.height, this.options.frameDepth),
            frameMaterial
        );
        rightFrame.position.x = this.options.width / 2 - this.options.frameWidth / 2;

        frameGroup.add(topFrame, bottomFrame, leftFrame, rightFrame);

        return frameGroup;
    }

    createGlass() {
        const glassGroup = new THREE.Group();
        const glassMaterial = new THREE.MeshPhysicalMaterial(this.options.glassMaterial);

        const glassWidth = this.options.width - this.options.frameWidth * 2;
        const glassHeight = this.options.height - this.options.frameWidth * 2;

        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(glassWidth, glassHeight, this.options.paneThickness),
            glassMaterial
        );
        glass.position.z = this.options.frameDepth / 2 - this.options.paneThickness / 2;

        glassGroup.add(glass);
        return glassGroup;
    }

    createWindowOpening() {
        // Returns a shape that can be used for boolean operations with walls
        const shape = new THREE.Shape();
        const halfWidth = this.options.width / 2;
        const halfHeight = this.options.height / 2;

        shape.moveTo(-halfWidth, -halfHeight);
        shape.lineTo(halfWidth, -halfHeight);
        shape.lineTo(halfWidth, halfHeight);
        shape.lineTo(-halfWidth, halfHeight);
        shape.lineTo(-halfWidth, -halfHeight);

        return {
            shape: shape,
            depth: this.options.frameDepth + 0.1, // Extra depth for the opening
            position: new THREE.Vector3(...this.options.position)
        };
    }
}
