/**
 * This is a test application.
 *
 * @module App1
 * @author Sébastien Bolduc
 * @version 0.0
 */

import App from "/JSWooF/Framework/AppFolder/app.js";
import Menu from "/JSWooF/Example/global/menu.js";

/**
 * Namespace for the application.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF
 */
var JSWooF = JSWooF || {};

/**
 * We intitialize our application.
 * @class
 * @classdesc This is the point of entry of the application.
 */
export default JSWooF.App1 = class extends App {
    /**
     * We intitialize our application.
     * @constructs App1
     */
    constructor() {
        super();                        // Call the parent class constructor
        
        this.menu = new Menu();         // Main menu for every application or game
    }
    
    /**
     * Call this method to initialize the application and start processing 
     * events.
     * @function run
     */
    run() {
        var div = document.getElementById("mainContent");           // Set the brief description text
        var tmpParagraph = document.createElement("p");
        var tmpTextNode = document.createTextNode("Welcome to JSWooF! (JavaScript Web object-oriented Framework).  " +
            "This is example 2 !!!" );
        tmpParagraph.appendChild(tmpTextNode);
        div.appendChild(tmpParagraph);
    }
};