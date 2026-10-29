const works = [
  {
    id: 1,
    name: "katzu-git",
    link: "https://github.com/katzEco/katzu-git",
    lang: "Typescript, bun",
    desp: "super lazy git wrapper",
  },
  {
    id: 2,
    name: "Darken-World",
    link: "https://github.com/dethMastery/Darken-World",
    lang: "",
    desp: "Just a darkening world",
  },
  {
    id: 3,
    name: "daeg-arai-dee",
    link: "https://github.com/dethMastery/daeg-arai-dee",
    lang: "React.js, Vite.js, Typescript",
    desp: "The easier way for anyone who too lazy to pick what to eat.",
  },
  {
    id: 4,
    name: "ezServe",
    link: "https://github.com/katzEco/ez-serve",
    lang: "Typescript, express.js",
    desp: "npm package to wrapping over express.js serve",
  },
  {
    id: 5,
    name: "dethz-crawler",
    link: "https://github.com/dethMastery/dethz-crawler",
    lang: "TypeScript, Playwirght, Bun",
    desp: "Fast, lightweight CLI tool to pull SKILL.md (skills) and rules from GitHub directly into your local project.",
  },
  {
    id: 6,
    name: "simple-donate",
    link: "https://github.com/kizuna-inc/simple-donate",
    lang: "TypeScript, Bun, Hono, React.js, Vite.js, Nitro",
    desp: "A lightweight, self-hosted donation platform with a focus on speed, simplicity and extensibility.",
  },
];

const workLoader = () => {
  const workElement = document.querySelector("#user-works");

  for (let i = 0; i < works.length; i++) {
    let lang = "";

    if (works[i].lang != "") {
      if (works[i].lang.includes(",")) {
        let temp = works[i].lang.split(",");

        for (let j = 0; j < temp.length; j++) {
          lang += `<span class="works-lang-badge">${temp[j]}</span>`;
        }
      } else {
        lang = `<span class="works-lang-badge">${works[i].lang}</span>`;
      }
    }

    const Template = `<a
  target="_blank"
  class="work-container"
  href="${works[i].link}"
>
  <div class="text-container">
    <h2 class="work-name">${works[i].name}</h2>
    <p class="work-desp">${works[i].desp}</p>
    ${
      lang != ""
        ? `
    <div class="work-lang-container">${lang}</div>
    `
        : ""
    }
  </div>
</a>
`;

    workElement.innerHTML += Template;
  }
};
