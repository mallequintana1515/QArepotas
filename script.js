const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const menuModal = document.getElementById("menuModal");
const menuModalCard = document.querySelector(".menu-modal-card");
const promotionsModal = document.getElementById("promotionsModal");
const promotionsModalCard = document.querySelector(".promotions-modal-card");
const closeModal = document.getElementById("closeModal");
const closePromotionsModalBtn = document.getElementById("closePromotionsModal");
const menuBackdrop = document.getElementById("menuBackdrop");
const promotionsBackdrop = document.getElementById("promotionsBackdrop");
const openMenuButtons = document.querySelectorAll("[data-open-menu]");
const openPromotionButtons = document.querySelectorAll("[data-open-promotions]");

const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const heroImage = document.querySelector(".hero-image");
const productName = document.querySelector(".product-name");
const productIngredients = document.querySelector(".product-ingredients");
const priceBadge = document.querySelector(".price-badge");
const productFallback = document.getElementById("productFallback");
const indicators = document.querySelectorAll(".indicator");
const menuItems = document.querySelectorAll(".menu-item");
const menuSelectionCount = document.getElementById("menuSelectionCount");
const customerNameInput = document.getElementById("customerName");
const customerAddressInput = document.getElementById("customerAddress");
const paymentMethodSelect = document.getElementById("paymentMethod");
const cashPreferenceField = document.getElementById("cashPreferenceField");
const cashPreferenceSelect = document.getElementById("cashPreference");
const menuSummaryList = document.getElementById("menuSummaryList");
const menuTotal = document.getElementById("menuTotal");
const whatsappOrderBtn = document.getElementById("whatsappOrderBtn");
const promotionsList = document.getElementById("promotionsList");
const promotionsAdminPanel = document.getElementById("promotionsAdminPanel");
const promotionForm = document.getElementById("promotionForm");
const promotionTitleInput = document.getElementById("promotionTitle");
const promotionPriceInput = document.getElementById("promotionPrice");
const promotionImageInput = document.getElementById("promotionImage");
const promotionDescriptionInput = document.getElementById("promotionDescription");
const promotionStatus = document.getElementById("promotionStatus");
const menuOrderPhone = "573044247299";
const promoStorageKey = "qarepotasPromotions";
const promoAdminStorageKey = "qarepotasPromotionsAdmin";
const menuItemState = new Map();

const defaultPromotions = [
  {
    title: "Combo del día",
    price: "Desde $12.000",
    description: "Aprovecha las promociones activas para pedir más rápido y ahorrar.",
    image: "./images/Desgranado De Pollo.jpeg",
    badge: "Recomendado",
  },
  {
    title: "Promo arepa",
    price: "Desde $18.000",
    description: "Arepa rellena con sabor casero y precio especial por tiempo limitado.",
    image: "./images/arepa rellena.jpeg",
    badge: "Nueva",
  },
];

let promotionAdminMode = false;
let promotionItems = [];

const products = [
  {
    src: "./images/Desgranado De Pollo.jpeg",
    alt: "Desgranado de pollo",
    price: "$20.000",
    ingredients: "Ingredientes: chuzo de pollo picado, maíz, queso , tocineta, papa ripio y salsas.",
  },
  {
    src: "./images/arepa rellena.jpeg",
    alt: "Arepa rellena",
    price: "$18.000",
    ingredients: "Ingredientes: Carne y Pollo desmenuzado, queso, maíz, tocineta , mantequilla y salsas.",
  },
  {
    src: "./images/Burritos.jpeg",
    alt: "Burrito delicioso",
    price: "$20.000",
    ingredients: "Ingredientes: Carne, pollo, tocineta,maicitos,hogado, queso y salsas.",
  },
  {
    src: "./images/hamburguesa.jpeg",
    alt: "Hamburguesa con queso",
    price: "$12.000",
    ingredients: "Ingredientes: Carne, queso, tocineta,ensalada hawaina ,papa ripio ,salsas.",
  },
  {
    src: "./images/quesadillas.jpeg",
    alt: "Quesadillas",
    price: "$20.000",
    ingredients: "Ingredientes: Queso fresco, carne, pollo, tocineta y salsas.",
  },
  {
    src: "./images/maicitos gratinaados.jpeg",
    alt: "Maicitos Gratinados",
    price: "$18.000",
    ingredients: "Ingredientes: Maíz tierno con queso, tocino crujiente y salsa especial.",
  },
  {
    src: "./images/perro caliente.jpeg",
    alt: "Perro Caliente",
    price: "$12.000",
    ingredients: "Ingredientes: Pan, salchicha, queso, papa ripio, salsas y complementos.",
  },
  {
    src: "./images/chuzo.jpeg",
    alt: "Chuzo",
    price: "$17.000",
    ingredients: "Ingredientes: Carne y pollo ensartados, maíz, queso, salsa verde y roja.",
  },
];

