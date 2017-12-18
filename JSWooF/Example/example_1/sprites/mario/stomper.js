/**
 * Handle stomper stuff for Mario.
 *
 * @module Stomper
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the stomper.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.mario
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};

/**
 * Handle stomper stuff for Mario.
 * @class
 * @classdesc Handle stomper stuff for Mario.
 */
export default JSWooF.Example.example_1.sprites.mario.Stomper = class extends Trait {
    /**
     * Initialize the stomper trait.
     * @constructs Stomper
     */
    constructor() {
        super("stomper");
        
        this.queueBounce = false;
    }
    
    /**
     * Enable a bounce after stomping something.
     * @function bounce
     */
    bounce() {
        this.queueBounce = true;
    }
    
    /**
     * Update the stomper trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity) {
        if (entity.stomper.queueBounce) {
            entity.vel.Y = -300;
            entity.stomper.queueBounce = false;
        }
        
    }
};