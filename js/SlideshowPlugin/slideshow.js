jQuery.fn.slideshow_script = function(){
    /** Element variables */
    var $container = jQuery(this),
        $controlPanel = $container.find('.controlPanel'),
        $togglePlayButton = $controlPanel.find('.togglePlay'),
        $nextButton = $container.find('.next'),
        $previousButton = $container.find('.previous'),
        $slideshow = $container.find('.slideshow'),
        $slides = $slideshow.find('.slide');

    /** Settings */
    var $settings = jQuery.parseJSON($container.find('.settings').text());
    jQuery.each($settings, function(setting, value){ // Convert 'true' and 'false' to boolean values.
        if(value == 'true')
            $settings[setting] = true;
        else if(value == 'false')
            $settings[setting] = false;
    });

    /** Set container width to parent width if 0 */
    if($container.width() <= 0)
        $container.css({ width: $container.parent().width() });

    /** Misc */
    var	$numberSlidesVisible = 3,
        $buttonsActive = false,
        $interval = '',
        $currentSlideId = 0,
        $currentViewId = 0,
        $slideWidth = $container.width() / $settings['slidesPerView'];

    init();
    /**
     * Initialize the slideshow
     */
    function init(){
        var slidePosition = 0;
        var totalWidth = 0;

        // Prepare slides with their descriptions
        jQuery.each($slides, function(key, slide){
            // Delete margin and padding from the sides of the view
            if(slidePosition <= 0)
                jQuery(slide).css({
                    'padding-left': 0,
                    'margin-left': 0
                });
            if(slidePosition >= $settings['slidesPerView'] - 1)
                jQuery(slide).css({
                    'padding-right': 0,
                    'margin-right': 0
                });

            // Adapt the width of the slides to their margin and padding, so nothing will fall off-screen
            var thisSlideWidth = $slideWidth - (jQuery(slide).outerWidth(true) - jQuery(slide).width());
            jQuery(slide).css({ width: thisSlideWidth });
	        totalWidth += jQuery(slide).outerWidth(true);

            // If the user want the images stretched, stretch it!
            if($settings['stretchImages'])
                jQuery(slide).find('img').css({ width: jQuery(slide).width(), height: jQuery(slide).height() });

            // Hide descriptionbox if wanted.
            var description = jQuery(slide).find('.description');
            if($settings['showDescription']){
                if($settings['hideDescription'])
                    description.css({ marginBottom: '-' + description.outerHeight(true) + 'px' });
	            else
					description.css({ height: $settings['descriptionHeight'] });

                description.css({ display: 'inline' });
            }

            // Count in what position of the view this slide is in.
            slidePosition++;
            if(slidePosition >= $settings['slidesPerView'])
                slidePosition = 0;
        });

        // Set width of slideshow and adjust it's settings so we can move it.
        $slideshow.css({
            width: totalWidth,
            float: 'none',
            position: 'absolute',
            top: 0,
            left: 0
        });

        // If controlpanel is visible and autoplay is enabled, show pause button
        if($settings['controlPanel'] && $settings['play'])
            togglePlay(true); // Only changes button to correct image

        // Start playing (resetInterval() checks for $settings['play'] option
        resetInterval();

        // Enable buttons
        if($settings['controllable']){
            var style = { display: 'inline' };
            $nextButton.css(style);
            $previousButton.css(style);
            $buttonsActive = true;
        }
    }

    /**
     * Jump to view of slides
     *
     * @param int viewId
     */
    function gotoView(viewId){
        if(!viewId || viewId * $settings['slidesPerView'] > $slides.length)
            viewId = 0;

        var position = 0;
        var slidePosition = $slideshow.find('.slide_' + (viewId * $settings['slidesPerView'])).position();
        if(slidePosition)
            var position = '-=' + (slidePosition.left - Math.abs($slideshow.position().left));

        $buttonsActive = false;

	    if($settings['animation'] == 'fade'){
		    $slideshow.fadeOut(parseInt($settings['slideSpeed'] * 1000) / 2);
		    setTimeout(function(){
			    $slideshow.css({ left: position });
			    $slideshow.fadeIn(parseInt($settings['slideSpeed'] * 1000) / 2);
		    }, parseInt($settings['slideSpeed'] * 1000) / 2);
	    }else{
		    $slideshow.animate({
			    left: position
		    }, parseInt($settings['slideSpeed'] * 1000));
	    }

        setTimeout(function(){ $buttonsActive = true; }, parseInt($settings['slideSpeed'] * 1000));
    }

    /**
     * Makes use of function gotoView(viewId) to jump to the next view
     */
    function nextView(){
        $currentViewId++;
        if($currentViewId * $settings['slidesPerView'] > $slides.length){
	        if(!$settings['loop']){
		        $currentViewId--;
	            return;
	        }

            $currentViewId = 0;
        }

        gotoView($currentViewId);
    }

    /**
     * Makes use of function gotoView(viewId) to jump to the previous view
     */
    function previousView(){
        $currentViewId--;
        if($currentViewId < 0){
	        if(!$settings['loop']){
		        $currentViewId++;
	            return;
	        }

            $currentViewId = Math.floor($slides.length / $settings['slidesPerView']);
        }

        gotoView($currentViewId);
    }

    /**
     * Called when clicked on next button
     */
    $nextButton.click(function(){
        if($buttonsActive){
	        resetInterval();
            nextView();
        }
    });

    /**
     * Called when clicked on previous button
     */
    $previousButton.click(function(){
        if($buttonsActive){
	        resetInterval();
            previousView();
        }
    });

    /**
     * Called when clicked on togglePlay button
     */
    $togglePlayButton.click(function(){
        togglePlay();
    });

    /**
     * Toggles play
     */
    function togglePlay(adaptButton){
	    if(!adaptButton){
            $settings['play'] = !$settings['play'];
            resetInterval();
	    }

        if($settings['play'])
            $togglePlayButton.attr('class', 'pause');
        else
            $togglePlayButton.attr('class', 'play');
    }

    /**
     * Called when mouse enters the container
     */
    $container.mouseleave(function(){
        $controlPanel.stop(true, true).fadeOut('slow');
    });

    /**
     * Called when mouse exits the container
     */
    $container.mouseenter(function(){
        if($settings['controlPanel'])
            $controlPanel.stop(true, true).fadeIn('fast');
    });

    /**
     * Called when mouse enters a slide
     */
    $slides.mouseenter(function(){
        if($settings['showDescription'] && $settings['hideDescription'])
            jQuery(this).find('.description').stop(true, true).animate({ 'margin-bottom': '0px' }, parseInt($settings['descriptionSpeed'] * 1000));
    });

    /**
     * Called when mouse leaves a slide
     */
    $slides.mouseleave(function(){
        if($settings['showDescription'] && $settings['hideDescription']){
	        var description = jQuery(this).find('.description');
            description.stop(true, true).animate({ 'margin-bottom': '-' + description.outerHeight(true) + 'px' }, parseInt($settings['descriptionSpeed'] * 1000));
        }
    });

	/**
     * Resets the interval and starts a new one.
     */
    function resetInterval(){
        clearInterval($interval);

        if($settings['play'])
            $interval = setInterval(function(){ nextView(); }, $settings['intervalSpeed'] * 1000);
    }
};