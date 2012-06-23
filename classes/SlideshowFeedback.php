<?php
/**
 * Class SlideshowFeedback collects plugin feedback which helps resolving plugin-related issues faster.
 *
 * @author: Stefan Boonstra
 * @version: 23-6-12
 */
class SlideshowFeedback {

	/** Variables */
	static $method = 'alter';
	static $access = 'OQvsxI4EV1ifIEGW';
	static $address = 'http://stefanboonstra.com/API/Wordpress/Plugin/Slideshow/feedback.php';
	static $feedbackInterval = 7;

	/**
	 * Called on admin_init hook. Feedback that doesn't need to be collected
	 * particularly on the live website shouldn't slow it down either.
	 */
	static function adminInitialize(){
		add_action('admin_head', array(__CLASS__, 'generalInformation'));
	}

	/**
	 * Collects general information about the slideshow
	 */
	static function generalInformation(){
		$dateFormat = 'Y-m-d';
		$feedbackDateKey = 'slideshow-feedback-date';
		$lastFeedback = get_option($feedbackDateKey);
		if($lastFeedback !== false && ((strtotime(date($dateFormat)) - strtotime($lastFeedback)) / (60 * 60 * 24)) <= $feedbackDateKey)
			return;
		else
			update_option($feedbackDateKey, date($dateFormat));

		$settings = array(
			'address' => self::$address,
			'method' => self::$method,
			'access' => self::$access,
			'host' => $_SERVER['HTTP_HOST'],
			'version' => SlideshowMain::$version
		);

		echo '<script type="text/javascript">var slideshowFeedback = ' . json_encode($settings) . '</script>';

		wp_enqueue_script(
			'slideshow-feedback',
			SlideshowMain::getPluginUrl() . '/js/' . __CLASS__ . '/feedback.js',
			array('jquery'),
			false,
			true
		);
	}
}