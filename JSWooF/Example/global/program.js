/**
 * This is the point of entry of the application or game.  You just have to call
 * the 'main' function for the 'Program' class to run your application or game.
 *
 * @module Program
 * @author Sébastien Bolduc
 * @version 0.0
 */

import App1 from '/JSWooF/Example/global/app1.js';

/**
 * Namespace for the program.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF
 */
var JSWooF = JSWooF || {};

/**
 * We intitialize our application or game handler.
 * @class
 * @classdesc This is the point of entry of the application or game.
 */
export default JSWooF.Program = class {
    /**
     * We intitialize our application or game handler.
     * @constructs Program
     */
    constructor() {
        this.program = {};
    }
    
    /**
     * The main entry point for our application or game.
     * @function main
     */
    main() {
        this.program = new App1();
        this.program.run();
    }
};