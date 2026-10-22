"use strict";
const preview = document.querySelector("#image-preview");
const image = document.querySelector("#preview-image");
const caption = document.querySelector("#preview-caption");
let previousFocus = null;
function closePreview() {
  preview.close();
}
document.querySelectorAll("[data-preview]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof preview.showModal !== "function") {
      window.open(button.dataset.preview, "_blank", "noopener,noreferrer");
      return;
    }
    previousFocus = button;
    image.src = button.dataset.preview;
    image.alt = button.querySelector("img").alt;
    caption.textContent = button.dataset.caption;
    preview.showModal();
  });
});
document.querySelector(".preview-close").addEventListener("click", closePreview);
preview.addEventListener("click", (event) => {
  const box = preview.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closePreview();
});
preview.addEventListener("close", () => {
  image.removeAttribute("src");
  previousFocus?.focus();
});
