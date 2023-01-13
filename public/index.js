const toggle = document.getElementById("dark-mode-toggle");

// Check if the user has previously selected dark mode
const darkMode = localStorage.getItem("darkMode");

if (darkMode === "true") {
  document.body.classList.add("dark-mode");
  toggle.innerText = "Light Mode";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "true");
    toggle.innerText = "Light Mode";
  } else {
    localStorage.setItem("darkMode", "false");
    toggle.innerText = "Dark Mode";
  }
});
