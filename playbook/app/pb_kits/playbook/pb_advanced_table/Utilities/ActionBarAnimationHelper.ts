export const showActionBar = (elem: HTMLElement) => {
  elem.style.display = "block";
  const height = elem.scrollHeight + "px";
  elem.style.height = height;
  elem.classList.add("is-visible");
  elem.style.overflow = "hidden";

  window.setTimeout(() => {
    if (elem.classList.contains("is-visible")) {
      elem.style.height = "";
      elem.style.overflow = "visible";
    }
  }, 300);
};

export const hideActionBar = (elem: HTMLElement) => {
  elem.style.height = elem.scrollHeight + "px";
  elem.offsetHeight;
  window.setTimeout(() => {
    elem.style.height = "0";
    elem.style.overflow = "hidden";
  }, 10);
  window.setTimeout(() => {
    elem.classList.remove("is-visible");
  }, 300);
};
