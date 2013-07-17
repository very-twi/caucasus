/**
 * @author: Malishev Dmitry <dima.malishev@gmail.com>
 */
var _DEBUG = true;
var _DEBUG_LEVEL = 'ALL';

//
// Use shortcat for accessing Caucasus object
// it can be set to any variable that is not conflicting on page
var CAUCASUS_SHORTCUT = 'App';

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
var Caucasus = { // Main namespase of Caucasus
    // Core namespaces
    Ajax: { Busy: {} },
    Core: {},
    
    Actions: {}, // Actions. More widly used funcs
    Helpers: {},
    HTML: {
        Build: {}
    },
    Filters: {},
    Env: {
        lang: GLOBAL.lang
    },
    i18n: {},
    View:{
        HTML: {
            Build: {}
        }
    },
    Cache: {
        clear: function(){} // TODO: stub method, will be used later
    },
    Ref: {},
    Tmp: {},
    Thread: {
        run: function(callback, delay){
            setTimeout(function(){
                callback && callback();
            }, delay * 10);
        }
    },
    Settings: {},
    Templates: {
        Templator: null,
        Tpl: {},
        _indexes: {}
    }
};

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
