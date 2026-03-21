document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.getElementById('navWrapper');
    const backToTop = document.getElementById('backToTop');
    const logo = document.querySelector('.nav-bar .mainlogo');
    const logoImg = document.querySelector('.nav-bar .mainlogo img');
    const navMenuContainer = document.getElementById('navMenuContainer');
    const hamburger = document.getElementById('hamburger');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const footerItems = document.querySelectorAll('.footer .row .col-md-2');
    const sitemapBtn = document.getElementById("sitemapBtn");
    const htmlTag = document.getElementById('htmlTag');
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    const sunIcon = toggleDarkMode?.querySelector('.sun');
    const moonIcon = toggleDarkMode?.querySelector('.moon');
    const navItems = navMenuContainer?.querySelectorAll('.nav-item');
    const menuOverlay = document.querySelector('.menu-overlay');
    const overlay = document.querySelector('.dropdown-overlay');
    const iconArea = document.querySelector('.nav-icons');
    const navRight = document.querySelector('.nav-bar .nav-right');
    const selectors = 'h1, h2, h3, h4, h5, h6, .display, .body-1, .body-2, .minimum, .largebutton, .middlebutton';
    const tagContainer = document.querySelector('.advanced-filters-label-content');
    const advancedFiltersLeftButton = document.querySelector('.advanced-filters-circle-button-left');
    const advancedFiltersRightButton = document.querySelector('.advanced-filters-circle-button-right');

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

    // 移動 nav-icons 的邏輯
    function moveNavIconsIfNeeded() {
        const navIcons = document.querySelector('.nav-icons');
        if (!navIcons || !navMenuContainer || !navRight || !hamburger) {
            console.error('缺少必要元素：', { navIcons, navMenuContainer, navRight, hamburger });
            return;
        }
        console.log('執行 moveNavIconsIfNeeded，螢幕寬度:', window.innerWidth);
        if (window.innerWidth <= 991) {
            if (!navMenuContainer.contains(navIcons)) {
                console.log('[手機版] 移動 nav-icons 到 navMenuContainer');
                navMenuContainer.insertBefore(navIcons, navMenuContainer.firstChild);
            }
            navMenuContainer.style.display = '';
        } else {
            if (navMenuContainer.contains(navIcons)) {
                console.log('[桌機版] 從 navMenuContainer 移除 nav-icons');
                navMenuContainer.removeChild(navIcons);
            }
            if (!navRight.contains(navIcons)) {
                console.log('[桌機版] 移動 nav-icons 到 nav-right（hamburger 前）');
                navRight.insertBefore(navIcons, hamburger);
            }
            navIcons.style.flexDirection = '';
            navIcons.classList.remove('nav-menu-container');
            navMenuContainer.style.display = '';
        }
        console.log('nav-right 子元素:', navRight.innerHTML);
        console.log('navMenuContainer 顯示:', navMenuContainer.style.display);
    }

    moveNavIconsIfNeeded();
    window.addEventListener('resize', () => {
        console.log('螢幕大小變化，寬度:', window.innerWidth);
        moveNavIconsIfNeeded();
        updateLogoColor(false);
    });

    function updateNavIconsImages(isWhiteBg) {
        const navIcons = document.querySelectorAll('.nav-icons img:not(#toggleDarkMode img), .hamburger-icon');
        const isDarkMode = document.documentElement.classList.contains('dark');
        navIcons.forEach(img => {
            const src = img.getAttribute('src');
            if (!src) {
                console.warn('圖標 src 為空:', img);
                return;
            }
            const baseName = src.split('/').pop().replace('.svg', '').replace('_b', '');
            let newSrc;
            if (isDarkMode) {
                newSrc = `img/${baseName}.svg`;
            } else {
                newSrc = isWhiteBg ? `img/${baseName}_b.svg` : `img/${baseName}.svg`;
            }
            console.log(`更新圖標: ${src} -> ${newSrc}`);
            img.setAttribute('src', newSrc);
        });
    }

    // 新增函數來更新 advanced-filters-bottom 的圖標
    function updateAdvancedFiltersIcons() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const searchIcon = document.querySelector('.advanced-filters-search .search-submit-btn img');
        const dateIcon = document.querySelector('.advanced-filters-search-date .search-submit-btn img');
        
        if (searchIcon) {
            searchIcon.src = isDarkMode ? 'img/search.svg' : 'img/search_b.svg';
        }
        if (dateIcon) {
            dateIcon.src = isDarkMode ? 'img/date.svg' : 'img/date_b.svg';
        }
    }

    function updateLogoColor(isHover = false) {
        const isDarkMode = htmlTag.classList.contains('dark');
        const hasActiveDropdown = navMenuContainer?.querySelector('.nav-item .dropdown-menu-full.active');
        const isBgVisible = isHover || window.scrollY > 50 || navWrapper?.classList.contains('hovered') || navWrapper?.classList.contains('active') || hasActiveDropdown;

        if (isDarkMode) {
            if (isBgVisible) {
                navWrapper?.classList.add('scrolled');
                logoImg.src = 'img/logo_w.svg';
                updateNavIconsImages(true);
            } else {
                navWrapper?.classList.remove('scrolled');
                logoImg.src = 'img/logo_w.svg';
                updateNavIconsImages(false);
            }
        } else {
            if (isBgVisible) {
                navWrapper?.classList.add('scrolled');
                logoImg.src = 'img/logo_b.svg';
                updateNavIconsImages(true);
            } else {
                navWrapper?.classList.remove('scrolled');
                logoImg.src = 'img/logo_w.svg';
                updateNavIconsImages(false);
            }
        }
    }

    const hoverTriggerElements = [
        ...document.querySelectorAll('.nav-wrapper .mainlogo, .nav-wrapper .nav-icons, .nav-wrapper .nav-item, .nav-wrapper .dropdown-menu-full')
    ];

    hoverTriggerElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            console.log('Mouseenter:', el);
            navWrapper?.classList.add('hovered');
            updateLogoColor(true);
        });

        el.addEventListener('mouseleave', (e) => {
            console.log('Mouseleave:', el, 'Related:', e.relatedTarget);
            const related = e.relatedTarget;
            const isIntoDropdown = related && related.closest('.dropdown-menu-full');
            if (!related || !isIntoDropdown) {
                console.log('Removing hovered class');
                navWrapper?.classList.remove('hovered');
                updateLogoColor(false);
            }
        });
    });

    navWrapper?.addEventListener('mouseleave', (e) => {
        console.log('NavWrapper mouseleave, Related:', e.relatedTarget);
        const related = e.relatedTarget;
        const isIntoDropdown = related && related.closest('.dropdown-menu-full');
        if (!related || !isIntoDropdown) {
            console.log('Resetting nav state');
            document.querySelectorAll('.dropdown-menu-full.active').forEach(menu => menu.classList.remove('active'));
            document.querySelectorAll('.nav-item.active').forEach(item => item.classList.remove('active'));
            overlay?.classList.remove('active');
            menuOverlay?.classList.remove('show');
            navWrapper?.classList.remove('hovered');
            updateLogoColor(false);
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY <= 0) {
            navWrapper?.classList.remove('scrolled');
        } else {
            navWrapper?.classList.add('scrolled');
        }
        updateLogoColor(false);
    });

    if (hamburger && navMenuContainer) {
        if (window.innerWidth <= 991) {
            navMenuContainer.classList.add('nav-menu-container');
        }

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenuContainer.classList.toggle('active');
            const isOpening = navMenuContainer.classList.contains('active');

            if (isOpening) {
                navWrapper.classList.add('active', 'scrolled');
                if (logoImg) logoImg.src = 'img/logo_b.svg';
                updateNavIconsImages(true);
            } else {
                navWrapper.classList.remove('active', 'scrolled');
                updateLogoColor(false);
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('漢堡選單點擊，navMenuContainer active:', navMenuContainer.classList.contains('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
                navMenuContainer.classList.remove('active');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-menu-full')?.classList.remove('active');
                });
                updateLogoColor(false);
                navWrapper?.classList.remove('hovered', 'active');
            }
        });
    }

    navItems?.forEach(item => {
        const dropdownMenuFull = item.querySelector('.dropdown-menu-full');

        if (dropdownMenuFull) {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'menuitem');
            item.setAttribute('aria-haspopup', 'true');
            item.setAttribute('aria-expanded', 'false');
            dropdownMenuFull.setAttribute('role', 'menu');
            dropdownMenuFull.setAttribute('aria-hidden', 'true');
        }

        if (dropdownMenuFull) {
            dropdownMenuFull.querySelectorAll('a').forEach(link => {
                link.setAttribute('tabindex', '-1');
                link.setAttribute('role', 'menuitem');
            });
        }

        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 991) {
                navItems.forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                        i.querySelector('.dropdown-menu-full')?.classList.remove('active');
                        i.setAttribute('aria-expanded', 'false');
                        i.querySelector('.dropdown-menu-full')?.setAttribute('aria-hidden', 'true');
                    }
                });

                if (dropdownMenuFull) {
                    menuOverlay?.classList.add('show');
                    dropdownMenuFull.classList.add('active');
                    overlay?.classList.add('active');
                    item.classList.add('active');
                    item.setAttribute('aria-expanded', 'true');
                    dropdownMenuFull.setAttribute('aria-hidden', 'false');
                    navWrapper?.classList.add('scrolled');
                    updateNavIconsImages(true);
                    dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '0'));
                } else {
                    updateLogoColor(true);
                }
            }
        });

        item.addEventListener('mouseleave', (e) => {
            if (window.innerWidth > 991 && dropdownMenuFull) {
                const related = e.relatedTarget;
                const isStillInside = related && (item.contains(related) || dropdownMenuFull.contains(related));
                if (!isStillInside) {
                    dropdownMenuFull.classList.remove('active');
                    item.classList.remove('active');
                    overlay?.classList.remove('active');
                    menuOverlay?.classList.remove('show');
                    item.setAttribute('aria-expanded', 'false');
                    dropdownMenuFull.setAttribute('aria-hidden', 'true');
                    dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
                    updateLogoColor(false);
                }
            }
        });

        dropdownMenuFull?.addEventListener('mouseleave', (e) => {
            if (window.innerWidth > 991) {
                const related = e.relatedTarget;
                const isStillInNav = related && (item.contains(related) || dropdownMenuFull.contains(related));
                if (!isStillInNav) {
                    dropdownMenuFull.classList.remove('active');
                    item.classList.remove('active');
                    overlay?.classList.remove('active');
                    menuOverlay?.classList.remove('show');
                    item.setAttribute('aria-expanded', 'false');
                    dropdownMenuFull.setAttribute('aria-hidden', 'true');
                    dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
                    updateLogoColor(false);
                }
            }
        });

        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                navItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.dropdown-menu-full')?.classList.remove('active');
                    i.setAttribute('aria-expanded', 'false');
                    i.querySelector('.dropdown-menu-full')?.setAttribute('aria-hidden', 'true');
                });
                if (!isActive && dropdownMenuFull) {
                    item.classList.add('active');
                    dropdownMenuFull.classList.add('active');
                    item.setAttribute('aria-expanded', 'true');
                    dropdownMenuFull.setAttribute('aria-hidden', 'false');
                    dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '0'));
                }
            }
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                navItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.dropdown-menu-full')?.classList.remove('active');
                    i.setAttribute('aria-expanded', 'false');
                    i.querySelector('.dropdown-menu-full')?.setAttribute('aria-hidden', 'true');
                    i.querySelector('.dropdown-menu-full')?.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
                });
                if (!isActive && dropdownMenuFull) {
                    item.classList.add('active');
                    dropdownMenuFull.classList.add('active');
                    item.setAttribute('aria-expanded', 'true');
                    dropdownMenuFull.setAttribute('aria-hidden', 'false');
                    dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '0'));
                    dropdownMenuFull.querySelector('a')?.focus();
                }
            } else if (e.key === 'Escape' && dropdownMenuFull && item.classList.contains('active')) {
                item.classList.remove('active');
                dropdownMenuFull.classList.remove('active');
                item.setAttribute('aria-expanded', 'false');
                dropdownMenuFull.setAttribute('aria-hidden', 'true');
                dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
                item.focus();
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
    updateAdvancedFiltersIcons(); // 初始化 advanced-filters 圖標

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

        navWrapper?.classList.remove('hovered');
        
        localStorage.setItem(
            'theme',
            htmlTag.classList.contains('dark') ? 'dark' : 'light'
        );

        updateInboxIcon();
        updateAdvancedFiltersIcons(); // 當主題切換時更新圖標

        updateLogoColor(
            navWrapper?.classList.contains('active') ||
            navWrapper?.classList.contains('hovered') ||
            window.scrollY > 50 ||
            navMenuContainer?.querySelector('.nav-item .dropdown-menu-full.active')
        );
    });

    toggleDarkMode?.setAttribute('aria-pressed', htmlTag.classList.contains('dark') ? 'true' : 'false');
    toggleDarkMode?.setAttribute('aria-label', htmlTag.classList.contains('dark') ? '切換日夜模式，目前為暗模式' : '切換日夜模式，目前為亮模式');
    toggleDarkMode?.setAttribute('role', 'button');
    toggleDarkMode?.setAttribute('tabindex', '0');

    toggleDarkMode?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDarkMode.click();
        }
    });

    toggleDarkMode?.addEventListener('click', () => {
        toggleDarkMode.setAttribute('aria-pressed', htmlTag.classList.contains('dark') ? 'true' : 'false');
        toggleDarkMode.setAttribute('aria-label', htmlTag.classList.contains('dark') ? '切換日夜模式，目前為暗模式' : '切換日夜模式，目前為亮模式');
    });

    const mobileShareBtn = document.getElementById('mobileShareBtn');
    const mobileSharePopup = document.getElementById('mobileSharePopup');
    const shareIcon = document.getElementById('shareIcon');
    const shareIconPath = 'img/share.svg';
    const closeIconPath = 'img/cancel.svg';

    if (mobileShareBtn && mobileSharePopup && shareIcon) {
        shareIcon.src = shareIconPath;
        shareIcon.alt = '分享';

        mobileShareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileSharePopup.classList.toggle('active');
            if (mobileSharePopup.classList.contains('active')) {
                shareIcon.src = closeIconPath;
                shareIcon.alt = '取消';
            } else {
                shareIcon.src = shareIconPath;
                shareIcon.alt = '分享';
            }
        });

        document.addEventListener('click', (e) => {
            if (!mobileSharePopup.contains(e.target) && !mobileShareBtn.contains(e.target)) {
                if (mobileSharePopup.classList.contains('active')) {
                    mobileSharePopup.classList.remove('active');
                    shareIcon.src = shareIconPath;
                    shareIcon.alt = '分享';
                }
            }
        });
    }

    const searchBtn = document.getElementById('search');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const navIcons = document.querySelector('.nav-icons');

    searchBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        searchInputContainer?.classList.toggle('active');
        navIcons?.classList.toggle('search-active');
        if (searchInputContainer?.classList.contains('active')) {
            searchInputContainer.querySelector('.search-input').focus();
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInputContainer?.contains(e.target) && !searchBtn?.contains(e.target)) {
            if (searchInputContainer?.classList.contains('active')) {
                searchInputContainer.classList.remove('active');
                navIcons?.classList.remove('search-active');
            }
        }
    });

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

    function checkVisibility() {
        const share = document.querySelector('.share-fixed');
        const shareMobile = document.querySelector('.share-mobile-container');
        const backToTop = document.getElementById('backToTop');
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const distanceToBottom = docHeight - (scrollY + windowHeight);
        const isMobile = window.innerWidth <= 991;

        if (distanceToBottom > 500) {
            share?.classList.add('show');
            if (isMobile) {
                shareMobile?.classList.add('show');
                shareMobile?.setAttribute('aria-hidden', 'false');
            }
        } else {
            share?.classList.remove('show');
            if (isMobile) {
                shareMobile?.classList.remove('show');
                shareMobile?.setAttribute('aria-hidden', 'true');
            }
        }

        if (isMobile) {
            if (distanceToBottom > 500) {
                backToTop?.classList.add('show');
                backToTop?.setAttribute('aria-hidden', 'false');
            } else {
                backToTop?.classList.remove('show');
                backToTop?.setAttribute('aria-hidden', 'true');
            }
        } else {
            backToTop?.classList.remove('show');
            backToTop?.setAttribute('aria-hidden', 'true');
        }
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', () => {
        checkVisibility();
    });

    if (backToTop) {
        backToTop.setAttribute('role', 'button');
        backToTop.setAttribute('aria-label', '回到頁面頂端');
        backToTop.setAttribute('aria-hidden', 'true');
    }

    function handleResize() {
        checkVisibility();
    }
    window.addEventListener('resize', handleResize);

    document.querySelectorAll('.advanced-filters-tag .tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.advanced-filters-tag .tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });

        tag.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tag.click();
            }
        });
    });

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
            img.src = `img/${baseName}.svg`;
        });
    });

    logo?.addEventListener('click', () => {
        window.location.href = '/首頁.html';
    });

    sitemapBtn?.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle("active");
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTop.classList.remove('show');
    });

    function handleResize() {
        if (window.innerWidth <= 991) {
            navMenuContainer?.classList.add('nav-menu-container');
        } else {
            navWrapper?.classList.remove('hovered');
            navMenuContainer?.classList.remove('nav-menu-container');
            navMenuContainer?.classList.remove('active');
            navItems?.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.dropdown-menu-full')?.classList.remove('active');
                item.setAttribute('aria-expanded', 'false');
                item.querySelector('.dropdown-menu-full')?.setAttribute('aria-hidden', 'true');
                item.querySelector('.dropdown-menu-full')?.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
            });
            updateLogoColor(false);
        }
        moveNavIconsIfNeeded();
    }

    window.addEventListener('resize', handleResize);

    updateLogoColor();

    document.querySelectorAll('.circle-button-left, .circle-button-right, .floating-circle-button .circle-button-left, .floating-circle-button .circle-button-right').forEach(button => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    document.querySelectorAll('.service-card-small').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'link');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = card.getAttribute('href') || '#';
            }
        });
    });

    $(function () {
        const $slider = $('.banner-slider');
        $slider.attr('role', 'region').attr('aria-label', '主要輪播區域');

        $slider.on('init', function () {
            $slider.find('.banner').each(function (index) {
                $(this).attr('aria-hidden', index !== 0);
            });
        });

        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $slider.find('.banner').attr('aria-hidden', true);
            $slider.find('.banner').eq(nextSlide).attr('aria-hidden', false);
        });

        const $newsSlider = $('.newsbanner .carousel-track');
        $newsSlider.attr('role', 'region').attr('aria-label', '新聞輪播區域');

        $newsSlider.on('init', function () {
            $newsSlider.find('.slide').each(function (index) {
                $(this).attr('aria-hidden', index !== slick.currentSlide);
            });
        });

        $newsSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $newsSlider.find('.slide').attr('aria-hidden', true);
            $newsSlider.find('.slide').eq(nextSlide).attr('aria-hidden', false);
        });

        const $leaderSlider = $('.leader-carousel');
        $leaderSlider.attr('role', 'region').attr('aria-label', '領導人物輪播區域');

        $leaderSlider.on('init', function () {
            $leaderSlider.find('.leader-item').each(function (index) {
                $(this).attr('aria-hidden', index !== slick.currentSlide);
            });
        });

        $leaderSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $leaderSlider.find('.leader-item').attr('aria-hidden', true);
            $leaderSlider.find('.leader-item').eq(nextSlide).attr('aria-hidden', false);
        });
    });

    // Add scrolling functionality for advanced filters buttons
    advancedFiltersLeftButton?.addEventListener('click', () => {
        tagContainer.scrollBy({ left: -140, behavior: 'smooth' });
    });

    advancedFiltersRightButton?.addEventListener('click', () => {
        tagContainer.scrollBy({ left: 140, behavior: 'smooth' });
    });

