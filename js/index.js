$(function(){
	var btn = $(".js-send");
	btn.on("click", function(){
		var inputName = $(this).find("input").attr("name");
		validator.submit(inputName);
	});
});

var validator = validator || {};
validator = (function(){
	
	var submit = function(type){
		errorMessage(type);
	};
	
	var errorCheck = {
		avatar: $("input[name=avatar]"),
		firstname: $("input[name=firstname]"),
		email: $("input[name=email]"),
		password: $("input[name=password]")
	};
	
	var errorMessage = function(types){
		for (var types in errorCheck) {
			var inputName = $("input[name=" + types + "]");
			if (errorCheck.hasOwnProperty(types)) {
				init(types, inputName);
			}
		}
	};
		
	var checkEmail = function(){
		var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var inputEmail = errorCheck.email;
		var emailVal = inputEmail.val().trim();
		
		if( !emailReg.test(emailVal) && emailVal !== '') {
			inputEmail.siblings("#email").text("email格式錯誤").show();
		}else if(emailVal === ''){
			inputEmail.siblings("#email").text("欄位不可為空").show();
		}else{
			inputEmail.siblings("#email").text('').hide();
		}
	};
	
	var checkPassword = function(){
		//需有英數字
		var reg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/;
		var inputPassword = errorCheck.password;
		var passwordVal = inputPassword.val().trim();
		
		if( !reg.test(passwordVal)) {
			inputPassword.siblings("#password").text("密碼格式錯誤").show();
		}else if(passwordVal === ''){
			inputPassword.siblings("#password").text("欄位不可為空").show();
		}else{
			inputPassword.siblings("#password").text('').hide();
		}
	};
	
	function init(data, inputName){
		if( inputName.val().trim() === ''){
			inputName.siblings("#" + data ).text("欄位不可為空").show();
		}else{
			inputName.siblings("#" + data ).text('').hide();
			checkValue();
		}
	}
	
	function checkValue(){
		checkEmail();
		checkPassword();
	}

	return {
		submit:submit
	}
}());