//***************DOM SELECTORS***************/

const filters = [...document.querySelectorAll(".filters *")];
const filterImages = [...document.querySelectorAll(".filter-choice img")];
const imageUploader = document.getElementById("image-uploader");
const hidePresets = document.getElementById("hide-presets");
const image = document.getElementById("filter");
const rangeInputs = [
  ...document.querySelectorAll(".custom-filters input[type='range']"),
];
const overlayOptions = document.querySelectorAll("input[name='overlay']");
const solidBackgroundOption = document.getElementById("solid");
const colorPicker = document.getElementById("color");
const opacity = document.getElementById("opacity");

document.querySelector(".solid-overlay-options").hidden = true;

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

let hex;

filterImages.forEach((el) => (el.src = image.children[0].src));

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
    filterImages.forEach((el) => (el.src = image.children[0].src));
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    image.children[0].src = "";
  }
});

hidePresets.addEventListener("click", () => {
  document.querySelector(".main-viewport").classList.toggle("fullscreen");
  if (
    [...document.querySelector(".main-viewport").classList].indexOf(
      "fullscreen"
    ) !== -1
  ) {
    document.querySelector(
      "label[for='hide-presets']"
    ).innerHTML = `<i class="fas fa-sliders-h"></i> Show Presets`;
  } else {
    document.querySelector(
      "label[for='hide-presets']"
    ).innerHTML = `<i class="fas fa-sliders-h"></i> Hide Presets`;
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

overlayOptions.forEach((el) => {
  el.addEventListener("change", (e) => {
    document.querySelector(".solid-overlay-options").hidden =
      e.target.id !== "solid";
    image.classList.toggle("custom-filter");
  });
});

colorPicker.addEventListener("change", () => {
  hex = hexToRgb(
    colorPicker.value
      .split("")
      .slice(1, colorPicker.value.split("").length)
      .join("")
  );

  document.documentElement.style.setProperty(
    "--overlay",
    `rgba(${hex},${opacity.value})`
  );
});

opacity.addEventListener("change", () => {
  document.documentElement.style.setProperty(
    "--overlay",
    `rgba(${hex},${opacity.value})`
  );
});

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b].join();
}
