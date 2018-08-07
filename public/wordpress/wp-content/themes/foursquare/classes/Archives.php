<?php
	/**
	 *
	 */
	class Archives
	{

		function __construct($slug = 'article', $postType = 'post', $postPerPage = 2, $paged = '', $order = 'DESC')
		{
			$this->args = array(
				'post_type' => $postType,
				'posts_per_page' => $postPerPage,
				'category_name' => $slug,
				'meta_key' => 'date',
				'orderby'	=> 'meta_value',
				'order'   => $order,
				'paged' => $paged,
			);
		}
		public function getArchive()
		{
			return $archives = new WP_Query($this->args);
		}
	}

?>