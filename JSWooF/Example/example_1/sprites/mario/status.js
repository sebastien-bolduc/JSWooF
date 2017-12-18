/**
 * Handle status stuff for Mario.
 *
 * @module Status
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for status.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};
/**
 * Handle status stuff for Mario.
 * @class
 * @classdesc Handle status stuff for Mario.
 */
export default JSWooF.Example.example_1.sprites.mario.Status = class extends Trait {
    /**
     * Initialize the status trait.
     * @constructs Status
     */
    constructor() {
        super("status");
        
        this._dead = false;
        this._deathTime = 0;
        this._remove = false;
    }
    
    /**
     * Gets the life status of Mario.
     * @returns {boolean} True if Goomba is alive; false otherwise.
     */
    get isAlive() {
        return !this._dead;
    }
    
    /**
     * Gets the life status of Mario.
     * @returns {boolean} True if Goomba is dead; false otherwise.
     */
    get isDead() {
        return this._dead;
    }
    
    /**
     * Gets the state of this entity in game.
     * @returns {boolean} True if Goomba is to be remove from the game; false otherwise.
     */
    get Remove() {
        return this._remove;
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
        this._dead = false;
    }
    
    /**
     * Update the status trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
    }
};