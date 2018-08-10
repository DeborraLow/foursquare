<?php
	include "classes/Include.php";
	$recentArticles = new Recentpost(3,'article');
	$recentArticlesPosts = $recentArticles->getRecentPost();


	$recentNews = new Recentpost(30,'news');
	$recentNewsPosts = $recentNews->getRecentPost();
	// var_dump($recentNewsPosts);
?>
<?php include "modules/head.php"; ?>
<body>

	<?php include "modules/header.php"; ?>
	 <canvas id="c"></canvas>
	 <section id="main-visual">
		<div class="main-visual-wrapper">
			<div class="logo">
				<img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/foursquare-logo.png" alt="フォースクエアロゴ">
			</div>
			<div class="news">
				<div class="title">
					<span class="en">NEWS</span>
					<span class="ja">週報</span>
				</div>
				<ul class="content">
					<?php foreach ($recentNewsPosts as $recentNewsPost) :?>
						<li class="item">
							<?php $fields = get_fields($recentNewsPost['ID']); ?>
							<span class="time"><?php echo substr($fields['date'],0,4) . '.' . substr($fields['date'],4,2) . '.' . substr($fields['date'],6,2) ; ?></span>
							<span class="txt"><?php echo $recentNewsPost['post_content']; ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
	 </section>

	 <?php include "modules/breadcrumbs.php"; ?>

	 <section id="main">
		 <div id="article">
			<?php foreach ($recentArticlesPosts as $recentArticlesPost) :?>
				<dl>
	    			<dt class="header">
						<span class="img">
							<?php if(get_the_post_thumbnail($recentArticlesPost['ID'])): ?>
								<?php echo get_the_post_thumbnail($recentArticlesPost['ID']); ?>
							<?php else : ?>
								<img src="<?php echo get_bloginfo('template_directory');?>/assets/img/no-image.jpg" alt="no-image">
							<?php endif; ?>
						</span>
	    				<span class="title"><?php echo $recentArticlesPost['post_title']; ?></span>
						<?php $fields = get_fields($recentArticlesPost['ID']); ?>
	    				<span class="date"><?php echo substr($fields['date'],0,4) . '.' . substr($fields['date'],4,2) . '.' . substr($fields['date'],6,2) ; ?></span>
	    				<span class="author"><?php echo $fields['author']; ?></span>
	    			</dt>
	    			<dd class="content">
	    				<?php echo wp_trim_words( $recentArticlesPost['post_content'], 50, '...' ); ?>
						<span class="read-more"><a href="<?php echo get_bloginfo('url') . '/?p=' . $recentArticlesPost['ID']; ?>">読む</a></span>
	    			</dd>
	    		</dl>
			<?php endforeach; ?>
		</div>

		<?php include "modules/sidebar.php"; ?>
	 </section>
	<?php include "modules/footer.php"; ?>
</body>
</html>