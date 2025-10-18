// src/operations/Extrude.js
export class ExtrudeOperation {
    static extrudeShape(shape, depth, curvePath = null) {
        const extrudeSettings = {
            depth: depth,
            bevelEnabled: false
        };

        if (curvePath) {
            extrudeSettings.extrudePath = curvePath;
        }

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        return geometry;
    }

    static createWindowShape(width, height, thickness) {
        const shape = new THREE.Shape();
        // Define window shape points
        shape.moveTo(0, 0);
        shape.lineTo(width, 0);
        shape.lineTo(width, height);
        shape.lineTo(0, height);
        shape.lineTo(0, 0);

        // Add window frame details
        const hole = new THREE.Path();
        hole.moveTo(thickness, thickness);
        hole.lineTo(width - thickness, thickness);
        hole.lineTo(width - thickness, height - thickness);
        hole.lineTo(thickness, height - thickness);
        hole.lineTo(thickness, thickness);
        shape.holes.push(hole);

        return shape;
    }
}
