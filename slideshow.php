<?php
/*
 Plugin Name: Slideshow
 Plugin URI: http://stefanboonstra.com
 Description: This plugin offers a slideshow that is easily deployable in your website. Images can be assigned through the media page. Options are customizable for every single slideshow on your website.
 Version: 1.3.4
 Requires at least: 3.0
 Author: StefanBoonstra
 Author URI: http://stefanboonstra.com
 License: GPL
*/

/**
 * Class SlideshowMain fires up the application on plugin load and provides some
 * methods for the other classes to use like the auto-includer and the
 * base path/url returning method.
 *
 * @author Stefan Boonstra
 * @version 29-06-12
 */
class SlideshowMain {
	// == 1.4.0 ==
	// TODO Add user defined link to image (And then tell this guy: http://wordpress.org/support/topic/plugin-slideshow-how-do-i-add-images?replies=4)
	// TODO Add pause button to slideshow
	// TODO Add 'switch off endless loop' button
	// TODO Add functionality to put slides in a different order
	// TODO Add textual slides
	// TODO Keep descriptionbox from becoming too dang big.
	// TODO Fix css so that the theme's css doesn't screw it up

	// == 2.0.0 ==
	// TODO Revision of the entire script, giving the user the option to align multiple images next to eachother.

	/** Variables */
	static $version = '1.3.4';

	/**
	 * Bootstraps the application by assigning the right functions to
	 * the right action hooks.
	 */
	static function bootStrap(){
		self::autoInclude();

		// Initialize localization on init
		add_action('init', array(__CLASS__, 'localize'));

		// Deploy slide show on do_action('slideshow_deploy'); hook.
		add_action('slideshow_deploy', array('Slideshow', 'deploy'));

		// Add shortcode
		add_shortcode(SlideshowShortcode::$shortCode, array('SlideshowShortcode', 'slideshowDeploy'));

		// Register widget
		add_action('widgets_init', array('SlideshowWidget', 'registerWidget'));

		// Register slideshow post type
		SlideshowPostType::initialize();

		// Plugin feedback
		add_action('admin_head', array('SlideshowFeedback', 'adminInitialize'));
		register_deactivation_hook(__FILE__, array('SlideshowFeedback', 'deactivation'));
	}

	/**
	 * Translates the plugin
	 */
	static function localize(){
		load_plugin_textdomain(
			'slideshow-plugin',
			false,
			dirname(plugin_basename(__FILE__)) . '/languages/'
		);
	}

	/**
	 * Returns url to the base directory of this plugin.
	 *
	 * @return string pluginUrl
	 */
	static function getPluginUrl(){
		return plugins_url('', __FILE__);
	}

	/**
	 * Returns path to the base directory of this plugin
	 *
	 * @return string pluginPath
	 */
	static function getPluginPath(){
		return dirname(__FILE__);
	}

	/**
	 * This function will load classes automatically on-call.
	 */
	function autoInclude(){
		if(!function_exists('spl_autoload_register'))
			return;

		function slideshowFileAutoloader($name) {
			$name = str_replace('\\', DIRECTORY_SEPARATOR, $name);
			$file = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . $name . '.php';

			if(is_file($file))
				require_once $file;
		}

		spl_autoload_register('slideshowFileAutoloader');
	}
}

/**
 * Activate plugin
 */
SlideShowMain::bootStrap();