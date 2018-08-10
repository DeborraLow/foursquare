<?php
	$recentVerse = new Recentpost(1,'','verse');
	$recentVersePosts = $recentVerse->getRecentPost();
?>
<div id="sidebar">
	<div class="verse">
		<?php foreach($recentVersePosts as $recentVersePost): ?>
			<div class="content">
				<span class="txt"><?php echo $recentVersePost['post_content']?></span>
				<span class="from"><?php echo $recentVersePost['post_title']?></span>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="schedule">
		<div id='calendar'></div>
	</div>
	<?php
		$calendarPosts = new Calendar();
		$calendars = $calendarPosts->getCalendar();

		$data = [];
		foreach ($calendars as $calendar) {
			$tempData = [];

			$acfData = get_fields($calendar['ID']);

			$title = isset($calendar['post_title']) ? $calendar['post_title'] : '';
			$content = isset($acfData['content']) ? $acfData['content'] : '';
			$date_start = isset($acfData['date_start']) ? $acfData['date_start'] : '';
			$date_end = isset($acfData['date_end']) ? $acfData['date_end'] : '';
			$time_start = isset($acfData['time_start']) ? $acfData['time_start'] : '';
			$time_end = isset($acfData['time_end']) ? $acfData['time_end'] : '';

			$tempData =
				[
					'title' => $title,
					'content' => $content,
					'date' => $date_start,
					'end' => $date_end,
					'time_start' => $time_start,
					'time_end' => $time_end,
					'allDay' => true
				];
			array_push($data, $tempData);
		}

	?>
	<script type="text/javascript">
		var data = <?php echo json_encode($data); ?> ;
		Main.calendar(data)
	</script>
</div>