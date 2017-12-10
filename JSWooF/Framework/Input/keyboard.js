/**
 * Allows retrieval of keystrokes from a keyboard input device.
 *
 * @module Keyboard
 * @author Sébastien Bolduc
 * @version 0.0
 */

import KeyboardState from "/JSWooF/Framework/Input/keyboardState.js";

/**
 * Namespace for keyboard input.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.Input
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.Input = JSWooF.Framework.Input || {};

/**
 * We intitialize a kind of keyboad input manager that will tell you the state
 * of his keys.
 * @class
 * @classdesc Allows retrieval of keystrokes from a keyboard input device.
 */
export default JSWooF.Framework.Input.Keyboard = class {
    /**
     * Create a keyboard input manager.
     *  @constructs Keyboard
     */
    constructor() {
        this._keyboardState = new KeyboardState();
    }
    
    /**
     * Returns the current keyboard state.
     * @returns {KeyboardState} Current keyboard state.
     */
    get GetState() {
        return this._keyboardState;
    }
};