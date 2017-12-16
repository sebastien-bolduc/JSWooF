/**
 * Handle sprite stuff.
 *
 * @module Sprite
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import Entity from "/JSWooF/Example/example_1/engine/entity.js";

/**
 * Namespace for the sprite.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle sprite stuff.
 * @class
 * @classdesc Handle sprite stuff for the game.
 * @extends Entity
 */
export default JSWooF.Example.example_1.engine.Sprite = class extends Entity {
    /**
     * Handle sprite stuff.
     * @constructs Sprite
     */
    constructor(spriteSheet) {
        super();
        
        this._spriteSheet = spriteSheet;
        this._spriteMap = new Map();
        this._animationMap = new Map();
    }
    
    /**
     * Load sprite sheet from a JSON file.
     * @function loadSpriteSheet
     * @param {ContentManager} contentPipeline - The current content pipeline to work with.
     * @param {string} spriteSheet - The path to the sprite sheet (content).
     */
    loadSpriteSheet(contentPipeline, spriteSheet) {
        var spriteSheetSpec = contentPipeline.load['JSON'](contentPipeline.RootDirectory + spriteSheet);
        spriteSheetSpec.isLoaded.then(sheetSpec => {
            this._spriteSheet = contentPipeline.load['Texture2D'](contentPipeline.RootDirectory + sheetSpec.imageURL);
            sheetSpec.sprites.forEach(function(sprite) {
                this._spriteMap.set(sprite.name, {X: sprite.index[0], Y: sprite.index[1], Width: sheetSpec.spriteW, Height: sheetSpec.spriteH});
            }, this);
            
            if (sheetSpec.animations != undefined) {
                sheetSpec.animations.forEach(function(animation) {
                    this._animationMap.set(animation.name, {"frames": animation.frames, "length": animation.frameLength});
                }, this);
            }
        });
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
     * @param {string} name - Name of the sprite to draw. 
     * @param {struc} effects - Effects to apply.
     */
    draw(spriteBatch, name, effects = {a: 1, b: 0, c: 0, d: 1}) {
        if (this._spriteSheet != undefined) {
            spriteBatch.draw(this._spriteSheet, this.pos, this._spriteMap.get(name), 1, effects);
        }
    }
};