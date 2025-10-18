// src/operations/Revolve.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class RevolveOperation {
    static revolveProfile(points, segments = 32, thetaStart = 0, thetaLength = Math.PI * 2) {
        const geometry = new THREE.LatheGeometry(
            points,
            segments,
            thetaStart,
            thetaLength
        );
        return geometry;
    }

    static createCylinderProfile(radius, height, segments = 8) {
        const points = [];

        // Create a simple rectangle profile for cylinder
        points.push(new THREE.Vector2(radius, -height / 2));
        points.push(new THREE.Vector2(radius, height / 2));

        return points;
    }

    static createConeProfile(baseRadius, height, segments = 8) {
        const points = [];

        points.push(new THREE.Vector2(baseRadius, -height / 2));
        points.push(new THREE.Vector2(0, height / 2));

        return points;
    }

    static createSphereProfile(radius, segments = 16) {
        const points = [];

        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI;
            const x = Math.sin(angle) * radius;
            const y = Math.cos(angle) * radius;
            points.push(new THREE.Vector2(x, y));
        }

        return points;
    }

    static createVaseProfile(controlPoints, segments = 32) {
        const curve = new THREE.CatmullRomCurve3(
            controlPoints.map(p => new THREE.Vector3(p.x, p.y, 0))
        );

        const points = curve.getPoints(segments).map(p => new THREE.Vector2(p.x, p.y));
        return points;
    }

    static createCustomProfile(points2D) {
        return points2D.map(p => new THREE.Vector2(p.x, p.y));
    }
}
