export class PlaylistView {
    constructor(container, tracks, onSelect) {
        this.container = container;
        this.tracks = tracks;
        this.onSelect = onSelect;
        this.active = 0;
    }

    render() {
        this.container.innerHTML = '';
        this.tracks.forEach((t, i) => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'row';
            row.innerHTML = `<div class="idx">${i + 1}</div><div class="trackTitle">${t.title}</div><div class="small">Play</div>`;
            row.addEventListener('click', () => this.onSelect(i));
            this.container.appendChild(row);
        });
        this.syncActive();
    }

    setActive(i) {
        this.active = i;
        this.syncActive();
    }

    syncActive() {
        [...this.container.children].forEach((el, k) => el.classList.toggle('active', k === this.active));
    }
}