document.addEventListener('DOMContentLoaded', function () {
    let blogList = document.querySelector('.main__blub-blog ul');
    let blogScrollTrack = document.querySelector('.main__blub-scrollbar-track');
    let blogScrollThumb = document.querySelector('.main__blub-scrollbar-thumb');

    function updateThumbPosition() {
        let scrollFraction = blogList.scrollTop / (blogList.scrollHeight - blogList.clientHeight);
        let maxThumbTop = blogScrollTrack.clientHeight - blogScrollThumb.clientHeight;
        blogScrollThumb.style.top = scrollFraction * maxThumbTop + 'px';
    }

    blogScrollThumb.addEventListener('pointerdown', function (e) {
        let startY = e.clientY || e.touches[0].clientY;
        let startTop = parseInt(window.getComputedStyle(blogScrollThumb).top, 10);
        let maxThumbTop = blogScrollTrack.clientHeight - blogScrollThumb.clientHeight;

        function onMouseMove(e) {
            let currentY = e.clientY || e.touches[0].clientY;
            let deltaY = currentY - startY;
            let newTop = Math.min(maxThumbTop, Math.max(0, startTop + deltaY));
            blogScrollThumb.style.top = newTop + 'px';

            let scrollFraction = newTop / maxThumbTop;
            blogList.scrollTop = scrollFraction * (blogList.scrollHeight - blogList.clientHeight);
            
            updateThumbPosition(); // Обновляем позицию thumb после перемещения
        }

        function onMouseUp() {
            document.removeEventListener('pointermove', onMouseMove);
            document.removeEventListener('pointerup', onMouseUp);
        }

        document.addEventListener('pointermove', onMouseMove);
        document.addEventListener('pointerup', onMouseUp);
        e.preventDefault();
    });

    blogList.addEventListener('scroll', updateThumbPosition);

    // Инициализация позиции скроллбара при загрузке страницы
    updateThumbPosition();
});

let languageBtn = document.querySelector('.header__language-btn')
let languageBtnText = document.querySelector('.header__language-text')

languageBtn.addEventListener('click', () => {
    if (languageBtnText.textContent === 'ru') {
        languageBtnText.textContent = 'en'
    } else {
        languageBtnText.textContent = 'ru'
    }
})
