

function homePageLoading() {
    let percent = 0;
    const percentageText = document.querySelector('.percentageNum');
    const progressLine = document.querySelector('.progress-line');

    const interval = setInterval(() => {
      if (percent >= 100) {
        clearInterval(interval);
        document.querySelector('.loading-screen').style.opacity = 0;
        document.querySelector('.loading-screen').style.transition = 'opacity 1s';

        setTimeout(() => {
          document.querySelector('.loading-screen').style.display = 'none';
          const main = document.querySelector('.main-content');
          main.classList.add('show-main');

          setTimeout(() => { 
            document.querySelector('.nav-wrapper').classList.add('animate-in-nav-wrapper');
          }, 300);
          setTimeout(() => {
            document.querySelector('.floating-block').classList.add('animate-in-floating-block');
          }, 300);
          setTimeout(() => {
          const wrapItems = document.querySelectorAll(".wrap");
          wrapItems.forEach((item) => {
            item.classList.add('animate-in-wrap');
          });
          setTimeout(() => {
            document.querySelector('.circle-button').classList.add('animate-in-circle-button');
          }, 300);
          }, 300);

        }, 1000);
      } else {
        percent += 1;
        //percentageText.textContent = `載入中... ${percent}%`;
        percentageText.textContent = `${percent}`;
        //progressLine.style.width = `${percent}%`;
      }
    }, 30);
}


function ContentPageLoading() {
    let percent = 0;
    const percentageText = document.querySelector('.percentageNum');
    const progressLine = document.querySelector('.progress-line');

    const interval = setInterval(() => {
      if (percent >= 100) {
        clearInterval(interval);
        document.querySelector('.loading-screen').style.opacity = 0;
        document.querySelector('.loading-screen').style.transition = 'opacity 1s';

        setTimeout(() => {
          document.querySelector('.loading-screen').style.display = 'none';
          const main = document.querySelector('.main-content');
          main.classList.add('show-main');

          setTimeout(() => { 
            document.querySelector('.nav-wrapper').classList.add('animate-in-nav-wrapper');
          }, 300);
        //   setTimeout(() => {
        //     document.querySelector('.floating-block').classList.add('animate-in-floating-block');
        //   }, 300);
          setTimeout(() => {
          const wrapItems = document.querySelectorAll(".wrap");
          wrapItems.forEach((item) => {
            item.classList.add('animate-in-wrap');
          });
        //   setTimeout(() => {
        //     document.querySelector('.circle-button').classList.add('animate-in-circle-button');
        //   }, 300);
          }, 300);

        }, 1000);
      } else {
        percent += 1;
        //percentageText.textContent = `載入中... ${percent}%`;
        percentageText.textContent = `${percent}`;
        //progressLine.style.width = `${percent}%`;
      }
    }, 30);
}