function updateFilterButtonStates() {
        const tagContainer = document.querySelector('.advanced-filters-label-content');
        const leftButton = document.querySelector('.advanced-filters-circle-button-left');
        const rightButton = document.querySelector('.advanced-filters-circle-button-right');

        if (!tagContainer || !leftButton || !rightButton) {
            console.warn('缺少必要元素：', { tagContainer, leftButton, rightButton });
            return;
        }

        const scrollLeft = tagContainer.scrollLeft;
        const maxScrollLeft = tagContainer.scrollWidth - tagContainer.clientWidth;

        if (scrollLeft <= 0) {
            leftButton.classList.add('disabled');
            rightButton.classList.remove('disabled');
        } else if (scrollLeft >= maxScrollLeft - 1) {
            leftButton.classList.remove('disabled');
            rightButton.classList.add('disabled');
        } else {
            leftButton.classList.remove('disabled');
            rightButton.classList.remove('disabled');
        }
    }

    
    if (tagContainer) {
        tagContainer.scrollLeft = 0; // 設置為 0，確保滑到最左端
    }

    // 監聽滾動事件
    tagContainer?.addEventListener('scroll', updateFilterButtonStates);

    // 初始化按鈕狀態
    updateFilterButtonStates();

    // 窗口大小改變時重新檢查
    window.addEventListener('resize', updateFilterButtonStates);



    
