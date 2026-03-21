document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.getElementById('navWrapper');
    const backToTop = document.getElementById('backToTop');
    const logo = document.querySelector('.nav-bar .mainlogo');
    const logoImg = document.querySelector('.nav-bar .mainlogo img');
    const navMenuContainer = document.getElementById('navMenuContainer');
    const hamburger = document.getElementById('hamburger');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const footerTitles = document.querySelectorAll('.footer .row .col-md-2 .footer-title');
    const sitemapBtn = document.getElementById("sitemapBtn");
    const htmlTag = document.getElementById('htmlTag');
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    const sunIcon = toggleDarkMode?.querySelector('.sun');
    const moonIcon = toggleDarkMode?.querySelector('.moon');
    const navItems = navMenuContainer?.querySelectorAll('.nav-item');
    const menuOverlay = document.querySelector('.menu-overlay');
    const overlay = document.querySelector('.dropdown-overlay');
    const teamItems = document.querySelectorAll('.team-item'); 
    const modalCloseBtns = document.querySelectorAll('.modal-close-btn'); 
    const iconArea = document.querySelector('.nav-icons');
    const navRight = document.querySelector('.nav-bar .nav-right');
    const selectors = 'h1, h2, h3, h4, h5, h6, .display, .body-1, .body-2, .minimum, .largebutton, .middlebutton';
    const tagContainer = document.querySelector('.advanced-filters-label-content');
    const advancedFiltersLeftButton = document.querySelector('.advanced-filters-circle-button-left');
    const advancedFiltersRightButton = document.querySelector('.advanced-filters-circle-button-right');
    const advancedSearchDate = document.querySelector('.advanced-filters-search-date');
    const advancedSearch = document.querySelector('.advanced-filters-search');
    const advancedSearchDateInput = advancedSearchDate?.querySelector('.search-input');
    const adv2 = document.querySelector('.advanced-filters-2');
    const leadeerPic = document.querySelector('.leader-pic2');


    
    // 包英文文字 span.en
    document.querySelectorAll(selectors).forEach(el => {
        function wrapEnglishTextNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (!text.trim()) return; // 忽略空白節點
                // 已經是 .en 的父節點就跳過
                if (node.parentNode && node.parentNode.closest('.en')) return; // 防止重複包

                // 判斷是否為純英文數字（非混和語言）
                if (/^[\x00-\x7F]+$/.test(text.trim())) {
                    const span = document.createElement('span');
                    span.className = 'en';
                    span.textContent = text;
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
    }

    moveNavIconsIfNeeded();
    window.addEventListener('resize', () => {
        console.log('螢幕大小變化，寬度:', window.innerWidth);
        moveNavIconsIfNeeded();
        updateLogoColor(false);
    });

    function updateNavIconsImages(isWhiteBg) {
        const navIcons = document.querySelectorAll('.nav-icons img:not(#toggleDarkMode img), .hamburger-icon');
        const pageShareIcons = document.querySelectorAll('.page-share-fixed .share-icons img, .share-fixed .share-icons img');
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

        pageShareIcons.forEach(img => {
            const src = img.getAttribute('src');
            if (!src) {
                console.warn('分享圖標 src 為空:', img);
                return;
            }
            const baseName = src.split('/').pop().replace('.svg', '').replace('_w', '');
            const newSrc = isDarkMode ? `img/${baseName}_w.svg` : `img/${baseName}.svg`;
            console.log(`更新分享圖標: ${src} -> ${newSrc}`);
            img.setAttribute('src', newSrc);
        });
    }

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

    const isModalActive = () => {
    return document.querySelector('.team-modal.active') !== null;
};
    navWrapper?.addEventListener('mouseleave', (e) => {
        console.log('NavWrapper mouseleave, Related:', e.relatedTarget);
        const related = e.relatedTarget;
        const isIntoDropdown = related && related.closest('.dropdown-menu-full');
        if (isModalActive()) { 
            return; 
        }
        if (!related || !isIntoDropdown) {
            console.log('Resetting nav state');
            document.querySelectorAll('.dropdown-menu-full.active').forEach(menu => menu.classList.remove('active'));
            document.querySelectorAll('.nav-item.active').forEach(item => item.classList.remove('active'));
            overlay?.classList.remove('active');
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
            // 如果 team-modal 處於 active 狀態，我們需要確保 menuOverlay 不會被關閉
            const isModalCurrentlyActive = isModalActive(); // 使用已定義的 isModalActive 函式

            if (!navMenuContainer.contains(e.target) && e.target !== hamburger) {
                
                // 即使 Modal active，也要確保手機版的 Nav Menu 狀態被清除
                navMenuContainer.classList.remove('active');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-menu-full')?.classList.remove('active');
                });
                overlay?.classList.remove('active');
                
                // 只有在沒有 Modal active 的情況下，才關閉 menuOverlay
                if (!isModalCurrentlyActive) {
                    menuOverlay?.classList.remove('show');
                }
                
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
                if (isModalActive()) {
                    // 但仍需確保 nav-item 本身和下拉菜單的 active 狀態能被清除
                    if (!isStillInside) {
                        dropdownMenuFull.classList.remove('active');
                        item.classList.remove('active');
                        item.setAttribute('aria-expanded', 'false');
                        dropdownMenuFull.setAttribute('aria-hidden', 'true');
                        dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
                        // 這裡不執行 overlay?.classList.remove('active'); 和 menuOverlay?.classList.remove('show');
                    }
                    return; // 阻止執行後續的完整關閉邏輯
                }
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

                // 【新增檢查】
                if (isModalActive()) {
                    return; 
                }

    if (!isStillInNav) {
     dropdownMenuFull.classList.remove('active');
    item.classList.remove('active');
     overlay?.classList.remove('active');
     menuOverlay?.classList.remove('show'); // 這裡也需要關閉
     item.setAttribute('aria-expanded', 'false');
     dropdownMenuFull.setAttribute('aria-hidden', 'true');
     dropdownMenuFull.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
     updateLogoColor(false);
     }
    }
     });

item.addEventListener('click', (e) => {
    if (window.innerWidth <= 991) {
        // 判斷被點擊的元素是否為子選單內的連結，如果是，則不阻止預設行為
        const clickedLink = e.target.closest('.dropdown-menu-full a');
        if (!clickedLink) {
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

    // 更新日期選擇器樣式（包含年份和月份自定義下拉選單）
    function updateDatePickerStyles() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const yearSelectContainer = document.querySelector('.year-select-container');
        const yearDisplay = document.querySelector('.year-display');
        const yearDropdown = document.querySelector('.year-dropdown');
        const yearOptions = document.querySelectorAll('.year-option');
        const monthSelectContainer = document.querySelector('.month-select-container');
        const monthDisplay = document.querySelector('.month-display');
        const monthDropdown = document.querySelector('.month-dropdown');
        const monthOptions = document.querySelectorAll('.month-option');

        if (isDarkMode) {
            if (yearDisplay) {
                yearDisplay.style.background = `var(--op-blue6-b) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="%23FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 5l6 6 6-6"/></svg>') no-repeat right 8px center/12px`;
                yearDisplay.style.color = 'var(--op-white)';
                yearDisplay.style.borderColor = 'var(--op-gray2-w)';
            }
            if (yearDropdown) {
                yearDropdown.style.backgroundColor = 'var(--op-blue6-b)';
                yearDropdown.style.borderColor = 'var(--op-gray2-w)';
            }
            yearOptions.forEach(option => {
                option.style.color = 'var(--op-white)';
                option.style.backgroundColor = 'var(--op-blue6-b)';
            });
            if (monthDisplay) {
                monthDisplay.style.background = `var(--op-blue6-b) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="%23FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 5l6 6 6-6"/></svg>') no-repeat right 8px center/12px`;
                monthDisplay.style.color = 'var(--op-white)';
                monthDisplay.style.borderColor = 'var(--op-gray2-w)';
            }
            if (monthDropdown) {
                monthDropdown.style.backgroundColor = 'var(--op-blue6-b)';
                monthDropdown.style.borderColor = 'var(--op-gray2-w)';
            }
            monthOptions.forEach(option => {
                option.style.color = 'var(--op-white)';
                option.style.backgroundColor = 'var(--op-blue6-b)';
            });
        } else {
            if (yearDisplay) {
                yearDisplay.style.background = `var(--op-white-b) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="%23000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 5l6 6 6-6"/></svg>') no-repeat right 8px center/12px`;
                yearDisplay.style.color = 'var(--op-black1-g)';
                yearDisplay.style.borderColor = 'var(--op-gray4-g)';
            }
            if (yearDropdown) {
                yearDropdown.style.backgroundColor = 'var(--op-white-b)';
                yearDropdown.style.borderColor = 'var(--op-gray4-g)';
            }
            yearOptions.forEach(option => {
                option.style.color = 'var(--op-black1-g)';
                option.style.backgroundColor = 'var(--op-white-b)';
            });
            if (monthDisplay) {
                monthDisplay.style.background = `var(--op-white-b) url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="%23000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 5l6 6 6-6"/></svg>') no-repeat right 8px center/12px`;
                monthDisplay.style.color = 'var(--op-black1-g)';
                monthDisplay.style.borderColor = 'var(--op-gray4-g)';
            }
            if (monthDropdown) {
                monthDropdown.style.backgroundColor = 'var(--op-white-b)';
                monthDropdown.style.borderColor = 'var(--op-gray4-g)';
            }
            monthOptions.forEach(option => {
                option.style.color = 'var(--op-black1-g)';
                option.style.backgroundColor = 'var(--op-white-b)';
            });
        }
    }

    updateInboxIcon();
    updateAdvancedFiltersIcons();
    updateDatePickerStyles(); // 初始化日期選擇器樣式

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
        updateAdvancedFiltersIcons();
        updateDatePickerStyles(); // 暗模式切換時更新日期選擇器樣式

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
            autoplaySpeed: 60000,
            speed: 300,
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
    const shareMobile = document.querySelector('.share-mobile-container');
    const shareFixed = document.querySelector('.share-fixed');
    const backToTop = document.getElementById('backToTop');
    const main = document.querySelector('main');
    const pagewrap1 = document.querySelector('.pagewrap1');

    // 檢查必要元素是否存在
    if (!pagewrap1) {
        console.warn('未找到 .pagewrap1，請檢查 HTML 結構');
        return;
    }
    if (!shareMobile) {
        console.warn('未找到 .share-mobile-container，請檢查 HTML 結構');
    }
    if (!shareFixed) {
        console.warn('未找到 .share-fixed，請檢查 HTML 結構');
    }
    if (!main) {
        console.warn('未找到 main 元素，退回使用整個頁面高度');
        return;
    }

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const mainRect = main.getBoundingClientRect();
    const mainTop = mainRect.top + scrollY;
    const mainBottom = mainTop + mainRect.height;
    const distanceToMainBottom = mainBottom - (scrollY + windowHeight);
    const isMobile = window.innerWidth <= 991;
    const paddingFromBottom = 60;
    const pageHeightThreshold = 1200; // 頁面的 800px 高度觸發點

    // 計算 pagewrap1 的範圍
    const pagewrap1Rect = pagewrap1.getBoundingClientRect();
    const pagewrap1Top = pagewrap1Rect.top + scrollY;
    const pagewrap1Bottom = pagewrap1Top + pagewrap1Rect.height;

    // 行動裝置分享按鈕邏輯
    if (isMobile) {
        if (distanceToMainBottom > paddingFromBottom) {
            shareMobile.classList.add('show');
            shareMobile.classList.add('sticky');
            shareMobile.setAttribute('aria-hidden', 'false');
            shareMobile.style.position = 'fixed';
            shareMobile.style.bottom = '20px';
            shareMobile.style.right = '20px';
        } else {
            shareMobile.classList.add('show');
            shareMobile.classList.remove('sticky');
            shareMobile.setAttribute('aria-hidden', 'false');
            shareMobile.style.position = 'absolute';
            shareMobile.style.bottom = `${paddingFromBottom}px`;
            shareMobile.style.right = '20px';
        }

        // 同步返回頂端按鈕顯示邏輯
        if (distanceToMainBottom > paddingFromBottom) {
            backToTop?.classList.add('show');
            backToTop?.setAttribute('aria-hidden', 'false');
        } else {
            backToTop?.classList.remove('show');
            backToTop?.setAttribute('aria-hidden', 'true');
        }
    } else {
        shareMobile.classList.remove('show');
        shareMobile.setAttribute('aria-hidden', 'true');
        backToTop?.classList.remove('show');
        backToTop?.setAttribute('aria-hidden', 'true');
    }

    // 桌機版 share-fixed sticky 邏輯，限定在 pagewrap1 範圍
    if (!isMobile) {
        const bottomThreshold = 100; // 接近主內容底部 100px 時隱藏
        const minTopOffset = 100; // 最小頂部偏移量，避免太靠近頂部
        const navHeight = document.querySelector('.nav-wrapper')?.offsetHeight || 87; // 導航欄高度，預設 87px

        // 檢查是否在 pagewrap1 範圍內
        const isWithinPagewrap1 = scrollY + windowHeight > pagewrap1Top && scrollY < pagewrap1Bottom - bottomThreshold;

        if (isWithinPagewrap1 && scrollY + windowHeight > pageHeightThreshold && distanceToMainBottom > bottomThreshold) {
            shareFixed?.classList.add('show');
            shareFixed?.setAttribute('aria-hidden', 'false');
            shareFixed.style.position = 'fixed';

            // 動態計算 top 值
            if (windowHeight < 600) {
                // 窄高度螢幕：使用固定像素值，考慮導航欄高度
                shareFixed.style.top = `${minTopOffset + navHeight}px`;
                shareFixed.style.transform = 'none'; // 移除 transform
            } else {
                // 正常高度螢幕：保持 50% 居中
                shareFixed.style.top = '50%';
                shareFixed.style.transform = 'translateY(-50%)';
            }

            shareFixed.style.bottom = 'auto';
            shareFixed.style.right = '40px';
        } else {
            shareFixed?.classList.remove('show');
            shareFixed?.setAttribute('aria-hidden', 'true');
        }
    }
}

    // 移除重複的 scroll 事件監聽，僅保留一次
    window.removeEventListener('scroll', checkVisibility); // 移除可能存在的舊監聽
    window.removeEventListener('resize', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    window.addEventListener('load', () => {
        console.log('頁面載入完成，執行 checkVisibility');
        checkVisibility();
    });

    // 監聽 DOM 變化以應對動態內容
    const observer = new MutationObserver(() => {
        console.log('DOM 變化，重新執行 checkVisibility');
        checkVisibility();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (backToTop) {
        backToTop.setAttribute('role', 'button');
        backToTop.setAttribute('aria-label', '回到頁面頂端');
        backToTop.setAttribute('aria-hidden', 'true');
    }

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
        checkVisibility();
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

    // Advanced filters scrolling
    advancedFiltersLeftButton?.addEventListener('click', () => {
        tagContainer.scrollBy({ left: -900, behavior: 'smooth' });
    });

    advancedFiltersRightButton?.addEventListener('click', () => {
        tagContainer.scrollBy({ left: 900, behavior: 'smooth' });
    });

    function updateFilterButtonStates() {
        if (!tagContainer || !advancedFiltersLeftButton || !advancedFiltersRightButton) {
            console.warn('缺少必要元素：', { tagContainer, advancedFiltersLeftButton, advancedFiltersRightButton });
            return;
        }

        const scrollLeft = tagContainer.scrollLeft;
        const maxScrollLeft = tagContainer.scrollWidth - tagContainer.clientWidth;

        if (scrollLeft <= 0) {
            advancedFiltersLeftButton.classList.add('disabled');
            advancedFiltersRightButton.classList.remove('disabled');
        } else if (scrollLeft >= maxScrollLeft - 1) {
            advancedFiltersLeftButton.classList.remove('disabled');
            advancedFiltersRightButton.classList.add('disabled');
        } else {
            advancedFiltersLeftButton.classList.remove('disabled');
            advancedFiltersRightButton.classList.remove('disabled');
        }
    }

if (tagContainer) {
    tagContainer.scrollLeft = 0;
    updateFilterButtonStates();
}

tagContainer?.addEventListener('scroll', updateFilterButtonStates);
window.addEventListener('resize', updateFilterButtonStates);

    function positionAdvancedFilters() {
        const topBg = document.querySelector('.top-bg2');
        const pagewrap1 = document.querySelector('.pagewrap1');
        const advancedFilters = document.querySelector('.advanced-filters');
        const advancedFilters2 = document.querySelector('.advanced-filters-2');

        if (!topBg || !pagewrap1) {
            console.warn('缺少必要元素：', { topBg, pagewrap1 });
            return;
        }

        window.requestAnimationFrame(() => {
            const topBgHeight = topBg.offsetHeight;
            const pagewrap1Top = pagewrap1.getBoundingClientRect().top + window.scrollY;

            let offsetFilters = -10;
            let offsetFilters2 = 12;
            if (window.innerWidth <= 991) {
                offsetFilters = -10;
                offsetFilters2 = 16;
            }
            if (window.innerWidth <= 768) {
                offsetFilters = -10;
                offsetFilters2 = 2;
            }

            if (advancedFilters) {
                const advancedFiltersHeight = advancedFilters.offsetHeight;
                const positionTop = topBgHeight + (pagewrap1Top - topBgHeight) / 2 - advancedFiltersHeight / 2 + offsetFilters;
                advancedFilters.style.position = 'absolute';
                advancedFilters.style.top = `${positionTop}px`;
                advancedFilters.style.left = '50%';
                advancedFilters.style.transform = 'translateX(-50%)';
            }

            if (advancedFilters2) {
                const advancedFilters2Height = advancedFilters2.offsetHeight;
                const positionTop2 = topBgHeight + (pagewrap1Top - topBgHeight) / 2 - advancedFilters2Height / 2 + offsetFilters2;
                advancedFilters2.style.position = 'absolute';
                advancedFilters2.style.top = `${positionTop2}px`;
                advancedFilters2.style.left = '50%';
                advancedFilters2.style.transform = 'translateX(-50%)';
            }
        });
    }

    const topBgImg = new Image();
    topBgImg.src = '../img/Vector.png';
    topBgImg.onload = () => {
        positionAdvancedFilters();
    };
    setTimeout(positionAdvancedFilters, 1000);

    const filterObserver = new MutationObserver(positionAdvancedFilters); // Renamed to avoid conflict
    filterObserver.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('DOMContentLoaded', positionAdvancedFilters);
    window.addEventListener('resize', positionAdvancedFilters);

    // Date Picker Logic
    let selectedStartDate = null;
    let selectedEndDate = null;

    // 修改後的 createDatePicker 函數：年份和月份下拉選單樣式一致，年份寬度60px，月份寬度50px
    function createDatePicker() {
        const datePicker = document.createElement('div');
        datePicker.classList.add('date-picker');
        datePicker.setAttribute('role', 'dialog');
        datePicker.setAttribute('aria-label', '日期選擇器');

        const header = document.createElement('div');
        header.classList.add('date-picker-header');

        const selectors = document.createElement('div');
        selectors.classList.add('date-picker-selectors');

        // 自定義年份下拉選單
        const yearSelectContainer = document.createElement('div');
        yearSelectContainer.classList.add('year-select-container');

        const yearDisplay = document.createElement('div');
        yearDisplay.classList.add('year-display');
        yearDisplay.setAttribute('role', 'button');
        yearDisplay.setAttribute('aria-expanded', 'false');
        yearDisplay.setAttribute('tabindex', '0');
        yearDisplay.setAttribute('aria-label', '選擇年份');

        const yearDropdown = document.createElement('div');
        yearDropdown.classList.add('year-dropdown');
        yearDropdown.setAttribute('aria-hidden', 'true');

        const currentDate = new Date();
        const currentROCYear = currentDate.getFullYear() - 1911;
        const startYear = 110; // 固定民國 110 年
        const endYear = 120;
        yearDisplay.textContent = `${currentROCYear}年`;
        yearDisplay.setAttribute('data-value', currentROCYear);

        for (let i = startYear; i <= endYear; i++) {
            const option = document.createElement('div');
            option.classList.add('year-option');
            option.textContent = `${i}年`; // 僅顯示民國年份
            option.setAttribute('data-value', i);
            option.setAttribute('role', 'option');
            option.setAttribute('tabindex', '-1');
            option.addEventListener('click', () => {
                yearDisplay.textContent = option.textContent;
                yearDisplay.setAttribute('data-value', i);
                yearDisplay.setAttribute('aria-expanded', 'false');
                yearDropdown.setAttribute('aria-hidden', 'true');
                yearDropdown.classList.remove('active');
                renderCalendar(i, parseInt(monthDisplay.getAttribute('data-value') || currentMonth), days);
            });
            yearDropdown.appendChild(option);
        }

        yearDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            yearDropdown.classList.toggle('active');
            yearDropdown.setAttribute('aria-hidden', yearDropdown.classList.contains('active') ? 'false' : 'true');
            yearDisplay.setAttribute('aria-expanded', yearDropdown.classList.contains('active') ? 'true' : 'false');
            if (yearDropdown.classList.contains('active')) {
                yearDropdown.querySelector('.year-option')?.focus();
            }
        });

        yearDisplay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                yearDropdown.classList.toggle('active');
                yearDropdown.setAttribute('aria-hidden', yearDropdown.classList.contains('active') ? 'false' : 'true');
                yearDisplay.setAttribute('aria-expanded', yearDropdown.classList.contains('active') ? 'true' : 'false');
                if (yearDropdown.classList.contains('active')) {
                    yearDropdown.querySelector('.year-option')?.focus();
                }
            }
        });

        yearDropdown.addEventListener('keydown', (e) => {
            const options = yearDropdown.querySelectorAll('.year-option');
            const focusedOption = document.activeElement;
            const index = Array.from(options).indexOf(focusedOption);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = index < options.length - 1 ? index + 1 : 0;
                options[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = index > 0 ? index - 1 : options.length - 1;
                options[prevIndex].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                focusedOption.click();
            } else if (e.key === 'Escape') {
                yearDropdown.classList.remove('active');
                yearDropdown.setAttribute('aria-hidden', 'true');
                yearDisplay.setAttribute('aria-expanded', 'false');
                yearDisplay.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!yearSelectContainer.contains(e.target)) {
                yearDropdown.classList.remove('active');
                yearDropdown.setAttribute('aria-hidden', 'true');
                yearDisplay.setAttribute('aria-expanded', 'false');
            }
        });

        yearSelectContainer.append(yearDisplay, yearDropdown);

        // 自定義月份下拉選單
        const monthSelectContainer = document.createElement('div');
        monthSelectContainer.classList.add('month-select-container');

        const monthDisplay = document.createElement('div');
        monthDisplay.classList.add('month-display');
        monthDisplay.setAttribute('role', 'button');
        monthDisplay.setAttribute('aria-expanded', 'false');
        monthDisplay.setAttribute('tabindex', '0');
        monthDisplay.setAttribute('aria-label', '選擇月份');

        const monthDropdown = document.createElement('div');
        monthDropdown.classList.add('month-dropdown');
        monthDropdown.setAttribute('aria-hidden', 'true');

        const currentMonth = currentDate.getMonth() + 1;
        monthDisplay.textContent = `${currentMonth}月`;
        monthDisplay.setAttribute('data-value', currentMonth);

        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('div');
            option.classList.add('month-option');
            option.textContent = `${i}月`;
            option.setAttribute('data-value', i);
            option.setAttribute('role', 'option');
            option.setAttribute('tabindex', '-1');
            option.addEventListener('click', () => {
                monthDisplay.textContent = option.textContent;
                monthDisplay.setAttribute('data-value', i);
                monthDisplay.setAttribute('aria-expanded', 'false');
                monthDropdown.setAttribute('aria-hidden', 'true');
                monthDropdown.classList.remove('active');
                renderCalendar(parseInt(yearDisplay.getAttribute('data-value') || currentROCYear), i, days);
            });
            monthDropdown.appendChild(option);
        }

        monthDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            monthDropdown.classList.toggle('active');
            monthDropdown.setAttribute('aria-hidden', monthDropdown.classList.contains('active') ? 'false' : 'true');
            monthDisplay.setAttribute('aria-expanded', monthDropdown.classList.contains('active') ? 'true' : 'false');
            if (monthDropdown.classList.contains('active')) {
                monthDropdown.querySelector('.month-option')?.focus();
            }
        });

        monthDisplay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                monthDropdown.classList.toggle('active');
                monthDropdown.setAttribute('aria-hidden', monthDropdown.classList.contains('active') ? 'false' : 'true');
                monthDisplay.setAttribute('aria-expanded', monthDropdown.classList.contains('active') ? 'true' : 'false');
                if (monthDropdown.classList.contains('active')) {
                    monthDropdown.querySelector('.month-option')?.focus();
                }
            }
        });

        monthDropdown.addEventListener('keydown', (e) => {
            const options = monthDropdown.querySelectorAll('.month-option');
            const focusedOption = document.activeElement;
            const index = Array.from(options).indexOf(focusedOption);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = index < options.length - 1 ? index + 1 : 0;
                options[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = index > 0 ? index - 1 : options.length - 1;
                options[prevIndex].focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                focusedOption.click();
            } else if (e.key === 'Escape') {
                monthDropdown.classList.remove('active');
                monthDropdown.setAttribute('aria-hidden', 'true');
                monthDisplay.setAttribute('aria-expanded', 'false');
                monthDisplay.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!monthSelectContainer.contains(e.target)) {
                monthDropdown.classList.remove('active');
                monthDropdown.setAttribute('aria-hidden', 'true');
                monthDisplay.setAttribute('aria-expanded', 'false');
            }
        });

        monthSelectContainer.append(monthDisplay, monthDropdown);

        selectors.append(yearSelectContainer, monthSelectContainer);

        const arrows = document.createElement('div');
        arrows.classList.add('date-picker-arrows');
        arrows.innerHTML = `
            <div class="arrow left" role="button" aria-label="上個月" tabindex="0"></div>
            <div class="arrow right" role="button" aria-label="下個月" tabindex="0"></div>
        `;

        header.append(selectors, arrows);

        const weekdays = document.createElement('div');
        weekdays.classList.add('date-picker-weekdays');
        ['一', '二', '三', '四', '五', '六', '日'].forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            weekdays.appendChild(dayEl);
        });

        const days = document.createElement('div');
        days.classList.add('date-picker-days');

        datePicker.append(header, weekdays, days);
        advancedSearchDate.appendChild(datePicker);

        positionAdvancedFilters();

        return { datePicker, yearSelect: yearSelectContainer, monthSelect: monthSelectContainer, days, leftArrow: arrows.querySelector('.left'), rightArrow: arrows.querySelector('.right') };
    }

    function renderCalendar(year, month, daysContainer) {
        daysContainer.innerHTML = '';
        const date = new Date(year + 1911, month - 1, 1);
        const firstDay = date.getDay() || 7;
        const lastDate = new Date(year + 1911, month, 0).getDate();
        const prevMonthLastDate = new Date(year + 1911, month - 1, 0).getDate();

        for (let i = firstDay - 1; i >= 1; i--) {
            const day = document.createElement('div');
            day.classList.add('date-picker-day', 'other-month');
            day.textContent = prevMonthLastDate - i + 1;
            day.setAttribute('data-date', `${year}/${month - 1}/${prevMonthLastDate - i + 1}`);
            daysContainer.appendChild(day);
        }

        for (let i = 1; i <= lastDate; i++) {
            const day = document.createElement('div');
            day.classList.add('date-picker-day');
            day.textContent = i;
            day.setAttribute('data-date', `${year}/${month}/${i}`);
            daysContainer.appendChild(day);
        }

        const totalDays = daysContainer.children.length;
        const remainingDays = 35 - totalDays;
        for (let i = 1; i <= remainingDays; i++) {
            const day = document.createElement('div');
            day.classList.add('date-picker-day', 'other-month');
            day.textContent = i;
            day.setAttribute('data-date', `${month === 12 ? year + 1 : year}/${month === 12 ? 1 : month + 1}/${i}`);
            daysContainer.appendChild(day);
        }

        updateSelectedDates(daysContainer);

        const allDays = daysContainer.querySelectorAll('.date-picker-day');
        allDays.forEach(day => {
            day.addEventListener('mouseenter', () => {
                if (selectedStartDate && !selectedEndDate) {
                    allDays.forEach(d => d.classList.remove('preview-range', 'preview-end'));

                    const [y, m, d] = day.getAttribute('data-date').split('/').map(Number);
                    const previewEnd = new Date(y + 1911, m - 1, d);
                    const start = new Date(selectedStartDate.year + 1911, selectedStartDate.month - 1, selectedStartDate.day);

                    if (previewEnd > start) {
                        allDays.forEach(d => {
                            const [dy, dm, dd] = d.getAttribute('data-date').split('/').map(Number);
                            const dDate = new Date(dy + 1911, dm - 1, dd);
                            if (dDate > start && dDate < previewEnd) {
                                d.classList.add('preview-range');
                            } else if (dDate.getTime() === previewEnd.getTime()) {
                                d.classList.add('preview-end');
                            }
                        });
                    }
                }
            });
        });

        daysContainer.addEventListener('mouseleave', () => {
            if (selectedStartDate && !selectedEndDate) {
                allDays.forEach(d => d.classList.remove('preview-range', 'preview-end'));
            }
        });
    }

    function updateSelectedDates(daysContainer) {
        const days = daysContainer.querySelectorAll('.date-picker-day');
        days.forEach(day => {
            day.classList.remove('selected', 'range', 'start', 'end');
            const [y, m, d] = day.getAttribute('data-date').split('/').map(Number);
            const date = new Date(y + 1911, m - 1, d);
            if (selectedStartDate && selectedEndDate) {
                const start = new Date(selectedStartDate.year + 1911, selectedStartDate.month - 1, selectedStartDate.day);
                const end = new Date(selectedEndDate.year + 1911, selectedEndDate.month - 1, selectedEndDate.day);
                if (date.getTime() === start.getTime()) {
                    day.classList.add('selected', 'start');
                } else if (date.getTime() === end.getTime()) {
                    day.classList.add('selected', 'end');
                } else if (date > start && date < end) {
                    day.classList.add('range');
                }
            } else if (selectedStartDate) {
                const start = new Date(selectedStartDate.year + 1911, selectedStartDate.month - 1, selectedStartDate.day);
                if (date.getTime() === start.getTime()) {
                    day.classList.add('selected', 'start');
                }
            }
        });
    }

    if (advancedSearchDate) {
        const { datePicker, yearSelect, monthSelect, days, leftArrow, rightArrow } = createDatePicker();
        const currentDate = new Date();
        const currentROCYear = currentDate.getFullYear() - 1911;
        const currentMonth = currentDate.getMonth() + 1;

        renderCalendar(currentROCYear, currentMonth, days);

        datePicker.querySelector('.date-picker-header').addEventListener('click', (e) => {
            e.stopPropagation();
        });

        advancedSearchDate.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExpanded(advancedSearchDate, advancedSearch);
            datePicker.classList.toggle('active');
            datePicker.setAttribute('aria-hidden', datePicker.classList.contains('active') ? 'false' : 'true');
        });

        leftArrow.addEventListener('click', () => {
            let newMonth = parseInt(monthSelect.querySelector('.month-display').getAttribute('data-value') || currentMonth) - 1;
            let newYear = parseInt(yearSelect.querySelector('.year-display').getAttribute('data-value') || currentROCYear);
            if (newMonth < 1) {
                newMonth = 12;
                newYear--;
            }
            yearSelect.querySelector('.year-display').setAttribute('data-value', newYear);
            yearSelect.querySelector('.year-display').textContent = `${newYear}年`;
            monthSelect.querySelector('.month-display').setAttribute('data-value', newMonth);
            monthSelect.querySelector('.month-display').textContent = `${newMonth}月`;
            renderCalendar(newYear, newMonth, days);
        });

        rightArrow.addEventListener('click', () => {
            let newMonth = parseInt(monthSelect.querySelector('.month-display').getAttribute('data-value') || currentMonth) + 1;
            let newYear = parseInt(yearSelect.querySelector('.year-display').getAttribute('data-value') || currentROCYear);
            if (newMonth > 12) {
                newMonth = 1;
                newYear++;
            }
            yearSelect.querySelector('.year-display').setAttribute('data-value', newYear);
            yearSelect.querySelector('.year-display').textContent = `${newYear}年`;
            monthSelect.querySelector('.month-display').setAttribute('data-value', newMonth);
            monthSelect.querySelector('.month-display').textContent = `${newMonth}月`;
            renderCalendar(newYear, newMonth, days);
        });

        [leftArrow, rightArrow].forEach(arrow => {
            arrow.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    arrow.click();
                }
            });
        });

        days.addEventListener('click', (e) => {
            const day = e.target.closest('.date-picker-day');
            if (!day) return;
            e.stopPropagation();
            const [y, m, d] = day.getAttribute('data-date').split('/').map(Number);
            const selectedDate = { year: y, month: m, day: d };
            const date = new Date(y + 1911, m - 1, d);

            if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
                selectedStartDate = selectedDate;
                selectedEndDate = null;
            } else if (selectedStartDate && !selectedEndDate) {
                const start = new Date(selectedStartDate.year + 1911, selectedStartDate.month - 1, selectedStartDate.day);
                if (date.getTime() < start.getTime()) {
                    selectedEndDate = selectedStartDate;
                    selectedStartDate = selectedDate;
                } else {
                    selectedEndDate = selectedDate;
                }
                advancedSearchDateInput.value = `${selectedStartDate.year}/${String(selectedStartDate.month).padStart(2, '0')}/${String(selectedStartDate.day).padStart(2, '0')} ~ ${selectedEndDate.year}/${String(selectedEndDate.month).padStart(2, '0')}/${String(selectedEndDate.day).padStart(2, '0')}`;
                days.querySelectorAll('.preview-range, .preview-end').forEach(el => el.classList.remove('preview-range', 'preview-end'));
                datePicker.classList.remove('active');
                datePicker.setAttribute('aria-hidden', 'true');
            }
            renderCalendar(parseInt(yearSelect.querySelector('.year-display').getAttribute('data-value') || currentROCYear), parseInt(monthSelect.querySelector('.month-display').getAttribute('data-value') || currentMonth), days);
        });

        document.addEventListener('click', (e) => {
            if (!advancedSearchDate.contains(e.target) && !datePicker.contains(e.target)) {
                datePicker.classList.remove('active');
                datePicker.setAttribute('aria-hidden', 'true');
            }
        });

        days.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const day = e.target.closest('.date-picker-day');
                if (day) {
                    e.preventDefault();
                    day.click();
                }
            }
        });
    }

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
        advancedSearch.classList.add('collapsed');
        advancedSearchDate.setAttribute('aria-expanded', 'true');
        advancedSearch.setAttribute('aria-expanded', 'false');
        advancedSearchDate.setAttribute('role', 'button');
        advancedSearch.setAttribute('role', 'button');
        advancedSearchDate.setAttribute('tabindex', '0');
        advancedSearch.setAttribute('tabindex', '0');

        advancedSearchDate.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExpanded(advancedSearchDate, advancedSearch);
        });

        advancedSearch.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExpanded(advancedSearch, advancedSearchDate);
        });

        document.addEventListener('click', (e) => {
            if (!advancedSearchDate.contains(e.target) && !advancedSearch.contains(e.target)) {
                advancedSearchDate.classList.remove('collapsed');
                advancedSearch.classList.add('collapsed');
                advancedSearchDate.setAttribute('aria-expanded', 'true');
                advancedSearch.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                advancedSearchDate.classList.remove('collapsed');
                advancedSearch.classList.remove('collapsed');
                advancedSearchDate.setAttribute('aria-expanded', 'false');
                advancedSearch.setAttribute('aria-expanded', 'false');
            } else {
                advancedSearchDate.classList.remove('collapsed');
                advancedSearch.classList.add('collapsed');
                advancedSearchDate.setAttribute('aria-expanded', 'true');
                advancedSearch.setAttribute('aria-expanded', 'false');
            }
        });

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
        paginationContainer.innerHTML = '';

        const leftArrow = document.createElement('a');
        leftArrow.classList.add('page-arrow');
        leftArrow.href = '#';
        leftArrow.innerHTML = '<img src="left-arrow.png" alt="Previous">';
        paginationContainer.appendChild(leftArrow);

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                addPageNumber(i, currentPage);
            }
        } else {
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
        const wrap2 = document.querySelector('.wrap-page4');
        if (!leaderPic || !wrap2 || window.innerWidth <= 768) return;

        const paddingX = parseInt(getComputedStyle(wrap2).paddingRight, 10);
        const wrapWidth = wrap2.offsetWidth;
        const viewportWidth = window.innerWidth;
        const marginRight = (viewportWidth - wrapWidth) / 2;

        const rightValue = - (paddingX + marginRight) - 20;
        leaderPic.style.right = `${rightValue}px`;
    }

    updateLeaderPicPosition();
    window.addEventListener('resize', updateLeaderPicPosition);

    function updateNavIconsImages(isWhiteBg) {
    const navIcons = document.querySelectorAll('.nav-icons img:not(#toggleDarkMode img), .hamburger-icon');
    const pageShareIcons = document.querySelectorAll('.page-share-fixed .share-icons img, .share-fixed .share-icons img');
    const openInfoIcons = document.querySelectorAll('.openinfo-box-2 img'); // 新增：選擇 openinfo-box-2 的圖標
    const isDarkMode = document.documentElement.classList.contains('dark');

    // 更新 nav-icons 和 hamburger-icon
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

    // 更新 page-share 和 share-fixed 的圖標
    pageShareIcons.forEach(img => {
        const src = img.getAttribute('src');
        if (!src) {
            console.warn('分享圖標 src 為空:', img);
            return;
        }
        const baseName = src.split('/').pop().replace('.svg', '').replace('_w', '');
        const newSrc = isDarkMode ? `img/${baseName}_w.svg` : `img/${baseName}.svg`;
        console.log(`更新分享圖標: ${src} -> ${newSrc}`);
        img.setAttribute('src', newSrc);
    });

    // 新增：更新 openinfo-box-2 的圖標
    const openInfoLogoMap = {
        'img/linklogo_1.svg': 'img/linklogo_1_w.svg',
        'img/linklogo_2.svg': 'img/linklogo_2_w.svg',
        'img/linklogo_3.svg': 'img/linklogo_3_w.svg'
    };

    openInfoIcons.forEach(img => {
        const src = img.getAttribute('src');
        if (!src) {
            console.warn('openinfo-box-2 圖標 src 為空:', img);
            return;
        }
        let newSrc;
        if (isDarkMode) {
            newSrc = openInfoLogoMap[src] || src; // 夜間模式使用 _w 版本
        } else {
            // 日間模式還原為原始圖標
            const originalSrc = Object.keys(openInfoLogoMap).find(key => openInfoLogoMap[key] === src) || src;
            newSrc = originalSrc;
        }
        console.log(`更新 openinfo-box-2 圖標: ${src} -> ${newSrc}`);
        img.setAttribute('src', newSrc);
    });
}

