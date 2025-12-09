export function closeAllBootstrapModals() {
  // Close any open modals
  const shown = document.querySelectorAll(".modal.show");

  shown.forEach((el) => {
    try {
      const bs = window.bootstrap?.Modal;

      if (bs) {
        const inst = bs.getInstance(el) ?? bs.getOrCreateInstance(el);
        inst.hide();
      } else if (window.jQuery) {
        window.jQuery(el).modal("hide");
      } else {
        el.classList.remove("show");
        el.style.display = "none";
      }
    } catch (err) {
      console.warn("Error closing modal:", err);
    }
  });

  // Remove body classes & leftover backdrops
  document.body.classList.remove("modal-open");
  document
    .querySelectorAll(".modal-backdrop")
    .forEach((b) => b.remove());
}
