const contacts = [
  {
    floor: "Github",
    value: "https://github.com/dethMastery|dethMastery",
  },
  {
    floor: "X (Formerly Twitter)",
    value: "https://x.com/georgeKdeterk|@georgeKdeterk",
  },
  {
    floor: "E-Mail",
    value: "mailto:pinyoworapot@suphakit.net|pinyoworapot@suphakit.net",
  },
];

const contactLoop = (contact) => {
  return `<a class="contacts-container" href="${contact.value.split("|")[0]}" target="_blank">
      <img class="contact-icon" src="${contact.floor === "Github" ? "/src/img/github.svg" : contact.floor === "X (Formerly Twitter)" ? "/src/img/x.svg" : contact.floor === "E-Mail" ? "/src/img/mail.svg" : ""}" alt="${contact.floor}" />
    </a>`;
};

const contactLoad = () => {
  const contactElement = document.querySelector("#user-contacts");

  for (let i = 0; i < contacts.length; i++) {
    const template = `<a class="contacts-container" href="${
      contacts[i].value.split("|")[0]
    }" target="_blank">
  <div class="text-container">
    <p class="contact-link">
      ${contacts[i].value.split("|")[1]}
    </p>
    <p class="contact-floor">
      ${contacts[i].floor}
    </p>
  </div>
</a>`;

    contactElement.innerHTML += template;
  }
};
