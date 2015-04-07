

/** nav.bar collapse
=====================================================*/


// esto en conjunto con el css que tiene la propiedad "transition" hacen el efecto entero. (ver en responsive!!)
$(window).scroll(function () {
    var value = $(this).scrollTop();
    if (value > 350)
        $(".navbarEffect").css("background-color", "#ffffff");
    else
        $(".navbarEffect").css("background-color", "#222222");
		
	if ( value > 350 )
        $(".navbarEffect").css("border-bottom", "2px solid #CD0100");
    else
        $(".navbarEffect").css("border-bottom", "5px solid #CD0100"); 
		
			if ( value > 350 )
        $(".icon-bar").css("background-color", "#222222");
    else
        $(".icon-bar").css("background-color", "#ffffff"); 
});


/** /nav.bar collpse
=====================================================*/






/** Parallax Scrolling 
=====================================================*/


$(document).ready(function(){
	// Cache the Window object
	$window = $(window);
                
   $('section[data-type="background"]').each(function(){
     var $bgobj = $(this); // assigning the object
                    
      $(window).scroll(function() {
                    
		// Scroll the background at var speed
		// the yPos is a negative value because we're scrolling it UP!								
		var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
		
		// Put together our final background position
		var coords = '50% '+ yPos + 'px';

		// Move the background
		$bgobj.css({ backgroundPosition: coords });
		
}); // window scroll Ends

 });	

}); 
/* 
 * Create HTML5 elements for IE's sake
 */

document.createElement("article");
document.createElement("section");

/** /.Parallax Scrolling 
=====================================================*/





/** Page scroll
=====================================================*/


		jQuery(function( $ ){
			/**
			 * Most jQuery.localScroll's settings, actually belong to jQuery.ScrollTo, check it's demo for an example of each option.
			 * @see http://flesler.demos.com/jquery/scrollTo/
			 * You can use EVERY single setting of jQuery.ScrollTo, in the settings hash you send to jQuery.LocalScroll.
			 */
			
			// The default axis is 'y', but in this demo, I want to scroll both
			// You can modify any default like this
			$.localScroll.defaults.axis = 'y';
			
			/**
			 * NOTE: I use $.localScroll instead of $('#navigation').localScroll() so I
			 * also affect the >> and << links. I want every link in the page to scroll.
			 */
			$.localScroll({
				target: 'body', // could be a selector or a jQuery object too.
				queue:true,
				duration:1000,
				hash:true,
				onBefore:function( e, anchor, $target ){
					// The 'this' is the settings object, can be modified
				},
				onAfter:function( anchor, settings ){
					// The 'this' contains the scrolled element (#content)
				}
			});
		});


/** /.Page scroll 
=====================================================*/





/** Carousel autostart 
=====================================================*/

		
var $ = jQuery.noConflict(); $(document).ready(function()  { $('#carousel-880369').carousel({ interval: 5000, cycle: true }); });


/** /.Carousel autostart 
=====================================================*/






