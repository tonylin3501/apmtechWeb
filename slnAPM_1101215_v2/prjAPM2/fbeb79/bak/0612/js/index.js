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