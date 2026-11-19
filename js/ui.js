const modal = document.querySelector("#modal");
document.querySelector("#parametre-ia").onclick = function () {
  modal.showModal();
};
document.querySelector("#close-modal").onclick = function () {
  modal.close();
};
