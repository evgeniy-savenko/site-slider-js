export default class VideoPlayer {
    constructor(triggers, overplay) {
        this.btns = document.querySelectorAll(triggers); 
        this.overplay = document.querySelector(overplay); 
        this.close = this.overplay.querySelector('.close'); 
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overplay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url'); 
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overplay.style.display = 'none';
            this.player.pauseVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', { 
            height: '100%',
            width: '100%',
            videoId: `${url}`
        });
        this.overplay.style.display = 'flex';
    }

    init() {
        const tag = document.createElement('script'); 
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0]; 
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}