let currentSlide = 1;

function updateProductSlide(index) {
  currentSlide = (index + products.length) % products.length;
  const product = products[currentSlide];

  heroImage.src = product.src;
  heroImage.alt = product.alt;
  productName.textContent = product.alt;
  priceBadge.textContent = product.price;
  if (productIngredients) {
    productIngredients.textContent = product.ingredients || "Ingredientes no disponibles.";
  }
  heroImage.style.display = "block";
  productFallback.style.display = "none";

  indicators.forEach((indicator, indicatorIndex) => {
    indicator.classList.toggle("active", indicatorIndex === currentSlide);
  });
}

if (heroImage) {
  heroImage.onerror = () => {
    heroImage.style.display = "none";
    productFallback.style.display = "grid";
  };
}

if (carouselPrev) {
  carouselPrev.addEventListener("click", () => {
    updateProductSlide(currentSlide - 1);
  });
}

if (carouselNext) {
  carouselNext.addEventListener("click", () => {
    updateProductSlide(currentSlide + 1);
  });
}

updateProductSlide(currentSlide);

function parsePriceValue(priceText) {
  const numeric = Number(String(priceText).replace(/[^\d]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-CO").format(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function loadPromotions() {
  try {
    const stored = localStorage.getItem(promoStorageKey);
    if (!stored) {
      return [...defaultPromotions];
    }

    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    // If storage is unavailable, fall back to the built-in promotions.
  }

  return [...defaultPromotions];
}

function savePromotions() {
  try {
    localStorage.setItem(promoStorageKey, JSON.stringify(promotionItems));
  } catch (error) {
    // Ignore storage errors in the browser.
  }
}

function loadPromotionAdminMode() {
  try {
    return localStorage.getItem(promoAdminStorageKey) === "1";
  } catch (error) {
    return false;
  }
}

function savePromotionAdminMode() {
  try {
    localStorage.setItem(promoAdminStorageKey, promotionAdminMode ? "1" : "0");
  } catch (error) {
    // Ignore storage errors in the browser.
  }
}

function syncBodyScrollLock() {
  document.body.style.overflow =
    menuModal.classList.contains("hidden") && promotionsModal.classList.contains("hidden")
      ? ""
      : "hidden";
}

function syncPromotionsAdminPanel() {
  if (promotionsAdminPanel) {
    promotionsAdminPanel.classList.toggle("is-hidden", !promotionAdminMode);
  }
}

function renderPromotions() {
  if (!promotionsList) {
    return;
  }

  if (!promotionItems.length) {
    promotionsList.innerHTML =
      '<p class="menu-empty">Todavía no hay promociones cargadas.</p>';
    return;
  }

  promotionsList.innerHTML = promotionItems
    .map((promotion, index) => {
      const title = promotion.title || `Promoción ${index + 1}`;
      const description = promotion.description || "Sin descripción disponible.";
      const price = promotion.price || "";
      const badge = promotion.badge || "Promoción";
      const image = promotion.image || "";
      const escapedTitle = escapeHtml(title);
      const escapedDescription = escapeHtml(description);
      const escapedPrice = escapeHtml(price);
      const escapedBadge = escapeHtml(badge);
      const escapedImage = escapeHtml(image);

      const mediaMarkup = image
        ? `<img class="promotion-card-media" src="${escapedImage}" alt="${escapedTitle}" loading="lazy" decoding="async" />`
        : `<div class="promotion-card-media promotion-card-placeholder"><span>${escapedTitle}</span></div>`;

      return `
        <article class="promotion-card">
          ${mediaMarkup}
          <div class="promotion-card-body">
            <span class="promotion-pill">${escapedBadge}</span>
            <h3>${escapedTitle}</h3>
            <p>${escapedDescription}</p>
            <strong>${escapedPrice}</strong>
          </div>
        </article>
      `;
    })
    .join("");
}

function openPromotionsModal() {
  closeMenuModal();
  if (promotionsModal) {
    promotionsModal.classList.remove("hidden");
    promotionsModal.setAttribute("aria-hidden", "false");
    if (promotionsModalCard) {
      promotionsModalCard.scrollTop = 0;
    }
    promotionsModal.scrollTop = 0;
  }
  if (promotionStatus) {
    promotionStatus.textContent = "";
  }
  syncPromotionsAdminPanel();
  renderPromotions();
  syncBodyScrollLock();
}

function closePromotionsModal() {
  if (promotionsModal) {
    promotionsModal.classList.add("hidden");
    promotionsModal.setAttribute("aria-hidden", "true");
  }
  syncBodyScrollLock();
}

promotionItems = loadPromotions();
promotionAdminMode = loadPromotionAdminMode();

if (new URLSearchParams(window.location.search).get("promoAdmin") === "1") {
  promotionAdminMode = true;
  savePromotionAdminMode();
}

syncPromotionsAdminPanel();

function syncCashPreferenceField() {
  const isCashPayment = paymentMethodSelect ? paymentMethodSelect.value === "Efectivo" : false;

  if (cashPreferenceField) {
    cashPreferenceField.classList.toggle("is-hidden", !isCashPayment);
  }

  if (cashPreferenceSelect) {
    cashPreferenceSelect.disabled = !isCashPayment;
    if (!isCashPayment) {
      cashPreferenceSelect.value = "";
    }
  }

  return isCashPayment;
}

function renderMenuSummary() {
  const orderLines = [];
  let totalItems = 0;
  let totalValue = 0;
  const isCashPayment = syncCashPreferenceField();

  menuItems.forEach((item) => {
    const state = menuItemState.get(item);
    if (!state || state.qty <= 0) {
      return;
    }

    totalItems += state.qty;
    totalValue += state.qty * state.priceValue;
    orderLines.push(state);
  });

  if (menuSelectionCount) {
    menuSelectionCount.textContent =
      totalItems === 1
        ? "1 producto seleccionado"
        : `${totalItems} productos seleccionados`;
  }

  if (menuTotal) {
    menuTotal.textContent = `$${formatMoney(totalValue)}`;
  }

  if (menuSummaryList) {
    if (orderLines.length === 0) {
      menuSummaryList.innerHTML =
        '<p class="menu-empty">Todavía no has agregado productos.</p>';
    } else {
      menuSummaryList.innerHTML = orderLines
        .map((line) => {
          const lineTotal = line.priceValue > 0
            ? `$${formatMoney(line.qty * line.priceValue)}`
            : line.priceText;

          return `<div class="menu-summary-row"><span>${line.qty} x ${line.name}</span><strong>${lineTotal}</strong></div>`;
        })
        .join("");
    }
  }

  if (whatsappOrderBtn) {
    whatsappOrderBtn.disabled = false;
    whatsappOrderBtn.setAttribute("aria-disabled", "false");
  }

  return { orderLines, totalItems, totalValue };
}

function openModal() {
  closePromotionsModal();
  menuModal.classList.remove("hidden");
  menuModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (menuModalCard) {
    menuModalCard.scrollTop = 0;
  }
  menuModal.scrollTop = 0;
}

function closeMenuModal() {
  menuModal.classList.add("hidden");
  menuModal.setAttribute("aria-hidden", "true");
  syncBodyScrollLock();
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

openMenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal();
    closeMobileNav();
  });
});

openPromotionButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openPromotionsModal();
    closeMobileNav();
  });
});

if (closeModal) {
  closeModal.addEventListener("click", closeMenuModal);
}

if (closePromotionsModalBtn) {
  closePromotionsModalBtn.addEventListener("click", closePromotionsModal);
}

if (menuBackdrop) {
  menuBackdrop.addEventListener("click", closeMenuModal);
}

if (promotionsBackdrop) {
  promotionsBackdrop.addEventListener("click", closePromotionsModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenuModal();
    closePromotionsModal();
    closeMobileNav();
  }

  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    promotionAdminMode = !promotionAdminMode;
    savePromotionAdminMode();
    syncPromotionsAdminPanel();
    if (promotionsModal && promotionsModal.classList.contains("hidden")) {
      openPromotionsModal();
    } else {
      renderPromotions();
    }
  }
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNav();
  });
});

[customerNameInput, customerAddressInput].forEach((input) => {
  if (input) {
    input.addEventListener("input", renderMenuSummary);
  }
});

if (paymentMethodSelect) {
  paymentMethodSelect.addEventListener("change", renderMenuSummary);
}

if (cashPreferenceSelect) {
  cashPreferenceSelect.addEventListener("change", renderMenuSummary);
}

if (promotionForm) {
  promotionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = promotionTitleInput ? promotionTitleInput.value.trim() : "";
    const description = promotionDescriptionInput ? promotionDescriptionInput.value.trim() : "";
    const price = promotionPriceInput ? promotionPriceInput.value.trim() : "";
    const image = promotionImageInput ? promotionImageInput.value.trim() : "";

    if (!title || !description) {
      if (promotionStatus) {
        promotionStatus.textContent = "Escribe por lo menos un título y una descripción.";
      }
      return;
    }

    promotionItems = [
      {
        title,
        description,
        price: price || "Precio por confirmar",
        image,
        badge: "Nueva",
      },
      ...promotionItems,
    ];

    savePromotions();
    renderPromotions();

    if (promotionStatus) {
      promotionStatus.textContent = `Se agregó la promoción "${title}".`;
    }

    promotionForm.reset();
  });
}

