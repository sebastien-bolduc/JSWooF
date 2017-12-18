/**
 * Handle behavior stuff for Koopa.
 *
 * @module Behavior
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the behavior.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.enemies.Koopa
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.enemies = JSWooF.Example.example_1.sprites.enemies || {};
JSWooF.Example.example_1.sprites.enemies.koopa = JSWooF.Example.example_1.sprites.enemies.koopa || {};

/**
 * Handle behavior stuff for Koopa.
 * @class
 * @classdesc Handle behavior stuff for Koopa.
 */
export default JSWooF.Example.example_1.sprites.enemies.koopa.Behavior = class extends Trait {
    /**
     * Initialize the behavior trait.
     * @constructs Behavior
     */
    constructor() {
        super("behavior");
    }
    
    /**
     * Resolve collision with Koopa.
     * @param {Entity} subject - The Koopa who has collide.
     * @param {Entity} candidate - The entity to check collision with.
     */
    collides(subject, candidate) {
        if (subject.status.isDead || candidate.status.isDead) {
            return;
        }
        
        if (candidate.stomper != undefined) {
            if (subject.status.isStun) {
                subject.walk.direction = candidate.isFacing;
                subject.walk.velocityBoost = 10;
                subject.status.slide();
            } else if ((candidate.pos.Y < subject.pos.Y) && (candidate.vel.Y > 0)) {
                subject.walk.velocityBoost = 0;
                subject.status.stun();
                candidate.stomper.bounce();
            } else {
                candidate.status.kill();
                candidate.stomper.bounce();
            }
        } else {
            if (subject.status.isSliding) {
                if (candidate.status.isSliding == undefined) {
                    candidate.vel.Y = -400;
                    candidate.status.knockout();
                } else if (candidate.status.isSliding) {
                    subject.walk.direction *= -1;
                    candidate.walk.direction *= -1;
                } else {
                    candidate.vel.Y = -400;
                    candidate.status.knockout();
                }
            }
        }
    }
};