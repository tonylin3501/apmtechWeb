    // 滾動效果
    window.addEventListener('scroll', () => {
      const navWrapper = document.getElementById('navWrapper');
      const backToTop = document.getElementById('backToTop');
      const logoImg = document.querySelector('.nav-bar h1 img');
      if (window.scrollY > 50) {
        navWrapper.classList.add('scrolled');
        if (logoImg) logoImg.src = 'https://i.ibb.co/m3pPPDk/logo-b.png';
        if (backToTop) backToTop.classList.add('show');
      } else {
        navWrapper.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'https://i.ibb.co/27Pfdt10/logo-w.png';
        if (backToTop) backToTop.classList.remove('show');
      }
    });

    // 返回頂部按鈕
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 點擊圖片導向官方網站
    const logo = document.querySelector('.nav-bar h1');
    if (logo) {
      logo.addEventListener('click', () => {
        window.location.href = 'https://www.mnd.gov.tw/default.aspx';
      });
    }

    // 漢堡選單功能
    document.addEventListener('DOMContentLoaded', () => {
      const hamburger = document.getElementById('hamburger');
      const navMenuContainer = document.getElementById('navMenuContainer');

      if (hamburger && navMenuContainer) {
        hamburger.addEventListener('click', (e) => {
          e.stopPropagation();
          navMenuContainer.classList.toggle('active');
          hamburger.querySelector('i').classList.toggle('fa-bars');
          hamburger.querySelector('i').classList.toggle('fa-times');
        });

        const navItems = navMenuContainer.querySelectorAll('.nav-item');
        navItems.forEach(item => {
          const navText = item.querySelector('.nav-text');
          if (navText) {
            navText.addEventListener('click', (e) => {
              if (window.innerWidth <= 1024) {
                e.preventDefault();
                navItems.forEach(otherItem => {
                  if (otherItem !== item) {
                    otherItem.classList.remove('active');
                  }
                });
                item.classList.toggle('active');
              }
            });
          }
        });

        document.addEventListener('click', (e) => {
          if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
            navMenuContainer.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
            navItems.forEach(item => item.classList.remove('active'));
          }
        });
      }

      const footerItems = document.querySelectorAll('.footer .row .col-md-2');
      footerItems.forEach(item => {
        const strong = item.querySelector('strong');
        if (strong) {
          strong.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
              e.preventDefault();
              footerItems.forEach(otherItem => {
                if (otherItem !== item) {
                  otherItem.classList.remove('active');
                }
              });
              item.classList.toggle('active');
            }
          });
        }
      });
  
      document.getElementById("sitemapBtn").addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
  });

    });



$(document).ready(function () {
  var $slider = $('.banner-slider');
  var $rectangles = $('.rectangle');
  var $texts = $('.text'); // 所有 h3.text
  var $currentIndex = $('.current-index');
  var totalCount = $rectangles.length;

  // 設定分母
  $('.total-count').text(String(totalCount).padStart(2, '0'));

  // 初始化 slick
  $slider.slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    speed: 2000,
    pauseOnHover: false,
    waitForAnimate: false // 確保點擊時立即切換
  });

  // 初始 active rectangle + 動畫
  $rectangles.eq(0).addClass('active');
  $('.banner').eq(0).addClass('animate-pan');

  $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // 更新進度條
    $rectangles.removeClass('active');
    $rectangles.eq(nextSlide).addClass('active');

    // 切換文字
    $texts.hide().eq(nextSlide).show();

    // 更新數字
    $currentIndex.text(String(nextSlide + 1).padStart(2, '0'));


    // 為下一張 banner 立即應用動畫
    $('.banner').eq(nextSlide).addClass('animate-pan');
	
	// 延遲 1 秒後移除上一張的動畫
	setTimeout(function () {
	$('.banner').eq(currentSlide).removeClass('animate-pan');
	}, 1000);
  });

  // 點擊 rectangle
  $rectangles.each(function(index) {
    $(this).on('click', function() {
      $slider.slick('slickGoTo', index);
    });
  });

  // 點擊 circle-button-left 切換到上一張
  $('.circle-button-left').on('click', function(e) {
    e.preventDefault();
    $slider.slick('slickPrev');
  });

  // 點擊 circle-button-right 切換到下一張
  $('.circle-button-right').on('click', function(e) {
    e.preventDefault();
    $slider.slick('slickNext');
  });
});


   $(document).ready(function(){
      $('.leader-carousel').slick({
        centerMode: true,
        centerPadding: 0,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: false, // 固定寬度，避免跳動
        infinite: true,
        autoplay: false,
        focusOnSelect: true,
        speed: 400,
        cssEase: 'ease-in-out'
      });

      $('.circle-button-left').click(function(e){
        e.preventDefault();
        $('.leader-carousel').slick('slickPrev');
      });

      $('.circle-button-right').click(function(e){
        e.preventDefault();
        $('.leader-carousel').slick('slickNext');
      });
    });
