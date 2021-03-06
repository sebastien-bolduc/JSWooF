/**
 * Handle walk stuff for Koopa.
 *
 * @module Walk
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the walk.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.enemies.koopa
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.enemies = JSWooF.Example.example_1.sprites.enemies || {};
JSWooF.Example.example_1.sprites.enemies.koopa = JSWooF.Example.example_1.sprites.enemies.koopa || {};

/**
 * Handle walk stuff for Koopa.
 * @class
 * @classdesc Handle walk stuff for Koopa.
 */
export default JSWooF.Example.example_1.sprites.enemies.koopa.Walk = class extends Trait {
    /**
     * Initialize the walk trait.
     * @constructs Walk
     */
    constructor() {
        super("walk");
        
        this.direction = 1;
        this.velocity = 1500;
        this.velocityBoost = 1;
    }
    
    /**
     * Update the walk trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
        entity.vel.X = entity.walk.velocity * this.velocityBoost * targetElapsedTime * entity.walk.direction;
    }
};