(function($){
	Main = {
		init: function(){
			this.window      = $(window);
			this.html        = $('html');
			this.body        = $('body');
			this.device      = '';

			this.resize();
			this.accordion();
			this.formLabel();
		},
		resize: function(){
			this.window.on('load resize',function(){
				var breakpoint = 767;
				this.windowWidth = window.innerWidth;
				this.windowWidth <= breakpoint ? this.device = 'SP' : this.device = 'PC';

				this.responImg(this.device);
				this.responTxt(this.device, this.windowWidth);
			}.bind(this))
		},
		responImg: function(device){
			var suffix = '';
			$('.responImg').each(function(){
				if (device == 'SP') {
					if (!$(this).attr('src').match(new RegExp('\.sp.(png|jpg|gif|svg)$'))) {
						suffix = $(this).attr('src').match(new RegExp('\.(png|jpg|gif|svg)$'))[0];
						$(this).attr('src', $(this).attr('src').replace(new RegExp('\.(png|jpg|gif|svg)$'), '.sp' + suffix));
					}
				}
				else{
					suffix = $(this).attr('src').match(new RegExp('\.(png|jpg|gif|svg)$'))[0];
              		$(this).attr('src', $(this).attr('src').replace(new RegExp('\.sp.(png|jpg|gif|svg)$'), suffix));
				}
			})
		},
		responTxt: function(device, windowWidth){
			if (device == 'SP') {
				var fp = windowWidth / 375 * 100;
				if (windowWidth < 375) {
					$('.responTxt').each(function(){
						$(this).css({'font-size': fp + '%'});
					})
				}
				else{
					$('.responTxt').each(function(){
						$(this).css({'font-size': ''});
					})
				}
			}
		},
		accordion: function(){

			$('.burger').click(function(){
				var target = $(this).siblings('.burger-menu');
				if ($(this).hasClass('open')) {
					$(this).removeClass('open');
					target.velocity('stop').velocity({height : 0}, 250);
				}
				else {
					$(this).addClass('open');
					var H = target.height('auto').height();
					target.velocity('stop').velocity({height : H}, 250, function(){
						target.height('auto');
					})
				}
			})
		},
		formLabel: function(){
			$('.input-wp span input').focus(function(){
				$(this).parent().parent().siblings('.input-title').addClass('focus');
			})
			$('.input-wp span input').focusout(function(){
				if ($(this).val().length == 0) {
					$(this).parent().parent().siblings('.input-title').removeClass('focus');
				}
			})
			$('.input-wp span textarea').focus(function(){
				$(this).parent().parent().siblings('.content-label').addClass('focus');
			})
			$('.input-wp span textarea').focusout(function(){
				if ($(this).val().length == 0) {
					$(this).parent().parent().siblings('.content-label').removeClass('focus');
				}
			})
		}
	}

	$(function(){
		Main.init();
	})
})(jQuery)