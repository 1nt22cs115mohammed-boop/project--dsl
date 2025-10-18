// src/primitives/Chimney.js
export class Chimney {
    constructor(options = {}) {
        this.options = {
            width: 1,
            height: 3,
            depth: 1,
            thickness: 0.1,
            ...options
        };
    }

    generate() {
        const group = new THREE.Group();

        // Main chimney body
        const bodyGeometry = new THREE.BoxGeometry(
            this.options.width,
            this.options.height,
            this.options.depth
        );
        const body = new THREE.Mesh(bodyGeometry, this.getMaterial());
        group.add(body);

        // Chimney hole
        const holeGeometry = new THREE.BoxGeometry(
            this.options.width - this.options.thickness * 2,
            this.options.height,
            this.options.depth - this.options.thickness * 2
        );
        const hole = new THREE.Mesh(holeGeometry);
        hole.position.y = this.options.height / 2;

        // Use CSG for boolean operation (you'll need a Three.js CSG library)
        // const chimney = THREE.CSG.subtract(body, hole);

        return group;
    }
}
