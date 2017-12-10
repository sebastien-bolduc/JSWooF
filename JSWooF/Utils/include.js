/**
 * Provides some 'include' utilities functions for the JSWooF Framework.
 *
 * @author Sébastien Bolduc
 * @version 0.0
 */

var JSWooFFilesIncluded = [];
var JSWooFLoadingStatus = 0;
 
/**
 * Namespace for utilities functions.
 * (We take the time to check if all namespaces are already created)
 * @namespace JSWooF.Utils
 */
if (typeof JSWooF == "undefined") {
    var JSWooF = {};
}
if (typeof JSWooF.Utils == "undefined") {
    JSWooF.Utils = {};
}

/**
 * Include a javascript file within another javascript file using one of the two
 * methods.
 * @function include
 * @param {string} url - Path to the file to include.
 * @example
 * // inlcude '/js/file.js'
 * JSWooF.Utils.include['HTML']('/js/file.js');
 * 
 * @see {@link https://codeem.co/how-do-i-include-a-javascript-file-in-another-javascript-file/}
 * @see {@link https://stackoverflow.com/questions/39162449/using-a-javascript-file-in-another-js-file}
 */
JSWooF.Utils.include = {
    
    ['HTML'](url) {
        if (!JSWooFFilesIncluded.includes(url)) {       // Check if the file(s) has not been already included
            
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            head.appendChild(script);
         
            JSWooFFilesIncluded.push(url);
            JSWooFLoadingStatus += 1;
        }
    },
    
    ['AJAX'](url) {
        var ajax = new XMLHttpRequest();
        ajax.open( 'GET', url, false );                 // <-- the 'false' makes it synchronous
        ajax.onreadystatechange = function () {
            var script = ajax.response || ajax.responseText;
            if (ajax.readyState === 4) {
                switch( ajax.status) {
                    case 200:
                        eval.apply( window, [script] );
                        console.log("script loaded: ", url);
                        break;
                    default:
                        console.log("ERROR: script not loaded: ", url);
                }
            }
        };
        ajax.send(null);
    }
    
};