const Skill = [
  {
    major: "Front-End",
    skills: [
      {
        name: "HTML5",
        link: "https://www.w3.org/html/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/html.png",
      },
      {
        name: "CSS3",
        link: "https://www.w3schools.com/css/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/css.png",
      },
      {
        name: "JavaScript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/js.png",
      },
      {
        name: "Bootstrap",
        link: "https://getbootstrap.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/bs.png",
      },
      {
        name: "Tailwind.css",
        link: "https://tailwindcss.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/tw.png",
      },
      {
        name: "Jekyll",
        link: "https://jekyllrb.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/jekyll.png",
      },
      {
        name: "Svelte.js",
        link: "https://svelte.dev/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/svelte.png",
      },
      {
        name: "Canvas.js",
        link: "https://canvasjs.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/canvas.png",
      },
      {
        name: "Hexo",
        link: "https://hexo.io/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/hexo.png",
      },
      {
        name: "React.js",
        link: "https://reactjs.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/react.png",
      },
      {
        name: "Vue.js",
        link: "https://vuejs.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/vue.js.png",
      },
      {
        name: "Nuxt.js",
        link: "https://nuxtjs.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/nuxt.png",
      },
      {
        name: "Pug",
        link: "https://pugjs.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/pug.png",
      },
    ],
  },
  {
    major: "Languages",
    skills: [
      {
        name: "Typescript",
        link: "https://typescriptlan.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/ts.png",
      },
      {
        name: "C Lang",
        link: "https://www.cprogramming.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/c.png",
      },
    ],
  },
  {
    major: "Back-End",
    skills: [
      {
        name: "node.js",
        link: "https://nodejs.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/node.png",
      },
      {
        name: "express.js",
        link: "https://expressjs.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/express.png",
      },
      {
        name: "PHP",
        link: "https://php.net/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/php.png",
      },
    ],
  },
  {
    major: "Databases",
    skills: [
      {
        name: "MongoDB",
        link: "https://mongodb.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/mongo.png",
      },
      {
        name: "MySQL",
        link: "https://mysql.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/mysql.png",
      },
    ],
  },
  {
    major: "Mobile & Desktop",
    skills: [
      {
        name: "ionic",
        link: "https://ionicframwork.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/ionic.png",
      },
      {
        name: "Electron",
        link: "https://www.electronjs.org/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/electron.png",
      },
    ],
  },
  {
    major: "Tools",
    skills: [
      {
        name: "Docker",
        link: "https://www.docker.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/docker.png",
      },
      {
        name: "Puppeteer",
        link: "https://github.com/puppeteer/puppeteer",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/puppet.png",
      },
      {
        name: "Git",
        link: "https://git-scm.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/git.png",
      },
      {
        name: "Figma",
        link: "https://figma.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/figma.png",
      },
      {
        name: "Postman",
        link: "https://postman.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/postman.png",
      },
      {
        name: "Zapier",
        link: "https://zapier.com/",
        img: "https://cdn.jsdelivr.net/gh/dont-tattled-on-me/dont-icon@latest/src/zap.png",
      },
    ],
  },
];

const skillLoader = () => {
  const techElement = document.querySelector("#tech-stats-list");

  for (let i = 0; i < Skill.length; i++) {
    for (let j = 0; j < Skill[i].skills.length; j++) {
      const Template = `<a href="${Skill[i].skills[j].link}" target="_blank" class="tech-icon" style="background: url(${Skill[i].skills[j].img})"></a>`;

      techElement.innerHTML += Template;
    }
  }
};