function positionAdvancedFilters() {
    const topBg = document.querySelector('.top-bg');
    const pagewrap1 = document.querySelector('.pagewrap1');
    const advancedFilters = document.querySelector('.advanced-filters');
    const advancedFilters2 = document.querySelector('.advanced-filters-2');

    // 檢查必要元素是否存在
    if (!topBg || !pagewrap1) {
        console.log('Missing required elements:', { topBg, pagewrap1 });
        return;
    }

    const topBgHeight = topBg.offsetHeight;
    const pagewrap1Top = pagewrap1.getBoundingClientRect().top + window.scrollY;

    // 定義 .advanced-filters 的 offset 根據螢幕尺寸
    let offsetFilters = -10;
    if (window.innerWidth <= 991) offsetFilters = -10;
    if (window.innerWidth <= 768) offsetFilters = -10;

    // 定義 .advanced-filters-2 的 offset 根據螢幕尺寸
    let offsetFilters2 = 18;
    if (window.innerWidth <= 991) offsetFilters2 = 22;
    if (window.innerWidth <= 768) offsetFilters2 = 19;
    // 處理 .advanced-filters
    if (advancedFilters) {
        const advancedFiltersHeight = advancedFilters.offsetHeight;
        const positionTop = topBgHeight + (pagewrap1Top - topBgHeight) / 2 - advancedFiltersHeight / 2 + offsetFilters;

        advancedFilters.style.position = 'absolute';
        advancedFilters.style.top = `${positionTop}px`;
        advancedFilters.style.left = '50%';
        advancedFilters.style.transform = 'translateX(-50%)';

        console.log('.advanced-filters Debug:', {
            topBgHeight,
            pagewrap1Top,
            advancedFiltersHeight,
            offset: offsetFilters,
            positionTop
        });
    }

    // 處理 .advanced-filters-2
    if (advancedFilters2) {
        const advancedFilters2Height = advancedFilters2.offsetHeight;
        const positionTop2 = topBgHeight + (pagewrap1Top - topBgHeight) / 2 - advancedFilters2Height / 2 + offsetFilters2;

        advancedFilters2.style.position = 'absolute';
        advancedFilters2.style.top = `${positionTop2}px`;
        advancedFilters2.style.left = '50%';
        advancedFilters2.style.transform = 'translateX(-50%)';

        console.log('.advanced-filters-2 Debug:', {
            topBgHeight,
            pagewrap1Top,
            advancedFilters2Height,
            offset: offsetFilters2,
            positionTop2
        });
    }
}

