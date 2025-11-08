document.addEventListener("DOMContentLoaded", () => {
  // Store deployment date the first time the app loads
  if (!localStorage.getItem("deployDate")) {
    const deployDate = new Date(); // deployment start date
    localStorage.setItem("deployDate", deployDate.toISOString());
  }

  const deployDate = new Date(localStorage.getItem("deployDate"));
  const countdownDays = 30;
  const endDate = new Date(deployDate);
  endDate.setDate(deployDate.getDate() + countdownDays);

  const timerDisplay = document.getElementById("timer");
  const verifyBtn = document.getElementById("verifyBtn");
  const processingScreen = document.getElementById("processing-screen");
  const container = document.querySelector(".container");
  const emailInput = document.getElementById("email");

  // Function to validate email
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Countdown function
  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      timerDisplay.textContent = "Countdown Ended: 0 Days Left";
      if (verifyBtn) verifyBtn.disabled = true;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerDisplay.textContent = `Time Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    setTimeout(updateCountdown, 1000);
  }

  updateCountdown();

  // Enable/disable verify button based on email input
  emailInput.addEventListener("input", () => {
    verifyBtn.disabled = !isValidEmail(emailInput.value.trim());
  });

  // Handle Verify button click
  verifyBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Hide container completely with fade effect
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.display = "none";

      // Show only the processing screen
      processingScreen.style.display = "flex";
    }, 300); // fade-out duration

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "not-eligible.html";
    }, 2000);
  });
});
