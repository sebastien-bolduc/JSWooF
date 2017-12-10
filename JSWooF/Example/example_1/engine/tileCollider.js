/**
 * Handle tile colliding stuff.
 *
 * @module tileCollider
 * @author Sébastien Bolduc
 * @version 0.0
 */

import TileResolver from "/JSWooF/Example/example_1/engine/tileResolver.js";

/**
 * Namespace for tile colliding.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Example.example_1.engine
 */
var JSWooF = JSWooF || {};
JSWooF.Example = JSWooF.Example || {};
JSWooF.Example.example_1 = JSWooF.Example.example_1 || {};
JSWooF.Example.example_1.engine = JSWooF.Example.example_1.engine || {};

/**
 * Handle tile colliding stuff.
 * @class
 * @classdesc Handle tile colliding stuff for the game.
 */
export default JSWooF.Example.example_1.engine.TileCollider = class {
    /**
     * Initialize the tile collinding logic.
     * @constructs TileCollider
     * @param {Matrix} tileMatrix - Tiles grid;
     */
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    
    /**
     * Check for a collision.
     * @function checkXrange
     * @param {Entity} entity - The entity to check collision for.
     * @param {Array} tileList - List of tile we can collide with.
     * @return {boolean} True for a collision; false otherwise.
     */
    checkXrange(entity, tileList) {
        let x;                                                      // To narrow the search
        if (entity.vel.X > 0) {
            x = entity.pos.X + entity.size.X;
        } else if (entity.vel.X < 0) {
            x = entity.pos.X;
        }
        
        //const matches = this.tiles.matchByRange(
        //    entity.pos.X, entity.pos.X + entity.size.X,
        //    entity.lastPos.Y, entity.lastPos.Y + entity.size.Y);  // We use 'lastPos' for Y to check one axis at a time
        
        const matches = this.tiles.matchByRange(
            x, x,
            entity.lastPos.Y, entity.lastPos.Y + entity.size.Y);    // We use 'lastPos' for Y to check one axis at a time
        
        const result = [];
        
        matches.forEach(match => {
            tileList.forEach(function(tile) {
                if (match != undefined) {
                    if (match.tile.name == tile) {
                        result.push(match);
                    }
                }
            });
        });
        
        return result;
    }
    
    /**
     * Check for a collision.
     * @function checkYrange
     * @param {Entity} entity - The entity to check collision for.
     * @param {Array} tileList - List of tile we can collide with.
     * @return {Boolean} True for a collision; false otherwise.
     */
    checkYrange(entity, tileList) {
        let y;                                                      // To narrow the search
        if (entity.vel.Y > 0) {
            y = entity.pos.Y + entity.size.Y;
        } else if (entity.vel.Y < 0) {
            y = entity.pos.Y;
        }
        
        //const matches = this.tiles.matchByRange(
        //    entity.pos.X, entity.pos.X + entity.size.X,
        //    entity.pos.Y, entity.pos.Y + entity.size.Y);
        
        const matches = this.tiles.matchByRange(
            entity.pos.X, entity.pos.X + entity.size.X,
            y, y);
        
        var result = [];
        
        matches.forEach(match => {
            tileList.forEach(function(tile) {
                if (match != undefined) {
                    if (match.tile.name == tile) {
                        result.push(match);
                    }
                }
            });
        });
        
        return result;
    }
    
    /**
     * Test for a collision and resolve it.
     * @function test
     * @param {Entity} entity - The entity to test collision for.
     */
    test(entity) {
        const checkingCollisionXaxis = this.checkXrange(entity, ["ground", "chance"]);      // On X axis
        checkingCollisionXaxis.forEach(match => {                    
            if (entity.vel.X > 0) {
                if (entity.pos.X + entity.size.X > match.x1) {
                    entity.pos.X = match.x1 - entity.size.X;
                    entity.vel.X = 0;
                }
            } else if (entity.vel.X < 0) {
                if (entity.pos.X < match.x2) {
                    entity.pos.X = match.x2;
                    entity.vel.X = 0;
                }
            }
        });
        
        const checkingCollisionYaxis = this.checkYrange(entity, ["ground", "chance"]);      // On Y axis
        checkingCollisionYaxis.forEach(match => {                    
            if (entity.vel.Y > 0) {
                if (entity.pos.Y + entity.size.Y > match.y1) {
                    entity.pos.Y = match.y1 - entity.size.Y;
                    entity.vel.Y = 0;
                }
            } else if (entity.vel.Y < 0) {
                if (entity.pos.Y < match.y2) {
                    entity.pos.Y = match.y2;
                    entity.vel.Y = 0;
                }
            }
        });
    }
};