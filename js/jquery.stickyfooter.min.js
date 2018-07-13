/*!
 * jQuery Sticky Footer v1.2.3
 *
 * Copyright 2014 miWebb
 * Released under the MIT license
 */

(function(e,t,n){"use strict";function r(t,n){var r=e(t).outerHeight(true);e(n.content).each(function(){r+=e(this).outerHeight(true)});if(r<e(n.frame?n.frame:t.parent()).height()){e(t).addClass(n.class)}else{e(t).removeClass(n.class)}}e.fn.stickyFooter=function(n){var n=e.extend({},e.fn.stickyFooter.defaults,n);var i=this;r(i,n);e(t).resize(function(){r(i,n)});return this};e.fn.stickyFooter.defaults={"class":"sticky-footer",frame:"",content:"#page"}})(jQuery,window)
