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
      if (window.innerWidth > 991) { // Apply only on desktop
        // Always reset active state for other items
        navItems.forEach(i => {
          if (i !== item) {
            i.classList.remove('active');
            i.querySelector('.dropdown-menu-full')?.classList.remove('active');
          }
        });

        if (dropdownMenuFull) {
          menuOverlay.classList.add('show');
          dropdownMenuFull.classList.add('active');
          overlay?.classList.add('active');
          item.classList.add('active'); // Add active to the current nav-item

          // Ensure navWrapper and logo/icons update when dropdown is active
          navWrapper?.classList.add('scrolled'); // Make sure nav background is visible
          const isDarkMode = htmlTag.classList.contains('dark');
          logoImg.src = isDarkMode ? 'img/logo_w.svg' : 'img/logo_b.svg'; // Set logo color based on mode
          updateNavIconsImages(true); // Force icons to _b.svg for light background
        } else {
          // If no dropdown, revert to default hover behavior
          updateLogoColor(true); // This will handle logo and icons for non-dropdown items
        }
      }
    });

    item.addEventListener('mouseleave', (e) => {
      if (window.innerWidth > 991 && dropdownMenuFull) {
        const related = e.relatedTarget;
        const isStillInside = related && (item.contains(related) || dropdownMenuFull.contains(related));
        if (!isStillInside) {
          dropdownMenuFull.classList.remove('active');
          item.classList.remove('active'); // Remove active from nav-item
          overlay?.classList.remove('active');
          menuOverlay.classList.remove('show');
          updateLogoColor(false); // Revert to scroll-based or default colors
        }
      }
    });

    dropdownMenuFull?.addEventListener('mouseleave', (e) => {
      if (window.innerWidth > 991) {
        const related = e.relatedTarget;
        const isStillInNav = related && (item.contains(related) || dropdownMenuFull.contains(related));
        if (!isStillInNav) {
          dropdownMenuFull.classList.remove('active');
          item.classList.remove('active'); // Remove active from nav-item
          overlay?.classList.remove('active');
          menuOverlay.classList.remove('show');
          updateLogoColor(false); // Revert to scroll-based or default colors
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
        newSrc = `img/${baseName}.svg`; // Dark mode icons are always light (no _b)
      } else {
        newSrc = isWhiteBg ? `img/${baseName}_b.svg` : `img/${baseName}.svg`; // Light mode: _b if white background, else normal
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
    
    // Check if any nav-item has an active dropdown menu
    const hasActiveDropdown = navMenuContainer.querySelector('.nav-item .dropdown-menu-full.active');

    if (isDarkMode) {
      if (isBgVisible || hasActiveDropdown) { // If background is visible or dropdown is active
        navWrapper?.classList.add('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg'; // White logo for dark mode on light background
        updateNavIconsImages(true); // Icons generally stay light in dark mode for contrast
      } else {
        navWrapper?.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg'; // White logo
        updateNavIconsImages(false); // Icons generally stay light in dark mode
      }
    } else { // Light mode
      if (isBgVisible || hasActiveDropdown) { // If background is visible or dropdown is active
        navWrapper?.classList.add('scrolled');
        if (logoImg) logoImg.src = 'img/logo_b.svg'; // Black logo
        updateNavIconsImages(true); // Icons become _b (black) for light background
      } else {
        navWrapper?.classList.remove('scrolled');
        if (logoImg) logoImg.src = 'img/logo_w.svg'; // White logo
        updateNavIconsImages(false); // Icons become normal (white) for transparent background
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
    // Pass true if the nav bar should behave as if a background is visible (e.g., if a dropdown is open)
    updateLogoColor(navWrapper?.classList.contains('active') || navWrapper?.classList.contains('hovered') || window.scrollY > 50 || navMenuContainer.querySelector('.nav-item .dropdown-menu-full.active'));
  });

  window.addEventListener('scroll', () => {
    updateLogoColor(false);
    backToTop?.classList.toggle('show', window.scrollY > 50);
  });

  const logoArea = document.querySelector('.mainlogo');
  const navMenu = document.getElementById('navMenuContainer');

  [logoArea, iconArea, navWrapper].forEach(el => { // Add navWrapper to the list
    el?.addEventListener('mouseenter', () => {
      // Only set hovered if a dropdown isn't already active from a nav-item
      if (!navMenuContainer.querySelector('.nav-item .dropdown-menu-full.active')) {
        navWrapper?.classList.add('hovered');
        updateLogoColor(true);
      }
    });

    el?.addEventListener('mouseleave', (e) => {
      const related = e.relatedTarget;
      const isStillInsideNav = related && (
        navWrapper.contains(related) ||
        navMenuContainer.contains(related) ||
        logoArea.contains(related) ||
        iconArea.contains(related)
      );

      // Only remove hovered if not moving into a dropdown or other part of the nav
      if (!isStillInsideNav && !navMenuContainer.querySelector('.nav-item .dropdown-menu-full.active')) {
        navWrapper?.classList.remove('hovered');
        updateLogoColor(false);
      }
    });
  });

  iconArea.addEventListener('mouseenter', () => {
    updateNavIconsImages(true);
  });

  iconArea.addEventListener('mouseleave', () => {
    const hasActiveNavItem = navMenuContainer.querySelector('.nav-item.active');
    if (hasActiveNavItem) {
      updateNavIconsImages(true); // If a nav item is active (dropdown open), keep icons as _b
    } else {
      updateLogoColor(false); // Revert to scroll-based or default colors
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

    // Modified mouseenter/mouseleave for desktop within hamburger logic (was redundant, merged into main navItems loop)
    // The previous block was causing conflicts and not consistently applying the updateNavIconsImages(true)
    // This block is now removed as its functionality is moved to the primary navItems loop.
    // The logic below for document click outside hamburger is kept.

    document.addEventListener('click', (e) => {
      if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
        navMenuContainer.classList.remove('active');
        icon?.classList.remove('fa-times'); // Changed from bi-x
        icon?.classList.add('fa-bars'); // Changed from bi-list
        navItems.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.dropdown-menu-full')?.classList.remove('active');
        });
        const isDarkMode = htmlTag.classList.contains('dark');
        // Revert to original logo/icon state based on scroll/dark mode
        updateLogoColor(false); 
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
    icon?.classList.remove('fa-times'); // Changed from bi-x
    icon?.classList.add('fa-bars'); // Changed from bi-list
    navItems.forEach(item => {
      item.classList.remove('active');
      item.querySelector('.dropdown-menu-full')?.classList.remove('active');
    });
    // Ensure correct icon color when resizing back to desktop
    updateLogoColor(false); 
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

window.addEventListener('scroll', checkShareVisibility);
window.addEventListener('load', checkShareVisibility);

  document.querySelectorAll('.service-card-small').forEach((card, index) => {
    const baseName = card.dataset.iconBase;
    const img = card.querySelector('.icon-left img');

    card.addEventListener('mouseenter', () => {
      const isDarkMode = document.documentElement.classList.contains('dark');

      if (index === 0 || baseName === 'inbox') {
        img.src = `img/${baseName}.svg`;
      } else {
        // For other icons, set to _b.svg on hover
        img.src = `img/${baseName}_b.svg`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      // On mouseleave, revert to original based on dark mode or default
      img.src = `img/${baseName}.svg`; // Assuming default is non-_b
      // If dark mode, and was inbox_b previously, it should return to inbox_b
      // This is a more complex state, for now we assume non-_b is default for non-hovered
      // For a more robust solution, updateNavIconsImages might need to be called here
    });
  });
});

    const searchBtn = document.getElementById('search');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const navIcons = document.querySelector('.nav-icons'); // 確保正確取得 nav-icons 容器

    searchBtn?.addEventListener('click', (e) => {
        e.preventDefault(); // 防止連結的預設行為

        // 切換搜尋框的 active 類別
        searchInputContainer?.classList.toggle('active');
        // 切換 nav-icons 容器的 search-active 類別，以控制其他圖示的顯示/隱藏
        navIcons?.classList.toggle('search-active');

        if (searchInputContainer?.classList.contains('active')) {
            searchInputContainer.querySelector('.search-input').focus(); // 搜尋框啟用時自動聚焦輸入欄位
        }
    });

    // 點擊搜尋框外部時隱藏搜尋框
    document.addEventListener('click', (e) => {
        // 檢查點擊事件是否發生在搜尋框容器內部，或者是否點擊了搜尋觸發按鈕
        if (!searchInputContainer?.contains(e.target) && !searchBtn?.contains(e.target)) {
            // 如果搜尋框是活動狀態，則移除 active 類別
            if (searchInputContainer?.classList.contains('active')) {
                searchInputContainer.classList.remove('active');
                navIcons?.classList.remove('search-active'); // 確保同時移除 search-active 類別
            }
        }
    });

