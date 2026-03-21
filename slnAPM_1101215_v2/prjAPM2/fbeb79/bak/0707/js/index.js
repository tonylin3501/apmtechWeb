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
  const iconArea = document.querySelector('.nav-icons');

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

function moveNavIconsIfNeeded() {
  const navIcons = document.querySelector('.nav-icons');
  const navMenu = document.getElementById('navMenuContainer');
  const navRight = document.querySelector('.nav-bar .nav-right');
  const hamburger = document.getElementById('hamburger');

  if (!navIcons || !navMenu || !navRight || !hamburger) {
    console.warn('元素不存在，無法移動 nav-icons');
    return;
  }

  if (window.innerWidth <= 991) {
    if (!navMenu.contains(navIcons)) {
      console.log('[手機版] 移動 nav-icons 到 navMenuContainer');
      navMenu.insertBefore(navIcons, navMenu.firstChild);
    }
  } else {
    // 在移動之前，確保 navIcons 不在 navMenu 中
    if (navMenu.contains(navIcons)) {
        navMenu.removeChild(navIcons);
        console.log('[桌機版] 從 navMenuContainer 移除 nav-icons');
    }

    if (!navRight.contains(navIcons)) {
      console.log('[桌機版] 移動 nav-icons 到 nav-right（hamburger 後）');
      if (hamburger.nextSibling) {
        navRight.insertBefore(navIcons, hamburger.nextSibling);
      } else {
        navRight.appendChild(navIcons);
      }
    }

    // 清除手機版樣式影響
    navIcons.style.flexDirection = '';
    navIcons.classList.remove('nav-menu-container');
  }
}

// 初始調用並綁定 resize 事件
moveNavIconsIfNeeded();
window.addEventListener('resize', () => {
  console.log('Window resized, width:', window.innerWidth);
  moveNavIconsIfNeeded();
});

  navItems.forEach(item => {
    const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 991 && dropdownMenuFull) {
        menuOverlay.classList.add('show');
        dropdownMenuFull.classList.add('active');
        overlay?.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', (e) => {
      if (window.innerWidth > 991 && dropdownMenuFull) {
        const related = e.relatedTarget;
        const isStillInside = related && (item.contains(related) || dropdownMenuFull.contains(related));
        if (!isStillInside) {
          dropdownMenuFull.classList.remove('active');
          overlay?.classList.remove('active');
          menuOverlay.classList.remove('show');
        }
      }
    });

    dropdownMenuFull?.addEventListener('mouseleave', (e) => {
      if (window.innerWidth > 991) {
        const related = e.relatedTarget;
        const isStillInNav = related && (item.contains(related) || dropdownMenuFull.contains(related));
        if (!isStillInNav) {
          dropdownMenuFull.classList.remove('active');
          overlay?.classList.remove('active');
          menuOverlay.classList.remove('show');
        }
      }
    });
  });

  navItems.forEach(item => {
    const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        navItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.dropdown-menu-full')?.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
          dropdownMenuFull?.classList.add('active');
        }
      }
    });
  });

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
      icon.src = 'img/inbox_b.svg';
    } else {
      icon.src = 'img/inbox.svg';
    }
  }
  updateInboxIcon();

  function updateNavIconsImages(isWhiteBg) {
    const navIcons = document.querySelectorAll('.nav-icons img:not(#toggleDarkMode img)');
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    navIcons.forEach(img => {
      const src = img.getAttribute('src');
      if (!src) return;

      const baseName = src.split('/').pop().replace('.svg', '').replace('_b', '');
      let newSrc;

      if (isDarkMode) {
        newSrc = `img/${baseName}.svg`;
      } else {
        newSrc = isWhiteBg ? `img/${baseName}_b.svg` : `img/${baseName}.svg`;
      }

      img.setAttribute('src', newSrc);
    });
  }

  function updateLogoColor(isHover = false) {
    const htmlTag = document.documentElement;
    const isDarkMode = htmlTag.classList.contains('dark');
    const navWrapper = document.getElementById('navWrapper');
    const logoImg = document.querySelector('.nav-bar .mainlogo img');

    const isBgVisible = isHover || window.scrollY > 50 || navWrapper?.classList.contains('hovered') || navWrapper?.classList.contains('active');

    if (isDarkMode) {
      if (isBgVisible) {
        navWrapper?.classList.add('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg';
        updateNavIconsImages(true);
      } else {
        navWrapper?.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg';
        updateNavIconsImages(false);
      }
    } else {
      if (isBgVisible) {
        navWrapper?.classList.add('scrolled');
        if (logoImg) logoImg.src = 'img/logo_b.svg';
        updateNavIconsImages(true);
      } else {
        navWrapper?.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg';
        updateNavIconsImages(false);
      }
    }
  }

  updateLogoColor(false);

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
    updateLogoColor(window.scrollY > 50);
  });

  window.addEventListener('scroll', () => {
    updateLogoColor(false);
    backToTop?.classList.toggle('show', window.scrollY > 50);
  });

  const logoArea = document.querySelector('.mainlogo');
  const navMenu = document.getElementById('navMenuContainer');

  [logoArea, iconArea, navMenu].forEach(el => {
    el?.addEventListener('mouseenter', () => {
      updateLogoColor(true);
    });

    el?.addEventListener('mouseleave', () => {
      updateLogoColor(false);
    });
  });

  iconArea.addEventListener('mouseenter', () => {
    updateNavIconsImages(true);
  });

  iconArea.addEventListener('mouseleave', () => {
    const hasActiveNavItem = navMenuContainer.querySelector('.nav-item.active');
    if (hasActiveNavItem) {
      updateNavIconsImages(true);
    } else {
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

      if (isOpening) { // 當選單開啟時
        // 強制 navWrapper 顯示白色背景（或淺色模式下的背景色）
        navWrapper.classList.add('active', 'scrolled'); // 添加 'active' 和 'scrolled' class
        logoImg.src = 'img/logo_b.svg'; // 開啟時 logo 為深色 (在白色背景上更明顯)
        // 確保 icons 也更新為適用於淺色背景的圖標
        updateNavIconsImages(true);
      } else { // 當選單關閉時
        navWrapper.classList.remove('active', 'scrolled'); // 移除 'active' 和 'scrolled' class
        // 恢復到根據滾動和暗色模式判斷的 logo 和 icon 顏色
        updateLogoColor(false);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    navItems.forEach(item => {
      const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

      item.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 991) return;

        navMenuContainer.querySelectorAll('.nav-item.active').forEach(i => i.classList.remove('active'));
        navMenuContainer.querySelectorAll('.dropdown-menu-full.active').forEach(d => d.classList.remove('active'));
        overlay?.classList.remove('active');
        menuOverlay.classList.remove('show');

        const isDarkMode = htmlTag.classList.contains('dark');

        if (dropdownMenuFull) {
          item.classList.add('active');
          dropdownMenuFull.classList.add('active');
          overlay?.classList.add('active');
          menuOverlay.classList.add('show');
          navWrapper?.classList.add('scrolled');
          logoImg.src = isDarkMode ? 'img/logo_w.svg' : 'img/logo_b.svg';
        } else {
          updateLogoColor(true);
        }
      });

      item.addEventListener('mouseleave', (e) => {
        const related = e.relatedTarget;
        const isStillInside = related && (item.contains(related) || (dropdownMenuFull && dropdownMenuFull.contains(related)));
        if (!isStillInside) {
          if (dropdownMenuFull) {
            dropdownMenuFull.classList.remove('active');
            item.classList.remove('active');
          }
          overlay?.classList.remove('active');
          menuOverlay.classList.remove('show');
          updateLogoColor(false);
        }
      });

      dropdownMenuFull?.addEventListener('mouseleave', (e) => {
        const related = e.relatedTarget;
        const isStillInNav = related && (
          related.closest('.nav-bar') ||
          related.closest('.nav-text') ||
          related.closest('.middlebutton') ||
          related.closest('.nav-item') ||
          related.closest('.dropdown-menu-full')
        );

        if (!isStillInNav) {
          dropdownMenuFull.classList.remove('active');
          item.classList.remove('active');
          overlay?.classList.remove('active');
          menuOverlay.classList.remove('show');
          updateLogoColor(false);
        }
      });
    });

    navWrapper?.addEventListener('mouseleave', (e) => {
      const related = e.relatedTarget;
      const isIntoDropdown = related && related.closest('.dropdown-menu-full');
      if (!isIntoDropdown) {
        document.querySelectorAll('.dropdown-menu-full.active').forEach(menu => menu.classList.remove('active'));
        document.querySelectorAll('.nav-item.active').forEach(item => item.classList.remove('active'));
        overlay?.classList.remove('active');
        menuOverlay.classList.remove('show');
        updateLogoColor(false);
      }
    });

    document.addEventListener('click', (e) => {
      if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
        navMenuContainer.classList.remove('active');
        icon?.classList.remove('bi-x');
        icon?.classList.add('bi-list');
        navItems.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.dropdown-menu-full')?.classList.remove('active');
        });
        const isDarkMode = htmlTag.classList.contains('dark');
        if (logoImg) logoImg.src = isDarkMode ? 'img/logo_w.svg' : 'img/logo_w.svg';
        navWrapper?.classList.remove('hovered', 'active');
      }
    });

