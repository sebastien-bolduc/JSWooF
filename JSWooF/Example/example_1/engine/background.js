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
        this._animationMap = new Map();
    }
    
    /**
     * Load tile sheet from a JSON file.
     * @function loadTileSheet
     * @param {ContentManager} contentPipeline - The current content pipeline to work with.
     * @param {string} tileSheet - The path to the tile sheet (content).
     */
    loadTileSheet(contentPipeline, tileSheet) {
        var tileSheetSpec = contentPipeline.load['JSON'](contentPipeline.RootDirectory + tileSheet);
        tileSheetSpec.isLoaded.then(sheetSpec => {
            this._tileSheet = contentPipeline.load['Texture2D'](contentPipeline.RootDirectory + sheetSpec.imageURL);
            sheetSpec.tiles.forEach(function(tile) {
                this._tileMap.set(tile.name, {X: tile.index[0], Y: tile.index[1], Width: sheetSpec.tileW, Height: sheetSpec.tileH});
            }, this);
            
            if (sheetSpec.animations != undefined) {
                sheetSpec.animations.forEach(function(animation) {
                    this._animationMap.set(animation.name, {"frames": animation.frames, "length": animation.frameLength});
                }, this);
            }
        });
    }
    
    /**
     * Draw the background.
     * @function draw
     * @param {SpriteBatch} spriteBatch - Current SpriteBatch.
     * @param {JSON} background - background description.
     * @param {string} name - Name of the tile.
     */
    draw(spriteBatch, background, name) {
        const currentTime = Date.now();
        
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            if (this._tileMap.size > 0) {
                for (let x = x1; x < x2; x++) {
                    for (let y = y1; y < y2; y++) {
                        if (this._animationMap.has(name)) {
                            
                            let frameLength = this._animationMap.get(name).length;
                            let frameName = this._animationMap.get(name).frames[Math.floor(currentTime / frameLength) % 
                                this._animationMap.get(name).frames.length];
                            spriteBatch.draw(this._tileSheet, new Vector2(x * this._tileMap.get(frameName).Width, 
                                y * this._tileMap.get(name).Height), this._tileMap.get(frameName), 1);
                                
                        } else {
                            
                            spriteBatch.draw(this._tileSheet, new Vector2(x * this._tileMap.get(name).Width, 
                                y * this._tileMap.get(name).Height), this._tileMap.get(name), 1);
                                
                        }
                    }
                }
            }
        }, this);
    }
};
