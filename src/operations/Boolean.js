// src/operations/Boolean.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class BooleanOperation {
    // Note: Three.js doesn't have built-in CSG operations
    // This is a placeholder that would integrate with a CSG library
    // You'll need to include three-csg-ts or similar

    static async subtract(meshA, meshB) {
        // This would use an external CSG library
        console.warn('Boolean operations require a CSG library like three-csg-ts');
        console.warn('Install: npm install three-csg-ts');

        // Placeholder implementation
        return meshA.clone();
    }

    static mergeMeshes(meshes) {
        const material = meshes[0].material;

        // Simple geometry merging (no boolean operations)
        const geometries = meshes.map(mesh => mesh.geometry);
        const mergedGeometry = mergeGeometries(geometries, false); // useGroups = false

        return new THREE.Mesh(mergedGeometry, material);
    }


    static async union(meshA, meshB) {
        console.warn('Boolean operations require a CSG library like three-csg-ts');
        return meshA.clone();
    }

    static async intersect(meshA, meshB) {
        console.warn('Boolean operations require a CSG library like three-csg-ts');
        return meshA.clone();
    }

    // Alternative approach using geometry merging (not true boolean)

}
