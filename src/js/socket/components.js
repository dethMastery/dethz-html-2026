const discordComponent = (data) => {
  const innerElement = document.querySelector("#discord-status");

  if (data.listening_to_spotify) {
    if (data.spotify !== null && data.spotify !== undefined) {
      const spt = data.spotify;

      const uri = `https://open.spotify.com/track/${spt.track_id}`;

      const template = `<div class="spotify">
  <div class="cover-img" style="background: url(${spt.album_art_url});"></div>
  <div class="song-data">
    <a href="${uri}" target="_blank" class="song-name">${spt.song}</a>
    <p class="song-artist">${spt.artist}</p>
    <p class="song-album">${spt.album}</p>
  </div>
</div>`;

      innerElement.innerHTML = template;
    }
  } else {
    innerElement.innerHTML = "";
  }
};
