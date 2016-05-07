define(['jquery'], function($){
	// list all registry forms
	var $username 	 = $('input[name=username]');
	var $loginname 	 = $('input[name=loginname]');
	var $email 		 = $('input[name=email]');
	var $password 	 = $('input[name=password]');
	var $confirmpass = $('input[name=confirmpass]');
	var $signature 	 = $('input[name=signature]');

	var validateEmpty = function(val, ctx){
		if(!$.trim(val)){
			$(ctx).addClass('notEmpty');
		}else{
			$(ctx).removeClass('notEmpty');
		}
	};

	var blurs = [$username, $loginname, $email, $password, $confirmpass];
	var len   = blurs.length;

	for(var i = 0; i < len; i++){
		blurs[i].blur(function(){
			validateEmpty($(this).val(), this);
		});
	}
	
	// 验证确认密码
	$confirmpass.blur(function(){
		var val = $(this).val();
		var confirmpass = $password.val();

		if($.trim(val) !== $.trim(confirmpass)){
			alert('两次输入密码不一致');
			$(this).val('');
		}
	});

	// submit form
	$('.registryUser').click(function(){
		var hasError = $('.notEmpty').length;
		
		if(!hasError){
			$(this).parent().submit();
		}
	});
});