$(document).ready(function () {
  $('.qa_list').on('click', function (e) {
    e.preventDefault();
    const $this = $(this);

    // 如果已經是 active，收合
    if ($this.hasClass('active-news')) {
      $this.removeClass('active-news');
      $this.next('.news-detail-box').slideUp();
      return;
    }

    // 收起其他展開項目
    $('.qa_list.active-news').removeClass('active-news')
      .next('.news-detail-box').slideUp();

    // 展開目前項目
    $this.addClass('active-news');
    $this.next('.news-detail-box').slideDown();
  });
});

let prevWinSY = 0;
function scrollAdv() {
    const fixedClass = 'advFilter--fixed';

    const handleScroll = () => {
        if (adv2) {
            const adv2Threshold = adv2?.getBoundingClientRect();
            const pagewrap1 = document.querySelector('.pagewrap1');
            const pagewrap1Threshold = pagewrap1?.getBoundingClientRect();

            if (pagewrap1Threshold.top > 86.61) {
                adv2?.classList.remove(fixedClass);
            } else if (adv2Threshold.top < 86.61) {
                adv2?.classList.add(fixedClass);
            } else {
                adv2?.classList.remove(fixedClass);
            }
            updating = false;
        }
    };

    let updating = false;
    window.onscroll = () => {
        if (updating) return;
        else {
            updating = true;
            requestAnimationFrame(handleScroll);
        }
    };
}

