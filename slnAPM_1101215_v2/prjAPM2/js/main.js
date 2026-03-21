// 滑鼠向下滾動，nav背景變色
$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('.nav01').addClass('black');
    } else {
        $('.nav01').removeClass('black');
    }
})

// 導覽列固定在上方
window.onscroll = function() {
    document.getElementById('na01').style.top = '0';
}

// 下拉選單hover到show出

// var showblock = document.getElementById('showmenu');
// var hoverit = document.getElementById('hoverkey');

// function activehover() {
//     showblock.style.display = 'block';
// }

// function activehoverul() {
//     showblock.style.display = 'block';
// }

// function activehoverout() {
//     showblock.style.display = 'none';
// }
// hoverit.addEventListener('mouseover', activehover, false);
// hoverit.addEventListener('mouseout', activehoverout, false);
// showblock.addEventListener('mouseover', activehoverul, false);
// showblock.addEventListener('mouseout', activehoverout, false);

// bookmark
$(document).ready(function() {
    $('.t1').click(function() {
        $('.titlename li').removeClass('activetitle');
        $('.t1').addClass('activetitle');

        $('.bookcontaint').removeClass('active');
        $('.c1').addClass('active');
    })

    $('.t2').click(function() {
        $('.titlename li').removeClass('activetitle');
        $('.t2').addClass('activetitle');

        $('.bookcontaint').removeClass('active');
        $('.c2').addClass('active');
    })

    $('.t3').click(function() {
        $('.titlename li').removeClass('activetitle');
        $('.t3').addClass('activetitle');

        $('.bookcontaint').removeClass('active');
        $('.c3').addClass('active');
    })
})