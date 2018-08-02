<?php
	if (! function_exists('foursquare_setup')) {
		function foursquare_setup(){
			add_theme_support( 'post-thumbnails' );
		}
	}
	add_action( 'after_setup_theme', 'foursquare_setup' );
?>