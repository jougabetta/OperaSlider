$.fn.sliderOpera = function(settings){

   o = {

        visible: 1,
        pass: 1,
        fade: false,
        speed: 900

   }

   if(settings){ $.extend( o, settings); }
   $size=0;
   $slider = this;

   $slider.css({ height: "auto", float: "left", position: "relative", overflow: "hidden" });

   if(o.fade){

        o.visible = 1;
        $slider.find("li").css({ position: "absolute", left: 0, opacity: 0 }).eq(0).css({ opacity: 1, zIndex: 999 });

   }else{

        $slider.find("li").css({ float: "left", listStyle: "none" });

   }

   $arrayOffset = $slider.find("ul").children().map(function(){

        $size += $(this).outerWidth(true);
        $widthLi = $(this).width();
        $heightLi = $(this).height();
        return $(this);

   }).get();

   $slider.css({ width: $widthLi*o.visible+"px", height: $heightLi*o.visible+"px" }).find("ul").css({width: $size+"px", position: "relative", margin: 0, padding: 0});

   $totalArrayOffset = o.pass == 1 && o.visible != 1 ? parseInt($arrayOffset.length / o.visible + o.pass) : $arrayOffset.length / o.pass

   $slider.append(function(){

        $texto = "<div class='painel_button'>";
        for($i=0;$i < $totalArrayOffset; $i++){
            $texto += "<div class='button'></div>";
        }
        $texto += "</div>";

        return $texto;

   });

   $slider.delegate(".button", "click", function(){

        $i = $(this).index();

        if(o.fade){

            $slider.find("li").stop();
            $slider.find("li").css({zIndex: 999}).eq($i).css({zIndex: 1000}).animate({

                opacity: 1

            }, o.speed, function(){ $(this).siblings().css({opacity: 0}); });

        }else{

            $slider.find("ul").stop();
            $slider.find("ul").animate({

                left: -$arrayOffset[$i].position().left*o.pass+"px"

            });

        }



   });

}

$(function(){

    $(document).find(".slider").sliderOpera({fade: true});

});

