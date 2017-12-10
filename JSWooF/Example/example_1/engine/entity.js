/**
 * Handle entity stuff.
 *
 * @module Entity
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Vector2 from "/JSWooF/Framework/GameFolder/vector2.js";
 
/**
 * Namespace for the entity.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle entity stuff.
 * @class
 * @classdesc Handle entity stuff for the game.
 */
export default JSWooF.Example.example_1.engine.Entity = class {
    /**
     * Initialize the attribut of the entity.
     * @constructs Entity
     */
    constructor() {
        this.pos = new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        this.size = new Vector2(0, 0);
        
        this.lastPos = new Vector2(0, 0);            // For collision detection
        
        this.traits = [];
    }
    
    /**
     * Add a trait to the entity.
     * @function addTrait
     * @param {Trait} trait - Trait to add.
     */
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.name] = trait;
    }
    
    /**
     * Update entity.
     * @function update
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(targetElapsedTime) {
        this.traits.forEach(function(trait) {
            trait.update(this, targetElapsedTime);
        }, this);
    }
};