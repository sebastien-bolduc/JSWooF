/**
 * Handle everything link to a JSON file.
 *
 * @module JSONfile
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
/**
 * Namespace for a JSONfile.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.Storage
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.Storage = JSWooF.Framework.Storage || {};

/**
 * Represents a 2D grid of texels.
 * @class
 * @classdesc Represents a 2D grid of texels.
 */
export default JSWooF.Framework.Storage.JSONfile = class {
    /**
     * Creates an uninitialized a JSON resource.
     * @constructs JSONfile
     */
    constructor() {
        this._JSONdata = null;
     
        this._promise = undefined;
    }
     
    /**
     * SPECIAL CASE:  return a 'Promise' to execute code when resolve or reject.
     * @return {Promise} Promise link with action.
     * @example
     * // JSONfile.isLoaded.then(...)
     */
    get isLoaded() {
     return this._promise;
    }
     
    /**
     * Get the data of the JSON file.
     * @returns {JSON} The JSON's data.
     */
    getData() {
     return this._JSONdata;
    }
     
    /**
     * Sets data of the JSON file.
     * @function setData
     * @param {} data - JSON's data (source JSON URL).
     */
    setData(data) {
        function loadJSON(data) {
            return fetch(data)
            .then(r => r.json(), r => null);
        }
    
        this._promise = loadJSON(data);         
        this._promise.then(data => {
            this._JSONdata = data;          // Arrow functions and non-binding of 'this'
        });
    }
};