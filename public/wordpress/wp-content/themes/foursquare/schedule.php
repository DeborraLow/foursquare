<?php
	/*
		Template Name: Schedule Template
	*/
	include "classes/Include.php";
	$schedulePost = new Schedule(-1,'','program');
	$schedules = $schedulePost->getSchedulePost();

	$days = [false,false,false,false,false,false,false];
	$dayJa = ['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日'];
	foreach ($schedules as $schedule) {
		$fields = get_fields($schedule['ID']);
		switch ($fields['day']) {
			case '0':
				$days[0] = true;
			break;
			case '1':
				$days[1] = true;
			break;
			case '2':
				$days[2] = true;
			break;
			case '3':
				$days[3] = true;
			break;
			case '4':
				$days[4] = true;
			break;
			case '5':
				$days[5] = true;
			break;
			case '6':
				$days[6] = true;
			break;
		}
	}
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
			<div class="schedule-list">
				<div class="schedule-title">
					予定
				</div>
				<div class="schedule-item">
					<?php for ($i = 0; $i < sizeof($days); $i++) :?>
						<?php if ($days[$i]): ?>
							<div class="schedule-day">
								<?php echo $dayJa[$i]; ?>
							</div>
							<div class="schedule-content">
								<?php foreach ($schedules as $schedule) : ?>
									<?php $fields = get_fields($schedule['ID']); ?>
									<?php if($fields['day'] == (string)$i) :?>
										<div class="schedule-content-item">
											<span><?php echo $schedule['post_title']; ?></span>
											<span><?php echo $fields['time_start']; ?> ~ <?php echo isset($fields['time_end']) ? $fields['time_end'] : ''; ?></span>
											<span class="note"><?php echo isset($fields['note']) ? $fields['note'] : ''; ?></span>
										</div>
									<?php endif; ?>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					<?php endfor; ?>
				</div>
			</div>
		</div>
		<?php include "modules/sidebar.php"; ?>
	</section>
	<?php include "modules/footer.php"; ?>
</body>
</html>