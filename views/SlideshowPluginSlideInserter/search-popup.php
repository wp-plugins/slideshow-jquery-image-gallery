<div id="slideshow-slide-inserter-popup-background"></div>
<div id="slideshow-slide-inserter-popup">
	<div id="close"></div>
	<div>
		<input type="text" id="search" />
		<?php submit_button(__('Search', 'slideshow-plugin'), 'primary', 'search-submit', false); ?>
		<i><?php _e('Search images by title'); ?></i>
	</div>

	<table id="results" class="widefat" style="height: 400px; width: 600px;"></table>
</div>