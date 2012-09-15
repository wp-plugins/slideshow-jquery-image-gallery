<?php
/**
 * Class SlideshowAjax is used to register ajax functions
 * before as soon as possible, so ajax functions don't get
 * exceedingly large.
 *
 * @author: Stefan Boonstra
 * @version: 19-05-12
 */
class SlideshowPluginAjax {

	static function init() {
		add_action('wp_ajax_slideshow_slide_inserter_search_query', array('SlideshowPluginSlideInserter', 'printSearchResults'));
		add_action('wp_ajax_slideshow_delete_slide', array('SlideshowPluginSlideInserter', 'deleteSlide'));
	}
}