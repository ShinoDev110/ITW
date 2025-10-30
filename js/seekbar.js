export class SeekBar {
    constructor(barEl, fillEl, onSeek) {
        this.bar = barEl;
        this.fill = fillEl;
        this.dragging = false;
        this.onSeek = onSeek;
        const setFrom = (clientX) => {
            const r = this.bar.getBoundingClientRect();
            const x = Math.min(Math.max(0, clientX - r.left), r.width);
            this.onSeek(x / r.width);
        };
        this.bar.addEventListener('mousedown', e => {
            this.dragging = true;
            setFrom(e.clientX);
        });
        window.addEventListener('mousemove', e => {
            if (this.dragging) setFrom(e.clientX);
        });
        window.addEventListener('mouseup', () => {
            this.dragging = false;
        });
    }

    update(ratio) {
        this.fill.style.inset = `0 ${100 - (ratio * 100)}% 0 0`;
    }
}