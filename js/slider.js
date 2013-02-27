$.fn.sliderOpera = function(){

   arg = $.isPlainObject(arguments[0]) ? arguments[0] : 0;
   o = {

        visible: arg.visible != 0 && arg.visible != "" && arg.visible != undefined ? arg.visible : 1,
        pass: arg.pass != 0 && arg.pass != "" && arg.pass != undefined ? arg.pass : 1

   }

   $size=0;
   $slider = this;

   $slider.css({ height: "auto", float: "left", position: "relative", overflow: "hidden" }).find("li").css({ float: "left", listStyle: "none" });

   $arrayOffset = $slider.find("ul").children().map(function(){

        $size += $(this).outerWidth(true);
        $sizeLi = $(this).width();
        return $(this);

   }).get();

   $slider.css({ width: $sizeLi*o.visible+"px" }).find("ul").css({width: $size+"px", position: "relative", margin: 0, padding: 0});

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

        $slider.find("ul").animate({

            left: -$arrayOffset[$i].position().left*o.pass+"px"

        });

   });

}

$(function(){

    $(document).find(".slider").sliderOpera();

});

