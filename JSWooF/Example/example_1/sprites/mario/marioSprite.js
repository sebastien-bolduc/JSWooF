/**
 * Handle Mario sprite stuff.
 *
 * @module MarioSprite
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import Sprite from "/JSWooF/Example/example_1/engine/sprite.js";
import Jump from "/JSWooF/Example/example_1/sprites/mario/jump.js";
import Run from "/JSWooF/Example/example_1/sprites/mario/run.js";
import Velocity from "/JSWooF/Example/example_1/engine/velocity.js";

/**
 * Namespace for the Mario sprite.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.mario
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};

/**
 * Handle Mario sprite stuff.
 * @class
 * @classdesc Handle Mario sprite stuff for the game.
 * @extends Sprite
 */
export default JSWooF.Example.example_1.sprites.mario.MarioSprite = class extends Sprite {
    /**
     * Handle Mario sprite stuff.
     * @constructs MarioSprite
     */
    constructor(contentPipeline) {
        super();
        
        this.size.X = 16;
        this.size.Y = 16;
        
        this.loadSpriteSheet(contentPipeline, "/example_1/jsonFile/mario.json");
        
        this.addTrait(new Run());
        this.addTrait(new Jump());
        this.addTrait(new Velocity());
        
        this.isFacing = 1;
        this.isFloating = false;
    }
    
    /**
     * Draw a Mario sprite.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     */
    draw(spriteBatch) {
        let frameName = "idle";
        if (this.isFloating) {
            frameName = "jump";
        } else if (this.run.isRunning) {
            if ((this.vel.X > 0 && this.run.direction < 0) || (this.vel.X < 0 && this.run.direction > 0)) {
                frameName = "break";
            } else {
                if (this._animationMap.has("run")) {
                    let frameLength = this._animationMap.get("run").length;
                    frameName = this._animationMap.get("run").frames[Math.floor(this.run.distance / frameLength) %
                        this._animationMap.get("run").frames.length];
                }
            }
        }
        
        if (this._spriteMap.has(frameName)) {
            super.draw(spriteBatch, frameName, {a: this.isFacing, b: 0, c: 0, d: 1});
        }
    }
};