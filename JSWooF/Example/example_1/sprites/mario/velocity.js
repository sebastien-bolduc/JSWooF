/**
 * Handle velocity stuff for Mario.
 *
 * @module Velocity
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the velocity.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.mario
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};

/**
 * Handle velocity stuff for Mario.
 * @class
 * @classdesc Handle velocity stuff for Mario.
 */
export default JSWooF.Example.example_1.sprites.mario.Velocity = class extends Trait {
    /**
     * Initialize the velocity trait.
     * @constructs Velocity
     */
    constructor() {
        super("velocity");
    }
    
    /**
     * Update the velocity trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
        entity.lastPos.X = entity.pos.X;            // For collision detection
        entity.lastPos.Y = entity.pos.Y;
        
        entity.pos.X += entity.vel.X * targetElapsedTime;
        entity.pos.Y += entity.vel.Y * targetElapsedTime;
    }
};