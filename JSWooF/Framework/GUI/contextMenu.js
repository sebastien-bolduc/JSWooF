/**
 * Define a context menu (also called contextual, shortcut, and popup or pop-up menu)
 * that appears upon user interaction.  A context menu offers a limited set of choices 
 * that are available in the current state, or context, of the application to which 
 * the menu belongs. 
 *
 * @module ContextMenu
 * @author Sébastien Bolduc
 * @version 0.0
 */

/**
 * Namespace for the context menu.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Framework.GUI
 */
var JSWooF = JSWooF || {};
JSWooF.Framework = JSWooF.Framework || {};
JSWooF.Framework.GUI = JSWooF.Framework.GUI || {};

/**
 * Inititialize and manage our context menu.
 * @class
 * @classdesc Define a context menu that appears upon user interaction.
 */
export default JSWooF.Framework.GUI.ContextMenu = class {
    /**
     * We intitialize our context menu.
     * @constructs ContextMenu
     */
    constructor() {
        this.id = undefined;
        this.headerTitle = undefined;
        
        // Structure for a button element
        this.buttonElement = function() {
            return {
                tagName: "button",
                onClick: null,
                text: null
            };
        };
        
        // Structure for a select element
        this.selectElement = function() {
            return {
                desc: null,
                tagName: "select",
                id: null,
                onChange: null,
                value: null,
                text: null
            };
        };
        
        // Structure for a text element
        this.textElement = function() {
            return {
                tagName: "p",
                text: null
            };
        }
        
        // List of element(s) to generate
        this.elementList = [];
    }
    
    /**
     * Add a button to the menu.
     * @function addButton
     * @param {string} onClickEvent - HTML for the 'onclick' event.
     * @param {string} text - Text to display on the button.
     */
    addButton(onClickEvent = "", text = "") {
        const element = this.buttonElement();
        
        element.onClick = onClickEvent;
        element.text = text;
        
        this.elementList.push(element);
    }
    
    /**
     * Add a drop-down list to the menu.
     * @function addDropDown
     * @param {string} desc - Short description for the drop-down list.
     * @param {string} id - Name for the tag.
     * @param {string} onChangeEvent - HTML for the 'onchange' event.
     * @param {string} value - Value of the selected item.
     * @param {string} text - Text for the selected item.
     */
    addSelect(desc, id, onChangeEvent, value, text) {
        const element = this.selectElement();
        
        element.desc = desc;
        element.id = id;
        element.onChange = onChangeEvent;
        element.value = value;
        element.text = text;
        
        this.elementList.push(element);
    }
    
    /**
     * Add text to the menu.
     * @function addText
     * @param {string} text - Test to display in the menu.
     */
    addText(text) {
        const element = this.textElement();
        
        element.text = text;
        
        this.elementList.push(element);
    }
    
    /**
     * Generate a context menu (meaning we are generating the HTML code for it).
     * @function generate
     */
    generate() {
        const body = document.getElementsByTagName('body')[0];
        const div = document.createElement('div');
        div.id = this.id;
        div.style = "width: fit-content; height: fit-content; background-color: #92a8d1; box-shadow: 10px 10px 5px #888888; text-align: center; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; padding: 20px; display: none;";
        
        // Header
        const header = document.createElement("h2");
        header.style = "color: white;";
        const headerTextNode = document.createTextNode(this.headerTitle);
        header.appendChild(headerTextNode);
        div.appendChild(header);
        
        // Thematic change
        const thematicChange = document.createElement("hr");
        thematicChange.style = "width: 100%;";
        div.appendChild(thematicChange);
        
        // Line break
        const lineBreak = document.createElement("br");
        div.appendChild(lineBreak);
        
        // Element(s)
        var tmpParagraph = undefined;
        var tmpElement = undefined;
        var tmpTextNode = undefined;
        this.elementList.forEach(function(element) {
            switch(element.tagName) {
                
                case "button":
                    tmpParagraph = document.createElement("p");
                    tmpParagraph.innerHTML = "<button onclick=\"" + element.onClick + "\">" + element.text + "</button>";
                    div.appendChild(tmpParagraph);
                    break;
                
                case "select":
                    tmpElement = "";
                    for (var i = 0; i < element.value.length; i++) {
                        tmpElement += "<option value=\"" + element.value[i] + "\">" + element.text[i] + "</option>";
                    }
                    
                    tmpParagraph = document.createElement("p");
                    tmpParagraph.style = "color: white;";
                    tmpParagraph.innerHTML = element.desc + ": <select id=\"" + element.id +"\" onchange=\"" + element.onChange + "\">" + tmpElement + "</select>";
                    div.appendChild(tmpParagraph);
                    break;
                    
                case "p":
                    tmpParagraph = document.createElement("p");
                    tmpParagraph.style = "color: white;";
                    tmpTextNode = document.createTextNode(element.text);
                    tmpParagraph.appendChild(tmpTextNode);
                    div.appendChild(tmpParagraph);
                    break;
                
                default:
                    tmpParagraph = document.createElement("p");
                    tmpParagraph.style = "color: white;";
                    tmpTextNode = document.createTextNode("(Element not recognized)");
                    tmpParagraph.appendChild(tmpTextNode);
                    div.appendChild(tmpParagraph);
                    
            }
        }, this);
        
        body.appendChild(div);
    }
};