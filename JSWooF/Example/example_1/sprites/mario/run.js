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
        this.velocity = 5000;
    }
    
    /**
     * Update the run trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
        entity.vel.X = this.velocity * this.direction * targetElapsedTime;
    }
};