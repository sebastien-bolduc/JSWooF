/**
 * Handle level stuff.
 *
 * @module Sprite
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Background from "/JSWooF/Example/example_1/engine/background.js";
import Matrix from "/JSWooF/Framework/GameFolder/matrix.js";
import TileCollider from "/JSWooF/Example/example_1/engine/tileCollider.js";

/**
 * Namespace for the level.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle level stuff.
 * @class
 * @classdesc Handle level stuff for the game.
 */
export default JSWooF.Example.example_1.engine.Level = class {
    /**
     * Handle level stuff.
     * @constructs Level
     * @param {ContentManager} contentPipeline - The current content pipeline to work with.
     * @param {string} levelPath - The path to the level file (content).
     * @param {TileCollider} tileColliderRef - Reference to the tile collider object.
     * @param {Background} backgroundRef - Reference to the background object.
     */
    constructor(contentPipeline, levelPath) {
        this._level = undefined;
        this._tiles = new Matrix();
        this._background = undefined;
        this._tileCollider = undefined;
        
        this._promise = undefined;
        this._ready = false;
        
        this.loadLevel(contentPipeline, levelPath);
    }
    
    /**
     * Gets this level's background.
     * @returns {Background} This level's background.
     */
    get background() {
        return this._background;
    }
    
    /**
     * Gets this level's tile collider.
     * @returns {TileCollider} This level's tile collider.
     */
    get tileCollider() {
        return this._tileCollider;
    }
     
    /**
     * Gets the data of the level.
     * @returns {JSON} The level's data.
     */
    getData() {
     return this._level.getData();
    }
    
    /**
     * SPECIAL CASE:  return a 'Promise' to execute code when resolve or reject.
     * @return {Promise} Promise link with action.
     * @example
     * // Level.isLoaded.then(...)
     */
    get isLoaded() {
     return this._promise;
    }
    
    /**
     * Gets the state of playability of the level.
     * @returns {boolean} The state of playability of the level.
     */
    get isReady() {
        return this._ready;  
    };
    
    /**
     * Create a level formed of tiles from the data submitted.
     * @function createLevel
     * @param {} data - Level's data.
     * @param {number} offsetX - Offset the tiles by this much on the X axis.
     * @param {number} offsetY - Offset the tiles by this much on the Y axis.
     */
    createLevel(data, offsetX = 0, offsetY = 0) {
        data.forEach(function(background) {
            if (background.pattern != undefined) {
                background.ranges.forEach(([x1, x2, y1, y2]) => {
                    const backgroundPattern = this._level.getData().patterns[background.pattern].background;
                    const derivedX = x1 + offsetX;
                    const derivedY = y1 + offsetY;
                    this.createLevel(backgroundPattern, derivedX, derivedY);
                }, this);
            } else {
                background.ranges.forEach(([x1, x2, y1, y2]) => {
                    for (let x = x1; x < x2; x++) {
                        for (let y = y1; y < y2; y++) {
                            this._tiles.set(x + offsetX, y + offsetY, {
                                name: background.type
                            });
                        }
                    }
                }, this);
            }
        }, this);
    }
    
    /**
     * Load level from a JSON file.
     * @function loadLevel
     * @param {ContentManager} contentPipeline - The current content pipeline to work with.
     * @param {string} levelPath - The path to the level file (content).
     */
    loadLevel(contentPipeline, levelPath) {
        this._level = contentPipeline.load['JSON'](contentPipeline.RootDirectory + levelPath);
        this._promise = this._level.isLoaded.then(data => {
                            this.createLevel(data.background);
                            this._tileCollider = new TileCollider(this._tiles);
                            this._background = new Background(contentPipeline, data.tileSheet);
                            Promise.all([this._background.isLoaded]).then(values => {
                                this._ready = true;
                            });
                        });
    }
};