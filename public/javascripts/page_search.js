/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 9/11/2008
 * @author Ariel Flesler
 * @version 1.4
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(h){var m=h.scrollTo=function(b,c,g){h(window).scrollTo(b,c,g)};m.defaults={axis:'y',duration:1};m.window=function(b){return h(window).scrollable()};h.fn.scrollable=function(){return this.map(function(){var b=this.parentWindow||this.defaultView,c=this.nodeName=='#document'?b.frameElement||b:this,g=c.contentDocument||(c.contentWindow||c).document,i=c.setInterval;return c.nodeName=='IFRAME'||i&&h.browser.safari?g.body:i?g.documentElement:this})};h.fn.scrollTo=function(r,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};a=h.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=h(k),d=r,l,e={},p=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(px)?$/.test(d)){d=n(d);break}d=h(d,this);case'object':if(d.is||d.style)l=(d=h(d)).offset()}h.each(a.axis.split(''),function(b,c){var g=c=='x'?'Left':'Top',i=g.toLowerCase(),f='scroll'+g,s=k[f],t=c=='x'?'Width':'Height',v=t.toLowerCase();if(l){e[f]=l[i]+(p?0:s-o.offset()[i]);if(a.margin){e[f]-=parseInt(d.css('margin'+g))||0;e[f]-=parseInt(d.css('border'+g+'Width'))||0}e[f]+=a.offset[i]||0;if(a.over[i])e[f]+=d[v]()*a.over[i]}else e[f]=d[i];if(/^\d+$/.test(e[f]))e[f]=e[f]<=0?0:Math.min(e[f],u(t));if(!b&&a.queue){if(s!=e[f])q(a.onAfterFirst);delete e[f]}});q(a.onAfter);function q(b){o.animate(e,j,a.easing,b&&function(){b.call(this,r,a)})};function u(b){var c='scroll'+b,g=k.ownerDocument;return p?Math.max(g.documentElement[c],g.body[c]):k[c]}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);

var firstFound;

$.expr[':'].containsIgnoreCase = function(a,i,m){
return $(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

$.fn.search = function(searchElements) {
  $(this).keyup(function(){
    var searchString = $(this).val();
    if (searchString.length > 0){
     //$(searchElements).hide();
		$(searchElements).removeClass("found_string");
		var found =  $(searchElements).filter(':containsIgnoreCase(' +searchString+ ')');
		if (found.length > 0 ) {
			found.addClass("found_string");
			firstFound = found.eq(0);
			$.scrollTo( firstFound, 300, {offset: -30});
		}
    }
    else {
     // $(searchElements).show();
	 $(searchElements).removeClass("found_string");
	 
    }
  });
};


$(document).ready(function(){

$("body").prepend('<div class="page-search-wrapper"><input id="inline-search" class="search-bar page-search-start" value="Search on this page" type="text" title="Search"><span class="search-display" title="Close search bar">X</span></div>')

$('input#inline-search').one("mousedown", function() {
	$(this).removeClass("page-search-start").val("");
	$(this).focus();
});

$('input#inline-search').search('td');

  $('.search-display').hover(function() {
		$(this).addClass('search-display-over');
	}, function() {
		$(this).removeClass('search-display-over');
	}).click(function() {
		$(this).parent().hide(400);
	}); 
  
  
});



/*

$.expr[':'].containsIgnoreCase = function(a,i,m){
return $(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

$(searchElements+':contains(' +searchString+ ')').show();

$(searchElements).filter(':containsIgnoreCase(' +searchString+ ')').show();

*/









