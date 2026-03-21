  
    const navWrapper = document.getElementById('navWrapper');
    const backToTop = document.getElementById('backToTop');
    const logo = document.querySelector('.nav-bar h1');
    const logoImg = document.querySelector('.nav-bar h1 img');

    const hamburger = document.getElementById('hamburger');
    const navMenuContainer = document.getElementById('navMenuContainer');
    const footerItems = document.querySelectorAll('.footer .row .col-md-2');

    // 滾動效果
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navWrapper.classList.add('scrolled');
        if (logoImg) logoImg.src = 'https://i.ibb.co/m3pPPDk/logo-b.png';
        if (backToTop) backToTop.classList.add('show');
      } else {
        navWrapper.classList.remove('scrolled');

        if(!navWrapper.classList.contains('hovered'))
        {
          if (logoImg) logoImg.src = 'https://i.ibb.co/27Pfdt10/logo-w.png';
        }

        
        if (backToTop) backToTop.classList.remove('show');
      }
    });

    // 返回頂部按鈕
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTop.classList.remove('show');
      });
    }

    // 點擊圖片導向官方網站
    if (logo) {
      logo.addEventListener('click', () => {
        window.location.href = 'https://www.mnd.gov.tw/default.aspx';
      });
    }

    // 漢堡選單功能
    document.addEventListener('DOMContentLoaded', () => {
      if (hamburger && navMenuContainer) {
        if (window.innerWidth <= 980) {
          navMenuContainer.classList.add('nav-menu-container');
        }
        else{
          navMenuContainer.classList.remove('nav-menu-container');
        }

        hamburger.addEventListener('click', (e) => {
          e.stopPropagation();
          navMenuContainer.classList.toggle('active');
          hamburger.querySelector('i').classList.toggle('fa-bars');
          hamburger.querySelector('i').classList.toggle('fa-times');

          if(hamburger.querySelector('i').classList.contains('fa-bars'))
          {
            navWrapper.classList.remove('hovered');
            navWrapper.classList.remove('active');
            if (logoImg) logoImg.src = 'img/logo-w.png';
          }
          else{
            navWrapper.classList.add('hovered');
            navWrapper.classList.add('active');
            if (logoImg) logoImg.src = 'img/logo-b.png';
          }

        });

        const navItems = navMenuContainer.querySelectorAll('.nav-item');
        navItems.forEach(item => {
          const navText = item.querySelector('.nav-text');
          if (navText) {
            navText.addEventListener('click', (e) => {
              if (window.innerWidth <= 980) {
                e.preventDefault();
                navItems.forEach(otherItem => {
                  if (otherItem !== item) {
                    otherItem.classList.remove('active');
                  }
                });
                item.classList.toggle('active');
              }
            });

            const dropdownMmenuFull = item.querySelector('.dropdown-menu-full');
            if(dropdownMmenuFull)
            {
              //如果有子階項目
              item.addEventListener('mouseover', (e) => {
                if (window.innerWidth > 980) {
                  e.preventDefault();
                  const dropdownMmenuFullAll = navMenuContainer.querySelectorAll('.dropdown-menu-full');
                  dropdownMmenuFullAll.forEach(dmf => dmf.classList.remove('active'));
                  navWrapper.classList.add('scrolled');
                  if (logoImg) logoImg.src = 'img/logo-b.png';
                   dropdownMmenuFull.classList.add('active');
                }
              });

              dropdownMmenuFull.addEventListener('mouseout', (e) => {
                if (window.innerWidth > 980) {
                  e.preventDefault();
                  navWrapper.classList.remove('scrolled');
                  if (logoImg) logoImg.src = 'img/logo-w.png';
                  dropdownMmenuFull.classList.remove('active');
                }
              });
            }
            else{
              //沒有子階項目
              item.addEventListener('mouseover', (e) => {
                if (window.innerWidth > 980) {
                  e.preventDefault();
                  navWrapper.classList.remove('scrolled');
                  if (logoImg) logoImg.src = 'img/logo-w.png';
                  
                  const dropdownMmenuFullAll = navMenuContainer.querySelectorAll('.dropdown-menu-full');
                  dropdownMmenuFullAll.forEach(dmf => dmf.classList.remove('active'));
                }
              });
            }
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
      else{
        console.log('no ham && nav')
      }

      
      footerItems.forEach(item => {
        const strong = item.querySelector('strong');
        if (strong) {
          strong.addEventListener('click', (e) => {
            if (window.innerWidth <= 980) {
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

    window.addEventListener('resize', function(event) {
      if (window.innerWidth <= 980) {
        navMenuContainer.classList.add('nav-menu-container');
      }
      else{
        if(navWrapper)
        {
            navWrapper.classList.remove('hovered');
        }
        
        navMenuContainer.classList.remove('nav-menu-container');
      }
    }, true);




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


      $(window).on('beforeunload', function() {
        $('body').hide();
        $(window).scrollTop(0);
      });

      $('.leader-carousel').slick({
        centerMode: false,
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


  




