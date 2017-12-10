/**
 * The ContentManager is the run-time component which loads managed objects from 
 * the binary files produced by the design time content pipeline. It also manages 
 * the lifespan of the loaded objects, disposing the content manager will also 
 * dispose any assets which are themselves IDisposable.
 * 
 * @module ContentManager
 * @author Sébastien Bolduc
 * @version 0.0
 */

import JSONfile from "/JSWooF/Framework/Storage/JSONfile.js";
import Texture2D from "/JSWooF/Framework/GameFolder/Graphics/texture2D.js";

/**
 * Namespace for the content manager.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder.Content
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};
JSWooF.Framework.GameFolder.Content = JSWooF.Framework.GameFolder.Content || {};

/**
 * Loads managed objects from the binary files produced by the design time 
 * content pipeline. It also manages the lifespan of the loaded objects.
 * @class
 * @classdesc Loads managed objects from the binary files produced by the design time content pipeline.
 */
export default JSWooF.Framework.GameFolder.Content.ContentManager = class {
    /**
     * Initializes a new instance of ContentManager.
     * @constructs ContentManager
     */
    constructor() {
        this._rootDirectory = undefined;
    }
    
    /**
     * Gets the root directory associated with this ContentManager.
     * @returns {string} The root directory for content.
     */
    get RootDirectory() {
        return this._rootDirectory;
    }
    
    /**
     * Sets the root directory associated with this ContentManager.
     * @param {string} rootDirectory - The root directory for content.
     */
    set RootDirectory(rootDirectory) {
        this._rootDirectory = rootDirectory;
    }
};


/**
 * Loads an asset that has been processed by the Content Pipeline.
 * @param {string} assetName - Asset name, relative to the loader root directory.
 * @example
 * // load '/Content/tiles.png'
 * JSWooF.Framework.GameFolder.Content.ContentManager.load['Texture2D']('/Content/tiles.png');
 */
JSWooF.Framework.GameFolder.Content.ContentManager.prototype.load = {
    ['JSON'](assetName) {
        const jsonFile = new JSONfile();
        jsonFile.setData(assetName);
        return jsonFile;
    },
    
    ['Texture2D'](assetName) {
        const texture2D = new Texture2D();
        texture2D.setData(assetName);
        return texture2D;
    }
};