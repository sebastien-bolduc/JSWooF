/**
 * Handle Koopa sprite stuff.
 *
 * @module KoopaSprite
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Behavior from "/JSWooF/Example/example_1/sprites/enemies/koopa/behavior.js"; 
import Sprite from "/JSWooF/Example/example_1/engine/sprite.js";
import Status from "/JSWooF/Example/example_1/sprites/enemies/koopa/status.js";
import Velocity from "/JSWooF/Example/example_1/engine/velocity.js";
import Walk from "/JSWooF/Example/example_1/sprites/enemies/koopa/walk.js";

/**
 * Namespace for the Koopa sprite.
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
 * Handle Koopa sprite stuff.
 * @class
 * @classdesc Handle Koopa sprite stuff for the game.
 * @extends Sprite
 */
export default JSWooF.Example.example_1.sprites.enemies.koopa.KoopaSprite = class extends Sprite {
    /**
     * Handle Koopa sprite stuff.
     * @constructs KoopaSprite
     */
    constructor(contentPipeline) {
        super();
        
        this.size.X = 16;
        this.size.Y = 32;
        this.bounds.Size = this.size;
        
        this.loadSpriteSheet(contentPipeline, "/example_1/jsonFile/koopa.json");
        
        this.addTrait(new Behavior());
        this.addTrait(new Walk());
        this.addTrait(new Velocity());
        this.addTrait(new Status());
    }
    
    /**
     * Draw a Koopa sprite.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     */
    draw(spriteBatch) {
        const currentTime = Date.now();
        
        if (this.status.isKnockout) {
            super.draw(spriteBatch, "stun", {a: -this.walk.direction, b: 0, c: 0, d: -1});
        } else if (this.status.isWakingUp) {
            let frameLength = this._animationMap.get("wakingUp").length;
            let frameName = this._animationMap.get("wakingUp").frames[Math.floor(currentTime / frameLength) % 
                this._animationMap.get("wakingUp").frames.length];
            super.draw(spriteBatch, frameName, {a: 1, b: 0, c: 0, d: 1});
        } else if (this.status.isStun || this.status.isSliding) {
            super.draw(spriteBatch, "stun", {a: 1, b: 0, c: 0, d: 1});
        } else if (this._animationMap.has("walk")) {
            let frameLength = this._animationMap.get("walk").length;
            let frameName = this._animationMap.get("walk").frames[Math.floor(currentTime / frameLength) % 
                this._animationMap.get("walk").frames.length];
            super.draw(spriteBatch, frameName, {a: -this.walk.direction, b: 0, c: 0, d: 1});
        }
    }
};