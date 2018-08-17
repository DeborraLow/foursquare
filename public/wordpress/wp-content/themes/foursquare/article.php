<?php
	/*
		Template Name: Article Template
	*/
	include "classes/Include.php";

	$slug = 'article';
	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
	$archivePost = new Archives($slug, 'post', 5, $paged);
	$archive = $archivePost->getArchive();
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
				<?php if ($archive->have_posts()) :?>
	       			<?php while($archive->have_posts()) :?>
	         			<?php $archive->the_post(); ?>
						<?php $acfData = get_fields(get_the_ID()); ?>
							<div class="header">
								<span class="title"><?php the_title();?></span>
								<span class="author"><?php echo $acfData['author']; ?></span>
								<span class="date"><?php echo substr($acfData['date'],0,4) . '.' . substr($acfData['date'],4,2) . '.' . substr($acfData['date'],6,2) ; ?></span>
								<span class="verse"><?php echo isset($acfData['verse']) ? $acfData['verse'] : ''; ?></span>
							</div>
							<div class="img">

							</div>
							<div class="content">
								<?php the_content(); ?>
							</div>

					<?php endwhile; ?>
					<div class="navigation">
						<?php
							$total_pages = $archive->max_num_pages;
							$current_page = max(1, get_query_var('paged'));

							$arg = array(
								'base' => get_pagenum_link(1) . '%_%',
					            'format' => '/page/%#%',
					            'current' => $current_page,
					            'total' => $total_pages,
								'prev_text' => '<',
								'next_text' => '>',
							);
							echo paginate_links($arg);
						?>
					</div>
				<?php endif; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		   <?php include "modules/sidebar.php"; ?>
		</section>
	   <?php include "modules/footer.php"; ?>
	</body>
</html>