// 在 DOM 載入完成和窗口大小改變時執行
document.addEventListener('DOMContentLoaded', positionAdvancedFilters);
window.addEventListener('resize', positionAdvancedFilters);


// 呼叫時機維持原樣
window.addEventListener('load', positionAdvancedFilters);
window.addEventListener('resize', positionAdvancedFilters);

// 額外：監聽圖片載入（如果 .top-bg 有背景圖）
const topBgImg = new Image();
topBgImg.src = '../img/newsimg.jpg'; // 替換成實際背景圖 URL
topBgImg.onload = positionAdvancedFilters; // 圖載完重算

// 可選：用 MutationObserver 監聽 DOM 變化（如果有動態內容）
const observer = new MutationObserver(positionAdvancedFilters);
observer.observe(document.body, { childList: true, subtree: true });


const advancedSearchDate = document.querySelector('.advanced-filters-search-date');
const advancedSearch = document.querySelector('.advanced-filters-search');
const advancedSearchDateInput = advancedSearchDate?.querySelector('.search-input');
const advancedSearchInput = advancedSearch?.querySelector('.search-input');

function toggleExpanded(target, other) {
    if (window.innerWidth <= 768) {
        target.classList.remove('collapsed');
        other.classList.add('collapsed');
        target.setAttribute('aria-expanded', 'true');
        other.setAttribute('aria-expanded', 'false');
        target.querySelector('.search-input')?.focus();
    }
}

