//***************DOM SELECTORS***************/

const filters = [...document.querySelectorAll(".filters *")];
const imageUploader = document.getElementById("image-uploader");
const image = document.getElementById("filter");
const rangeInputs = [...document.querySelectorAll("input[type='range']")];

const imageFilters = {
  contrast: "100",
  brightness: "100",
  saturate: "100",
  sepia: "0",
  grayscale: "0",
  invert: "0",
  "hue-rotate": "0",
  blur: "0",
};

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

imageUploader.addEventListener("change", () => {
  const file = imageUploader.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    image.children[0].src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    image.children[0].src.src = "";
  }
});

rangeInputs.forEach((el) => {
  el.addEventListener("change", (e) => {
    imageFilters[e.target.id] = e.target.value;
    let filters = "";
    let unit = " ";

    for (const props in imageFilters) {
      if (props === "hue-rotate") {
        unit = "deg";
      } else if (props === "blur") {
        unit = "px";
      } else {
        unit = "%";
      }

      filters += `${props}(${imageFilters[props]}${unit}) `;
    }

    image.style.filter = filters;
  });
});
