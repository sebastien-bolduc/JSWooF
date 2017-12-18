/**
 * Handle entity colliding stuff.
 *
 * @module EntityCollider
 * @author Sébastien Bolduc
 * @version 0.0
 */

/**
 * Namespace for entity colliding.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle entity colliding stuff.
 * @class
 * @classdesc Handle entity colliding stuff for the game.
 */
export default JSWooF.Example.example_1.engine.EntityCollider = class {
    /**
     * Initialize the entity collinding logic.
     * @constructs EntityCollider
     * @param {Entity} entities - Entities we want to look over.
     */
    constructor(entities) {
        this._entities = entities;
    }
    
    /**
     * Check an entity for a collision.
     * @function check
     * @param {Entity} subject - Entity to check.
     */
    check(subject) {
        this._entities.forEach(function(candidate) {
            if (subject == candidate) {
                return;
            }
            
            if (subject.bounds.intersects(candidate.bounds)) {
                subject.collides(candidate);
                //candidate.collides(subject);
            }
        }, this);
    }
};