window.addEventListener("scroll", scrollAdv);

    // 定義一個常駐打開下拉選單的通用函數
    /**
     * @param {string} buttonId - 要點擊的按鈕 ID ('btnbar1' 或 'join-btnbar1')
     * @param {number} targetIndex - navItems 陣列中的索引 (0-based)
     */
    const openPermanentDropdown = (buttonId, targetIndex) => {
        const button = document.getElementById(buttonId);

        // 確保所有必要變數都已定義
        if (!button || !navItems || !navWrapper || !navMenuContainer || !hamburger) return;

        button.addEventListener('click', (event) => {
            // 阻止所有預設行為 (例如 a 標籤的跳轉)
            event.preventDefault(); 
            event.stopPropagation(); 
            
            const targetItem = navItems[targetIndex];
            if (!targetItem) return;

            const dropdownMenuFull = targetItem.querySelector('.dropdown-menu-full');
            if (!dropdownMenuFull) return;

            // 1. 關閉所有其他下拉選單 (模擬單獨開啟)
            navItems.forEach((item, index) => {
                if (index !== targetIndex) {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-menu-full')?.classList.remove('active');
                    item.setAttribute('aria-expanded', 'false');
                    item.querySelector('.dropdown-menu-full')?.setAttribute('aria-hidden', 'true');
                }
            });
            
            // 2. 切換目標下拉選單的開啟狀態
            const isActive = targetItem.classList.contains('active');
            
            if (isActive) {
                // 如果已經打開，就關閉它
                targetItem.classList.remove('active');
                dropdownMenuFull.classList.remove('active');
                targetItem.setAttribute('aria-expanded', 'false');
                dropdownMenuFull.setAttribute('aria-hidden', 'true');

                // 關閉電腦版 overlay 和手機版菜單
                overlay?.classList.remove('active'); 
                menuOverlay?.classList.remove('show');
                navWrapper?.classList.remove('hovered', 'active');
                // 假設 updateLogoColor 函式已存在並可使用
                if (typeof updateLogoColor === 'function') {
                     updateLogoColor(false);
                }
            } else {
                // 如果是關閉的，就打開它
                targetItem.classList.add('active');
                dropdownMenuFull.classList.add('active');
                targetItem.setAttribute('aria-expanded', 'true');
                dropdownMenuFull.setAttribute('aria-hidden', 'false');

                // 3. 處理電腦版 (寬螢幕 > 991px)
                if (window.innerWidth > 991) { 
                    overlay?.classList.add('active');
                    navWrapper?.classList.add('hovered', 'scrolled');
                    if (typeof updateLogoColor === 'function') {
                        updateLogoColor(true); 
                    }
                } 
                // 4. 處理手機版 (寬螢幕 <= 991px)
                else {
                    // 如果手機版主選單是關閉的，模擬點擊漢堡選單打開它
                    if (!navMenuContainer.classList.contains('active')) {
                        hamburger.click(); 
                    }
                    navWrapper?.classList.add('active', 'scrolled');
                    // 確保手機版不啟用 overlay (電腦版專用)
                    overlay?.classList.remove('active'); 
                }
            }
        });
    };

    // 呼叫函式
    // 根據 HTML 結構確認：
    // "便民服務" 是導覽列的第 4 個 .nav-item (索引 3)
    openPermanentDropdown('btnbar1', 3);

    // "資訊服務" 是導覽列的第 5 個 .nav-item (索引 4)
    openPermanentDropdown('btnbar2', 1);

    document.addEventListener('DOMContentLoaded', () => {
        // 選擇所有要觸發下拉選單的標題
        const dropdownToggles = document.querySelectorAll('.col-md-2 strong');

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (event) => {
                // 找到父層的 .col-md-2 元素
                const parentCol = toggle.closest('.col-md-2');
                if (parentCol) {
                    // 切換 .active 類別
                    parentCol.classList.toggle('active');
                }
            });
        });
    });


