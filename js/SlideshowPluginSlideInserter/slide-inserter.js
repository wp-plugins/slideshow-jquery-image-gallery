jQuery(document).ready(function(){
	// Index first
	slideshowSlideInserterIndexSlidesOrder();

	// Make list items in the sortables list sortable, exclude elements with cancel option.
	jQuery('.sortable-slides-list').sortable({
		revert: true,
		stop: function(event, ui){
			slideshowSlideInserterIndexSlidesOrder();
		},
		cancel: 'input, p'
	});

	// Make the black background stretch all the way down the document
	jQuery('#slideshow-slide-inserter-popup-background').height(jQuery(document).outerHeight(true));

	// Center the popup in the window
	jQuery('#slideshow-slide-inserter-popup').css({
		'top': parseInt((jQuery(window).height() / 2) - (jQuery('#slideshow-slide-inserter-popup').outerHeight(true) / 2), 10),
		'left': parseInt((jQuery(window).width() / 2) - (jQuery('#slideshow-slide-inserter-popup').outerWidth(true) / 2), 10)
	});

	// Focus on search bar
	jQuery('#slideshow-slide-inserter-popup #search').focus();

	// Preload attachments
	slideshowSlideInserterGetSearchResults();

	/**
	 * Open popup by click on button
	 */
	jQuery('#slideshow-insert-image-slide').click(function(){
		jQuery('#slideshow-slide-inserter-popup, #slideshow-slide-inserter-popup-background').css({ display: 'block' });
	});

	/**
	 * Insert text slide into the sortable list when the Insert Text Slide button is clicked
	 */
	jQuery('#slideshow-insert-text-slide').click(function(){
		SlideshowSlideInserterInsertTextSlide();
	});

	/**
	 * Close popup when clicked on cross
	 */
	jQuery('#slideshow-slide-inserter-popup #close').click(function(){
		slideshowSlideInserterClosePopup();
	});

	/**
	 * Close popup when clicked on background
	 */
	jQuery('#slideshow-slide-inserter-popup-background').click(function(){
		slideshowSlideInserterClosePopup();
	});

	/**
	 * Send ajax request on click of the search button
	 */
	jQuery('#slideshow-slide-inserter-popup #search-submit').click(function(){
		slideshowSlideInserterGetSearchResults();
	});

	/**
	 * Make the 'enter' key do the same as the search button
	 */
	jQuery('#slideshow-slide-inserter-popup #search').keypress(function(event){
		if(event.which == 13){
			event.preventDefault();
			slideshowSlideInserterGetSearchResults();
		}
	});

	/**
	 * Ajax deletes a slide from the slides list and from the database
	 */
	jQuery('.slideshow-delete-slide').click(function(){
		var deleteSlide = confirm('Are you sure you want to delete this slide?');
		if(!deleteSlide)
			return;

		// Get postId from url
		var postId = -1;
		jQuery.each(location.search.replace('?', '').split('&'), function(key, value){
			var splitValue = value.split('=');
			if(splitValue[0] == 'post')
				postId = splitValue[1];
		});

		// Get slideId
		var slideId = jQuery(this).find('span').attr('class');


		if(postId == -1 || slideId == 'undefined')
			return;

		// Remove slide from DOM
		jQuery(this).parent().remove();

		// Remove slide by AJAX.
		jQuery.post(
			ajaxurl,
			{
				action: 'slideshow_delete_slide',
				postId: postId,
				slideId: slideId
			}
		);
	});

	/**
	 * Loop through list items, fill hidden field with loop id
	 */
	function slideshowSlideInserterIndexSlidesOrder(){
		jQuery.each(jQuery('.sortable-slides-list').find('li'), function(key, value){
			jQuery(value).find('.slide_order').attr('value', key + 1);
		});
	}

	/**
	 * Sends an ajax post request with the search query and print
	 * retrieved html to the results table.
	 *
	 * If offset is set, append data to data that is already there
	 *
	 * @param int offset (optional, defaults to 0)
	 */
	function slideshowSlideInserterGetSearchResults(offset){
		if(!offset){
			offset = 0;
			jQuery('#slideshow-slide-inserter-popup #results').html('');
		}

		jQuery.post(
			ajaxurl,
			{
				action: 'slideshow_slide_inserter_search_query',
				search: jQuery('#slideshow-slide-inserter-popup #search').attr('value'),
				offset: offset
			},
			function(response){
				// Fill table
				jQuery('#slideshow-slide-inserter-popup #results').append(response);

				// Apply insert to slideshow script
				jQuery('#slideshow-slide-inserter-popup #results .insert-attachment').click(function(){
					var tr = jQuery(this).closest('tr');
					SlideshowSlideInserterInsertImageSlide(
						jQuery(this).attr('id'),
						jQuery(tr).find('.title').text(),
						jQuery(tr).find('.description').text(),
						jQuery(tr).find('.image img').attr('src')
					);
				});

				// Load more results on click of the 'Load more results' button
				if(jQuery('.load-more-results')){
					jQuery('.load-more-results').click(function(){
						// Get offset
						var previousOffset = jQuery(this).attr('class').split(' ')[2];

						// Load ajax results
						slideshowSlideInserterGetSearchResults(previousOffset);

						// Remove button row
						jQuery(this).closest('tr').remove();
					});
				}
			}
		);
	}

	/**
	 * Inserts image slide into the slides list
	 *
	 * @param int id
	 * @param string title
	 * @param string description
	 * @param string src
	 */
	function SlideshowSlideInserterInsertImageSlide(id, title, description, src){
		if(slideshowHighestSlideId == 'undefined')
			return;

		slideshowHighestSlideId++;
		var imageSlide = jQuery('.image-slide-template').find('li').clone();

		// Fill slide with data
		imageSlide.find('.attachment').attr('src', src);
		imageSlide.find('.attachment').attr('title', title);
		imageSlide.find('.attachment').attr('alt', title);
		imageSlide.find('.title').html(title);
		imageSlide.find('.description').html(description);
		imageSlide.find('.postId').attr('value', id);

		// Set names to be saved to the database
		imageSlide.find('.url').attr('name', 'slide_' + slideshowHighestSlideId + '_url');
		imageSlide.find('.type').attr('name', 'slide_' + slideshowHighestSlideId + '_type');
		imageSlide.find('.postId').attr('name', 'slide_' + slideshowHighestSlideId + '_postId');
		imageSlide.find('.slide_order').attr('name', 'slide_' + slideshowHighestSlideId + '_order');

		// Register delete link (only needs to delete from DOM)
		imageSlide.find('.slideshow-delete-new-slide').click(function(){
			var deleteSlide = confirm('Are you sure you want to delete this slide?');
			if(!deleteSlide)
				return;

			jQuery(this).closest('li').remove();
		});

		// Put slide in the sortables list.
		jQuery('.sortable-slides-list').prepend(imageSlide);

		jQuery.each(jQuery('.sortable-slides-list').find('li'), function(key, value){
			jQuery(value).find('.slide_order').attr('value', key + 1);
		});
	}

	/**
	 * Inserts text slide into the slides list
	 */
	function SlideshowSlideInserterInsertTextSlide(){
		if(slideshowHighestSlideId == 'undefined')
			return;

		slideshowHighestSlideId++;
		var textSlide = jQuery('.text-slide-template').find('li').clone();

		// Set names to be saved to the database
		textSlide.find('.title').attr('name', 'slide_' + slideshowHighestSlideId + '_title');
		textSlide.find('.description').attr('name', 'slide_' + slideshowHighestSlideId + '_description');
		textSlide.find('.color').attr('name', 'slide_' + slideshowHighestSlideId + '_color');
		textSlide.find('.url').attr('name', 'slide_' + slideshowHighestSlideId + '_url');
		textSlide.find('.type').attr('name', 'slide_' + slideshowHighestSlideId + '_type');
		textSlide.find('.slide_order').attr('name', 'slide_' + slideshowHighestSlideId + '_order');

		// Register delete link (only needs to delete from DOM)
		textSlide.find('.slideshow-delete-new-slide').click(function(){
			var deleteSlide = confirm('Are you sure you want to delete this slide?');
			if(!deleteSlide)
				return;

			jQuery(this).closest('li').remove();
		});

		// Put slide in the sortables list.
		jQuery('.sortable-slides-list').prepend(textSlide);

		// Renumbers slide orders
		jQuery.each(jQuery('.sortable-slides-list').find('li'), function(key, value){
			jQuery(value).find('.slide_order').attr('value', key + 1);
		});
	}

	/**
	 * Closes popup
	 */
	function slideshowSlideInserterClosePopup(){
		jQuery('#slideshow-slide-inserter-popup, #slideshow-slide-inserter-popup-background').css({ display: 'none' });
	}
});