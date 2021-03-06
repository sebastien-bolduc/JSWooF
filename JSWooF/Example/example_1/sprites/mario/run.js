/**
 * Handle run stuff for Mario.
 *
 * @module Run
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the run.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.mario
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};

/**
 * Handle run stuff for Mario.
 * @class
 * @classdesc Handle run stuff for Mario.
 */
export default JSWooF.Example.example_1.sprites.mario.Run = class extends Trait {
    /**
     * Initialize the jump trait.
     * @constructs Run
     */
    constructor() {
        super("run");
        
        this.direction = 0;
        this.distance = 0;
        
        this.acceleration = 400;
        this.deceleration = 300;
        this.dragFactor = 1/5000;
        
        this.isRunning = false;
    }
    
    /**
     * Update the run trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
        const absVelocityX = Math.abs(entity.vel.X);
        
        if (entity.run.direction != 0) {
            entity.vel.X += entity.run.acceleration * entity.run.direction * targetElapsedTime;
            entity.run.isRunning = true;
        } else if (entity.vel.X != 0) {
            const decel = Math.min(absVelocityX, entity.run.deceleration * targetElapsedTime);
            entity.vel.X += entity.vel.X > 0 ? -decel : decel;
        } else {
            entity.run.distance = 0;
            entity.run.isRunning = false;
        }
        
        const drag = entity.run.dragFactor * entity.vel.X * absVelocityX;
        entity.vel.X -= drag;
        
        entity.run.distance += absVelocityX * targetElapsedTime;
    }
};