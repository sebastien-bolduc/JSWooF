/**
 * Allows retrieval of position and button clicks from a mouse input device.
 *
 * @module Mouse
 * @author Sébastien Bolduc
 * @version 0.0
 */

import MouseState from "/JSWooF/Framework/Input/mouseState.js";

/**
 * Namespace for mouse input.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.Input
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.Input = JSWooF.Framework.Input || {};

/** 
 * We intitialize a kind of mouse input manager that will tell you the state
 * of his device.
 * @class
 * @classdesc Allows retrieval of position and button clicks from mouse input device. 
 */
export default JSWooF.Framework.Input.Mouse = class {
    /**
     * Create a mouse type.
     * @constructs Mouse
     * @param {string} elementId - Element on which we want to monitor the mouse event.
     * @param {number} x - The horizontal position of the mouse cursor.
     * @param {number} y - The vertical position of the mouse cursor.
     */
    constructor(elementId, x, y) {
        this._mouseState = new MouseState(elementId, x, y);
    }

    /**
     * Gets the current state of the mouse, including mouse position and buttons 
     * pressed.
     * @return {MouseState} The mouse state.
     */
    get GetState() {
        return this._mouseState;
    }
};