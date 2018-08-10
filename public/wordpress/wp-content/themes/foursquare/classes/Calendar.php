<?php
	/**
	 *
	 */
	class Calendar
	{

		function __construct($numberPosts = -1, $postType = 'calendar')
		{
			$this->args = [
				'numberposts' => $numberPosts,
				'offset' => 0,
				// 'category' => $catID,
				'meta_key' => 'date_start',
				'orderby'	=> 'meta_value',
				'order' => 'DESC',
				'include' => '',
				'exclude' => '',
				'post_type' => $postType,
				'post_status' => 'publish',
				'suppress_filters' => true
			];
		}
		public function getCalendar()
		{
			return $calendar = wp_get_recent_posts( $this->args, ARRAY_A );
		}
	}

?>