if (advancedSearchDate && advancedSearch) {
    // 預設: date 展開 (無 collapsed), search 縮小 (加 collapsed)
    advancedSearch.classList.add('collapsed');

    advancedSearchDate.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpanded(advancedSearchDate, advancedSearch);
    });

    advancedSearch.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleExpanded(advancedSearch, advancedSearchDate);
    });

    // 點擊外部關閉: 如果兩個都展開 (但邏輯上不會)，或重置
    document.addEventListener('click', (e) => {
        if (!advancedSearchDate.contains(e.target) && !advancedSearch.contains(e.target)) {
            // 可選: 重置到預設狀態
            advancedSearchDate.classList.remove('collapsed');
            advancedSearch.classList.add('collapsed');
            advancedSearchDate.setAttribute('aria-expanded', 'true');
            advancedSearch.setAttribute('aria-expanded', 'false');
        }
    });

    // resize 時重置到預設
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            advancedSearchDate.classList.remove('collapsed');
            advancedSearch.classList.remove('collapsed');
            advancedSearchDate.setAttribute('aria-expanded', 'false');
            advancedSearch.setAttribute('aria-expanded', 'false');
        } else {
            // 手機版重置預設
            advancedSearchDate.classList.remove('collapsed');
            advancedSearch.classList.add('collapsed');
            advancedSearchDate.setAttribute('aria-expanded', 'true');
            advancedSearch.setAttribute('aria-expanded', 'false');
        }
    });

    // 初始無障礙設定
    advancedSearchDate.setAttribute('aria-expanded', 'true');
    advancedSearch.setAttribute('aria-expanded', 'false');
    advancedSearchDate.setAttribute('role', 'button');
    advancedSearch.setAttribute('role', 'button');
    advancedSearchDate.setAttribute('tabindex', '0');
    advancedSearch.setAttribute('tabindex', '0');

    // 鍵盤支援
    advancedSearchDate.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded(advancedSearchDate, advancedSearch);
        }
    });

    advancedSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded(advancedSearch, advancedSearchDate);
        }
    });
}
function generatePagination(totalPages, currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // 清空原有內容

    // 添加左箭頭
    const leftArrow = document.createElement('a');
    leftArrow.classList.add('page-arrow');
    leftArrow.href = '#';
    leftArrow.innerHTML = '<img src="left-arrow.png" alt="Previous">';
    paginationContainer.appendChild(leftArrow);

    // 邏輯：顯示前 3 頁 + ... + 後 3 頁，或展開所有若總頁少
    if (totalPages <= 5) {
        // 若總頁少，顯示所有
        for (let i = 1; i <= totalPages; i++) {
            addPageNumber(i, currentPage);
        }
    } else {
        // 顯示 1-3 + ... + (current-1 to current+1) + ... + 最後頁（簡化版）
        addPageNumber(1, currentPage);
        if (currentPage > 3) addEllipsis();
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            addPageNumber(i, currentPage);
        }
        if (currentPage < totalPages - 2) addEllipsis();
        addPageNumber(totalPages, currentPage);
    }

    // 添加右箭頭
    const rightArrow = document.createElement('a');
    rightArrow.classList.add('page-arrow');
    rightArrow.href = '#';
    rightArrow.innerHTML = '<img src="right-arrow.png" alt="Next">';
    paginationContainer.appendChild(rightArrow);

    function addPageNumber(page, current) {
        const pageNum = document.createElement('a');
        pageNum.classList.add('page-number');
        pageNum.href = '#';
        pageNum.textContent = page;
        if (page === current) pageNum.classList.add('active');
        paginationContainer.appendChild(pageNum);
    }

    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.classList.add('page-ellipsis');
        ellipsis.textContent = '...';
        paginationContainer.appendChild(ellipsis);
    }
}

function updateLeaderPicPosition() {
    const leaderPic = document.querySelector('.leader-pic');
    const wrap2 = document.querySelector('.wrap2');
    if (!leaderPic || !wrap2 || window.innerWidth <= 768) return; // 手機版跳過

    const paddingX = parseInt(getComputedStyle(wrap2).paddingRight, 10);
    const wrapWidth = wrap2.offsetWidth;
    const viewportWidth = window.innerWidth;
    const marginRight = (viewportWidth - wrapWidth) / 2;

    const rightValue = - (paddingX + marginRight) - 20;
    leaderPic.style.right = `${rightValue}px`;
}

// 初始呼叫和 resize 監聽
updateLeaderPicPosition();
window.addEventListener('resize', updateLeaderPicPosition);

});