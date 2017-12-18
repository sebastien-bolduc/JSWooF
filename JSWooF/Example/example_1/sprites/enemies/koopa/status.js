/**
 * Handle status stuff for Koopa.
 *
 * @module Status
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for status.
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
 * Handle status stuff for Koopa.
 * @class
 * @classdesc Handle status stuff for Koopa.
 */
export default JSWooF.Example.example_1.sprites.enemies.koopa.Status = class extends Trait {
    /**
     * Initialize the status trait.
     * @constructs Status
     */
    constructor() {
        super("status");
        
        this._wakingUp = false;
        this._stun = false;
        this._slide = false;
        this._knockout = false;
        this._dead = false;
        this._deathTime = 0;
        this._remove = false;
    }
    
    /**
     * Gets the life status of Koopa.
     * @returns {boolean} True if Koopa is alive; false otherwise.
     */
    get isAlive() {
        return !this._dead;
    }
    
    /**
     * Gets the awake status of Koopa.
     * @returns {boolean} True if Koopa is waking up; false otherwise.
     */
    get isWakingUp() {
        return this._wakingUp;
    }
    
    /**
     * Gets the stun status of Koopa.
     * @returns {boolean} True if Koopa is stun; false otherwise.
     */
    get isStun() {
        return this._stun;
    }
    
    /**
     * Gets the sliding status of Koopa.
     * @returns {boolean} True if Koopa is sliding; false otherwise.
     */
    get isSliding() {
        return this._slide;
    }
    
    /**
     * Gets the knockout status of koopa.
     * @returns {boolean} True if Koopa is knockout; false otherwise.
     */
    get isKnockout() {
        return this._knockout;
    }
    
    /**
     * The entity to which this trait belong is knockout.
     * @function knockout
     */
    knockout() {
        this._knockout = true;
        this._dead = true;
    }
    
    /**
     * Gets the life status of Koopa.
     * @returns {boolean} True if Koopa is dead; false otherwise.
     */
    get isDead() {
        return this._dead;
    }
    
    /**
     * Gets the state of this entity in game.
     * @returns {boolean} True if entity is to be remove from the game; false otherwise.
     */
    get Remove() {
        return this._remove;
    }
    
    /**
     * The entity to which this trait belong is stun.
     * @function stun
     */
    stun() {
        this._stun = true;
        this._slide = false;
    }
    
    /**
     * The entity to which this trait belong is sliding.
     * @function slide
     */
    slide() {
        this._slide = true;
        this._stun = false;
        this._deathTime = 0;
    }
    
    /**
     * The entity to which this trait belong is killed.
     * @function kill
     */
    kill() {
        this._dead = true;
    }
    
    /**
     * The entity to which this trait belong is revive.
     * @function moreThanEver
     */
    revive() {
        this._wakingUp = false;
        this._stun = false;
        this._slide = false;
        this._dead = false;
        this._deathTime = 0;
        this._remove = false;
    }
    
    /**
     * Update the status trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
        if (entity.status.isDead) {
            entity.status._deathTime += targetElapsedTime;
            if (entity.status._deathTime > 2) {
                entity.status._remove = true;
            }
        } else if (entity.status.isStun && !entity.status.isSliding) {
            entity.status._deathTime += targetElapsedTime;
            if (entity.status._deathTime > 6) {
                entity.status.revive();
                entity.walk.velocityBoost = 1;
            } else if (entity.status._deathTime > 4) {
                entity.status._wakingUp = true;
            }
        }
    }
};