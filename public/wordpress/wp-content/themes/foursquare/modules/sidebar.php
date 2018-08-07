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
		<div class="archive-content">
			<dl class="archive-file">
				<dt class="year">2010</dt>
				<dd class="month">
					<ul>
						<li><span></span><span>1</span></li>
					</ul>
				</dd>
			</dl>
		</div>
	</div>
</div>