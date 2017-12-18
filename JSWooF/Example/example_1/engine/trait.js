/**
 * Handle trait stuff.
 *
 * @module Trait
 * @author Sébastien Bolduc
 * @version 0.0
 */

/**
 * Namespace for the trait.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle trait stuff.
 * @class
 * @classdesc Handle trait stuff for the game.
 */
export default JSWooF.Example.example_1.engine.Trait = class {
    /**
     * Define a trait.
     * @constructs Trait
     * @param {string} name - The name of the trait.
     */
    constructor(name) {
        this.name = name;
    }
    
    /**
     * Resolve collision with the trait.
     * @param {Entity} subject - The entity who has collide.
     * @param {Entity} candidate - The entity to check collision with.
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    collides(subject, candidate) {
    }
    
    /**
     * Update the trait
     * @function update
     */
    // Must be overridden. https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/
    update() {
    }
};