function playMenuItemAnimation(item) {
  item.classList.remove("is-animating");
  void item.offsetWidth;
  item.classList.add("is-animating");

  window.setTimeout(() => {
    item.classList.remove("is-animating");
  }, 420);
}

menuItems.forEach((item) => {
  const nameElement = item.querySelector("h3");
  const priceElement = item.querySelector("strong");
  const name = nameElement ? nameElement.textContent.trim() : "Producto";
  const priceText = priceElement ? priceElement.textContent.trim() : "$0";
  const priceValue = parsePriceValue(priceText);

  const actions = document.createElement("div");
  actions.className = "menu-actions";
  actions.innerHTML = `
    <div class="menu-stepper">
      <button class="menu-qty-btn" type="button" data-qty-minus aria-label="Disminuir ${name}">−</button>
      <span class="menu-qty-value" data-qty-value>0</span>
      <button class="menu-qty-btn" type="button" data-qty-plus aria-label="Aumentar ${name}">+</button>
    </div>
  `;
  item.appendChild(actions);

  const qtyValue = actions.querySelector("[data-qty-value]");
  const minusButton = actions.querySelector("[data-qty-minus]");
  const plusButton = actions.querySelector("[data-qty-plus]");

  const state = {
    name,
    priceText,
    priceValue,
    qty: 0,
  };

  menuItemState.set(item, state);

  function syncItemState() {
    if (qtyValue) {
      qtyValue.textContent = String(state.qty);
    }

    item.classList.toggle("is-selected", state.qty > 0);

    if (minusButton) {
      minusButton.disabled = state.qty === 0;
    }
  }

  function changeQty(delta) {
    state.qty = Math.max(0, state.qty + delta);
    syncItemState();
    renderMenuSummary();
  }

  if (plusButton) {
    plusButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      changeQty(1);
      playMenuItemAnimation(item);
    });
  }

  if (minusButton) {
    minusButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      changeQty(-1);
      playMenuItemAnimation(item);
    });
  }

  item.addEventListener("click", (event) => {
    if (event.target.closest(".menu-actions")) {
      return;
    }

    playMenuItemAnimation(item);
  });

  syncItemState();
});

renderMenuSummary();
renderPromotions();
syncPromotionsAdminPanel();

if (whatsappOrderBtn) {
  whatsappOrderBtn.addEventListener("click", () => {
    const message = buildWhatsAppOrderMessage();

    if (!message) {
      return;
    }

    const url = `https://wa.me/${menuOrderPhone}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");

    if (!opened) {
      window.location.href = url;
    }
  });
}

function buildWhatsAppOrderMessage() {
  const { orderLines, totalValue } = renderMenuSummary();
  const customerName = customerNameInput ? customerNameInput.value.trim() : "";
  const customerAddress = customerAddressInput ? customerAddressInput.value.trim() : "";
  const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value.trim() : "";
  const cashPreference = cashPreferenceSelect ? cashPreferenceSelect.value.trim() : "";

  if (!orderLines.length) {
    return [
      "Hola QArepotas, quiero hacer un pedido.",
      "",
      `Nombre: ${customerName || "No registrado"}`,
      `Dirección: ${customerAddress || "No registrada"}`,
      `Pago: ${paymentMethod || "No registrado"}`,
    ].join("\n");
  }

  const lines = orderLines.map(
    (line) => `- ${line.qty} x ${line.name} (${line.priceText} c/u)`
  );

  const paymentLines = [`Pago: ${paymentMethod || "No registrado"}`];
  if (paymentMethod === "Efectivo") {
    paymentLines.push(`Efectivo: ${cashPreference || "No registrado"}`);
  }

  return [
    "Hola QArepotas, quiero hacer este pedido:",
    "",
    `Nombre: ${customerName || "No registrado"}`,
    `Dirección: ${customerAddress || "No registrada"}`,
    "",
    ...paymentLines,
    "",
    ...lines,
    "",
    `Total: $${formatMoney(totalValue)}`,
  ].join("\n");
}
