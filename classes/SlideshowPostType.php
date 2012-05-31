<?php
/**
 *
 *
 * @author: Stefan Boonstra
 * @version: 26-5-12
 */
class SlideshowPostType {

	/** Variables */
	private static $adminIcon = 'images/adminIcon.png';
	public static $postType = 'slideshow';
	public static $defaults = array(
		'slideSpeed' => 1,
		'descriptionSpeed' => 0.3,
		'intervalSpeed' => 5,
		'width' => 0,
		'height' => 200,
		'stretch' => 0,
		'controllable' => 1,
		'urlsActive' => 0,
		'showText' => 1
	);

	/**
	 * Registers new posttype slideshow
	 */
	static function registerSlideshowPostType(){
		register_post_type(
			self::$postType,
			array(
				'labels' => array(
					'name' => __('Slideshows', 'slideshow-plugin'),
					'singlular_name' => __('Slideshow', 'slideshow-plugin'),
					'add_new_item' => __('Add New Slideshow', 'slideshow-plugin'),
					'edit_item' => __('Edit slideshow', 'slideshow-plugin'),
					'new_item' => __('New slideshow', 'slideshow-plugin'),
					'view_item' => __('View slideshow', 'slideshow-plugin'),
					'search_items' => __('Search slideshows', 'slideshow-plugin'),
					'not_found' => __('No slideshows found', 'slideshow-plugin'),
					'not_found_in_trash' => __('No slideshows found', 'slideshow-plugin')
				),
				'public' => true,
				'publicly_queryable' => false,
				'show_ui' => true,
				'show_in_menu' => true,
				'query_var' => true,
				'rewrite' => true,
				'capability_type' => 'post',
				'has_archive' => true,
				'hierarchical' => false,
				'menu_position' => null,
				'menu_icon' => SlideshowMain::getPluginUrl() . '/' . self::$adminIcon,
				'supports' => array('title'),
				'register_meta_box_cb' => array(__CLASS__, 'registerMetaBoxes')
			)
		);
	}

	/**
	 * Adds custom meta boxes to slideshow post type.
	 */
	static function registerMetaBoxes(){
		add_meta_box(
			'information',
			__('Information', 'slideshow-plugin'),
			array(__CLASS__, 'informationMetaBox'),
			self::$postType,
			'normal',
			'high'
		);

		add_meta_box(
			'slides-list',
			__('Slides List', 'slideshow-plugin'),
			array(__CLASS__, 'slidesMetaBox'),
			self::$postType,
			'normal',
			'high'
		);

		add_meta_box(
			'settings',
			__('Slideshow Settings', 'slideshow-plugin'),
			array(__CLASS__, 'settingsMetaBox'),
			self::$postType,
			'normal',
			'core'
		);
	}

	/**
	 * Shows some information about this slideshow
	 */
	static function informationMetaBox(){
		global $post;

		$snippet = htmlentities(sprintf('<?php do_action(\'slideshow_deploy\', \'%s\'); ?>', $post->ID));

		include(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'views/' . __CLASS__ . '/information.php');
	}

	/**
	 * Shows slides currently in slideshow
	 */
	static function slidesMetaBox(){
		global $post;

		$attachments = get_posts(array(
			'post_type' => 'attachment',
			'numberposts' => null,
			'post_status' => null,
			'post_parent' => $post->ID
		));

		include(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'views/' . __CLASS__ . '/slides.php');
	}

	/**
	 * Shows settings for particular slideshow
	 */
	static function settingsMetaBox(){
		global $post;

		$defaults = self::$defaults;

		$settings = array(
			'slideSpeed' => get_post_meta($post->ID, 'slideSpeed', true),
			'descriptionSpeed' => get_post_meta($post->ID, 'descriptionSpeed', true),
			'intervalSpeed' => get_post_meta($post->ID, 'intevalSpeed', true),
			'width' => get_post_meta($post->ID, 'width', true),
			'height' => get_post_meta($post->ID, 'height', true),
			'stretch' => get_post_meta($post->ID, 'stretch', true),
			'controllable' => get_post_meta($post->ID, 'controllable', true),
			'urlsActive' => get_post_meta($post->ID, 'urlsActive', true),
			'showText' => get_post_meta($post->ID, 'showText', true)
		);

		foreach($settings as $key => $value)
			if(empty($value))
				$settings[$key] = $defaults[$key];

		include(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'views/' . __CLASS__ . '/settings.php');
	}

	/**
	 * Called for saving settings
	 *
	 * @param stdObject $post
	 */
	static function save($post){
		foreach(self::$defaults as $key => $default){
			$value = $default;
			if(isset($_POST[$key]) && ($_POST[$key] != $value || !empty($_POST[$key])))
				$value = $_POST[$key];

			update_post_meta($post, $key, $value);
		}
	}
}