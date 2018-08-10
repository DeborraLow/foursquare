<?php
	/*
		Template Name: Schedule Template
	*/
	include "classes/Include.php";
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
		<div id="schedule">

		</div>
		<?php include "modules/sidebar.php"; ?>
	</section>
	<?php include "modules/footer.php"; ?>
</body>
</html>