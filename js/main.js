/* ===== Configuração do cliente (edite só aqui) ===== */
const CONFIG = {
  whatsapp: "5543996812715",            // DDI + DDD + número, só dígitos
  exibir:   "(43) 99681-2715",          // como aparece escrito no site
  mensagem: "Olá, Jesimiel! Vi o site da JR Instalações Hidráulicas e gostaria de um orçamento."
};

/* Links de WhatsApp e telefone */
const waLink = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.mensagem);
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waLink;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-tel]").forEach(a => { a.href = "tel:+" + CONFIG.whatsapp; });
document.querySelectorAll("[data-fone]").forEach(el => { el.textContent = CONFIG.exibir; });

/* Ano no rodapé */
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

/* Topo muda ao rolar */
const topo = document.getElementById("topo");
const aoRolar = () => topo.classList.toggle("rolou", window.scrollY > 30);
aoRolar();
window.addEventListener("scroll", aoRolar, { passive: true });

/* Menu mobile */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
function alternaMenu(abrir) {
  const aberto = typeof abrir === "boolean" ? abrir : !menu.classList.contains("aberto");
  menu.classList.toggle("aberto", aberto);
  topo.classList.toggle("menu-aberto", aberto);
  burger.setAttribute("aria-expanded", String(aberto));
}
burger.addEventListener("click", () => alternaMenu());
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => alternaMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") alternaMenu(false); });

/* Revelar elementos ao rolar */
const itens = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((lista) => {
    lista.forEach(l => {
      if (l.isIntersecting) { l.target.classList.add("visivel"); obs.unobserve(l.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  itens.forEach(i => obs.observe(i));
} else {
  itens.forEach(i => i.classList.add("visivel"));
}
