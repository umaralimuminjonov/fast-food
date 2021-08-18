document.addEventListener("DOMContentLoaded", function (event) {
  const showNavbar = (toggleId, navId, navCloseId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    const navClose = document.getElementById(navCloseId);

    // Validate that all variables exist
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        // show navbar
        nav.classList.add("show");
        // change icon
        toggle.classList.toggle("bx-x");
      });
    }

    if (navClose) {
      // close navbar
      navClose.addEventListener("click", () => {
        nav.classList.remove("show");
      });
    }
  };

  showNavbar("header-toggle", "nav-bar", "nav-close");

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll(".nav_link");

  function colorLink() {
    if (linkColor) {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }
  }
  linkColor.forEach((l) => l.addEventListener("click", colorLink));
});