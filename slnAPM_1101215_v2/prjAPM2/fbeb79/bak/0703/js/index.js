document.addEventListener('DOMContentLoaded', () => {
  const navWrapper = document.getElementById('navWrapper');
  const backToTop = document.getElementById('backToTop');
  const logo = document.querySelector('.nav-bar .mainlogo');
  const logoImg = document.querySelector('.nav-bar .mainlogo img');
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
  const overlay = document.querySelector('.dropdown-overlay');
  const selectors = 'h1, h2, h3, h4, h5, h6, .display, .body-1, .body-2, .minimum, .largebutton, .middlebutton';

  
  // 包英文文字 span.en
  document.querySelectorAll(selectors).forEach(el => {
    function wrapEnglishTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const replacedHTML = text.replace(/([\x00-\x7F]+)/g, '<span class="en">$1</span>');
        if (replacedHTML !== text) {
          const span = document.createElement('span');
          span.innerHTML = replacedHTML;
          node.parentNode.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(child => wrapEnglishTextNodes(child));
      }
    }
    wrapEnglishTextNodes(el);
  });

  // navItems hover 顯示 menuOverlay
  navItems.forEach(item => {
    const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 991 && dropdownMenuFull) {
        menuOverlay.classList.add('show');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 991 && dropdownMenuFull) {
        menuOverlay.classList.remove('show');
      }
    });
  });

  // 主題初始設定
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

  // 更新 inbox icon
  function updateInboxIcon() {
    const icon = document.querySelector('.inbox-icon');
    if (!icon) return;
    if (document.documentElement.classList.contains('dark')) {
      icon.src = 'img/inbox_b.svg';
    } else {
      icon.src = 'img/inbox.svg';
    }
  }
  updateInboxIcon();

  // 切換暗色模式
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
    updateLogoColor(true);
  });

  // 控制 logo 顏色，isHover：是否 hover 狀態
  function updateLogoColor(isHover) {
    const isDarkMode = htmlTag.classList.contains('dark');

    if (isDarkMode) {
      // 暗色模式無論如何都是白色 logo
      navWrapper?.classList.add('scrolled');
      if (logoImg) logoImg.src = 'img/logo_w.svg';
      return;
    }

    // 亮色模式
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
        if (window.innerWidth <= 991) {
          e.preventDefault();
          footerItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
          });
          item.classList.toggle('active');
        }
      });
    }
  });

  // 漢堡選單
  if (hamburger && navMenuContainer) {
    if (window.innerWidth <= 991) {
      navMenuContainer.classList.add('nav-menu-container');
    }

    const icon = hamburger.querySelector('i');

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenuContainer.classList.toggle('active');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');

      const isOpening = icon.classList.contains('fa-times');
      const isDarkMode = htmlTag.classList.contains('dark');

      if (isOpening) {
        navWrapper?.classList.add('hovered', 'active');
        if (logoImg) logoImg.src = isDarkMode ? 'img/logo_w.svg' : 'img/logo_b.svg';
      } else {
        navWrapper?.classList.remove('hovered', 'active');
        if (logoImg) logoImg.src = isDarkMode ? 'img/logo_w.svg' : 'img/logo_w.svg';

        navItems.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.dropdown-menu-full')?.classList.remove('active');
        });
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 主選單項目行為
    navItems.forEach(item => {
      const navText = item.querySelector('.nav-text');
      const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

      // 手機點擊展開
      if (navText) {
        navText.addEventListener('click', (e) => {
          if (window.innerWidth <= 991) {
            e.preventDefault();

            navItems.forEach(other => {
              if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.dropdown-menu-full')?.classList.remove('active');
              }
            });

            item.classList.toggle('active');
            dropdownMenuFull?.classList.toggle('active');
          }
        });
      }

      // 桌機 hover 展開 dropdown
      if (dropdownMenuFull) {
        item.addEventListener('mouseover', () => {
          if (window.innerWidth > 991) {
            const allDropdowns = navMenuContainer.querySelectorAll('.dropdown-menu-full');
            allDropdowns.forEach(dmf => dmf.classList.remove('active'));

            dropdownMenuFull.classList.add('active');
            navWrapper?.classList.add('scrolled');

            const isDarkMode = htmlTag.classList.contains('dark');
            if (logoImg) logoImg.src = isDarkMode ? 'img/logo_w.svg' : 'img/logo_b.svg';

            overlay?.classList.add('active');
          }
        });

        dropdownMenuFull.addEventListener('mouseout', () => {
          if (window.innerWidth > 991) {
            dropdownMenuFull.classList.remove('active');
            navWrapper?.classList.remove('scrolled');

            const isDarkMode = htmlTag.classList.contains('dark');
            if (logoImg) logoImg.src = 'img/logo_w.svg';

            overlay?.classList.remove('active');
          }
        });
      } else {
        // 桌機 hover 無 dropdown
        item.addEventListener('mouseover', () => {
          if (window.innerWidth > 991) {
            navWrapper?.classList.remove('scrolled');

            const isDarkMode = htmlTag.classList.contains('dark');
            if (logoImg) logoImg.src = 'img/logo_w.svg';

            const allDropdowns = navMenuContainer.querySelectorAll('.dropdown-menu-full');
            allDropdowns.forEach(dmf => dmf.classList.remove('active'));
            overlay?.classList.remove('active');
          }
        });
      }
    });

    // 點擊其他地方關閉選單
    document.addEventListener('click', (e) => {
      if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
        navMenuContainer.classList.remove('active');
        icon?.classList.remove('fa-times');
        icon?.classList.add('fa-bars');
        navItems.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.dropdown-menu-full')?.classList.remove('active');
        });
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 991) {
      navMenuContainer?.classList.add('nav-menu-container');
    } else {
      navWrapper?.classList.remove('hovered');
      navMenuContainer?.classList.remove('nav-menu-container');
    }
  });

  // 以下為 slick 輪播相關，不改動，直接保留
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
      $('.banner').attr('aria-hidden', false);
      $rectangles.removeClass('active').eq(nextSlide).addClass('active');
      $texts.hide().eq(nextSlide).show();
      $currentIndex.text(String(nextSlide + 1).padStart(2, '0'));

      $('.banner').eq(nextSlide).addClass('animate-pan');
      setTimeout(() => {
        $('.banner').eq(currentSlide).removeClass('animate-pan');
      }, 1000);
    });

    $slider.on('afterChange', function () {
      $('.banner').attr('aria-hidden', false);
    });

    $('.herobanner .circle-button-left').on('click', e => {
      e.preventDefault();
      $slider.slick('slickPrev');
    });

    $('.herobanner .circle-button-right').on('click', e => {
      e.preventDefault();
      $slider.slick('slickNext');
    });

    $('.floating-circle-button .circle-button-left').on('click', e => {
      e.preventDefault();
      $slider.slick('slickPrev');
    });

    $('.floating-circle-button .circle-button-right').on('click', e => {
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

    $('.leader .circle-button-left').on('click', e => {
      e.preventDefault();
      $('.leader-carousel').slick('slickPrev');
    });

    $('.leader .circle-button-right').on('click', e => {
      e.preventDefault();
      $('.leader-carousel').slick('slickNext');
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

  // service-card-small hover icon 切換
document.querySelectorAll('.service-card-small').forEach((card, index) => {
  const baseName = card.dataset.iconBase;
  const img = card.querySelector('.icon-left img');

  card.addEventListener('mouseenter', () => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    if (index === 0 || baseName === 'inbox') {
      // 第一個卡片 hover 不換圖，保持 .svg
      img.src = `img/${baseName}.svg`;
    } else {
      // 其他卡片 hover 換成 _b.svg
      img.src = `img/${baseName}_b.svg`;
    }
  });

  card.addEventListener('mouseleave', () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    // 其他卡片離開時還原成 .svg
    img.src = `img/${baseName}.svg`;
  });
});

});


