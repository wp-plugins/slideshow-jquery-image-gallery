<?php
/**
 *
 * @author: Stefan Boonstra
 * @version: 25-5-12
 */
class Slideshow {

	/** Variables */
	private static $stylesheet = '/style/style.css';
	private static $scriptfile = '/js/slideshow.js';
	private static $htmlfile = 'slideshow.html';

	/**
	 * Function initialize prints out the required html and enqueues
	 * the scripts and stylesheets necessary for displaying the slideshow
	 */
	static function initialize($postId = ''){
		if(empty($postId) || !is_numeric($postId)){
			$post = get_posts(array(
				'numberposts' => 1,
				'orderby' => 'rand',
				'post_type' => SlideshowPostType::$postType
			));

			if(is_array($post))
				$post = $post[0];
		}else
			$post = wp_get_single_post($postId);

		if(empty($post))
			return;

		// Output basic html
		echo file_get_contents(SlideshowMain::getPluginUrl() . '/views/' . __CLASS__ . '/' . self::$htmlfile);

		// Get settings
		$settings = SlideshowPostType::$defaults;
		foreach($settings as $key => $value){
			$metaValue = get_post_meta($post->ID, $key, true);
			if(!empty($metaValue))
				$settings[$key] = $metaValue;
		}

		// Get images
		$imageObjects = get_posts(array(
			'post_type' => 'attachment',
			'numberposts' => null,
			'post_parent' => $post->ID
		));

		// Load images into array
		$images = array();
		foreach($imageObjects as $key => $imageObject){
			$images[$key] = array(
				'img' => $imageObject->guid,
				'title' => $imageObject->post_title,
				'description' => $imageObject->post_content,
				'url' => $imageObject->guid
			);
		}

		// Output settings and images
		echo '
			<script type="text/javascript">
				var slideshow_images = ' . json_encode($images) . ';
				var slideshow_settings = ' . json_encode($settings) . ';
			</script>
		';

		// Enqueue script
		wp_enqueue_script(
			'slideshow_script',
			SlideshowMain::getPluginUrl() . self::$scriptfile,
			array(),
			'',
			true
		);

		// Enqueue stylesheet
		wp_enqueue_style(
			'slideshow_style',
			SlideshowMain::getPluginUrl() . self::$stylesheet
		);
	}
}