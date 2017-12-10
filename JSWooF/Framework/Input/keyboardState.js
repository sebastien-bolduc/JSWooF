/**
 * Represents a state of keystrokes recorded by a keyboard input device.
 *
 * @module KeyboardState
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
/**
 * Namespace for keyboard state.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.Input
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.Input = JSWooF.Framework.Input || {};

/**
 * Keep a tabs of the keyboards state by defining 'event listener' and 'function'
 * for it.
 * @class
 * @classdesc Represents a state of keystrokes recorded by a keyboard input device.
 */
export default JSWooF.Framework.Input.KeyboardState = class {
    /**
     * Initializes a new instance of the KeyboardState class.
     * @constructs KeyboardState
     */
    constructor() {
        this._keybinding = [];      // An array of object for which we will call
                                    // the keybinding function.
        
        /**
         * @typedef {enum} Keys
         * @property {number} Key - Key code.
         * @todo This is a naive enum pattern for JavaScript...
         */
        this.Keys = {
            SPACE: "Space",
            ARROWLEFT: "ArrowLeft",
            ARROWRIGHT: "ArrowRight",
            ARROWUP: "ArrowUp",
            ARROWDOWN: "ArrowDown",
            A: "KeyA",
            D: "KeyD",
            S: "KeyS",
            W: "KeyW"
        };
        
        /**
         * @typedef {enum} KeyState
         * @property {boolean} Down - Key is pressed.
         * @property {boolean} Up - Key is released.
         * @todo This is a naive enum pattern for JavaScript...
         */
        this.KeyState = {
            Down: true,
            Up: false
        };
        
        /**
         * Returns the state of a particular key.
         */
        this.Item = new Map();
        this.Item.set("Space", false);
        this.Item.set("KeyA", false);
        this.Item.set("KeyD", false);
        this.Item.set("KeyS", false);
        this.Item.set("KeyW", false);
        this.Item.set("ArrowLeft", false);
        this.Item.set("ArrowRight", false);
        this.Item.set("ArrowUp", false);
        this.Item.set("ArrowDown", false);
        
        /**
         * @todo Get a better understanding on how this part work...
         * 'that' is being used to maintain a reference to the original 'this' even as the context is changing.
         * We are using anonymous function so we don't have to name it for the event handler.
         */
        const that = this;
        document.addEventListener("keydown", function(e) {
            that.setKeyDown(e);
            
            // Execute (call) every keybinding define by other object(s).
            that._keybinding.forEach(function(element) {
                element.callKeybinding(this);
            }, e);
            
        }, false);
        document.addEventListener("keyup", function(e) {
            that.setKeyUp(e);
        }, false);
    }
    
    /**
     * Set the state of the key(s) currently down.
     * @function setKeyDown
     * @param {event} event - The keyboard event from which we are getting the data.
     */
    setKeyDown(event) {
        this.Item.set(event.code, this.KeyState.Down);
    }
    
    /**
     * Set the state of the key(s) currently up.
     * @function setKeyUp
     * @param {event} event - The keyboard event from which we are getting the data.
     */
    setKeyUp(event) {
        this.Item.set(event.code, this.KeyState.Up);
    }
    
    /**
     * Returns whether a specified key is currently being pressed.
     * @function isKeyDown
     * @param {Keys} key - Enumerated value that specifies the key to query.
     * @returns {boolean} True if the key specified by key is being held down; false otherwise.
     */
    isKeyDown(key) {
        return this.Item.get(key);
    }
    
    /**
     * Returns whether a specified key is currently not pressed.
     * @function isKeyUp
     * @param {Keys} key - Enumerated value that specifies the key to query.
     * @returns {boolean} True if the key specified by key is not pressed; false otherwise.
     */
    isKeyUp(key) {
        return !this.Item.get(key);
    }
    
    /**
     * Add a keybinding for the specified object, which mean that we will call
     * is key binding function.
     * @function addKeybinding
     * @param {Object} object - A key binding function.
     */
    addKeybinding(object) {
        this._keybinding.push(object);
    }
};