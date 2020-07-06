var curIndex = 1;
var scrollSpeed = 500;
var animSpeed = 0.5;
var animFSpeed = 0.2;
var pnpData;
var creationData;
var curYear = 1;
var numOfItems = 0;
var isMob = false;
var nos;
var globalNextIndex = 1;
var gInit = false;
var curProjectIndex;
$(document).ready(function() {
	var winWidth = $(window).width();
	nos = 3;
	if(winWidth > 543 && winWidth <= 991){
		nos = 3;
	} else if(winWidth <= 543 || winWidth > 991){
		nos = 2;
	}
	mobChecker();
	$.getJSON("data/past-and-present.json", function(data){
		pnpData = data;
		numOfItems = data.length;
		pnpContentUpdate(nos);
	})
	$.getJSON("data/creation.json", function(data){
		creationData = data.sort(function(x, y){
		    return new Date(y.timeline) - new Date(x.timeline);
		});
		// creationData = data.sortBy(function(o){ return new Date( o.timeline ) });
		creationDisplay();
	})
	var $anchors = ['intro', 'about','past-and-present','what-is-inside','creation','get'];
	var $name = ['Intro', 'About','Past &amp; Present','What is Inside','Creation','Get'];
	$(".section").each(function(){
		// $anchors.push($(this).attr("danchor"));
		// $name.push($(this).attr("fp-name"));
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
			console.log(curYear+", "+numOfItems);
		}
	})
	$("#main-container").fullpage({
		menu: '#menu',
		scrollingSpeed: scrollSpeed,
		keyboardScrolling: false,
		'navigation': true,
		'navigationPosition': 'right',
		'navigationTooltips': $name,
		// anchors: ['intro','past-and-present','what-is-inside','creation','get'],
		anchors: $anchors,
		scrollOverflow: true,
		scrollOverflowOptions: {
			scrollbars: true,
	        mouseWheel: true,
	        hideScrollbars: false,
	        fadeScrollbars: false,
	        disableMouse: true
		},
        afterRender: function(){
        },
        afterLoad: function(anchorLink, index){
        	if(anchorLink == "#intro"){
        		
        	}
        },
		'onLeave': function(index, nextIndex, direction){
					if(index == 1){

					}
					if (nextIndex == 1){
						if(!isMob){
							TweenMax.to("#ccircle-fam", animSpeed, {left: "-40%", bottom: 0, overwrite: "all"});
						} else {
							TweenMax.to("#ccircle-fam", animSpeed, {left: 0, bottom: "30%", overwrite: "all"});
						}
						TweenMax.to("#bg-mt-cook", animSpeed, {bottom: "-35%"});
						TweenMax.to(".csite-name", animFSpeed, {opacity: 1, delay: animSpeed});
						TweenMax.to(".scroll-hint", animSpeed, {bottom: 0});
						changeImg(false, "logo-2020.svg", 0.125);
						gradientDir($("#fadeGrad"), "40%", "43%", "40%", "55%");

						curIndex = 1;
					}
					if (nextIndex != 1){
						TweenMax.to(".csite-name", animFSpeed, {opacity: 0});
						TweenMax.to(".scroll-hint", animSpeed, {bottom: -90});
					}
					if (nextIndex == 2){
						if(!isMob){
							TweenMax.to("#ccircle-fam", animSpeed, {left: 0, bottom: "30%", overwrite: "all"});
						} else {
							TweenMax.to("#ccircle-fam", animSpeed, {left: 0, bottom: "60%", overwrite: "all"});
						}
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
						if(!isMob){
							TweenMax.to("#ccircle-fam", animSpeed, {left: "-70%", bottom: "20%", overwrite: "all"});
						} else {
							TweenMax.to("#ccircle-fam", animSpeed, {left: 0, bottom: "70%", overwrite: "all"});
						}
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
						gradientDir($("#fadeGrad"), "60%", "40%", "60%", "60%");
						TweenMax.staggerFrom(".wii-badges img", animSpeed, {opacity: 0, rotation: -45, transformOrigin: "50% 50%", overwrite: "all", delay: scrollSpeed/1000}, 0.1);
					}
					if (nextIndex != 4){
						TweenMax.to(".wii-badges img", 0, {opacity: 1, rotation: 0, delay: scrollSpeed/1000});
					}
					if(nextIndex == 5){
						TweenMax.to("#ccircle-fam", animSpeed, {left: "40%", bottom: "100%"});
					}
					if (nextIndex == 6){
						TweenMax.to("#ccircle-fam", animSpeed, {opacity: 0});
						TweenMax.to("#bg-mt-cook", animSpeed, {bottom: "-30%", overwrite:"all"});
						TweenMax.to("footer", animSpeed, {opacity: 1, marginTop: -47, overwrite: "all"});
					}
					if (nextIndex != 6){
						TweenMax.to("#ccircle-fam", animSpeed, {opacity: 1});
						TweenMax.to("footer", animSpeed, {opacity: 0, marginTop: 0, overwrite: "all"});
					}
					if (nextIndex != 1 && nextIndex != 6){
						TweenMax.to("#bg-mt-cook", animSpeed, {bottom: "-100%", overwrite: "all"});
					}
					defaultAnim();
				}
	});
	$(window).on("mousemove", function(e){
		var stopValX = Math.floor((e.pageX/$(this).width())*100);
		var stopValY = Math.floor((e.pageY/$(this).height())*100);
		// $("#fadeGrad").attr("x2",stopValX+"%");
		// $("#fadeGrad").attr("y2",stopValY+"%");
	})
	// TweenMax.from(".ccirclesvg", 2, {opacity:0});
	if(getCurrentHash() == "#intro" || getCurrentHash() == ""){
		tweenCcircle();
	} else {
		scrollerAnim();
	}

	// PROJECT PAGE SETUP //
	$("#creation-modal").scroll(function(){
		var winH = $(window).height();
		var posy = $(this).find(".content").offset().top;
		var posyBottom = $(this).find(".content").height()+posy;
		var opacity = posy/winH;
		if(posyBottom > winH){
			if(opacity >= 0){
				$(this).find(".banner-fixed").css({"opacity":opacity});
				bannerImage(true);
			}
			if(opacity < 0){
				$(this).find(".banner-fixed").css({"opacity":0});
			}
		} else if(posyBottom <= winH){
			var topVal = 50-(posyBottom/winH)*50;
			$(this).find(".banner-fixed").css({"opacity":0.25});
			$(this).find(".next-project a h3").css({"opacity":1});
			$(this).find(".next-project a h3").css({"top":topVal+"%"});
			bannerImage(false);
		}
	});
	$("#creation-modal .btn-close").on("click", function(e){
		$("#creation-modal").fadeOut();
		var linkClear = setTimeout(function(){
			$("#creation-modal .content .link").empty();
		}, 500);
		$.fn.fullpage.setAllowScrolling(true);
	});
	$("#creation-modal .next-project a").on("click", function(){
		var posyBottom = $("#creation-modal .content").offset().top + $("#creation-modal .content").height();
		var multiplier = 1;
		var nextProjectIndex = curProjectIndex+1;
		if(nextProjectIndex > creationData.length-1){
			nextProjectIndex = 0;
		}
		if(posyBottom > 0){
			TweenMax.to("#creation-modal", animSpeed, {scrollTo: ".next-project"});
			TweenMax.to("#creation-modal .banner-fixed", animSpeed, {opacity: 1});
		} else if(posyBottom <= 0){
		}
		TweenMax.to("#creation-modal .banner-fixed", animSpeed, {opacity: 1});
		TweenMax.to("#creation-modal .next-project a h3", animSpeed, {opacity: 0});
		TweenMax.from("#creation-modal .content .scroll-hint", animSpeed, {opacity: 0, delay: animSpeed});
		setTimeout(function(){
			projectDisplay(nextProjectIndex);
			$("#creation-modal").scrollTop(0);
		}, animSpeed*1000);
		bannerImage(false);
	})
	// END OF PROJECT PAGE SETUP //

	$("#ccircle-pic").on("click",function(){
		if(curIndex == 1){
			// tweenCcircle();
		}
	})
	$(window).resize(function(){
		var winWidth = $(this).width();
		if(winWidth > 543 && winWidth <= 991){
			pnpContentUpdate(3);
		} else if(winWidth <= 543 || winWidth > 991){
			pnpContentUpdate(2);
		}
		mobChecker();
	});
});
function mobChecker(){
	var winWidth = $(this).width();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		// using mobile browser
		isMob = true;
	}
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)) || winWidth <= 543){
		isMob = true;
    }
	if(winWidth > 543){
		isMob = false;
	}
	return isMob;
}
function getCurrentHash(){
	return window.location.hash;
}

