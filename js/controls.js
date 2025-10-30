export class ControlsView {
    constructor({playBtn, prevBtn, nextBtn, volumeInput}, {onPlay, onPrev, onNext, onVolume}) {
        this.playBtn = playBtn;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.volumeInput = volumeInput;
        playBtn.addEventListener('click', onPlay);
        prevBtn.addEventListener('click', onPrev);
        nextBtn.addEventListener('click', onNext);
        volumeInput.addEventListener('input', () => onVolume(+volumeInput.value));
    }

    setPlaying(isPlaying) {
        this.playBtn.textContent = isPlaying ? '⏸' : '▶';
    }
}