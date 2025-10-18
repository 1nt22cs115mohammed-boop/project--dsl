// src/operations/Transform.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class TransformOperation {
    static translate(mesh, x, y, z) {
        mesh.position.set(x, y, z);
        return mesh;
    }

    static rotate(mesh, x, y, z) {
        mesh.rotation.set(x, y, z);
        return mesh;
    }

    static scale(mesh, x, y, z) {
        mesh.scale.set(x, y, z);
        return mesh;
    }

    static alignToFace(mesh, faceNormal, upVector = new THREE.Vector3(0, 1, 0)) {
        mesh.lookAt(faceNormal.clone().add(mesh.position));
        return mesh;
    }

    static snapToGrid(mesh, gridSize = 0.1) {
        mesh.position.x = Math.round(mesh.position.x / gridSize) * gridSize;
        mesh.position.y = Math.round(mesh.position.y / gridSize) * gridSize;
        mesh.position.z = Math.round(mesh.position.z / gridSize) * gridSize;
        return mesh;
    }

    static centerGeometry(mesh) {
        mesh.geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        mesh.geometry.boundingBox.getCenter(center);
        mesh.geometry.translate(-center.x, -center.y, -center.z);
        mesh.position.add(center);
        return mesh;
    }

    static createArray(mesh, count, spacing) {
        const group = new THREE.Group();

        for (let i = 0; i < count; i++) {
            const clone = mesh.clone();
            clone.position.x = i * spacing.x;
            clone.position.y = i * spacing.y;
            clone.position.z = i * spacing.z;
            group.add(clone);
        }

        return group;
    }

    static createCircularArray(mesh, count, radius, axis = 'y') {
        const group = new THREE.Group();
        const angleStep = (Math.PI * 2) / count;

        for (let i = 0; i < count; i++) {
            const clone = mesh.clone();
            const angle = i * angleStep;

            switch (axis) {
                case 'x':
                    clone.position.y = Math.cos(angle) * radius;
                    clone.position.z = Math.sin(angle) * radius;
                    break;
                case 'y':
                    clone.position.x = Math.cos(angle) * radius;
                    clone.position.z = Math.sin(angle) * radius;
                    break;
                case 'z':
                    clone.position.x = Math.cos(angle) * radius;
                    clone.position.y = Math.sin(angle) * radius;
                    break;
            }

            group.add(clone);
        }

        return group;
    }

    static mirror(mesh, axis = 'x') {
        const cloned = mesh.clone();

        switch (axis) {
            case 'x':
                cloned.scale.x *= -1;
                break;
            case 'y':
                cloned.scale.y *= -1;
                break;
            case 'z':
                cloned.scale.z *= -1;
                break;
        }

        return cloned;
    }
}
