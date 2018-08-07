<?php
	include "classes/Recentpost.php";

	$acfData = get_fields(get_the_ID());
?>

<?php include "modules/head.php"; ?>
	<body>
		<?php include "modules/header.php"; ?>
		<canvas id="c"></canvas>
		<div id="article-visual">
			<div class="logo">
				<a href="/"><img src="<?php echo get_bloginfo('template_directory'); ?>/assets/img/foursquare-logo.png" alt="フォースクエアロゴ"></a>
			</div>
		</div>
		<?php include "modules/breadcrumbs.php"; ?>
		<section id="main">
			<div id="single-article">
				<?php if (have_posts()) :?>
           			<?php while(have_posts()) :?>
             			<?php the_post(); ?>
						<div class="header">
							<span class="title"><?php the_title();?></span>
							<span class="author"><?php echo $acfData['author']; ?></span>
							<span class="date"><?php echo substr($acfData['date'],0,4) . '.' . substr($acfData['date'],4,2) . '.' . substr($acfData['date'],6,2) ; ?></span>
							<span class="verse"><?php echo isset($acfData['verse']) ? $acfData['verse'] : ''; ?></span>
						</div>
						<div class="img">
							<?php if(has_post_thumbnail()) : ?>
								<?php the_post_thumbnail(); ?>
							<?php else : ?>
								<img src="<?php echo get_bloginfo('template_directory');?>/assets/img/no-image.jpg" alt="no-image">
							<?php endif; ?>
						</div>
						<div class="content">
							<?php the_content(); ?>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
				<?php wp_reset_postdata(); ?>
			</div>
		   <?php include "modules/sidebar.php"; ?>
		</section>
	   <?php include "modules/footer.php"; ?>
	</body>
</html>