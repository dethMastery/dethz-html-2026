const Education = [
  {
    id: 0,
    grade: "Grade 1 - 6",
    class: "",
    school: "Darasamutr Sriracha School",
    year: "2005-2014",
  },
  {
    id: 1,
    grade: "Grade 7-9",
    class: "MEP",
    school: "Sriracha School",
    year: "2014 - 2018",
  },
  {
    id: 2,
    grade: "Grade 10",
    class: "Sci - Math",
    school: "Piboonbumpen Demonstration School",
    year: "2018 - 2019",
  },
  {
    id: 3,
    grade: "Grade 11 - 12",
    class: "Sci - Math",
    school: "Darasamutr Sriracha School",
    year: "2019 - 2021",
  },
  {
    id: 4,
    grade: "Bachelor's degree",
    class: "Computer Engineering",
    school: "Phayao University",
    year: "2021 - 2024",
  },
  {
    id: 5,
    grade: "Bachelor's degree",
    class: "Information Technology",
    school: "Sripatum University Chonburi District",
    year: "2024 - Now",
  },
];

const revData = Education.reverse();

const cardLoop = (data) => {
  return `<div class="edu-card" id="edu-${data.id}">
  <div class="timeline-dot"></div>
  <div class="edu-content">
    <h3 class="school">${data.school}</h3>
    ${data.class != "" ? `<p class="school-class">${data.class}</p>` : ""}
    <p class="info">
      <span class="grade">${data.grade}</span> · <span class="year">${data.year}</span>
    </p>
  </div>
</div>`;
};

const eduLoader = () => {
  const EduElement = document.querySelector("#user-edu");

  for (let i = 0; i < Education.length; i++) {
    let data = revData[i];

    const Template = `<div class="edu-container" id="edu-${data.id}">
  <p class="grade">
    ${data.grade}
  </p>
  <h1 class="school">
    ${data.school}
  </h1>
  ${data.class != "" ? `<p class="school-class">${data.class}</p>` : ""}
  <p class="year">
    ${data.year}
  </p>
</div>`;

    EduElement.innerHTML += Template;
  }
};

const initTimelineDrag = () => {
  const container = document.querySelector(".education-container");
  if (!container) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let velX = 0;
  let momentumID = null;

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("is-dragging");
    container.style.scrollBehavior = "auto";
    startX = e.pageX;
    scrollLeft = container.scrollLeft;
    velX = 0;
    cancelAnimationFrame(momentumID);
  });

  const stopDrag = () => {
    if (!isDown) return;
    isDown = false;
    container.classList.remove("is-dragging");

    const momentum = () => {
      if (Math.abs(velX) > 0.5) {
        container.scrollLeft += velX;
        velX *= 0.95;
        momentumID = requestAnimationFrame(momentum);
      } else {
        container.style.scrollBehavior = "";
      }
    };
    momentumID = requestAnimationFrame(momentum);
  };

  container.addEventListener("mouseleave", stopDrag);
  window.addEventListener("mouseup", stopDrag);

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    const prevScroll = container.scrollLeft;
    container.scrollLeft = scrollLeft - walk;
    velX = (scrollLeft - walk) - prevScroll;
  });
};

