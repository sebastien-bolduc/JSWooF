/**
 * Handle Koopa sprite stuff.
 *
 * @module KoopaSprite
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import Sprite from "/JSWooF/Example/example_1/engine/sprite.js";
import Velocity from "/JSWooF/Example/example_1/engine/velocity.js";

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
        
        this.loadSpriteSheet(contentPipeline, "/example_1/jsonFile/koopa.json");
        
        this.addTrait(new Velocity());
        
        this.direction = 1;
    }
    
    /**
     * Draw a Koopa sprite.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     */
    draw(spriteBatch) {
        const currentTime = Date.now();
        
        if (this._animationMap.has("walk")) {
            let frameLength = this._animationMap.get("walk").length;
            let frameName = this._animationMap.get("walk").frames[Math.floor(currentTime / frameLength) % 
                this._animationMap.get("walk").frames.length];
            super.draw(spriteBatch, frameName, {a: -this.direction, b: 0, c: 0, d: 1});
        }
    }
};