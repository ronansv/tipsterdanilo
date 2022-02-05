function redimensionar_carrossel(){
	$(".carrossel").height($(".carrossel").width() * 0.90);
}

function criar_botoes_navegacao_carrossel(){
	function proxima_imagem(carrossel,index){
		$(carrossel).attr("data-item",index);
		$(carrossel).children(".imagens").children("img").hide();
		$(".carrossel .botoes_navegacao .botao").removeClass("selecionado");
		$(carrossel).children(".imagens").children("img").eq(index).fadeIn(1000);
		$(carrossel).children(".botoes_navegacao").children(".botao").eq(index).addClass("selecionado");
	}

	$(".carrossel").each(function(index){
		carrossel = $(this);
		$(carrossel).children(".imagens").eq(0).children("img").each(function(index){
			if(index == 0){
				$(carrossel).children(".botoes_navegacao").append("<div class='botao selecionado'></div>");
			}else{
				$(carrossel).children(".botoes_navegacao").append("<div class='botao'></div>");
			}
		});
	});

	$(".carrossel .botoes_navegacao .botao").on("click",function(){
		carrossel = $(this).parent().parent();
		index = $(this).index();
		proxima_imagem(carrossel,index);
	});

	$(".carrossel .setas_navegacao img.proximo").on("click",function(){
		carrossel = $(this).parent().parent();
		index = $(carrossel).attr("data-item") * 1;
		totalImagens = $(carrossel).children(".imagens").children("img").length;
		if(index == totalImagens - 1){
			index = 0;
		}else{
			index += 1;
		}
		proxima_imagem(carrossel,index);
	});

	$(".carrossel .setas_navegacao img.anterior").on("click",function(){
		carrossel = $(this).parent().parent();
		index = $(carrossel).attr("data-item") * 1;
		totalImagens = $(carrossel).children(".imagens").children("img").length;
		if(index == 0){
			index = totalImagens - 1;
		}else{
			index -= 1;
		}
		proxima_imagem(carrossel,index);
	});
}

function animeScrool(){
	const top = window.pageYOffset + (window.innerHeight);
	$("[data-anime]").each(function(){
		if(top > $(this).offset().top){
			if(!$(this).hasClass("animate")){
				$(this).addClass("animate");
			}
		}
		if(window.pageYOffset + 200 > $(this).offset().top){
			id = $(this).attr("id");
			botao = $("nav a[href='#" + id + "']");
			$("nav a").removeClass("selecionado");
			$(botao).addClass("selecionado");
		}

		if(window.pageYOffset <= 20){
			id = "inicio";
			botao = $("nav a[href='#" + id + "']");
			$("nav a").removeClass("selecionado");
			$(botao).addClass("selecionado");
		}

		if(window.pageYOffset >= document.documentElement.scrollHeight - window.innerHeight){
			id = "contato";
			botao = $("nav a[href='#" + id + "']");
			$("nav a").removeClass("selecionado");
			$(botao).addClass("selecionado");
		}
	});
}

redimensionar_carrossel();
criar_botoes_navegacao_carrossel();
animeScrool();

$(window).scroll(function(){
	animeScrool();
});

$(window).resize(function(){
	redimensionar_carrossel();
});

$("nav a").on("click",function(e){
	e.preventDefault();
	id = $(this).attr("href");
	distancia_topo = $(id).offset().top - 100;
	$("html,body").animate({
		scrollTop: distancia_topo
	},800);
	$("nav a").removeClass("selecionado");
	//$(this).addClass("selecionado");
});

$(".btnMenu").on("click",function(){
	if($("nav ul").is(":hidden")){
		$(this).attr("src","img/btnMenuFechar.png");
		$("nav ul").fadeIn(500);
		$("nav ul").css({
			"display":"flex"
		});
	}else{
		$(this).attr("src","img/btnMenu.png");
		$("nav ul").fadeOut(500);
	}
});

