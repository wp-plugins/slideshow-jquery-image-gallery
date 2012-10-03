<?php
/**
 * Class SlideshowPluginShortcode is called on use of shortcode anywhere on the website.
 *
 * @author: Stefan Boonstra
 * @version: 25-09-12
 */
class SlideshowPluginShortcode {

	/** Variables */
	static $shortCode = 'slideshow_deploy';
	public static $bookmark = '!slideshow_deploy!';
	private static $postIds = array();

	/**
	 * Function slideshowDeploy adds a bookmark to where ever a shortcode
	 * is found and adds the postId to an array, it then is loaded after
	 * Wordpress has done its HTML checks.
	 *
	 * @param mixed $atts
	 * @return String $output
	 */
	static function slideshowDeploy($atts){
		$postId = '';
		if(isset($atts['id']))
			$postId = $atts['id'];

		$output = '';
		$settings = SlideshowPluginPostType::getSimpleSettings($postId, null, false);
		if($settings['setting_avoidFilter'] == 'true'){
			// Filter content after all Wordpress HTML parsers are done, then replace bookmarks with raw HTML
			add_filter('the_content', array(__CLASS__, 'insertSlideshow'), 999);
			add_filter('the_excerpt', array(__CLASS__, 'insertSlideshow'), 999);

			// Save post id
			self::$postIds[] = $postId;

			// Set output
			$output = self::$bookmark;
		}else{
			// Just output the slideshow, without filtering
			$output = SlideshowPlugin::prepare($postId);
		}

		// Return output
		return $output;
	}

	/**
	 * Function insertSlideshow uses the prepare method of class SlideshowPlugin
	 * to insert the code for the slideshow on the location a bookmark was found.
	 *
	 * @param String $content
	 * @return String $content
	 */
	static function insertSlideshow($content){
		// Loop through post ids
		foreach(self::$postIds as $postId){
			$updatedContent = preg_replace("/" . self::$bookmark . "/", SlideshowPlugin::prepare($postId), $content, 1);

			if(is_string($updatedContent))
				$content = $updatedContent;
		}

		// Reset postIds, so a shortcode in a next post can be used
		self::$postIds = array();

		return $content;
	}
}