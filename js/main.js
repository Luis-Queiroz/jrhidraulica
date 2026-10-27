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

/* Mapa da área de atendimento */
(function () {
  const el = document.getElementById("mapa");
  if (!el || !window.L) return;

  const cidades = [
    { nome: "Londrina", pos: [-23.3045, -51.1696] },
    { nome: "Cambé",    pos: [-23.2764, -51.2786] },
    { nome: "Ibiporã",  pos: [-23.2692, -51.0526] }
  ];

  const mapa = L.map(el, {
    scrollWheelZoom: false,       // não "rouba" a rolagem da página
    dragging: !L.Browser.mobile,  // no celular, o dedo continua rolando a página
    tap: false
  });

  // posição inicial: enquadra as três cidades
  mapa.fitBounds(L.latLngBounds(cidades.map(c => c.pos)), { padding: [70, 70] });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(mapa);

  const pin = L.divIcon({
    className: "pin-mapa",
    html: "<svg viewBox='0 0 34 44' aria-hidden='true'><path d='M17 1C8.700 1 2 7.700 2 16c0 11 15 27 15 27s15-16 15-27C32 7.700 25.300 1 17 1z' fill='#273e6c'/><circle cx='17' cy='16' r='6' fill='#fff'/></svg>",
    iconSize: [34, 44],
    iconAnchor: [17, 42]
  });

  cidades.forEach(c => {
    L.marker(c.pos, { icon: pin, title: c.nome, keyboard: false })
      .addTo(mapa)
      .bindTooltip(c.nome, { permanent: true, direction: "bottom", offset: [0, 2], className: "rotulo-mapa" });
  });

  const area = L.circle([-23.2837, -51.1668], {
    radius: 13500, color: "#2f8fe0", weight: 2, dashArray: "6 6",
    fillColor: "#2f8fe0", fillOpacity: 0.1, interactive: false
  }).addTo(mapa);

  el.addEventListener("click", () => mapa.scrollWheelZoom.enable());
  window.addEventListener("load", () => mapa.invalidateSize());
})();
