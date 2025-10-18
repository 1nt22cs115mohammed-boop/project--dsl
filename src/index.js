// src/index.js
// Core classes
export { GeometryBuilder } from './core/GeometryBuilder.js';
export { Operations } from './core/Operations.js';
export { Utilities } from './core/Utilities.js';

// Primitive classes
export { Wall } from './primitives/Wall.js';
export { Pyramid } from './primitives/Pyramid.js';
export { Chimney } from './primitives/Chimney.js';
export { Window } from './primitives/Window.js';

// Operation classes
export { ExtrudeOperation } from './operations/Extrude.js';
export { RevolveOperation } from './operations/Revolve.js';
export { BooleanOperation } from './operations/Boolean.js';
export { TransformOperation } from './operations/Transform.js';

// Convenience functions
export function createCADBuilder() {
    return new GeometryBuilder();
}

export function createWall(options) {
    return new Wall(options).generate();
}

export function createPyramid(options) {
    return new Pyramid(options).generate();
}

export function createChimney(options) {
    return new Chimney(options).generate();
}

export function createWindow(options) {
    return new Window(options).generate();
}

// Version info
export const VERSION = '1.0.0';
export const THREEJS_MIN_VERSION = '0.158.0';
