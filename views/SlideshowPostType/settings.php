<p>
	<strong>Leave any field open to use default value.</strong>
</p>

<table border="0">
	<tr>
		<td><? _e('Number of seconds the slide takes to slide in', 'slideshow-plugin'); ?></td>
		<td><input type="text" name="slideSpeed" value="<? echo $settings['slideSpeed']; ?>" size="5" /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? echo $defaults['slideSpeed'] ?></i></td>
	</tr>
	<tr>
		<td><? _e('Number of seconds the description takes to slide in', 'slideshow-plugin'); ?></td>
		<td><input type="text" name="descriptionSpeed" value="<? echo $settings['descriptionSpeed']; ?>" size="5" /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? echo $defaults['descriptionSpeed'] ?></i></td>
	</tr>
	<tr>
		<td><? _e('Seconds between changing slides', 'slideshow-plugin'); ?></td>
		<td><input type="text" name="intervalSpeed" value="<? echo $settings['intervalSpeed']; ?>" size="5" /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? echo $defaults['intervalSpeed'] ?></i></td>
	</tr>
	<tr>
		<td><? _e('Width of the slideshow', 'slideshow-plugin'); ?></td>
		<td><input type="text" name="width" value="<? echo $settings['width']; ?>" size="5" /></td>
		<td><i><? _e('Defaults to parent\'s width.', 'slideshow-plugin'); ?></i></td>
	</tr>
	<tr>
		<td><? _e('Height of the slideshow', 'slideshow-plugin'); ?></td>
		<td><input type="text" name="height" value="<? echo $settings['height']; ?>" size="5" /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? echo $defaults['height'] ?></i></td>
	</tr>
	<tr>
		<td><? _e('Fit image into slideshow (making it smaller)', 'slideshow-plugin'); ?></td>
		<td><input type="checkbox" name="stretch" value="1" <? checked($settings['stretch'], 1); ?> /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? if($defaults['stretch']) _e('Checked', 'slideshow-plugin'); else _e('Not checked', 'slideshow-plugin'); ?></i></td>
	</tr>
	<tr>
		<td><? _e('Activate buttons (so the user can scroll through the slides)', 'slideshow-plugin'); ?></td>
		<td><input type="checkbox" name="controllable" value="1" <? checked($settings['controllable'], 1); ?> /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? if($defaults['controllable']) _e('Checked', 'slideshow-plugin'); else _e('Not checked', 'slideshow-plugin'); ?></i></td>
	</tr>
	<tr>
		<td><? _e('Send user to image URL on click', 'slideshow-plugin'); ?></td>
		<td><input type="checkbox" name="urlsActive" value="1" <? checked($settings['urlsActive'], 1); ?> /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? if($defaults['urlsActive']) _e('Checked', 'slideshow-plugin'); else _e('Not checked', 'slideshow-plugin'); ?></i></td>
	</tr>
	<tr>
		<td><? _e('Show title and description', 'slideshow-plugin'); ?></td>
		<td><input type="checkbox" name="showText" value="1" <? checked($settings['showText'], 1); ?> /></td>
		<td><i><? _e('Default', 'slideshow-plugin'); ?>: <? if($defaults['showText']) _e('Checked', 'slideshow-plugin'); else _e('Not checked', 'slideshow-plugin'); ?></i></td>
	</tr>
</table>