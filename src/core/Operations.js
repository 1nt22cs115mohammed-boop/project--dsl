// src/core/Operations.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Operations {
    static mergeGeometries(geometries) {
        const merged = new THREE.BufferGeometry();
        const positions = [];
        const normals = [];
        const uvs = [];
        let indexOffset = 0;

        geometries.forEach(geometry => {
            const positionAttribute = geometry.getAttribute('position');
            const normalAttribute = geometry.getAttribute('normal');
            const uvAttribute = geometry.getAttribute('uv');
            const index = geometry.getIndex();

            // Add vertices
            for (let i = 0; i < positionAttribute.count; i++) {
                positions.push(
                    positionAttribute.getX(i),
                    positionAttribute.getY(i),
                    positionAttribute.getZ(i)
                );

                if (normalAttribute) {
                    normals.push(
                        normalAttribute.getX(i),
                        normalAttribute.getY(i),
                        normalAttribute.getZ(i)
                    );
                }

                if (uvAttribute) {
                    uvs.push(
                        uvAttribute.getX(i),
                        uvAttribute.getY(i)
                    );
                }
            }

            // Add indices
            if (index) {
                for (let i = 0; i < index.count; i++) {
                    merged.setIndex(merged.getIndex().concat([index.getX(i) + indexOffset]));
                }
            }

            indexOffset += positionAttribute.count;
        });

        merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        if (normals.length > 0) {
            merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        }
        if (uvs.length > 0) {
            merged.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        }

        return merged;
    }

    static calculateBoundingBox(geometry) {
        geometry.computeBoundingBox();
        return geometry.boundingBox;
    }

    static calculateVolume(geometry) {
        const position = geometry.getAttribute('position');
        const index = geometry.getIndex();
        let volume = 0;

        for (let i = 0; i < index.count; i += 3) {
            const a = index.getX(i);
            const b = index.getX(i + 1);
            const c = index.getX(i + 2);

            const va = new THREE.Vector3(
                position.getX(a), position.getY(a), position.getZ(a)
            );
            const vb = new THREE.Vector3(
                position.getX(b), position.getY(b), position.getZ(b)
            );
            const vc = new THREE.Vector3(
                position.getX(c), position.getY(c), position.getZ(c)
            );

            volume += this.tetrahedronVolume(va, vb, vc);
        }

        return Math.abs(volume);
    }

    static tetrahedronVolume(a, b, c) {
        return a.dot(b.cross(c)) / 6.0;
    }
}
