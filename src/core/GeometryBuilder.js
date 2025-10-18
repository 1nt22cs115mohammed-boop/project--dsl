// src/core/GeometryBuilder.js
export class GeometryBuilder {
    constructor() {
        this.mesh = new THREE.Group();
        this.materials = new Map();
    }

    createWall(width, height, depth, position = [0, 0, 0]) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = this.getMaterial('wall');
        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(...position);
        this.mesh.add(wall);
        return wall;
    }

    createPyramid(baseSize, height, position = [0, 0, 0]) {
        const geometry = new THREE.ConeGeometry(baseSize / 2, height, 4);
        const material = this.getMaterial('pyramid');
        const pyramid = new THREE.Mesh(geometry, material);
        pyramid.position.set(...position);
        this.mesh.add(pyramid);
        return pyramid;
    }
}
