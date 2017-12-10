/**
 * Represents a 2D grid of texels.
 *
 * @module Texture2D
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
/**
 * Namespace for a 2D texture.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder.Graphics
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};
JSWooF.Framework.GameFolder.Graphics = JSWooF.Framework.GameFolder.Graphics || {};

/**
 * Represents a 2D grid of texels.
 * @class
 * @classdesc Represents a 2D grid of texels.
 */
export default JSWooF.Framework.GameFolder.Graphics.Texture2D = class {
    /**
     * Creates an uninitialized Texture2D resource of the specified dimensions.
     * @constructs Texture2D
     * @param {number} width - Texture width.
     * @param {number} height - Texture height.
    */
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._textureData = new Image();
         
        this._promise = undefined;
    }
     
    /**
     * Gets the height of this texture resource, in pixels.
     * @returns {number} Height of this texture resource.
     */
    get Height() {
        return this._height;
    }
     
    /**
     * Gets the width of this texture resource, in pixels.
     * @returns {number} Width of this texture resource.
     */
    get Width() {
        return this._width;
    }
     
    /**
     * SPECIAL CASE:  return a 'Promise' to execute code when resolve or reject.
     * @return {Promise} Promise link with action.
     * @example
     * // Texture2D.isLoaded.then(...)
     */
    get isLoaded() {
     return this._promise;
    }
     
    /**
     * Copies texture data into an array.
     * @returns {Image} The texture's data.
     */
    getData() {
     return this._textureData;
    }
     
    /**
     * Sets data to the texture.
     * @function setData
     * @param {} data - Texture's data (source image URL).
     */
    setData(data) {
        function  loadImage(data) {
            return new Promise(resolve => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.src = data;
            });
        }
         
        this._promise = loadImage(data);
        this._promise.then(image => {
            this._textureData = image;      // Arrow functions and non-binding of 'this'
        });
    }
};