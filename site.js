const serverIpElement = document.getElementById("server-ip");
const copyStatus = document.getElementById("copy-status");
const copyButtons = document.querySelectorAll("#copy-ip, #copy-ip-large");
const applicationForm = document.getElementById("application-form");
const formMessage = document.getElementById("form-message");
const yearElement = document.getElementById("year");
const promoRankCards = document.querySelectorAll(".promo-rank-card");

async function copyIp() {
  if (!serverIpElement || !copyStatus) {
    return;
  }

  try {
    await navigator.clipboard.writeText(serverIpElement.textContent.trim());
    copyStatus.textContent = "Server IP copied. See you in Minecherry.";
  } catch (error) {
    copyStatus.textContent = "Clipboard copy failed. Please copy the IP manually.";
  }
}

copyButtons.forEach((button) => {
  button.addEventListener("click", copyIp);
});

promoRankCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });
});

if (applicationForm && formMessage) {
  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const age = Number(document.getElementById("age").value);
    const email = document.getElementById("email").value.trim();
    const discord = document.getElementById("discord").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const serverIp = "playminecherry.aternos.me";

    if (age < 15) {
      formMessage.textContent = "Applicants must be at least 15 years old.";
      return;
    }

    if (reason.length < 20) {
      formMessage.textContent = "Please write at least 20 characters explaining why you want to be staff.";
      return;
    }

    const subject = encodeURIComponent("Minecherry Staff Application - " + username);
    const body = encodeURIComponent(
      "Minecherry Staff Application\n\n" +
      "Minecraft IGN: " + username + "\n" +
      "Age: " + age + "\n" +
      "Email Address: " + email + "\n" +
      "Discord Tag: " + discord + "\n" +
      "Server IP: " + serverIp + "\n\n" +
      "Why do you want to be staff?\n" +
      reason + "\n"
    );

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=infinable7@gmail.com&su=" +
      subject +
      "&body=" +
      body;

    formMessage.textContent = "Opening Gmail with your application.";
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  });
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
