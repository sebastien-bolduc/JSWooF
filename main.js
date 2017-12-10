/**
 * Since we are using ES6 module, we create a small starting program for our
 * game or application.  It purpose is to simply 'import' the 'program.js' file
 * and call the 'main' function to execute the progam.
 *
 * @module Main
 * @author Sébastien Bolduc
 * @version 0.0
 */

// Check the URL for the example (program) to load
const urlString = window.location.href;
const url = new URL(urlString);
const e = url.searchParams.get("e");
console.log(window.location.href);
console.log(e);

// ------------------------------- import script -------------------------------
var innerHTML = "";
switch(e) {
    case "1":
        innerHTML = "import Program from \"/JSWooF/Example/example_1/program.js\";";
        break;
    case "2":
        innerHTML = "import Program from \"/JSWooF/Example/example_2/program.js\";";
        break;
    case "3":
        innerHTML = "import Program from \"/JSWooF/Example/example_3/program.js\";";
        break;
    default:
        innerHTML = "import Program from \"/JSWooF/Example/global/program.js\";";
}
innerHTML += "export const JSWooFprogram = new Program(); JSWooFprogram.main(); window.JSWooFprogram = JSWooFprogram;";

const head = document.getElementsByTagName('head')[0];
const script = document.createElement("script");
script.type = "module";
script.innerHTML = innerHTML;
head.appendChild(script);
// ------------------------------- import script -------------------------------