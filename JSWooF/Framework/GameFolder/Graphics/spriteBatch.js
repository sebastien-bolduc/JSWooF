/**
 * Enables a group of sprites to be drawn using the same settings.
 * 
 * @module SpriteBatch
 * @author Sébastien Bolduc
 * @version 0.0
 */

import Vector2 from "/JSWooF/Framework/GameFolder/vector2.js";

/**
 * Namespace for a sprite batch.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder.Graphics
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};
JSWooF.Framework.GameFolder.Graphics = JSWooF.Framework.GameFolder.Graphics || {};

/**
 * Enables a group of sprites to be drawn using the same settings.
 * @class
 * @classdesc Use a sprite to draw a 2D bitmap directly to the screen.
 */
export default JSWooF.Framework.GameFolder.Graphics.SpriteBatch = class {
    /**
     * Initializes a new instance of the class, which enables a group of sprites 
     * to be drawn using the same settings.
     * @constructs SpriteBatch
     * @param {GraphicsDevice} graphicsDevice - The current rendering context.
     */
    constructor(graphicsDevice) {
        this._graphicsDevice = undefined;
        this.GraphicsDevice = graphicsDevice;
        
        // Structure for a sprite
        this.sprite = function() {
            return {
                texture2D: null,
                position: null,
                source: null,
                scale: null
            };
        };
        
        this._batch = undefined;
    }
    
    /**
     * Gets the current GraphicsDevice.
     * @returns {GraphicsDevice} Graphics device.
     */
    get GraphicsDevice() {
        return this._graphicsDevice;
    }
    
    /**
     * Sets the current GraphicsDevice.
     * @param {GraphicsDevice} graphicsDevice - Graphics device.
     */
    set GraphicsDevice(graphicsDevice) {
        this._graphicsDevice = graphicsDevice;
    }
    
    /**
     * Begins a sprite batch operation.
     * @function begin
     */
    begin() {
        this._batch = [];
    }
    
    /**
     * Adds a sprite to a batch of sprites to be rendered.
     * @function draw
     * @param {Texture2D} texture2D - The specified texture.
     * @param {Vector2} position - Position of the sprite.
     * @param {Array} source - Source of the sprite.
     * @param {number} scale - Sprite's scaling factor.
     */
    draw(texture2D, position, source, scale) {
        const sprite = this.sprite();
        
        const viewportX = Math.floor(this.GraphicsDevice.Viewport.X);
        const viewportY = Math.floor(this.GraphicsDevice.Viewport.Y);
        const viewportOffsetX = -this.GraphicsDevice.Viewport.TileSafeArea.X;
        const viewportOffsetY = -this.GraphicsDevice.Viewport.TileSafeArea.Y;
        if (position.X >= (viewportX) && position.X <= (viewportX + this.GraphicsDevice.Viewport.Width)) {
            if (position.Y >= (viewportY) && position.Y <= (viewportY + this.GraphicsDevice.Viewport.Height)) {
                const newPosition = new Vector2(
                    position.X - viewportX - viewportOffsetX,
                    position.Y - viewportY - viewportOffsetY
                );
                
                sprite.texture2D = texture2D;
                sprite.position = newPosition;
                sprite.source = source;
                sprite.scale = scale;
        
                this._batch.push(sprite);
            }
        }
    }
    
    /**
     * Flushes the sprite batch and restores the device state to how it was 
     * before Begin was called.
     * @function end
     */
    end() {
        this._batch.forEach(function(sprite) {
            this.GraphicsDevice.Context.drawImage(sprite.texture2D.getData(),
                sprite.source.X, sprite.source.Y, sprite.source.Width, sprite.source.Height,
                sprite.position.X, sprite.position.Y, sprite.source.Width * sprite.scale, sprite.source.Height * sprite.scale);
        }, this);
    }
};