/**
 * Main menu for every application or game access by pressing the 'ESC' key and
 * allowing the user to load different example or change the settings.
 *
 * @module Menu
 * @author Sébastien Bolduc
 * @version 0.0
 */

import ContextMenu from "/JSWooF/Framework/GUI/contextMenu.js";
import Keyboard from "/JSWooF/Framework/Input/keyboard.js";
 
/**
 * Namespace for the menu.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF
 */
var JSWooF = JSWooF || {};

/**
 * We intitialize our menu.
 * @class
 * @classdesc Main menu for every application or game.
 */
export default JSWooF.Menu = class {
    /**
     * We intitialize our menu.
     * @constructs Menu
     */
    constructor() {
        this.currentContextMenu = "menu";
        this.keyboardInput = new Keyboard();
        
        this.generate();
    }
    
    /**
     * Define a keybinding for this object ('Esc' for context menu).
     * @function callKeybinding
     * @param {Event} event - Result of the 'keydown' event.
     */
    callKeybinding(event) {
        if (event.code == "Escape") {
            if (document.getElementById(this.currentContextMenu).style.display == "none") {
                document.getElementById("menu").style.display = "inline";
            } else {
                document.getElementById(this.currentContextMenu).style.display = "none";
                this.currentContextMenu = "menu";
            }
        }
    }
    
    /**
     * Generate the context menu.
     * @function generate
     */
    generate() {
        const contextMenu = new ContextMenu();                      // We Create a context menu
        contextMenu.id = "menu";
        contextMenu.headerTitle = "MENU";
        // ---------------------------------------------------------------MENU--
        contextMenu.addSelect("Choose an example", "example", 
            "window.location.assign('https://jswoof-sebastien-bolduc.c9users.io/index.html?e=' + document.getElementById('example').options[document.getElementById('example').selectedIndex].value)", 
            ['0', '0', '1', '2', '3'], ['(choose)', 'main', 'example 1 (mario game)', 'example 2', 'example 3']);
        contextMenu.addButton("document.getElementById('menu').style.display = 'none';" +
            "window.JSWooFprogram.program.menu.currentContextMenu='about'; document.getElementById('about').style.display = 'inline';", 
            "About this context menu...");
        contextMenu.generate();
        // ---------------------------------------------------------------------
        
        const contextMenuAbout = new ContextMenu();                 // The 'about...' context menu
        contextMenuAbout.id = "about";
        contextMenuAbout.headerTitle = "ABOUT...";
        // -----------------------------------------------------------ABOUT...--
        contextMenuAbout.addText("You can use this menu to navigate through the different examples program.  " +
            "You can always access this menu by pressing the 'ESC' key.  (last update: 04/12/2017)");
        contextMenuAbout.addButton("document.getElementById('about').style.display = 'none';" +
            "window.JSWooFprogram.program.menu.currentContextMenu='menu'; document.getElementById('menu').style.display = 'inline';", 
            "<-- Go back");
        contextMenuAbout.generate();
        // ---------------------------------------------------------------------
        
        (this.keyboardInput.GetState).addKeybinding(this);          // Define a keybinding for this object
    }
};