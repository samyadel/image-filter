const filters = [...document.querySelectorAll(".filters *")];
const image = document.getElementById("filter");

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    image.className = `filter ${
      e.target.id ? e.target.id : e.target.parentNode.id
    }`;

    filters.forEach(
      (el) => (el.style.borderColor = "rgba(126, 135, 146, 0.4)")
    );

    if (e.target.tagName === "FIGURE") {
      e.target.style.borderColor = "rgb(21, 176, 237)";
    } else {
      e.target.parentNode.style.borderColor = "rgb(21, 176, 237)";
    }
  });
});
