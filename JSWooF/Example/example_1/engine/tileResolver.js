/**
 * Handle tile resolving stuff.
 *
 * @module TileResolver
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
 /**
 * Namespace for tile resolving.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle tile resolving stuff.
 * @class
 * @classdesc Handle tile resolving stuff for the game.
 */
export default JSWooF.Example.example_1.engine.TileResolver = class {
    /**
     * Initialize the tile resolving logic.
     * @constructs TileResolver
     * @param {Matrix} matrix - A tile matrix.
     * @param {number} tileSize - Size of the tile.
     */
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }
    
    /**
     * Return a position to tile index.
     * @function toIndex
     * @param {number} pos - Position to convert.
     * @returns {number} Tile index.
     */
    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }
    
    /**
     * Return a range of position to tile index.
     * @function toIndexRange
     * @param {number} pos1 - Lower most limit.
     * @param {number} pos2 - Upper most limit.
     * @return {Array} Range of index.
     */
    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while(pos < pMax);
        
        return range;
    }
    
    /**
     * Get tile from indexes.
     * @function getByIndex
     * @param {number} indexX - Tile index for the X component.
     * @param {number} indexY - Tile index for the Y component.
     * @returns {Object} Object of the tile's data.
     */
    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile != undefined) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            };
        }
        
        return undefined;
    }
    
    /**
     * Match a tile with the posisition.
     * @function matchByPosition
     * @param {number} posX - Position of the X component.
     * @param {number} posY - Position of the Y component.
     * @returns {Array} Array of the tile's data.
     */
    matchByPosition(posX, posY) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY));
    }
    
    /**
     * Match a tile with the posisition by range.
     * @function matchByRange
     * @param {number} x1 - Lower most limit for X component.
     * @param {number} x2 - Upper most limit for X component.
     * @param {number} y1 - Lower most limit for Y component.
     * @param {number} y2 - Upper most limit for Y component.
     * @returns {Array} Range of tile.
     */
    matchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match != undefined) {
                    matches.push(match);
                }
            });
        });
        
        return matches;
    }
};