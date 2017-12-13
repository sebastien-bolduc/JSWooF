/**
 * Handle sprite stuff.
 *
 * @module Sprite
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import Entity from "/JSWooF/Example/example_1/engine/entity.js";
import Jump from "/JSWooF/Example/example_1/sprites/mario/jump.js";
import Run from "/JSWooF/Example/example_1/sprites/mario/run.js";
import Velocity from "/JSWooF/Example/example_1/sprites/mario/velocity.js";

/**
 * Namespace for the sprite.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.sprites.mario
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.sprites = JSWooF.Example.example_1.sprites || {};
JSWooF.Example.example_1.sprites.mario = JSWooF.Example.example_1.sprites.mario || {};

/**
 * Handle sprite stuff.
 * @class
 * @classdesc Handle sprite stuff for the game.
 * @extends Entity
 */
export default JSWooF.Example.example_1.sprites.mario.Sprite = class extends Entity {
    /**
     * Handle sprite stuff.
     * @constructs Sprite
     */
    constructor() {
        super();
        
        this.size.X = 16;
        this.size.Y = 16;
        
        this._spriteMap = new Map();                        // Setup 'sprites' from 'sprites sheet'
        this._spriteMap.set("idle", {X: 209, Y: 0, Width: 18, Height: 18});
        this._spriteMap.set("run-1", {X: 240, Y: 0, Width: 18, Height: 18});
        this._spriteMap.set("run-2", {X: 269, Y: 0, Width: 18, Height: 18});
        this._spriteMap.set("run-3", {X: 300, Y: 0, Width: 18, Height: 18});
        this._spriteMap.set("jump-1", {X: 360, Y: 0, Width: 18, Height: 18});
        this._spriteMap.set("break", {X: 330, Y: 0, Width: 18, Height: 18});
        
        this.addTrait(new Run());
        this.addTrait(new Jump());
        this.addTrait(new Velocity());
        
        this.runningFrame = ["run-1", "run-2", "run-3"];
        this.jumpingFrame = ["jump-1"];
        
        this.isFacing = 1;
        this.isFloating = false;
    }
    
    /**
     * Set the sprite sheet to use.
     * @param {Texture2D} spriteSheet - A sprite sheet(Texture2D) of sprites. 
     */
    setSpriteSheet(spriteSheet) {
        this._spriteSheet = spriteSheet;
    }
    
    /**
     * Update a sprite.
     * @function update
     * @param {number} targetElapsedTime - Target elapsed time to update with.
     */
    update(targetElapsedTime) {
        super.update(targetElapsedTime);
    }
    
    /**
     * Draw a sprite.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     */
    draw(spriteBatch) {
        let frameName = "idle";
        if (this.isFloating) {
            frameName = this.jumpingFrame[0];
        } else if (this.run.isRunning) {
            if ((this.vel.X > 0 && this.run.direction < 0) || (this.vel.X < 0 && this.run.direction > 0)) {
                frameName = "break";
            } else {
                frameName = this.runningFrame[Math.floor(this.run.distance / 10) % this.runningFrame.length];
            }
        }
        
        spriteBatch.draw(this._spriteSheet, this.pos, this._spriteMap.get(frameName), 1, {a: this.isFacing, b: 0, c: 0, d: 1});
    }
};