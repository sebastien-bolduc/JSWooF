/**
 * This is a basic logic for creating an application.  Use this class as a
 * parent for your application class.
 *
 * @module App
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
/**
 * Namespace for the application logic.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.AppFolder
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.AppFolder = JSWooF.Framework.AppFolder || {};

/**
 * Initialize our application logic.
 * @class
 * @classdesc This is the point of entry of the application.
 */
export default JSWooF.Framework.AppFolder.App = class {
    /**
     * We intitialize our application.
     * @constructs App
     */
    constructor() {
    }
    
    /**
     * Call this method to initialize the application and start processing 
     * events.
     * @function run
     */
    run() {
        alert("App class... (JSWooF.AppFramework.App)");
    }
};