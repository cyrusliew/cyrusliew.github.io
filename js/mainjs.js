var curIndex = 1;
var scrollSpeed = 500;
var animSpeed = 0.5;
var animFSpeed = 0.2;
var pnpData;
var curYear = 1;
var numOfItems = 0;
$(document).ready(function() {
	$.getJSON("data/past-and-present.json", function(data){
		pnpData = data;
		numOfItems = data.length;
		pnpContentUpdate();
	})
	var $anchors = [];
	$(".section").each(function(){
		$anchors.push($(this).attr("name"));
	});
	$(".yearnav button").on("click", function(){
		if($(this).hasClass("active")){
			if($(this).hasClass("arw-left") == true){
				if(curYear > 1 ){
					curYear--;
				}
				if(curYear == 1){
					$(this).removeClass("active");
				}
				nextTimeline("left");
			} else if($(this).hasClass("arw-right") == true) {
				if(curYear < numOfItems){
					curYear++;
				}
				if(curYear == numOfItems){
					$(this).removeClass("active");
				}
				nextTimeline("right");
			}
			if(curYear != 1 && !$(".arw-left").hasClass("active")){
				$(".arw-left").addClass("active");
			}
			if(curYear != numOfItems && !$(".arw-right").hasClass("active")){
				$(".arw-right").addClass("active");
			}
		}
	});
	$("#main-container").fullpage({
		menu: '#menu',
		scrollingSpeed: scrollSpeed,
		keyboardScrolling: false,
		'navigation': true,
		'navigationPosition': 'right',
		'navigationTooltips': $anchors,
		'onLeave': function(index, nextIndex, direction){
					if (nextIndex == 1){
						TweenMax.to("#ccircle-fam", animSpeed, {left: "-40%", bottom: 0, overwrite: "all"});
						TweenMax.to("#bg-mt-cook", animSpeed, {bottom: "-35%"});
						defaultAnim();
						TweenMax.to(".csite-name", animFSpeed, {opacity: 1, delay: animSpeed});
						TweenMax.to(".scroll-hint", animSpeed, {bottom: 0});
						changeImg(false, "logo.png", 0.125);
						gradientDir($("#fadeGrad"), "40%", "43%", "40%", "55%");

						curIndex = 1;
					}
					if (nextIndex != 1){
						TweenMax.to(".csite-name", animFSpeed, {opacity: 0});
						TweenMax.to(".scroll-hint", animSpeed, {bottom: -90});
					}
					if (nextIndex == 2){
						TweenMax.to("#ccircle-fam", animSpeed, {left: 0, bottom: "30%", overwrite: "all"});
						defaultAnim();
						TweenMax.from(".left-info, .right-intro", animFSpeed, {scale: 0.9, opacity: 0, delay: scrollSpeed/1000});
						csstarAnim();
						changeImg(false, "profile-photo.jpg", 0.125);
						gradientDir($("#fadeGrad"), "50%", "50%", "40%", "50%");

						curIndex = 2;
					}
					if (nextIndex != 2){
						changeImg(true, "", 0.2);

						//shooting stars animation
						TweenMax.to(".csstarsvg g line, .csstarsvg g rect", animFSpeed, {opacity: 0, overwrite: "all"});
					}
					if (nextIndex == 3){
						TweenMax.to("#ccircle-fam", animSpeed, {left: "-70%", bottom: "20%", overwrite: "all"});
						defaultAnim();
						TweenMax.to(".csstarsvg", 0, {left: "80%", scale: 1.5, delay: animFSpeed, overwrite: "all"});
						csstarAnim();
						gradientDir($("#fadeGrad"), "50%", "50%", "40%", "55%");
						TweenMax.to(".cyear", animSpeed, {opacity: 1, delay: animSpeed});
						TweenMax.from(".pnp-content, .acquirement", animFSpeed, {scale: 0.9, opacity: 0, delay: scrollSpeed/1000});

						curIndex = 3;
					}
					if(nextIndex != 3){
						TweenMax.to(".cyear", animFSpeed, {opacity: 0});
						TweenMax.to(".csstarsvg", animFSpeed, {opacity: 0, overwrite: "all"});
						TweenMax.to(".csstarsvg", 0, {left: "0", scale: 1, opacity:1, delay: animFSpeed});
					}
					if (nextIndex == 4){
						TweenMax.to("#ccircle-fam", animFSpeed, {opacity: 0, overwrite: "all"});
						TweenMax.to("#ccircle-fam", 0, {left: "40%", bottom: "-70%", delay: animFSpeed});
						TweenMax.to("#ccircle-fam", animFSpeed, {opacity: 1, delay: animFSpeed});
						defaultAnim();
						gradientDir($("#fadeGrad"), "60%", "40%", "60%", "60%");
						TweenMax.staggerFrom(".wii-badges img", animSpeed, {opacity: 0, rotation: -45, transformOrigin: "50% 50%", overwrite: "all", delay: scrollSpeed/1000}, 0.1);
					}
					if (nextIndex != 4){
						TweenMax.to(".wii-badges img", 0, {opacity: 1, rotation: 0, delay: scrollSpeed/1000});
					}
					if(nextIndex == 5){
						TweenMax.to("#ccircle-fam", animSpeed, {left: "40%", bottom: "100%"});
						defaultAnim();
					}
					if (nextIndex == 6){
						TweenMax.to("#ccircle-fam", animSpeed, {opacity: 0});
						defaultAnim();
						TweenMax.to("#bg-mt-cook", animSpeed, {bottom: "-30%", overwrite:"all"});
					}
					if (nextIndex != 6){
						TweenMax.to("#ccircle-fam", animSpeed, {opacity: 1});
					}
					if (nextIndex != 1 || nextIndex != 6){
						TweenMax.to("#bg-mt-cook", animSpeed, {bottom: "-100%", overwrite: "all"});
					}
				}
	});
	$(window).on("mousemove", function(e){
		var stopValX = Math.floor((e.pageX/$(this).width())*100);
		var stopValY = Math.floor((e.pageY/$(this).height())*100);
		// $("#fadeGrad").attr("x2",stopValX+"%");
		// $("#fadeGrad").attr("y2",stopValY+"%");
	})
	// TweenMax.from(".ccirclesvg", 2, {opacity:0});
	tweenCcircle();
	$("#ccircle-pic").on("click",function(){
		if(curIndex == 1){
			// tweenCcircle();
		}
	})
});

