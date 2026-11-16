# deth'z Homepage (2026 Remake)

Personal portfolio site for Suphakit Pinyoworapot (Joji). Static HTML/CSS/JS, no build step, no dependencies.

## Run

Serve the repo root over HTTP (absolute `/src/...` paths need a server):

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html                 entry; loads switcher, bg-mode, ascii, data, socket, animation, loader
src/
  css/main.css             global styles; parts/ split by section
  img/                     profile, github, mail, x
  js/
    switcher.js            view/theme switching
    bg-mode.js             background mode
    ascii.js               ascii-art render
    animation.js           intro animation
    loader.js              active loader (loader.old.js is retired)
    socket/                components + discord widget
    data/                  content lives here, one file per section
  video/output.webm        intro background video
favicon.png
```

## Edit content

All site content is plain data in `src/js/data/`:

- `user.js` — name, bio, details
- `contact.js` — contact links
- `education.js` — education
- `skill.js` — skills
- `works.js` — portfolio works

Edit the JS objects; markup renders from them. No rebuild needed, just refresh.

## Notes

- `output.webm` is a large asset; keep it out of git if the repo size matters.
- Video is `autoplay loop muted playsinline`; a Skip button covers the intro.