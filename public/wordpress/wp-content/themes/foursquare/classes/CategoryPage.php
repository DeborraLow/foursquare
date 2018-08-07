<?php
/**
 *
 */
class CategoryPage
{

	function __construct($numberPosts = 5, $id = '', $catName = '')
	{
		if($id !== '')
		{
			$categories = get_the_category($id);

			$this->postCategory = new WP_Query([
					'showposts' => $numberPosts,
	                'orderby' => 'post_date',
					'post__not_in' => array($id),
					'cat' => $categories[0]->cat_ID

	            ]);
		}
		else{
			$this->postCategory = new WP_Query([
					'showposts' => $numberPosts,
	                'orderby' => 'post_date',
					'post__not_in' => array($id),
					'category_name' => $catName
	            ]);
		}

	}

	public function getPostByCategory()
	{
		return $this->postCategory;
	}
}

 ?>