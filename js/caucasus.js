/**
 * Caucasus is fully powered high level basic application structure
 * shipped with usefull methods, utils, objects, widgets, libraries and 
 * ui elements.
 * 
 * @author: Malishev Dmitry <dima.malishev@gmail.com>
 */
var _DEBUG = true;
var _DEBUG_LEVEL = 'ALL';

//
// Use shortcat for accessing Caucasus object
// it can be set to any variable that is not conflicting on page
var CAUCASUS_SHORTCUT = 'App';

//
//  SYSTEM SETTINGS
//
SYSTEM = {};
SYSTEM.PATH = '/';
SYSTEM.USE_TEMPLATOR = true; // use build in templator or not. see templates.js

//
//  GLOBAL SETTINGS
//
GLOBAL = {};
GLOBAL.lang = 'en';
GLOBAL.ajax_url = '/'; // set correct link 

/**
 * Init debug, grabs console object if accessible, or makes dummy debugger
 */
var fb = _DEBUG && 'undefined' != typeof(console) ? console : {
    log         : function(){},
    debug       : function(){},
    info        : function(){},
    warn        : function(){},
    error       : function(){},
    assert      : function(){},
    dir         : function(){},
    dirxml      : function(){},
    trace       : function(){},
    group       : function(){},
    groupEnd    : function(){},
    time        : function(){},
    timeEnd     : function(){},
    profile     : function(){},
    profileEnd  : function(){},
    count       : function(){},
    msg         : function(){}
};

//
// Main namespase of Caucasus
//
var Caucasus = {};

//
// Top level sub-namespace objects
//
Caucasus.Actions    = {};
Caucasus.Ajax       = {};
Caucasus.Cache      = {};
Caucasus.Core       = {};
Caucasus.ENV        = {};
Caucasus.Filters    = {};
Caucasus.Helpers    = {};
Caucasus.Html       = {};
Caucasus.i18n       = {};
Caucasus.Ref        = {};
Caucasus.Settings   = {};
Caucasus.Templates  = {};
Caucasus.Tmp        = {};
Caucasus.Thread     = {};
Caucasus.Utils      = {};
Caucasus.Widgets    = {};

//
//
// Pre run method
Caucasus.pre_run = function() {
    // load necessary libraries
    if (SYSTEM.USE_TEMPLATOR == true) {
        Caucasus.Utils.load_script(SYSTEM.PATH + 'templates.js')
    }
}

// Internals
Array.prototype.set = function(key, value){
    var index = this[0][key];
    this[1][index] = value;
}
Array.prototype.get = function(key){
    var index = this[0][key];
    return this[1][index];
}
Array.prototype.finalize = function(){
    this.shift();
    this[0] = this[0].join('');
    return this[0];
}
Array.prototype.done = function(){
    return this.join('');
}

String.prototype.wrapperize = function(key, ns){
    var tpl = App.Templates.get(key, ns);
    tpl.set(':content', this);

    return tpl.finalize();
}

Caucasus.Ajax.request = function(method, data, callback, onError){
    
}

/**
 * Timer used for profiling
 */
var timer = {};
timer.start = function()
{
    timer.start_time = new Date();
}

timer.stop = function( msg )
{
    timer.stop_time = new Date();
    timer.print( msg );
}

timer.print = function( msg )
{
    var passed = timer.stop_time - timer.start_time;
    fb.info( msg || '' + passed / 1000 );
}

/**
 * Faster trim function
 */
String.prototype.trim = function()
{
    var str = this;
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
        break;
        }
    }
    return str;
}

window[CAUCASUS_SHORTCUT] = Caucasus;


//
// CAUCASUS INTERNALS
//

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - HELPERS - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Format number in following formats: xxx,xxx.xx or xxxxxx.xx
 * 
 * @param number        Number that will be formatted
 * @param no_commas     ignore thouthands separated by commas flag
 */
App.Helpers.formatNumber = function(number, no_commas){
    no_commas = no_commas || false;
    number = number.toString().replace(/,/g, '');
       
    var nStr = parseFloat(number).toFixed(2);
    nStr = nStr.toString();
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    if(!no_commas){
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
    }
    return x1 + x2;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - UTILS - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Dynamically load and embed custom javascript file to current page
 * 
 * @param path  path to javascript file
 */
Caucasus.Utils.load_script = function(path) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= path;
    head.appendChild(script);
}

/**
 * Unload javascriptscript file from current page
 * 
 * @param path  path to javascript file
 */
Caucasus.Utils.unload_script = function(path) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.src.search(path) != -1) {
            document.getElementsByTagName('head')[0].removeChild(script);
        }
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - CAUCASUS PRE RUN - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Caucasus.pre_run();

