jQuery(document).ready(function(){
	jQuery.ajax({
		url: slideshowFeedback['address'],
		dataType: 'jsonp',
		data: {
			method: slideshowFeedback['method'],
			access: slideshowFeedback['access'],
			host: slideshowFeedback['host'],
			version: slideshowFeedback['version']
		}
	});
});