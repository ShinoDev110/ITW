// Simple audio wrapper
export class AudioPlayer {
    constructor(audioEl) {
        this.audio = audioEl;
    }

    load(track) {
        this.audio.src = track.url;
    }

    play() {
        return this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    toggle() {
        this.audio.paused ? this.play() : this.pause();
    }

    setVolume(v) {
        this.audio.volume = v;
    }

    seekByRatio(r) {
        if (isFinite(this.audio.duration)) this.audio.currentTime = r * this.audio.duration;
    }

    onTimeUpdate(cb) {
        this.audio.addEventListener('timeupdate', () => cb(this.progress()));
    }

    onEnded(cb) {
        this.audio.addEventListener('ended', cb);
    }

    progress() {
        const cur = this.audio.currentTime || 0;
        const dur = this.audio.duration || 0;
        const ratio = dur ? cur / dur : 0;
        return {cur, dur, ratio};
    }
}