function tweenCcircle(){
	var tl = new TimelineMax();
	tl
	.staggerFrom(".ccircle", animFSpeed, {opacity:0, scale:animSpeed, transformOrigin: "50% 50%"}, 0.1)
	.from("#ccircle-pic", animSpeed, {opacity:0, scale:0.9, transformOrigin: "50% 50%"})
	.to("#ccircle-fam", animSpeed, {left: "-40%"})
	TweenMax.from("h1.csite-heading", animSpeed, {opacity:0, marginLeft: -300, delay: 1});
	TweenMax.from("p.csite-pos-desc", animSpeed, {opacity:0, marginLeft: -300, delay: 1.5});
	TweenMax.from("#bg-mt-cook", animSpeed, {bottom: "-100%", delay: 2});
	TweenMax.from(".scroll-hint", animSpeed, {opacity: 0, delay: 1.5});

	var tlScroll = new TimelineMax({paused: true, repeat: -1});
	tlScroll
	.to(".scroller", 1, {bottom: "-20%"})
	.to(".scroller", 1, {opacity: 0});
	var tmScroll = setTimeout(tlScroll.play(), 2000);
}

function changeImg(empty, filename, speed){
	TweenMax.to("#ccircle-pic img", speed, {opacity: 0, overwrite: "all"});
	setTimeout(function(){
		if(empty == false){
			$("#ccircle-pic img").show().attr({"src":"images/"+filename, "width":"auto"});
			TweenMax.to("#ccircle-pic img", speed, {opacity: 1, delay: animSpeed});
		} else {
		}
	}, speed*100)
}
function gradientDir(target, x1, x2, y1, y2){
	target.attr({"x1": x1, "x2": x2, "y1": y1, "y2": y2});
}

// Animation
function defaultAnim(){
	TweenMax.staggerFrom(".ccircle", animFSpeed, {opacity:0, scale:animSpeed, transformOrigin: "50% 50%", overwrite: "all"}, 0.1);
	TweenMax.from("#ccircle-pic", animSpeed, {scale:0.5, transformOrigin: "50% 50%", overwrite: "all"});
}
function csstarAnim(){
	TweenMax.to(".csstarsvg g line, .csstarsvg g rect", 0, {opacity: 0});
	TweenMax.staggerTo(".csstarsvg g line", animSpeed, {opacity: 1, delay: animSpeed, overwrite: "all"}, animFSpeed);
	TweenMax.staggerTo(".csstarsvg g rect", animSpeed, {opacity:1, delay: animSpeed*2, ease: Bounce.easeIn, y:0, transformOrigin: "50% 50%", overwrite: "all"}, animFSpeed);
}

function nextTimeline(direction){
	TweenMax.to(".pnp-content", animFSpeed, {opacity: 0});
	TweenMax.to(".acquirement", animFSpeed, {opacity: 0});
	var marginLR = 0;
	if(direction == "left"){
		TweenMax.to(".cyear .year", animFSpeed, {opacity: 0, marginLeft: "-10%"});
	} else if(direction == "right"){
		TweenMax.to(".cyear .year", animFSpeed, {opacity: 0, marginRight: "-10%"});
	}
	setTimeout(pnpContentUpdate, animFSpeed*1000);
	TweenMax.to(".pnp-content", animFSpeed, {opacity: 1, delay: animFSpeed*2});
	TweenMax.to(".acquirement", animFSpeed, {opacity: 1, delay: animFSpeed*2});
	TweenMax.to(".cyear .year", 0, {opacity: 1, margin: 0, delay: animFSpeed*2});
}

function pnpContentUpdate(){
	var obj = pnpData[curYear-1];
	$(".year").html(obj["year"]);
	$(".timeline").html(obj["timeline"]);
	$(".company").html(obj["company"]);
	$(".role").html(obj["role"]);
	$(".desc").html(obj["content"]);
	var i = 0;
	var aqm = obj["acquirement"];
	$(".badges").slick("unslick");
	$(".badges").empty();
	while(aqm[i]){
		var name = aqm[i]["name"];
		var imgsrc = aqm[i]["imgsrc"];
		var leveled = aqm[i]["leveled"];
		if(imgsrc && !leveled){
			$(".badges").append('<div><img src="images/'+imgsrc+'" alt="'+name+'" width="142" height="auto" /></div>')
		} else {
		if(imgsrc && leveled)
			var lvlClass;
			if(imgsrc.indexOf(4)>=0){lvlClass = "gold"}else{lvlClass = "silver"};
			$(".badges").append('<div><img src="images/'+imgsrc+'" alt="'+name+'" width="142" height="auto" /><span class="leveled '+lvlClass+'"><i class="fa fa-angle-double-up"></i> level up</span></div>')
		}
		i++;
	}
	$(".badges").slick({
		slidesToShow: 2,
		infinite: false
	});
}

//disabling tab key navigation
$(document).keydown(function (e) 
{
    var keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 == 0 || keycode1 == 9) {
        e.preventDefault();
        e.stopPropagation();
    }
});