// 確保所需的元素都存在才執行 Modal 邏輯
if (teamItems.length > 0 && modalCloseBtns.length > 0 && menuOverlay) {
    
 // 關閉 Modal 的統一函式
    const closeModal = (currentModal) => {
        if (!currentModal || !currentModal.classList.contains('team-modal')) return; 
        
        currentModal.classList.remove('active');
        currentModal.setAttribute('aria-hidden', 'true');

        // 檢查：如果沒有其他 Modal 處於開啟狀態，才關閉 menu-overlay
        const activeModals = document.querySelectorAll('.team-modal.active');
        if (activeModals.length === 0) {
            // 【重要】直接操作元素，而不是依賴頂部變數
            document.querySelector('.menu-overlay')?.classList.remove('show'); 
        }
        document.body.style.overflow = ''; 
    };
    
    
    // 1. 點擊 Team Item 打開對應的 Modal
    teamItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 透過 data-modal-target 屬性取得目標 Modal 的 ID 選擇器
            const targetSelector = item.getAttribute('data-modal-target');
            if (!targetSelector) return; 
            
            const targetModal = document.querySelector(targetSelector);
            if (!targetModal) return;

            // 使用 menuOverlay 變數來新增 'show' 類別
            menuOverlay?.classList.add('show');

            document.querySelectorAll('.team-modal.active').forEach(m => m.classList.remove('active'));

            // 顯示目標 Modal 視窗並設定 ARIA 屬性
            targetModal.classList.add('active');
            targetModal.setAttribute('aria-hidden', 'false');
            
            if (menuOverlay) { // 增加一個檢查，確保變數存在
                            modalDimmer.classList.add('show');
                        }
            
            // 禁用 body 捲動
            document.body.style.overflow = 'hidden';
            
            // 讓該 Modal 的關閉按鈕獲得焦點
            targetModal.querySelector('.modal-close-btn')?.focus();
        });
    });

    // 2. 點擊所有關閉按鈕 (X)
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 找到按鈕所屬的 modal 元素
            const currentModal = e.target.closest('.team-modal');
            closeModal(currentModal);
        });
    });

}

    });