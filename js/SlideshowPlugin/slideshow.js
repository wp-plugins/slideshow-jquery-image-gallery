jQuery.fn.slideshow_script=function(){var $container=jQuery(this),$overflow=$container.find('.slideshow_overflow'),$controlPanel=$container.find('.controlPanel'),$togglePlayButton=$controlPanel.find('.togglePlay'),$nextButton=$container.find('.next'),$previousButton=$container.find('.previous'),$slideshow=$container.find('.slideshow'),$slides=$slideshow.find('.slide');var $settings=jQuery.parseJSON($container.find('.settings').text());jQuery.each($settings,function(setting,value){if(value=='true')$settings[setting]=true;else if(value=='false')$settings[setting]=false});if($container.width()<=0){$container.css('width',$container.parent().width());$overflow.css('width',$overflow.parent().width())}var $numberSlidesVisible=3,$buttonsActive=false,$interval='',$currentSlideId=0,$currentViewId=0,$slideWidth=$container.width()/$settings['slidesPerView'];init();function init(){var slidePosition=0;var totalWidth=1;jQuery.each($slides,function(key,slide){if(slidePosition<=0)jQuery(slide).css({'padding-left':0,'margin-left':0});if(slidePosition>=$settings['slidesPerView']-1)jQuery(slide).css({'padding-right':0,'margin-right':0});var slideWidth=$slideWidth-(jQuery(slide).outerWidth(true)-jQuery(slide).width());jQuery(slide).css({width:slideWidth});totalWidth+=jQuery(slide).outerWidth(true);var image=jQuery(slide).find('img');if(image.attr('src')!=undefined){if($settings['stretchImages'])image.attr({width:jQuery(slide).width(),height:jQuery(slide).height()});else image.css('width','auto')}var description=jQuery(slide).find('.description');if($settings['showDescription']&&description.attr('class')!=undefined){if($settings['hideDescription'])description.css({marginBottom:'-'+description.outerHeight(true)+'px'});else description.css({height:$settings['descriptionHeight']});description.css({display:'block'})}var videoSlideIds=jQuery(slide).find('.videoId').text().split(' ');var videoId=videoSlideIds[0];var elementVideoId=videoSlideIds[1];if(videoId&&elementVideoId){swfobject.embedSWF('http://www.youtube.com/v/'+videoId+'?version=3&enablejsapi=1&playerapiid=player',elementVideoId,jQuery(slide).width(),jQuery(slide).height(),'9',null,null,{allowScriptAccess:'always',wmode:'opaque'},{id:elementVideoId})}slidePosition++;if(slidePosition>=$settings['slidesPerView'])slidePosition=0});$slideshow.css({width:totalWidth,float:'none',position:'absolute',top:0,left:0});if($settings['controlPanel']&&$settings['play'])togglePlay(true);resetInterval();if($settings['controllable']){setNextButtonVisible(true);setPreviousButtonVisible(true);$buttonsActive=true}}function gotoView(viewId,relative){if(relative)viewId=$currentViewId+viewId;if(viewId*$settings['slidesPerView']>=$slides.length){if($settings['loop']){viewId=0}else{viewId=Math.floor(($slides.length-1)/$settings['slidesPerView']);return}}else if(viewId<0){if($settings['loop']){viewId=Math.floor(($slides.length-1)/$settings['slidesPerView'])}else{viewId=0;return}}$currentViewId=viewId;var position=0;var slidePosition=$slideshow.find('.slide_'+(viewId*$settings['slidesPerView'])).position();if(slidePosition)position='-='+(slidePosition.left-Math.abs($slideshow.position().left));$buttonsActive=false;if($settings['animation']=='fade'){$slideshow.fadeOut(parseInt($settings['slideSpeed']*1000)/2);setTimeout(function(){$slideshow.css({left:position});$slideshow.fadeIn(parseInt($settings['slideSpeed']*1000)/ 2)}, parseInt($settings['slideSpeed'] * 1000) /2)}else{$slideshow.animate({left:position},parseInt($settings['slideSpeed']*1000))}setTimeout(function(){$buttonsActive=true},parseInt($settings['slideSpeed']*1000))}$nextButton.click(function(){if($buttonsActive){resetInterval();gotoView(1,true)}});$previousButton.click(function(){if($buttonsActive){resetInterval();gotoView(-1,true)}});function setNextButtonVisible(visible){if(!$settings['controllable'])return;if(visible)$nextButton.stop(true,true).fadeIn($settings['slideSpeed']);else $nextButton.stop(true,true).fadeOut($settings['slideSpeed'])}function setPreviousButtonVisible(visible){if(!$settings['controllable'])return;if(visible)$previousButton.stop(true,true).fadeIn($settings['slideSpeed']);else $previousButton.stop(true,true).fadeOut($settings['slideSpeed'])}$togglePlayButton.click(function(){togglePlay()});function togglePlay(adaptButton){if(!adaptButton){$settings['play']=!$settings['play'];resetInterval()}if($settings['play'])$togglePlayButton.attr('class','pause');else $togglePlayButton.attr('class','play')}$container.mouseleave(function(){$controlPanel.stop(true,true).fadeOut('slow')});$container.mouseenter(function(){if($settings['controlPanel'])$controlPanel.stop(true,true).fadeIn('fast')});$slides.mouseenter(function(){if($settings['showDescription']&&$settings['hideDescription'])jQuery(this).find('.description').stop(true,true).animate({'margin-bottom':'0px'},parseInt($settings['descriptionSpeed']*1000))});$slides.mouseleave(function(){if($settings['showDescription']&&$settings['hideDescription']){var description=jQuery(this).find('.description');description.stop(true,true).animate({'margin-bottom':'-'+description.outerHeight(true)+'px'},parseInt($settings['descriptionSpeed']*1000))}});function resetInterval(){clearInterval($interval);if($settings['play'])$interval=setInterval(function(){gotoView(1,true)},$settings['intervalSpeed']*1000)}};