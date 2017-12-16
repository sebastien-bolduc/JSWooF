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
     * @param {ContentManager} contentPipeline - The current content pipeline to work with.
     * @param {Texture2D} tileSheet - A sprite sheet(Texture2D) of tiles. 
     */
    constructor(contentPipeline, tileSheet) {
        this._tileSheet = undefined;
        
        this._tileMap = new Map();
        this._animationMap = new Map();
        
        this._promise = undefined;
        
        this.loadTileSheet(contentPipeline, tileSheet);
    }
    
    /**
     * SPECIAL CASE:  return a 'Promise' to execute code when resolve or reject.
     * @return {Promise} Promise link with action.
     * @example
     * // Background.isLoaded.then(...)
     */
    get isLoaded() {
     return this._promise;
    }
    
    /**
     * Load tile sheet from a JSON file.
     * @function loadTileSheet
     * @param {ContentManager} contentPipeline - The current content pipeline to work with.
     * @param {string} tileSheet - The path to the tile sheet (content).
     */
    loadTileSheet(contentPipeline, tileSheet) {
        var tileSheetSpec = contentPipeline.load['JSON'](contentPipeline.RootDirectory + tileSheet);
        this._promise = tileSheetSpec.isLoaded.then(sheetSpec => {
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
     * @param {JSON} data - Level description.
     * @param {JSON} currentBackground - Current background description.
     * @param {number} offsetX - Offset the tiles by this much on the X axis.
     * @param {number} offsetY - Offset the tiles by this much on the Y axis.
     * @todo Limit this call...
     */
    draw(spriteBatch, data, currentBackground, offsetX = 0, offsetY = 0) {
        const currentTime = Date.now();
        
        currentBackground.forEach(function(background) {
                if (background.pattern != undefined) {
                    background.ranges.forEach(([x1, x2, y1, y2]) => {
                        const backgroundPattern = data.patterns[background.pattern].background;
                        const derivedX = x1 + offsetX;
                        const derivedY = y1 + offsetY;
                        this.draw(spriteBatch, data, backgroundPattern, derivedX, derivedY);
                    }, this);
                } else {
                    
                    background.ranges.forEach(([x1, x2, y1, y2]) => {
                        if (this._tileMap.size > 0) {
                            for (let x = x1; x < x2; x++) {
                                for (let y = y1; y < y2; y++) {
                                    if (this._animationMap.has(background.tile)) {
                            
                                        let frameLength = this._animationMap.get(background.tile).length;
                                        let frameName = this._animationMap.get(background.tile).frames[Math.floor(currentTime / frameLength) % 
                                            this._animationMap.get(background.tile).frames.length];
                                        if (this._tileMap.has(frameName)) {
                                            spriteBatch.draw(this._tileSheet, new Vector2(x * this._tileMap.get(frameName).Width, 
                                                y * this._tileMap.get(background.tile).Height), this._tileMap.get(frameName), 1);
                                        }
                                
                                    } else {
                                        
                                        if (this._tileMap.has(background.tile)) {
                                            spriteBatch.draw(this._tileSheet, 
                                                new Vector2((x  + offsetX) * this._tileMap.get(background.tile).Width, 
                                                (y  + offsetY) * this._tileMap.get(background.tile).Height), 
                                                this._tileMap.get(background.tile), 1);
                                        }
                                
                                    }
                                }
                            }
                        }
                    }, this);
                    
                }
            }, this);
    }
};
