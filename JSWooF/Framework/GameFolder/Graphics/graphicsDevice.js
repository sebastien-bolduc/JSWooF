/**
 * Performs primitive-based rendering, creates resources, handles system-level 
 * variables, adjusts gamma ramp levels, and creates shaders.
 *
 * @module GraphicsDevice
 * @author Sébastien Bolduc
 * @version 0.0
 */
 
import PresentationParameters from "/JSWooF/Framework/GameFolder/Graphics/presentationParameters.js";
import Viewport from "/JSWooF/Framework/GameFolder/Graphics/viewport.js";
 
/**
 * My namespace for graphic device.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GameFolder.Graphics
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GameFolder = JSWooF.Framework.GameFolder || {};
JSWooF.Framework.GameFolder.Graphics = JSWooF.Framework.GameFolder.Graphics || {};

/**
 * Performs primitive-based rendering, creates resources, handles system-level 
 * variables, adjusts gamma ramp levels, and creates shaders.
 * @class
 * @classdesc Performs primitive-based rendering, creates resources, handles system-level variables.
 */
export default JSWooF.Framework.GameFolder.Graphics.GraphicsDevice = class {
    /**
     * Creates an instance of this object.
     * @constructs GraphicsDevice
     */
    constructor(presentationParameters) {
        this._presentationParameters = new PresentationParameters;
        
        this.PresentationParameters.BackBufferFormat = presentationParameters.BackBufferFormat;
        this.PresentationParameters.BackBufferHeight = presentationParameters.BackBufferHeight;
        this.PresentationParameters.BackBufferWidth = presentationParameters.BackBufferWidth;    
        this.PresentationParameters.DeviceWindowHandle = presentationParameters.DeviceWindowHandle;
        this.PresentationParameters.RenderTargetUsage = presentationParameters.RenderTargetUsage;
        
        this._viewport = new Viewport(0, 0, this.PresentationParameters.BackBufferWidth, this.PresentationParameters.BackBufferHeight);
        
        this._context = undefined;
        
        this.reset();
    }
    
    /**
     * Gets the graphics context.
     * @return {RenderingContext} The graphics context.
     */
    get Context() {
        return this._context;
    }
    
    /**
     * Gets the presentation parameters associated with this graphics device.
     * @return {PresentationParamaters} Presentation parameters associated with this graphics device.
     */
    get PresentationParameters() {
        return this._presentationParameters;
    }
    
    /**
     * Gets a viewport identifying the portion of the render target to receive 
     * draw calls.
     * @returns {Viewport} The viewport.
     */
    get Viewport() {
        return this._viewport;
    }
    
    /**
     * Sets a viewport identifying the portion of the render target to receive 
     * draw calls.
     * @param {Viewport} viewport - The viewport.
     */
    set Viewport(viewport) {
        this._viewport = viewport;
    }
    
    /**
     * Clears resource buffers.
     * @function clear
     */
    clear() {
        switch(this.PresentationParameters.BackBufferFormat) {
            case "2d":
                this.Context.fillStyle = "black";
                this.Context.fillRect(0, 0, this.PresentationParameters.BackBufferWidth, this.PresentationParameters.BackBufferHeight);
                break;
            default:
                this.Context.fillRect(0, 0, this.PresentationParameters.BackBufferWidth, this.PresentationParameters.BackBufferHeight);   
        }
    }
    
    /**
     * Resets the current GraphicsDevice with the specified PresentationParameters.
     * @function reset
     * @param {PresentationParameters} presentationParameters - The specified PresentationParameters.
     */
    reset(presentationParameters = undefined) {
        if (presentationParameters != undefined) {
            var child = document.getElementById(this.PresentationParameters.DeviceWindowHandle);
            this.PresentationParameters.RenderTargetUsage.removeChild(child);
            
            this.PresentationParameters.BackBufferFormat = presentationParameters.BackBufferFormat;
            this.PresentationParameters.BackBufferHeight = presentationParameters.BackBufferHeight;
            this.PresentationParameters.BackBufferWidth = presentationParameters.BackBufferWidth;    
            this.PresentationParameters.DeviceWindowHandle = presentationParameters.DeviceWindowHandle;
            this.PresentationParameters.RenderTargetUsage = presentationParameters.RenderTargetUsage;
        }
        
        if (this.PresentationParameters.RenderTargetUsage == undefined) {
            this.PresentationParameters.RenderTargetUsage = document.getElementsByTagName('body')[0];
        }
        if (this.PresentationParameters.DeviceWindowHandle == undefined) {
            this.PresentationParameters.DeviceWindowHandle = "graphicsDevice";
        }
        
        const canvas = document.createElement("canvas");                                    // Create a 'canvas' for graphics
        canvas.id = this.PresentationParameters.DeviceWindowHandle;
        canvas.height = this.PresentationParameters.BackBufferHeight;
        canvas.width = this.PresentationParameters.BackBufferWidth;
        this.PresentationParameters.RenderTargetUsage.appendChild(canvas);
        
        this._context = canvas.getContext(this.PresentationParameters.BackBufferFormat);    // Set the context
    }
};