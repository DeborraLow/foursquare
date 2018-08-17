<?php
/**
 *
 */
class Schedule
{
	function __construct($numberPosts = -1, $category = '', $postType = 'post')
	{
		if ($category !== '') {
			$catID = get_cat_ID($category);
		}
		else {
			$catID = $category;
		}
		$this->args = [
			'numberposts' => $numberPosts,
			'offset' => 0,
			'category' => $catID,
			'meta_key' => 'day',
			'orderby'	=> 'meta_value',
			'order' => 'ASC',
			'include' => '',
			'exclude' => '',
			'post_type' => $postType,
			'post_status' => 'publish',
			'suppress_filters' => true
		];
	}
	public function getSchedulePost()
	{
		return $recent_posts = wp_get_recent_posts( $this->args, ARRAY_A );
	}
}

 ?>