/**
 * Handle Goomba sprite stuff.
 *
 * @module GoombaSprite
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import Sprite from "/JSWooF/Example/example_1/engine/sprite.js";
import Velocity from "/JSWooF/Example/example_1/engine/velocity.js";

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
        
        this.loadSpriteSheet(contentPipeline, "/example_1/jsonFile/goomba.json");
        
        this.addTrait(new Velocity());
        
        this.direction = 1;
    }
    
    /**
     * Draw a Goomba sprite.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     */
    draw(spriteBatch) {
        const currentTime = Date.now();
        
        if (this._animationMap.has("walk")) {
            let frameLength = this._animationMap.get("walk").length;
            let frameName = this._animationMap.get("walk").frames[Math.floor(currentTime / frameLength) % 
                this._animationMap.get("walk").frames.length];
            super.draw(spriteBatch, frameName);
        }
    }
};