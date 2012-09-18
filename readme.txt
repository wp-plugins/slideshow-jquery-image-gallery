=== Slideshow ===

Contributors: stefanboonstra
Tags: slideshow, slider, slide, show, images, image, photo, gallery, galleries, jquery, javascript,
Requires at least: 3.3
Tested up to: 3.4.1
Stable tag: 2.1.3
License: GPLv2

Integrate a fancy slideshow in just five steps. - Rainbows. Rainbows everywhere.


== Description ==

Slideshow provides an easy way to integrate a slideshow for any Wordpress installation.

Any image can be loaded into the slideshow by picking it from the Wordpress media page, even images you've already
uploaded can be inserted into your slideshow right away!

Fancy doing something crazy? You can create and use as many slideshows as you'd like, with
different images, settings and styles for each one of them.

= Features =

 - Create as many slideshows with as many slides as you like
 - Image slides
 - Text slides
 - Video slides
 - Place it anywhere on your website
 - Run multiple slideshows on the same page
 - Change animations and handling
 - Customize to taste
 - Shows that visitor who's boss

= Languages =

 - English
 - Dutch


== Installation ==

1. Install Slideshow either via the WordPress.org plugin directory, or by uploading the files to your server.

2. After activating Slideshow, you can create a new slideshow.

3. Click on 'Insert Image Slide' to insert an image slide, a popup will appear where you can search for the desired
image. Insert the image by clicking 'Insert'

4. Use the shortcode or code snippet visible in your slideshow admin panel to deploy your slideshow anywhere on your website,
or use the widget to show any of your slideshows in the sidebar of your website.

5. Feel like a sir.


== Frequently Asked Questions ==

= How do I add image slides? =

You can choose from images that have already been uploaded to your Wordpress website by clicking on the
'Insert Image Slide' button in the slides list. A screen will pop up and here you are able to search your image files
by name for image you want to use. If you want to add new images to the slideshow, you need to upload them to the
Wordpress media page.