function tweenCcircle(){
	var tl = new TimelineMax();
	tl
	.staggerFrom(".ccircle", animFSpeed, {opacity:0, scale:0.5, transformOrigin: "50% 50%"}, 0.1)
	.from("#ccircle-pic", animSpeed, {opacity:0, scale:0.9, transformOrigin: "50% 50%"})
	.from("#ccircle-fam", animSpeed, {left: 0})
	TweenMax.from("h1.csite-heading", animSpeed, {opacity:0, marginLeft: -300, delay: 1});
	TweenMax.from("p.csite-pos-desc", animSpeed, {opacity:0, marginLeft: -300, delay: 1.5});
	TweenMax.from("#bg-mt-cook", animSpeed, {bottom: "-100%", delay: 2});
	TweenMax.from(".scroll-hint", animSpeed, {opacity: 0, delay: 1.5});

	scrollerAnim();
}

function scrollerAnim(){
	var tlScroll = new TimelineMax({paused: true, repeat: -1});
	tlScroll
	.to(".scroller", 1, {bottom: "-20%"})
	.to(".scroller", 1, {opacity: 0})
	var tmScroll = setTimeout(function(){tlScroll.play();}, 2000);
	var tlScrollM = new TimelineMax({paused: true, repeat: -1});
	tlScrollM
	.to(".scroller-mob", 1, {bottom: "20%"})
	.to(".scroller-mob", 1, {opacity: 0})
	var tmScrollM = setTimeout(function(){tlScrollM.play()}, 2000);
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
	if($(".ccircle-pic").css("opacity") != 1){
		TweenMax.to(".ccircle-pic", 0, {opacity: 1, scale: 1});
		
	}
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
	setTimeout(function(){pnpContentUpdate(nos);}, animFSpeed*1000);
	TweenMax.to(".pnp-content", animFSpeed, {opacity: 1, delay: animFSpeed*2});
	TweenMax.to(".acquirement", animFSpeed, {opacity: 1, delay: animFSpeed*2});
	TweenMax.to(".cyear .year", 0, {opacity: 1, margin: 0, delay: animFSpeed*2});
}

