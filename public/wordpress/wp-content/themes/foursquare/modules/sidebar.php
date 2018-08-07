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
	<div class="widget-archive">
		<div class="archive-title">
			<span class="en">ARCHIVES</span>
			<span class="ja">アーカイブ</span>
		</div>
	</div>
</div>