// JavaScript 主功能碼

document.addEventListener('DOMContentLoaded', () => {
  const navWrapper = document.getElementById('navWrapper');
  const backToTop = document.getElementById('backToTop');
  const logo = document.querySelector('.nav-bar h1');
  const logoImg = document.querySelector('.nav-bar h1 img');
  const hamburger = document.getElementById('hamburger');
  const navMenuContainer = document.getElementById('navMenuContainer');
  const footerItems = document.querySelectorAll('.footer .row .col-md-2');
  const sitemapBtn = document.getElementById("sitemapBtn");
  const htmlTag = document.getElementById('htmlTag');
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  const sunIcon = toggleDarkMode?.querySelector('.sun');
  const moonIcon = toggleDarkMode?.querySelector('.moon');
  const navItems = navMenuContainer.querySelectorAll('.nav-item');
  const menuOverlay = document.querySelector('.menu-overlay');

  navItems.forEach(item => {
    const dropdownMenu = item.querySelector('.dropdown-menu-full');

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 980 && dropdownMenu) {
        menuOverlay.classList.add('show');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 980 && dropdownMenu) {
        menuOverlay.classList.remove('show');
      }
    });
  });


  // 初始主題設定
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlTag.classList.add('dark');
    htmlTag.classList.remove('light');
    sunIcon?.classList.remove('active');
    moonIcon?.classList.add('active');
  } else {
    htmlTag.classList.add('light');
    htmlTag.classList.remove('dark');
    sunIcon?.classList.add('active');
    moonIcon?.classList.remove('active');
  }

  function updateInboxIcon() {
    const icon = document.querySelector('.inbox-icon');
    if (!icon) return;

    if (document.documentElement.classList.contains('dark')) {
      icon.src = 'img/inbox_w.svg';
    } else {
      icon.src = 'img/inbox.svg';
    }
  }
  updateInboxIcon();

  toggleDarkMode?.addEventListener('click', () => {
    htmlTag.classList.toggle('light');
    htmlTag.classList.toggle('dark');

    if (htmlTag.classList.contains('dark')) {
      sunIcon?.classList.remove('active');
      moonIcon?.classList.add('active');
    } else {
      sunIcon?.classList.add('active');
      moonIcon?.classList.remove('active');
    }

    localStorage.setItem('theme', htmlTag.classList.contains('dark') ? 'dark' : 'light');
    updateInboxIcon();
  });

  // 變色邏輯統一處理
  function updateLogoColor(isHover) {
    if (isHover || window.scrollY > 50) {
      navWrapper?.classList.add('scrolled');
      if (logoImg) logoImg.src = 'img/logo_b.svg';
    } else {
      navWrapper?.classList.remove('scrolled');
      if (!navWrapper?.classList.contains('hovered')) {
        if (logoImg) logoImg.src = 'img/logo_w.svg';
      }
    }
  }

  updateLogoColor(false);

  window.addEventListener('scroll', () => {
    updateLogoColor(false);
    backToTop?.classList.toggle('show', window.scrollY > 50);
  });

  navWrapper?.addEventListener('mouseenter', () => updateLogoColor(true));

  navWrapper?.addEventListener('mouseleave', () => {
    const hasDropdownOpen = document.querySelector('.dropdown-menu-full.active');
    if (!hasDropdownOpen) {
      updateLogoColor(false);
    }
  });

  logo?.addEventListener('click', () => {
    window.location.href = '首頁.html';
  });

  sitemapBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    backToTop.classList.remove('show');
  });

  footerItems.forEach(item => {
    const strong = item.querySelector('strong');
    if (strong) {
      strong.addEventListener('click', (e) => {
        if (window.innerWidth <= 980) {
          e.preventDefault();
          footerItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
          });
          item.classList.toggle('active');
        }
      });
    }
  });

  if (hamburger && navMenuContainer) {
    if (window.innerWidth <= 980) {
      navMenuContainer.classList.add('nav-menu-container');
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenuContainer.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');

      if (icon.classList.contains('fa-bars')) {
        navWrapper?.classList.remove('hovered', 'active');
        if (logoImg) logoImg.src = 'img/logo_w.svg';
      } else {
        navWrapper?.classList.add('hovered', 'active');
        if (logoImg) logoImg.src = 'img/logo_b.svg';
      }
    });

    const navItems = navMenuContainer.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const navText = item.querySelector('.nav-text');
      const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

      if (navText) {
        navText.addEventListener('click', (e) => {
          if (window.innerWidth <= 980) {
            e.preventDefault();
            navItems.forEach(other => {
              if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
          }
        });
      }

      if (dropdownMenuFull) {
        item.addEventListener('mouseover', (e) => {
          if (window.innerWidth > 980) {
            e.preventDefault();
            const allDropdowns = navMenuContainer.querySelectorAll('.dropdown-menu-full');
            allDropdowns.forEach(dmf => dmf.classList.remove('active'));
            navWrapper?.classList.add('scrolled');
            if (logoImg) logoImg.src = 'img/logo_b.svg';
            dropdownMenuFull.classList.add('active');
          }
        });

        dropdownMenuFull.addEventListener('mouseout', (e) => {
          if (window.innerWidth > 980) {
            e.preventDefault();
            navWrapper?.classList.remove('scrolled');
            if (logoImg) logoImg.src = 'img/logo_w.svg';
            dropdownMenuFull.classList.remove('active');
          }
        });
      } else {
        item.addEventListener('mouseover', (e) => {
          if (window.innerWidth > 980) {
            e.preventDefault();
            navWrapper?.classList.remove('scrolled');
            if (logoImg) logoImg.src = 'img/logo_w.svg';

            const allDropdowns = navMenuContainer.querySelectorAll('.dropdown-menu-full');
            allDropdowns.forEach(dmf => dmf.classList.remove('active'));
          }
        });
      }
    });

    document.addEventListener('click', (e) => {
      if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
        navMenuContainer.classList.remove('active');
        hamburger.querySelector('i')?.classList.remove('fa-times');
        hamburger.querySelector('i')?.classList.add('fa-bars');
        navItems.forEach(item => item.classList.remove('active'));
      }
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth <= 980) {
      navMenuContainer?.classList.add('nav-menu-container');
    } else {
      navWrapper?.classList.remove('hovered');
      navMenuContainer?.classList.remove('nav-menu-container');
    }
  });

  // === slick 輪播 ===
  $(function () {
    $(window).on('beforeunload', function () {
      $('body').hide();
      $(window).scrollTop(0);
    });

    const $slider = $('.banner-slider');
    const $rectangles = $('.rectangle');
    const $texts = $('.text');
    const $currentIndex = $('.current-index');
    const totalCount = $rectangles.length;

    $('.total-count').text(String(totalCount).padStart(2, '0'));

    $slider.slick({
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      dots: false,
      speed: 2000,
      pauseOnHover: false,
      waitForAnimate: false
    });

    $rectangles.eq(0).addClass('active');
    $('.banner').eq(0).addClass('animate-pan');

    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $rectangles.removeClass('active').eq(nextSlide).addClass('active');
      $texts.hide().eq(nextSlide).show();
      $currentIndex.text(String(nextSlide + 1).padStart(2, '0'));

      $('.banner').eq(nextSlide).addClass('animate-pan');
      setTimeout(() => {
        $('.banner').eq(currentSlide).removeClass('animate-pan');
      }, 1000);
    });

    $('.circle-button-left').on('click', e => {
      e.preventDefault();
      $slider.slick('slickPrev');
    });

    $('.circle-button-right').on('click', e => {
      e.preventDefault();
      $slider.slick('slickNext');
    });

    $('.leader-carousel').slick({
      centerMode: false,
      centerPadding: 0,
      slidesToShow: 3,
      arrows: false,
      variableWidth: false,
      infinite: true,
      autoplay: false,
      focusOnSelect: true,
      speed: 400,
      cssEase: 'ease-in-out'
    });

    const $newsSlider = $('.newsbanner .carousel-track').slick({
      centerMode: true,
      variableWidth: true,
      slidesToShow: 3,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 600,
      arrows: false,
      dots: true,
      appendDots: $('.slick-dots-wrapper'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            variableWidth: false,
            centerMode: true,
            centerPadding: '60px'
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            variableWidth: false,
            centerMode: true,
            centerPadding: '40px'
          }
        }
      ]
    });

    $('.circle-button2 .circle-button-left').on('click', e => {
      e.preventDefault();
      $newsSlider.slick('slickPrev');
    });

    $('.circle-button2 .circle-button-right').on('click', e => {
      e.preventDefault();
      $newsSlider.slick('slickNext');
    });

    $('.newsbanner .carousel-track').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $('.slide').removeClass('really-center');
      $(slick.$slides[nextSlide]).addClass('really-center');
    });

    $('.newsbanner .carousel-track').on('afterChange', function () {
      $('.slide').removeClass('really-center');
      $('.slick-center').addClass('really-center');
    });

    $('.slick-center').addClass('really-center');
  });
});

