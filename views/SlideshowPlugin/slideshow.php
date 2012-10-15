<div class="slideshow_container slideshow_container_<?php echo $randomId; ?>" style="width: <?php echo (is_numeric($settings['width']))? $settings['width'] : 0; ?>px; height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
	<div class="slideshow_overflow" style="width: <?php echo (is_numeric($settings['width']))? $settings['width'] : 0; ?>px; height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
		<div class="slideshow">
			<?php if(count($slides) > 0): ?>
				<?php $i = 0; ?>
				<?php foreach($slides as $slide): ?>

					<?php
					$url = $target = '';
					if(isset($slide['url']))
						$url = $slide['url'];
					if(isset($slide['urlTarget']))
						$target = $slide['urlTarget'];
					?>

					<?php if($slide['type'] == 'text'): ?>

						<?php
							$title = $description = $color = '';
							if(isset($slide['title']))
								$title = $slide['title'];
							if(isset($slide['description']))
								$description = $slide['description'];
							if(isset($slide['color']))
								$color = $slide['color'];
						?>

						<div class="slide slide_<?php echo $i; ?>" <?php if(!empty($color)) echo 'style="background: #' . $color . ';"'; ?> style="height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
							<a <?php if(!empty($url)) echo 'href="' . $url . '"';?> <?php if(!empty($target)) echo 'target="' . $target . '"'; ?>>
								<h2><?php echo $title; ?></h2>
								<p><?php echo $description; ?></p>
							</a>
						</div>

					<?php elseif($slide['type'] == 'video'): ?>

						<?php
							$videoId = '';
							if(isset($slide['videoId']))
								$videoId = $slide['videoId'];

							$elementVideoId = 'youtube-player-' . rand() . '-' . $videoId;
						?>

						<div class="slide slide_<?php echo $i; ?> slide_video" style="height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
							<div class="videoId" style="display: none;"><?php echo $videoId; ?> <?php echo $elementVideoId; ?></div>
							<div id="<?php echo $elementVideoId; ?>"></div>
						</div>

					<?php elseif($slide['type'] == 'attachment'): ?>

						<?php
						$postId = '';
						if(isset($slide['postId']) && is_numeric($slide['postId']))
							$postId = $slide['postId'];
						else
							continue;

						$attachment = get_post($postId);
						if(empty($attachment))
							continue;

						$image = wp_get_attachment_image_src($attachment->ID, 'full');
						$imageSrc = '';
						if(!is_array($image) || !$image){
							if(!empty($attachment->guid))
								$imageSrc = $attachment->guid;
							else
								continue;
						}else{
							$imageSrc = $image[0];
						}
						?>

						<div class="slide slide_<?php echo $i; ?>" style="height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
							<div class="description transparent">
								<a <?php if(!empty($url)) echo 'href="' . $url . '"'; ?> <?php if(!empty($target)) echo 'target="' . $target . '"'; ?>>
									<h2><?php echo $attachment->post_title; ?></h2>
									<p><?php echo $attachment->post_content; ?></p>
								</a>
							</div>
							<a <?php if(!empty($url)) echo 'href="' . $url . '"'; ?> <?php if(!empty($target)) echo 'target="' . $target . '"'; ?>>
								<img
									src="<?php echo $imageSrc; ?>"
									alt="<?php echo $attachment->post_title; ?>"
								/>
							</a>
						</div>

					<?php endif; ?>
					<?php $i++; ?>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>

	<div class="controllers">
		<div class="controlPanel transparent"><ul><li class="togglePlay play"></li></ul></div>

		<div class="button previous transparent"></div>
		<div class="button next transparent"></div>
	</div>

	<div class="settings" style="display: none;"><?php echo json_encode($settings); ?></div>

	<div class="manufacturer">
		<a href="http://www.stefanboonstra.com/">Slideshow Stefan Boonstra</a>
	</div>

	<div style="display: none;">
		<?php echo SlideshowPluginMain::$version; ?>
	</div>

	<?php if(!empty($style)): ?>
	<style type="text/css">
			<?php echo $style; ?>
	</style>
	<?php endif; ?>
</div>