= The slideshow does not show up (but it's html tags are in the source code) =

Often when images are not shown by the slideshow, there's a javascript error somewhere on the page and this error has
caused javascript to break. For the slideshow to work again, this error needs to be fixed. Check if any errors were
thrown by opening Google Chrome or Firefox (with Firebug installed) and press the 'F12' key. Errors show in the console tab.

= The slideshow does not show up / The slideshow looks like it's not styled =

Most times the slideshow is called after the '</head>' tag, which means the scripts need to load in the footer of
the website. A theme that has no '<?php wp_footer(); ?>' call in it's footer will not be able to load the slideshow's
scripts.

= I chose the 'Custom' style option for my slideshow, but the slideshow is not styled anymore =

Since the slideshow is most often called after the </head> tag, the slideshow can't print it's styles in the head of
the website and has to output it on the page. A strict doctype does not allow stylesheets in the body and thus the
slideshow is not styled.


== Screenshots ==

1. Here's what some default slideshows can look like. Sit back grab a beer, enjoy.

2. Create a new slideshow. A shortcode and a code snippet of how to call it is already visible.

3. Click the 'Insert Image Slide' button in the Slides List to search and pick images from the Wordpress media page.

4. If you haven't uploaded any images yet, you can do so on the Wordpress media page.

5. The images you selected are directly visible in your Slides List, don't forget to save!

6. Not satisfied with the handling or styling of the slideshow? Customize!


== Changelog ==

= 2.2.0 Pre-release =
*   Slides can now be randomized.

= 2.1.3 =
*   Fixed: Overflow container now adapts to its parent element correctly.
*   Fixed: Internet Explorer now shows control panel (buttons etc.) on top of the Flash element.
*   Fixed: Images are now loaded by the Wordpress function, rather than being loaded from the database's 'guid'.

= 2.1.2 =
*   Wordpress media uploader link in image inserter pop-up now opens in a new window.
*   Fixed: Image inserter pop-up CSS no longer pushes the 'insert' buttons off-screen.

= 2.1.1 =
*   Fixed: Settings meta-box threw an unexpected 'T_ENDFOREACH' since a shorthand PHP tag was used improperly.

= 2.1.0 =
*   Added Youtube video slides.
*   Slide URLs can now be chosen to open in a new window.
*   Added headers above settings, giving the user mover oversight.
*   Endless scrolling is now available in the image inserter pop up.
*   Images are now centered in their slides by default.
*   Script is now activated on document ready, not window load.
*   Hid slides in another element so that buttons could overflow the slideshow container.
*   Fixed: Hide-away settings were influenced by their own settings fields.
*   Fixed: Stretching was not always handled correctly.
*   Fixed: Script counter made the first view show twice.

= 2.0.1 =
*   Fixed: Version 1.x.x slides disappeared after updating to version 2.0.0. An automatic converter has been added.

= 2.0.0 =
*   Complete sideshow script revision to support new features.
*   The script now supports two kinds of animations: 'Slide' and 'Fade'.
*   Multiple images can be shown in one slide, instead of one.
*   Text slides are available.
*   Descriptions are more cooperative, they don't overlap the entire image anymore. (Instead they hide or have a user-defined fixed height)
*   Multiple slideshows can now be shown on one page.
*   Play and pause buttons are now available, as is the option not to auto-play and/or loop the slideshow.
*   Stylesheets no longer partially depend on the website's stylesheet, except for the fonts.
*   The script and its functional stylesheet are now compressed to save loading time.
*   Added jQuery sortables script to sort slides
*   Images you've already uploaded and attached to other posts can now be loaded into the slideshow, saving disk space (and time).

= 1.3.5 =
*   Fixed: Namespace complications found with the Slideshow widget, renamed all classes.

= 1.3.4 =
*   Fixed: Custom width of the slideshow will no longer cause buttons to fall off-screeen.

= 1.3.3 =
*   Extended compatibility to servers that do not support short php opening tags.

= 1.3.2 =
*   Fixed: 1.3.1 Bugfix failed to work, fixed problem entirely after reproducing it.
*   Added alternative way to load default css into empty custom-style box, so that users without 'allow_url_fopen' enabled aren't influenced negatively by it.

= 1.3.1 =
*   Fixed: Check if function 'file_get_contents' exists before calling it, some servers have this disabled. (This throws errors and messes up the plugin)

= 1.3.0 =
*   Added Dutch translation.
*   Custom styles for each slideshow are now available to be more compatable with every theme. (Black and transparent scheme)
*   Encapsulated a css class so that it does not interfere with anything outside the slideshow_container.
*   Moved slides list to the side, saving space on the slideshow specific settings page.
*   Settings bugs completely fixed, finally. (Previous version deleted post-meta on auto-save)
*   Moved Slideshow settings and images script to inside the slideshow_container, outputting a more coherent whole.
*   Settings moved from multiple meta keys to a single one. (This resets everyone's settings)
*   Added a Wordpress media upload button to the slides list, this simplifies attaching images to a slideshow.
*   Better way of including the jQuery library is now being used.
*   Fixed bug with the number of slides shown in the slideshow stuck at the default value of five.

= 1.2.1 =
*   Fixed: Slideshow specific settings not saving.

= 1.2.0 =
*   Slideshows can now be placed in posts as well, using shortcode [slideshow id=*SlideshowPostId*].
*   Added a widget that can be loaded with an existing slideshow of choice.
*   Tested up to version 3.4

= 1.1.0 =
*   Added jQuery library as Wordpress websites don't seem to load them by default.
*   Slideshow script now depends on by the plugin enqueued jQuery script.

= 1.0.1 =
*   Added documentary comments.
*   Fixed error with directory paths causing Slideshows post type page to generate warnings.

= 1.0.0 =
*	Initial release.


== Links ==

*	[Stefan Boonstra](http://stefanboonstra.com/)