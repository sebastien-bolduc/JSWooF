/**
 * Handle jump stuff for Mario.
 *
 * @module Jump
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 import Trait from "/JSWooF/Example/example_1/engine/trait.js";
 
 /**
 * Namespace for the jump.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.mario
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};

/**
 * Handle jump stuff for Mario.
 * @class
 * @classdesc Handle jump stuff for Mario.
 */
export default JSWooF.Example.example_1.sprites.mario.Jump = class extends Trait {
    /**
     * Initialize the jump trait.
     * @constructs Jump
     */
    constructor() {
        super("jump");
        
        this.duration = 0.3;
        this.velocity = 200;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;
        
        this.isJumping = false;
    }
     
    /**
     * Start the jump.
     * @function start
     */
    start() {
        this.requestTime = this.gracePeriod;
    }
    
    /**
     * Cancel the jump.
     * @function cancel
     */
    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
    
    /**
     * Update the jump trait.
     * @function update
     * @param {Entity} entity - The entity to update.
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(entity, targetElapsedTime) {
        if (this.requestTime > 0) {
            if (this.isJumping) {
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            
            this.requestTime -= targetElapsedTime;
        }
        
        if (this.engageTime > 0) {
            entity.vel.Y = -(this.velocity + Math.abs(entity.vel.X) * this.speedBoost);
            this.engageTime -= targetElapsedTime;
        }
        
        this.isJumping = !entity.isFloating;
    }
};