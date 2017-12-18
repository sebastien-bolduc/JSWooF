/**
 * Handle behavior stuff for Goomba.
 *
 * @module Behavior
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the behavior.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.enemies.goomba
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.enemies = JSWooF.Example.example_1.sprites.enemies || {};
JSWooF.Example.example_1.sprites.enemies.goomba = JSWooF.Example.example_1.sprites.enemies.goomba || {};

/**
 * Handle behavior stuff for Goomba.
 * @class
 * @classdesc Handle behavior stuff for Goomba.
 */
export default JSWooF.Example.example_1.sprites.enemies.goomba.Behavior = class extends Trait {
    /**
     * Initialize the behavior trait.
     * @constructs Behavior
     */
    constructor() {
        super("behavior");
    }
    
    /**
     * Resolve collision with Goomba.
     * @param {Entity} subject - The Goomba who has collide.
     * @param {Entity} candidate - The entity to check collision with.
     */
    collides(subject, candidate) {
        if (subject.status.isDead || candidate.status.isDead) {
            return;
        }
        
        if (candidate.stomper != undefined) {
            if ((candidate.pos.Y < subject.pos.Y) && (candidate.vel.Y > 0)) {
                subject.walk.direction = 0;
                subject.status.kill();
                candidate.stomper.bounce();
            } else {
                candidate.status.kill();
                candidate.stomper.bounce();
            }
        }
    }
};