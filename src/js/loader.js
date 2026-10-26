const unHide = (element, time) => {
  time = (time === undefined) | (time === null) ? 1 : time;

  window.setTimeout(() => {
    element.classList.remove("hidden");
  }, 1000 * time);

  window.setTimeout(
    () => {
      element.classList.remove("hide");
    },
    1000 * time + 500,
  );
};

window.setTimeout(() => {
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".backdrop").classList.remove("hidden");
}, 1000);

window.setTimeout(() => {
  document.querySelector(".container").classList.remove("hide");
  document.querySelector(".backdrop").classList.remove("hide");
  document.querySelector(".protect").classList.add("hidden");
}, 1500);

// User Loader
(() => {
  const element = document.querySelector("#user-data");

  // User Image
  element.innerHTML += `<div class="user-image">
  <div class="image" style="background: url(${userData.image});"></div>
</div>`;

  // User Data
  const info = `<div class="user-info">
  <h2>${userData.name}</h2>
  <div class="sub">
    ${userData.subText.map((data) => `<p>${data}</p>`).join("")}
  </div>
  <!-- contacts -->
  <div class="contacts-container" id="user-contacts">
    ${contacts.map((contact) => contactLoop(contact)).join("")}
  </div>
</div>`;
  const block = info;
  element.innerHTML += `<div class="data-user">${block}</div>`;

  unHide(element, 1.5);
})();

(() => {
  const element = document.querySelector("#user-detail");

  const userInfo = `<div class="description">
  <p>&nbsp;&nbsp;${userData.desp}</p>
</div>`;

  const cardItem = userData.details
    .map((data) => {
      let value = data.value;

      if (data.floor === "Birth Date") {
        const date = new Date(Number(data.value));
        const age = new Date().getFullYear() - date.getFullYear();
        value = `${date.getDate()} ${mS[date.getMonth()]}. ${date.getFullYear()} (${age} years old now)`;
      }

      if (data.floor === "Interview Availability") {
        if (data.value) {
          value = `Yes`;
        }
      }

      return `<div class="card">
      <p class="floor">${data.floor}</p>
      <p class="value">${value}</p>
    </div>`;
    })
    .join("");

  const cardContainer = `<div class="card-container">${cardItem}</div>`;

  element.innerHTML = userInfo + cardContainer + "";

  (() => {
    window.document.querySelectorAll("#user-detail > *").forEach((e) => {
      e.classList.add("hidden");
      e.classList.add("hide");
    });

    window.setTimeout(() => {
      element.classList.remove("hidden");
    }, 1000 * 2);

    window.setTimeout(
      () => {
        element.classList.remove("hide");
        window.document.querySelectorAll("#user-detail > *").forEach((e) => {
          e.classList.remove("hidden");
        });
      },
      1000 * 2 + 500,
    );

    window.setTimeout(
      () => {
        window.document.querySelectorAll("#user-detail > *").forEach((e) => {
          e.classList.remove("hide");
        });
      },
      1000 * 2 + 1000,
    );
  })();
})();