function pnpContentUpdate(numOfSlides){
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
			$(".badges").append('<div><img src="images/'+imgsrc+'" alt="'+name+'" /></div>')
		} else {
		if(imgsrc && leveled)
			var lvlClass;
			if(imgsrc.indexOf(4)>=0){lvlClass = "gold"}else{lvlClass = "silver"};
			$(".badges").append('<div><img src="images/'+imgsrc+'" alt="'+name+'" /><span class="leveled '+lvlClass+'"><i class="fa fa-angle-double-up"></i> level up</span></div>')
		}
		i++;
	}
	$(".badges").slick({
		slidesToShow: numOfSlides,
		infinite: false
	});
	
}

function creationDisplay(){
	var i = 0;
	window.creationData = creationData;

	creationData.forEach(function(creation) {
		const childToAppend = `
			<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 project'>
				<div class='holder'>
					<img class='screenshot' src='images/creation/${creation['thumbnail']}' />
					<a href='${creation['url'] ? creation['url'] : `#${creation['hash']}`}' ${creation['url'] ? 'target="_blank"' : ''}>
						<div class='middle'>
							<i class='${creation['awecon']}'></i>
							<h3 class='title'>${creation['name']}</h3>
							<p class='date'>${creation['timeline']}</p>
						</div>
					</a>
				</div>
			</div>
		`;
		$("#id-creation .container").append(childToAppend);
	})
	

	$("#id-creation .project a").on("click", function(){
		if ($(this).attr('href').indexOf('#') > -1) {
			$("#creation-modal").fadeIn();
			$("#creation-modal").scrollTop(0);
			$.fn.fullpage.setAllowScrolling(false);
			var currentBanner = $("#creation-modal .banner");
			curProjectIndex = $(this).parents().eq(1).index();
			projectDisplay(curProjectIndex);
		}
	});
}

function projectDisplay(pos){
	var curProject = creationData[pos];
	var nextProject;
	if(pos < creationData.length-1){
		nextProject = creationData[pos+1];
	} else if(pos >= creationData.length-1){
		nextProject = creationData[0];
	}
	$("#creation-modal .banner img").attr("src","images/creation/"+curProject["banner"]);
	$("#creation-modal .banner-fixed").css({"background":"url(images/creation/"+curProject["banner"]+") center","background-size":"cover"});
	$("#creation-modal .next-project a").attr("href","#"+nextProject["hash"]);
	$("#creation-modal .next-project a h3 .title").html(nextProject["name"]);
	$("#creation-modal .next-project img").attr("src","images/creation/"+nextProject["banner"]);
	$("#creation-modal .content .title").html(curProject["name"]);
	$("#creation-modal .content .p-date .date").html(curProject["timeline"]);
	$("#creation-modal .content .p-date .type").html(curProject["type"]);
	$("#creation-modal .content .p-role").html("<em>"+curProject["role"]+"</em>");
	$("#creation-modal .content .p-desc").html(curProject["content"]);
	var linkDiv = $("#creation-modal .content .link");
	linkDiv.empty();
	if(curProject["video"]){
		linkDiv.append(curProject["video"]);
	}
	if(curProject["url"]){
		linkDiv.append("<a class='website-link' href='"+curProject['url']+"' target='_blank'>Visit Link <i class='fa fa-angle-right'></i></a>")
	}
	if(gInit == true){
		$(".gallery .inner-holder").slick("unslick");
	}
	var i = 0;
	var gallery = $("#creation-modal .gallery .inner-holder");
	gallery.empty();
	while(curProject["screenshots"][i]){
		gallery.append("<img src='images/creation/"+curProject['screenshots'][i]+"' />")
		i++;
	}
	gallery.ready(function(){
		$(".gallery .inner-holder").slick({
			slidesToShow: 1,
			infinite: false
		});	
	})
	if(curProjectIndex <= creationData.length-1){
		curProjectIndex = pos;
	} else if(curProjectIndexc > creationData.length-1){
		curProjectIndex = 0;
	}
	gInit = true;
}

//change project banner
function bannerImage(isCur){
	var currentBanner = $("#creation-modal .banner");
	var nextBanner = $("#creation-modal .next-project");
	if(isCur == true){
		$("#creation-modal .banner-fixed").css({"background":"url("+currentBanner.find("img").attr("src")+") center","background-size":"cover"});
	} else {
		$("#creation-modal .banner-fixed").css({"background":"url("+nextBanner.find("img").attr("src")+") center","background-size":"cover"});
	}
}

function reslick(numOfSlides){
	$(".badges").slick("unslick");
	$(".badges").slick({
		slidesToShow: numOfSlides,
		infinite: false
	});
}

//date sorting
(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();

//disabling tab key navigation
$(document).keydown(function (e) 
{
	var input = $('input, textarea');
    var keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 == 0 || keycode1 == 9 && !$("#get input").is(":focus")) {
        e.preventDefault();
        e.stopPropagation();
    }
});