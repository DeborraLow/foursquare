<section id="breadcrumbs">
   <div class="content">
	   <?php
			$date = new DateTime();
			$day = date("l");
			switch ($day) {
				case 'Monday':
					$dayJp = '月曜日';
					break;
				case 'Tuesday':
					$dayJp = '火曜日';
					break;
				case 'Wednesday':
					$dayJp = '水曜日';
					break;
				case 'Thursday':
					$dayJp = '木曜日';
					break;
				case 'Friday':
					$dayJp = '金曜日';
					break;
				case 'Saturday':
					$dayJp = '土曜日';
					break;
				case 'Sunday':
					$dayJp = '日曜日';
					break;

				default:
					$dayJp = $day;
					break;
			}
	   ?>
	   <span class="day"><?php echo $dayJp; ?></span>
	   <span class="date"><?php echo date_format($date, 'Y'); ?>年<?php echo date_format($date, 'm'); ?>月<?php echo date_format($date, 'd'); ?>日</span>
   </div>
</section>