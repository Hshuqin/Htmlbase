$(document).ready(function () {
    var i_curIndex = 0;
    var beauBeauSlide; //函数对象
    var i_curID = 0; //取得鼠标下方的对象ID
    var pictureID = 0; //索引ID

    $("#i_focus_piclist li").eq(0).show(); //默认
    autoScroll();
    $("#i_focus_btn li").hover(function (e) {
        StopScrolll();
        $("#i_focus_btn li").removeClass("i_cur") //所有的li去掉当前的样式加上正常的样式
        $(this).addClass("i_cur"); //而本身则加上当前的样式去掉正常的样式
        i_curID = $(this).attr("id"); //取当前元素的ID
        pictureID = $("#i_focus_btn li").index(this);// i_curID.substring(i_curID.length - 1); //取最后一个字符
        $("#i_focus_piclist li").eq(pictureID).fadeIn("slow"); //本身显示
        $("#i_focus_piclist li").not($("#i_focus_piclist li")[pictureID]).hide(); //除了自身别的全部隐藏
        $("#i_focus_tx li").hide();
        $("#i_focus_tx li").eq(pictureID).show();

    },
    function () {
        //当鼠标离开对象的时候获得当前的对象的ID以便能在启动自动时与其同步
        i_curID = $(this).attr("id"); //取当前元素的ID
        pictureID = i_curID.substring(i_curID.length - 1); //取最后一个字符
        i_curIndex = pictureID;
        autoScroll();
    });
    //自动滚动

    function autoScroll() {
        var myNubli = $("#i_focus_btn li").size();
        if (myNubli > 1) {
            $("#i_focus_btn li:last").removeClass("i_cur");
            $("#i_focus_tx li:last").hide();
            $("#i_focus_btn li").eq(i_curIndex).addClass("i_cur");
            $("#i_focus_btn li").eq(i_curIndex - 1).removeClass("i_cur");
            $("#i_focus_tx li").eq(i_curIndex).show();
            $("#i_focus_tx li").eq(i_curIndex - 1).hide();
            $("#i_focus_piclist li").eq(i_curIndex).fadeIn("slow");
            $("#i_focus_piclist li").eq(i_curIndex - 1).hide();
            i_curIndex++;
            i_curIndex = i_curIndex >= myNubli ? 0 : i_curIndex;
            beauBeauSlide = setTimeout(autoScroll, 5000);
        }
    }
    function StopScrolll() //当鼠标移动到对象上面的时候停止自动滚动
    {
        clearTimeout(beauBeauSlide);
    }
});
//第二个渐隐幻灯开始
var defaultOpts = {
    interval: 3000,
    fadeInTime: 800,
    fadeOutTime: 500
};

var _titles = $("ul.slide-txt li");
var _titles_bg = $("ul.op li");
var _bodies = $("ul.slide-pic li");
var _count = _titles.length;
var _current = 0;
var _intervalID = null;
var stop = function () {
    window.clearInterval(_intervalID);
};
var slide = function (opts) {
    if (opts) {
        _current = opts.current || 0;
    } else {
        _current = (_current >= (_count - 1)) ? 0 : (++_current);
    };
    _bodies.filter(":visible").fadeOut(defaultOpts.fadeOutTime,
    function () {
        _bodies.eq(_current).fadeIn(defaultOpts.fadeInTime);
        _bodies.removeClass("cur").eq(_current).addClass("cur");
    });
    _titles.removeClass("cur").eq(_current).addClass("cur");
    _titles_bg.removeClass("cur").eq(_current).addClass("cur");
}; //endof slide
var go = function () {
    stop();
    _intervalID = window.setInterval(function () {
        slide();
    },
    defaultOpts.interval);
}; //endof go
var itemMouseOver = function (target, items) {
    stop();
    var i = $.inArray(target, items);
    slide({
        current: i
    });
}; //endof itemMouseOver
_titles.hover(function () {
    if ($(this).attr('class') != 'cur') {
        itemMouseOver(this, _titles);
    } else {
        stop();
    }
},
go);
//_titles_bg.hover(function() { itemMouseOver(this, _titles_bg); }, go);
_bodies.hover(stop, go);
go();
var slideX = {
    _this: $('.catalog .imgbox'),
    _btnLeft: $('.catalog .left'),
    _btnRight: $('.catalog .right'),
    init: function () {
        slideX._btnLeft.click(slideX.slideLeft);
        slideX._btnRight.click(slideX.slideRight);
    },
    slideLeft: function () {
        slideX._btnLeft.unbind('click', slideX.slideLeft);
        for (i = 0; i < 2; i++) {
            slideX._this.find('li:last').prependTo(slideX._this);
        }
        slideX._this.css('marginLeft', -224);
        slideX._this.animate({
            'marginLeft': 0
        },
        500,
        function () {
            slideX._btnLeft.bind('click', slideX.slideLeft);
        });
        return false;
    },
    slideRight: function () {
        slideX._btnRight.unbind('click', slideX.slideRight);
        slideX._this.animate({
            'marginLeft': -224
        },
        500,
        function () {
            slideX._this.css('marginLeft', '0');
            for (i = 0; i < 2; i++) {
                slideX._this.find('li:first').appendTo(slideX._this)
            }
            slideX._btnRight.bind('click', slideX.slideRight);
        });
        return false;
    }
}
$(document).ready(function () {
    slideX.init();
})
$(document).ready(function () {
    var newTime = new Date();
    var newTime = newTime.getTime();
    var $imgTmp = $('#topromotion').find('img:first');
    var osrc = $imgTmp.attr('src');
    $imgTmp.attr('src', osrc + '?' + newTime);
});