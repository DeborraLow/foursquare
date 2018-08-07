<?php
	/*
		Template Name: Contact
	*/
	include "classes/Recentpost.php";
 ?>
<?php include "modules/head.php"; ?>
<body>
	<?php include "modules/header.php"; ?>
	<canvas id="c"></canvas>
	<section id="contact">
		<div class="title">
			<span class="en">CONTACT</span>
			<span class="ja">お問い合わせ</span>
		</div>
		<div class="explain">
			内容によっては回答をさしあげるのにお時間をいただくこともございます。
		</div>
		<?php if(have_posts()) : ?>
			<?php while(have_posts()) :?>
				<?php the_post(); ?>
				<?php the_content(); ?>
			<?php endwhile; ?>
		<?php endif; ?>
		<!-- <form>
			<ul class="name-wrapper">
				<li>
					<dl class="input-wrapper">
						<dt class="input-title">
							<label class="form-label">性<span class=asterisk>*</span></label>
						</dt>
						<dd class="input-wp">
							<input type="text" name="last-name">
						</dd>
					</dl>
				</li>
				<li>
					<dl class="input-wrapper">
						<dt class="input-title">
							<label class="form-label">名<span class=asterisk>*</span></label>
						</dt>
						<dd class="input-wp">
							<input type="text" name="first-name">
						</dd>
					</dl>
				</li>
			</ul>
			<dl class="input-wrapper">
				<dt class="input-title">
					<label class="form-label">メールアドレス<span class=asterisk>*</span></label>
				</dt>
				<dd class="input-wp">
					<input type="text" name="email">
				</dd>
			</dl>
			<dl class="input-wrapper">
				<dt class="input-title">
					<label class="form-label">電話番号</label>
				</dt>
				<dd class="input-wp">
					<input type="text" name="tel">
				</dd>
			</dl>
			<dl class="input-wrapper">
				<dt class="content-label">
					<label class="form-label">お問い合わせ内容<span class=asterisk>*</span></label>
				</dt>
				<dd class="input-wp">
					<textarea name="content"></textarea>
				</dd>
			</dl>
		</form> -->
	</section>
	<?php include "modules/footer.php"; ?>
</body>
</html>