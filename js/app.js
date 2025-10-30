import {AudioPlayer} from './player.js';
import {PlaylistView} from './playlist.js';
import {ControlsView} from './controls.js';
import {SeekBar} from './seekbar.js';

const artist = 'Icy Trunks';
const tracks = [
    {title: 'Trill K - Screaming Wooh (prod. Icy Trunks)', url: '/assets/audio/TK_SW.mp3', cover: '/assets/thumbnails/TK_SW.png'},
    {title: '18Veno type beat - Nintendo (prod. Icy Trunks)', url: '/assets/audio/IT_NIN.mp3', cover: '/assets/thumbnails/IT_NIN.png'}
];

// Helpers
const $ = (s, p = document) => p.querySelector(s);
const fmt = t => {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
};

// DOM
$('#artistName').textContent = artist;
$('#artistName2').textContent = artist;
$('#year').textContent = new Date().getFullYear();
const audioEl = $('#audio');
const nowTitle = $('#nowTitle');
const nowMeta = $('#nowMeta');
const cover = $('#cover');
const cur = $('#cur');
const dur = $('#dur');

// Modules
const player = new AudioPlayer(audioEl);
const playlist = new PlaylistView($('#list'), tracks, (i) => selectTrack(i, true));
const controls = new ControlsView(
    {playBtn: $('#play'), prevBtn: $('#prev'), nextBtn: $('#next'), volumeInput: $('#volume')},
    {
        onPlay: () => {
            player.toggle();
        },
        onPrev: () => selectTrack(activeIndex - 1, true),
        onNext: () => selectTrack(activeIndex + 1, true),
        onVolume: (v) => player.setVolume(v),
    }
);

audioEl.addEventListener('play', () => controls.setPlaying(true));
audioEl.addEventListener('pause', () => controls.setPlaying(false));
audioEl.addEventListener('error', () => {
    console.error('Audio error', audioEl.error);
    controls.setPlaying(false);
});
const seekbar = new SeekBar($('#seek'), $('#fill'), (ratio) => player.seekByRatio(ratio));

let activeIndex = 0;

function selectTrack(i, autoplay = false) {
    activeIndex = (i + tracks.length) % tracks.length;
    const tr = tracks[activeIndex];
    player.load(tr);
    nowTitle.textContent = tr.title;
    nowMeta.textContent = `${activeIndex + 1} / ${tracks.length}`;
    cover.style.backgroundImage = tr.cover ? `url('${tr.cover}')` : '';
    playlist.setActive(activeIndex);
    if (autoplay) {
        player.play();
        controls.setPlaying(true);
    }
}

player.onTimeUpdate(({cur: ct, dur: dt, ratio}) => {
    cur.textContent = fmt(ct);
    dur.textContent = fmt(dt);
    seekbar.update(ratio);
});
player.onEnded(() => selectTrack(activeIndex + 1, true));

playlist.render();
selectTrack(0, false);
player.setVolume(+$('#volume').value);
