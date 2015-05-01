jQuery(function($) {

//Define DB variables as needed

//Detect User's Device type
var mobilePlatforms = ['iPhone', 'iPad', 'iPod', 'Android', 'Linux armv7l', 'WinCE'];
	       isMobile = false;
	       iDevice  = false;
		   isDroid  = false;
		       plat = navigator.platform;
		   
if(plat === 'iPhone' || plat === 'iPad' || plat === 'iPod') {
	isMobile = true;
	iDevice  = true;
}
else if (plat === 'Linux armv7l' || plat === 'Android') {
	isMobile = true;
	isDroid  = true;
}
else {
	for (var i = 0; i < mobilePlatforms.length; i++) {
		if (plat === mobilePlatforms[i]) {
			isMobile = true;
			break;
		}
		else {
			isMobile = false;
		}
	}
}

//Abstract Hover Effects
var exeAnim = function(el, trig, child) {
	$(el).hoverIntent(function(){
		$(this).addClass(trig);
		$(this).children(child).addClass(trig);
	}, function(){
		$(this).removeClass(trig);
		$(this).children(child).removeClass(trig);
	});
}

//Return a random object or value from an array
var randomizer = function(theArray) {
	var result = theArray[Math.floor(Math.random() * (theArray.length))];
	return(result);
}

//Make dropdowns drop down
var dropDown = function(trig, el) {
	if(isMobile == true && $(window).width() > 770) {
		$(trig).bind('click touchstart',function(e){
			e.preventDefault();
			$(this).find(el).slideToggle(400);
		});	
	}
	else {
		$(trig).hoverIntent(function(){
			$(this).find(el).slideToggle(400);
		}, function(){
			$(this).find(el).slideToggle(400);
		});			
	}
}

//Mobile Nav Toggle
var toggleNav = function(trig,tar,cls) {
	$(trig).click(function(){
		$(tar).slideToggle(600,'easeInCubic');
		$(this).toggleClass(cls);
	});
}

//Change text based on screen size
var toggleText = function(tar,newContent,oldContent) {
	if($(window).width() < 770) {
		$(tar).html(newContent);
	}
	else {
		$(tar).html(oldContent);
	}
}

//Scroll back to top
var backToTop = function(trig) {
	$(trig).on('click touchend', function(){
		$('html,body').animate({scrollTop: 0},600);
	});
}

//Add placeholder text to form requires ../scripts/lib/input-placeholder/placeholder.js
var placeholder = function(el, att) {
	$(el).example(function() {
		return $(this).attr(att);
	});
}

//Set stubborn parent to child's height (when child is absolutely positioned or otherwise outside the normal cascade)
var adjustParent = function(parent,child) {
	var childHeight = $(child).height();
	$(parent).height(childHeight);
}

//Engine for testimonial widget
var testimonialWidget = function(item,time,fadeTime) {
	var testimonials = []
	$(item).each(function(){
		testimonials.push($(this));
		$(this).hide();
	});
	var i = 0;
	testimonials[i].show();
	setInterval(function(){
		if(i <= testimonials.length -2) {i = i + 1;}
		else {i = 0;}
		$(item).each(function(){
			$(this).hide();
		});
		testimonials[i].fadeIn(fadeTime);
	},time);
}

var checkXP = function(e) {
    if (e.indexOf("windows nt 5.1") >= 0 || e.indexOf("windows nt 5.2") >= 0) {
        isXP = true
    }
}/*exe*/checkXP(navigator.userAgent.toLowerCase());

//Run the horizontal sliding functionality
var xScroll = function(wrap, target, pageID, item, margin, value) {
	horizontalDistanceThreshold = window.devicePixelRatio >= 2 ? 15 : 30;
	verticalDistanceThreshold = window.devicePixelRatio >= 2 ? 15 : 30; 

	//Get the width of all of the sections in each scrolling area + 20px each for margin
	var getXWidth = function() {
		$(pageID).find(item).each(function(i){
			value = (value + $(this).width()) + margin
		});
		return value
	}

	//Set each section to be the same with as it's container (bootstrap in this case) //Set margin on each item
	$(item).each(function(){
		var setWidth = $(wrap).width();
		$(this).css({
			'width'       : setWidth,
			'margin-right' : margin
		});
	})

	//Set the width of the parent container to the value of getXWidth()
	$(pageID).find(target).width(getXWidth());

	//Move to appropriate x axis when buttons on initial images are clicked
	function goToSlide(cut) {
		//Match button to corresponding slide
		$(pageID).find('.data-points').each(function(){
			var assocDiv = $(pageID + '-' + $(this).attr('id').slice(cut).toString());
			$(this).bind('click touchend',function(){
				$(pageID).find(target).animate({'margin-left': -assocDiv.position().left},800,'easeInQuint');
				checkNext();
			});
		});

		//Go back to main (original) horizontal section
		$('.go-to-main').click(function(){
			$(this).parents(pageID).find(target).animate({'margin-left': 0},800,'easeInQuint');
			hasNext = true;
		});

		//Cycle between slides using buttons
		var hasNext = true;
		var nextFeature = function(){
			var w = parseInt($(pageID).find(target).width());
			var a = parseInt($(pageID).find(target).css('margin-left')) - $(item).width() - margin;
			var p = -(w - parseInt($(item).css('width')) - margin);
			if(a >= p){
				$(this).parents(pageID).find(target).animate({
				'margin-left': a
				},800,'easeInQuint');
			}
			else {
				hasNext = false;
			}
			checkNext();
		}
		var lastFeature = function(){
			var a = parseInt($(pageID).find(target).css('margin-left')) + $(item).width() + margin;
			if(a <= 0){
				console.log(a)
				$(this).parents(pageID).find(target).animate({
					'margin-left': a
				},800,'easeInQuint');
				hasNext = true;
				checkNext();
			}
		}
	    // Fix Android Kitkat known bug https://github.com/jquery/jquery-mobile/issues/5534
	    // Solution found: https://developer.motorolasolutions.com/thread/4802 (Thanks!)
		var startLoc = null;  
		$('body').on( 'touchstart', function(e){  
			if(e.originalEvent.touches.length == 1){ 
			// one finger touch  
			// Remember start location.  
				var touch = e.originalEvent.touches[0];  
				startLoc  = {x : touch.pageX, y : touch.pageY};  
			}  
		});  
		$('body').on('touchmove', function(e){  
		// Only check first move after the touchstart.  
			if(startLoc){  
				var touch = e.originalEvent.touches[0];  
				// Check if the horizontal movement is bigger than the vertical movement.  
				if( Math.abs(startLoc.x - touch.pageX) >  
					Math.abs(startLoc.y - touch.pageY)){  
					// Prevent default, like scrolling.  
					e.preventDefault();  
				}  
			startLoc = null;  
			}  
		});

		//Execute 'goToSlide' on click and touch events 
		$('.next-feature').on('click', nextFeature);
		$('.last-feature').on('click', lastFeature);
		$(item).on('swipeleft', nextFeature);
		$(item).on('swiperight', lastFeature);

		//highlight "last feature" and "back to main" options when the end of the horizontal content has been reached
		function checkNext(){
			var highlights = $(pageID).find('.last-feature, .go-to-main');
			if(hasNext == false) {
				highlights.css({
					'background': '#FF6600'
				});
			}
			else {
				highlights.css({
					'background': '#112B53'
				});
			}
		}
	}
	goToSlide(12);
}

//Set Random Testimonial to homepage - truncate text to no more than 175 characters and add "..."
var setTestimonial = function(testimonialWrap, newClass, iterator, theArray, truncateThis) {
	$(testimonialWrap).each(function(){
		newClass = newClass + iterator;
		theArray.push('.' + newClass)
		$(this).addClass(newClass.toString());
	});
	var val = randomizer(theArray);
	$(testimonialWrap + val).css('display', 'block');
	
	var p = $(testimonialWrap + val).find(truncateThis).text();
	for (var i = 0; i < p.length; i++) {
		if (i === 175 || p.length) {
			p = p.substring(0,175);
			break;
		}
	}
	$(truncateThis).text(p + '...');
}
setTestimonial('.testimonial-box-wrapper', 0, 1, [], '.quote-text');

//Pass each overlay a random directional class
$('.three-boxes-overlay').each(function(){
	$(this).addClass(randomizer(['overlay-left','overlay-right','overlay-top','overlay-bottom']));
});

//Payment Calculator

$(el).keyup(function () {
    var theTerm = parseInt($("#theTerm").val(), 10);
    var theRate = parseFloat($("#theRate").val(), 10);
    var thePrice = parseInt($("#thePrice").val(), 10);
    var theTax = parseFloat($("#theTax").val(), 10);
    var theDown = parseInt($("#theDown").val(), 10);
    var theTrade = parseInt($("#theTrade").val(), 10);
    var theResult = (Math.ceil((((thePrice * (1 + (theTax / 100)) - theTrade - theDown)) * (1 + (theRate / 100))) / (theTerm) * 100) / 100);
    theResult = isFinite(theResult) && theResult || 0;
    $("#theResult").val(theResult);
});



}