function checkShareVisibility() {
  const share = document.querySelector('.share-fixed');
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  const distanceToBottom = docHeight - (scrollY + windowHeight);

  if (distanceToBottom > 500) {
    share.classList.add('show');
  } else {
    share.classList.remove('show');
  }
}

// 頁面載入時檢查一次
checkShareVisibility();

// 監聽滾動事件
window.addEventListener('scroll', checkShareVisibility);

const overlay = document.querySelector('.dropdown-overlay');

const navItems = navMenuContainer.querySelectorAll('.nav-item');
navItems.forEach(item => {
  const navText = item.querySelector('.nav-text');
  const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

  if (navText) {
    navText.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        navItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      }
    });
  }

  if (dropdownMenuFull) {
    item.addEventListener('mouseover', (e) => {
      if (window.innerWidth > 980) {
        e.preventDefault();
        const allDropdowns = navMenuContainer.querySelectorAll('.dropdown-menu-full');
        allDropdowns.forEach(dmf => dmf.classList.remove('active'));
        navWrapper?.classList.add('scrolled');
        if (logoImg) logoImg.src = 'img/logo_b.svg';
        dropdownMenuFull.classList.add('active');
        overlay?.classList.add('active');
      }
    });

    dropdownMenuFull.addEventListener('mouseout', (e) => {
      if (window.innerWidth > 980) {
        e.preventDefault();
        navWrapper?.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg';
        dropdownMenuFull.classList.remove('active');
        overlay?.classList.remove('active');
      }
    });
  } else {
    item.addEventListener('mouseover', (e) => {
      if (window.innerWidth > 980) {
        e.preventDefault();
        navWrapper?.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg';
        const allDropdowns = navMenuContainer.querySelectorAll('.dropdown-menu-full');
        allDropdowns.forEach(dmf => dmf.classList.remove('active'));
        overlay?.classList.remove('active');
      }
    });
  }
});