/**
 * Handle Goomba sprite stuff.
 *
 * @module GoombaSprite
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Behavior from "/JSWooF/Example/example_1/sprites/enemies/goomba/behavior.js";
import Sprite from "/JSWooF/Example/example_1/engine/sprite.js";
import Status from "/JSWooF/Example/example_1/sprites/enemies/goomba/status.js";
import Velocity from "/JSWooF/Example/example_1/engine/velocity.js";
import Walk from "/JSWooF/Example/example_1/sprites/enemies/goomba/walk.js";

/**
 * Namespace for the Goomba sprite.
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
 * Handle Goomba sprite stuff.
 * @class
 * @classdesc Handle Goomba sprite stuff for the game.
 * @extends Sprite
 */
export default JSWooF.Example.example_1.sprites.enemies.goomba.GoombaSprite = class extends Sprite {
    /**
     * Handle Goomba sprite stuff.
     * @constructs GoombaSprite
     */
    constructor(contentPipeline) {
        super();
        
        this.size.X = 16;
        this.size.Y = 16;
        this.bounds.Size = this.size;
        
        this.loadSpriteSheet(contentPipeline, "/example_1/jsonFile/goomba.json");
        
        this.addTrait(new Walk());
        this.addTrait(new Behavior());
        this.addTrait(new Velocity());
        this.addTrait(new Status());
    }
    
    /**
     * Draw a Goomba sprite.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     */
    draw(spriteBatch) {
        const currentTime = Date.now();
        
        if (this.status.isKnockout) {
            super.draw(spriteBatch, "walk-1", {a: 1, b: 0, c: 0, d: -1});
        } else if (this.status.isAlive) {
            if (this._animationMap.has("walk")) {
                let frameLength = this._animationMap.get("walk").length;
                let frameName = this._animationMap.get("walk").frames[Math.floor(currentTime / frameLength) % 
                    this._animationMap.get("walk").frames.length];
                super.draw(spriteBatch, frameName);
            }
        } else if (!this.status.Remove) {
            if (this._spriteMap.has("flat")) {
                super.draw(spriteBatch, "flat");
            }
        }
    }
};