function handleResize() {
  if (window.innerWidth <= 991) {
    navMenuContainer?.classList.add('nav-menu-container');
  } else {
    navWrapper?.classList.remove('hovered');
    navMenuContainer?.classList.remove('nav-menu-container');
    navMenuContainer?.classList.remove('active');
    icon?.classList.remove('bi-x');
    icon?.classList.add('bi-list');
    navItems.forEach(item => {
      item.classList.remove('active');
      item.querySelector('.dropdown-menu-full')?.classList.remove('active');
    });
  }

  moveNavIconsIfNeeded();
}
}
moveNavIconsIfNeeded();

// ✅ 綁定 resize 事件
window.addEventListener('resize', handleResize);

    

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
      slidesToShow: 4,
      arrows: false,
      variableWidth: true,
      infinite: true,
      autoplay: false,
      focusOnSelect: true,
      speed: 400,
      cssEase: 'linear',
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

  function checkShareVisibility() {
    const share = document.querySelector('.share-fixed');
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const distanceToBottom = docHeight - (scrollY + windowHeight);

    if (distanceToBottom > 500) {
      share?.classList.add('show');
    } else {
      share?.classList.remove('show');
    }
  }

  checkShareVisibility();
  window.addEventListener('scroll', checkShareVisibility);

  document.querySelectorAll('.service-card-small').forEach((card, index) => {
    const baseName = card.dataset.iconBase;
    const img = card.querySelector('.icon-left img');

    card.addEventListener('mouseenter', () => {
      const isDarkMode = document.documentElement.classList.contains('dark');

      if (index === 0 || baseName === 'inbox') {
        img.src = `img/${baseName}.svg`;
      } else {
        img.src = `img/${baseName}_b.svg`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      img.src = `img/${baseName}.svg`;
    });
  });
});