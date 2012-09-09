<div class="slideshow_container slideshow_id_<?php echo $id; ?>" style="width: <?php echo (is_numeric($settings['width']))? $settings['width'] : 0; ?>px; height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
	<div class="slideshow_overflow" style="width: <?php echo (is_numeric($settings['width']))? $settings['width'] : 0; ?>px; height: <?php echo (is_numeric($settings['height']))? $settings['height'] : 0; ?>px;">
		<div class="slideshow">
			<?php if(count($slides) > 0): ?>
				<?php $i = 0; ?>
				<?php foreach($slides as $slide): ?>

					<?php
					$url = '';
					if(isset($slide['url']))
						$url = $slide['url'];
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

						<div class="slide slide_<?php echo $i; ?>" <?php if(!empty($color)) echo 'style="background: #' . $color . ';"'; ?>>
							<a <?php if(!empty($url)) echo 'href="' . $url . '"'; ?>>
								<h2><?php echo $title; ?></h2>
								<p><?php echo $description; ?></p>
							</a>
						</div>

					<?php elseif($slide['type'] == 'attachment'): ?>

						<?php
						$postId = '';
						if(isset($slide['postId']) && is_numeric($slide['postId']))
							$postId = $slide['postId'];
						else
							continue;

						$attachment = get_post($postId);
						if(!isset($attachment))
							continue;
						?>

						<div class="slide slide_<?php echo $i; ?>">
							<div class="description transparent">
								<a <?php if(!empty($url)) echo 'href="' . $url . '"'; ?>>
									<h2><?php echo $attachment->post_title; ?></h2>
									<p><?php echo $attachment->post_content; ?></p>
								</a>
							</div>
							<a <?php if(!empty($url)) echo 'href="' . $url . '"'; ?>>
								<img
									src="<?php echo $attachment->guid; ?>"
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
		<div class="controlPanel transparent"><ul><li class="togglePlay play"></li></li></ul></div>

		<div class="button previous transparent"></div>
		<div class="button next transparent"></div>
	</div>

	<div class="settings" style="display: none;"><?php echo json_encode($settings); ?></div>

	<script type="text/javascript">
		jQuery(window).load(function(){
			jQuery('.slideshow_id_<?php echo $id; ?>').slideshow_script();
		});
	</script>

	<?php if(!empty($printStyle)): ?>
	<style type="text/css">
			<?php echo $printStyle; ?>
	</style>
	<?php endif; ?>
</div>