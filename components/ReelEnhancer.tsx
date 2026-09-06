'use client';

import { useEffect } from 'react';

export function ReelEnhancer() {
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video'));
    const captions = ['See the Helmet in Action', 'Comfort, Fit & Protection'];
    videos.forEach((video, index) => {
      video.controls = false;
      video.poster = '/products/helmet-sports-collage.png';
      const source = video.querySelector('source');
      if (source && !source.src.includes('#t=')) source.src = `${source.src}#t=0,25`;
      video.load();
      const card = video.parentElement;
      if (!card || card.querySelector('.reel-overlay')) return;
      card.classList.add('reel-card');
      const caption = card.querySelector('p');
      if (caption) caption.textContent = captions[index] || 'See the Helmet in Action';
      const play = document.createElement('button');
      play.type = 'button'; play.className = 'reel-overlay'; play.setAttribute('aria-label', `Play video ${index + 1}`); play.innerHTML = '▶';
      play.addEventListener('click', () => { video.controls = true; play.hidden = true; void video.play(); });
      video.addEventListener('play', () => { video.controls = true; play.hidden = true; });
      card.appendChild(play);
    });
    const section = videos[0]?.closest('section');
    const heading = section?.querySelector('h2');
    if (heading && section && !section.querySelector('.reel-intro')) heading.insertAdjacentHTML('afterend', '<p class="reel-intro">Explore the helmet up close and see it in everyday play.</p>');
  }, []);
  return null;
}
