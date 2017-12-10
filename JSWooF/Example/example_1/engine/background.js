/**
 * Handle background stuff.
 *
 * @module Background
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import Vector2 from "/JSWooF/Framework/GameFolder/vector2.js";
 
/**
 * Namespace for the background.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle background stuff.
 * @class
 * @classdesc Handle background stuff for the game.
 */
export default JSWooF.Example.example_1.engine.Background = class {
    /**
     * Handle background stuff.
     * @constructs Background
     * @param {Texture2D} tileSheet - A sprite sheet(Texture2D) of tiles. 
     */
    constructor(tileSheet) {
        this._tileSheet = tileSheet;
        
        this._tileMap = new Map();
        this._tileMap.set("sky", {X: 48, Y: 368, Width: 16, Height: 16});
        this._tileMap.set("ground", {X: 0, Y: 0, Width: 16, Height: 16});
        this._tileMap.set("chance", {X: 384, Y: 0, Width: 16, Height: 16});
    }
    
    /**
     * Draw the background.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     * @param {JSON} background - background description.
     * @param {string} name - Name of the tile.
     */
    draw(spriteBatch, background, name) {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    spriteBatch.draw(this._tileSheet, new Vector2(x * 16, y * 16), this._tileMap.get(name), 1);
                }
            }
        }, this);
    }
};
