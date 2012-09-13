jQuery.fn.slideshow_script = function(){
    /** Element variables */
    var $container = jQuery(this),
	    $overflow = $container.find('.slideshow_overflow'),
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
    if($container.width() <= 0){
        $container.css('width', $container.parent().width());
	    $overflow.css('width', $container.parent().width());
    }

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
        var totalWidth = 1;

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

            // Fit slide in X and Y directions, keeping their outer borders in mind
            var slideWidth = $slideWidth - (jQuery(slide).outerWidth(true) - jQuery(slide).width());
            jQuery(slide).css({ width: slideWidth });
	        totalWidth += jQuery(slide).outerWidth(true);

            // If the user want the images stretched, stretch it!
	        var image = jQuery(slide).find('img');
	        if(image.attr('src') != undefined){
	            if($settings['stretchImages'])
	                image.attr({ width: jQuery(slide).width(), height: jQuery(slide).height() });
	            else
	               image.css('width', 'auto');
	        }

            // Hide descriptionbox if wanted.
            var description = jQuery(slide).find('.description');
            if($settings['showDescription'] && description.attr('class') != undefined){
                if($settings['hideDescription'])
                    description.css({ marginBottom: '-' + description.outerHeight(true) + 'px' });
	            else
					description.css({ height: $settings['descriptionHeight'] });

                description.css({ display: 'block' });
            }

			// If slide needs to show a video component
	        var videoId = jQuery(slide).find('.videoId').text();
	        if(videoId){
		        // Load the video as SWF Object
		        swfobject.embedSWF(
			        'http://www.youtube.com/v/' + videoId + '?version=3&enablejsapi=1&playerapiid=player',
			        'youtube-player-' + videoId,
			        jQuery(slide).width(),
			        jQuery(slide).height(),
			        '9',
			        null,
			        null,
			        {allowScriptAccess: 'always'},
			        {id: 'youtube-player-' + videoId}
		        );
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
            var style = { display: 'block' };
            $nextButton.css(style);
            $previousButton.css(style);
            $buttonsActive = true;
        }
    }

    /**
     * Jump to view of slides
     *
     * If parameter relative is set, calculate number of views forwards of
     * backwards from current slide.
     *
     * @param int viewId
     * @param boolean relative (optional, defaults to false)
     */
    function gotoView(viewId, relative){
		// If view is relative, calculate viewId
	    if(relative)
	        viewId = $currentViewId + viewId;

	    // Calculate loop
	    if(viewId * $settings['slidesPerView'] >= $slides.length){ // When viewId is bigger than the end view and loop is enabled, return to first view
		    if($settings['loop']){
		        viewId = 0;
	        } else {
		        viewId = Math.floor(($slides.length - 1) / $settings['slidesPerView']);
			    return;
			}
	    } else if(viewId < 0){ // When viewId is less than zero and loop is enabled, go to last view
		    if($settings['loop']){
		        viewId = Math.floor(($slides.length - 1) / $settings['slidesPerView']);
		    } else {
			    viewId = 0;
			    return;
		    }
	    }
	    $currentViewId = viewId;

	    // Get distance the slideshow needs to be shifted in order to show the requested view
        var position = 0;
        var slidePosition = $slideshow.find('.slide_' + (viewId * $settings['slidesPerView'])).position();

        if(slidePosition)
            position = '-=' + (slidePosition.left - Math.abs($slideshow.position().left));

	    // Execute animation
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

	    // Disable buttons for as long as the animation is set for
        setTimeout(function(){ $buttonsActive = true; }, parseInt($settings['slideSpeed'] * 1000));
    }

    /**
     * Called when clicked on next button
     */
    $nextButton.click(function(){
        if($buttonsActive){
	        resetInterval();
	        gotoView(1, true);
        }
    });

    /**
     * Called when clicked on previous button
     */
    $previousButton.click(function(){
        if($buttonsActive){
	        resetInterval();
	        gotoView(-1, true);
        }
    });

    /**
     * Called when clicked on togglePlay button
     */
    $togglePlayButton.click(function(){
        togglePlay();
    });

    /**
     * Toggles play, if adaptButton is true only the button image (class)
     * will be adapted to the setting it's in at the moment.
     *
     * @param boolean $adaptButton (optional, defaults to false)
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
            $interval = setInterval(function(){ gotoView(1, true); }, $settings['intervalSpeed'] * 1000);
    }
};