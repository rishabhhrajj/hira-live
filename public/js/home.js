document
  .getElementById("watchBtn")
  .addEventListener("click", () => {

    window.location.href =
      "/wedding-intro.html";
  });

document.addEventListener(
  "keydown",
  (e) => {

    if (
      e.ctrlKey &&
      e.shiftKey &&
      e.key === "A"
    ) {
      window.location.href =
        "/admin.html";
    }
  }
);