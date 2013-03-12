$.fn.sliderOpera = function(settings){

   o = {

        visible: 1,
        pass: 1,
        fade: false,
        speed: 900,
        end: 1

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

   $slider.css({ width: $widthLi*o.visible+"px", height: $heightLi }).find("ul").css({width: $size+"px", position: "relative", margin: 0, padding: 0});

   if(o.pass != 1 && o.visible != 1 ){

      $totalArrayOffset = Math.ceil($arrayOffset.length / o.visible);

   }else{

      $totalArrayOffset = $arrayOffset.length / o.pass;

   }

   if( o.end ){

      withEnd();

   }else{

      noEnd();

   }

   function noEnd(){

      $slider.find("ul").css({left: -$arrayOffset[1].position().left});

      $slider.after('<div class="nextOpera"></div>').before('<div class="prevOpera"></div>');
      
      renewArray();

      $(document).delegate(".prevOpera", "click", function(){

          $slider.find("ul").stop();
          $slider.find("ul").animate({

            left: -$arrayOffset[0].position().left*o.pass+"px"  

          }, function(){

            $slider.find("ul").stop();
            $slider.find("ul").css({left: -$arrayOffset[1].position().left});
            renewArray();

          });

      });

      $(document).delegate(".nextOpera", "click", function(){

          $slider.find("ul").stop();
          $slider.find("ul").animate({

            left: -$arrayOffset[2].position().left*o.pass+"px"  

          }, function(){

            $slider.find("ul").stop();
            $slider.find("ul").css({left: -$arrayOffset[1].position().left});
            renewArray(true);

          });

      });

   }

   function renewArray(next){

        if(next){

            $slider.find("ul").append(function(){

            $copy = $arrayOffset[0].clone();
            $arrayOffset[0].remove();

            $arrayOffset.shift();
            $arrayOffset.push($copy);

            return $copy;

            });

        }else{

            $slider.find("ul").prepend(function(){

            $copy = $arrayOffset[$arrayOffset.length-1].clone();
            $arrayOffset[$arrayOffset.length-1].remove();

            $arrayOffset.pop();
            $arrayOffset.unshift($copy);

            return $copy;

            });

        }

   }
   
   function withEnd(){

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

}

$(function(){

    $(document).find(".slider").sliderOpera({end:0, visible:3});

});

