const boutonOvr = document.querySelector("#parametre-ia");
const boutonCls = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");

boutonOvr.addEventListener("click", function(){
    modal.showModal();
});
boutonCls.addEventListener("click", function(){
    modal.close();
});