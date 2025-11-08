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
  
  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;
  
    if (diff <= 0) {
      timerDisplay.textContent = "Countdown Ended: 0 Days Left";
      if (verifyBtn) {
        verifyBtn.disabled = true;
      }
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
  
  // Handle Verify button
  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value.trim();
      if (!email) {
        alert("Please enter your email address");
        return;
      }
      window.location.href = "not-eligible.html";
    });
  }