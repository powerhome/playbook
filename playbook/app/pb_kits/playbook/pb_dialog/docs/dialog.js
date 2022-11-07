const button = document.querySelector("button[data-dialog]")
const confirmButton = document.querySelector("#confirm-1")


const modalTrigger = document.querySelector('[data-dialog]');

modalTrigger.addEventListener("click", function() {
    document
    .querySelector(`[data-dialog="${event.target.dataset.opensDialog}"]`)
    .showModal();
});

button.onclick = ()  => {
  document.querySelector("#dialog-1").showModal();
};

confirmButton.onclick = () => {
    console.log("clicked")
}



