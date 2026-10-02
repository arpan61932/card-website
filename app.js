const products = [
  { id: 1, name: "Wireless Earbuds", price: 1499, image: "earbuds.jpg", description: "Bluetooth 5.3, 24h battery" },
  { id: 2, name: "Smart Watch", price: 2999, image: "smart-watch.jpg", description: "Heart rate, sleep tracking" },
  { id: 3, name: "Backpack", price: 899, image: "backpack.jpg", description: "Water resistant, 25L" },
  { id: 4, name: "Gaming Mouse", price: 1299, image: "mouse.jpg", description: "8k DPI, RGB" },
  { id: 5, name: "Notebook Set", price: 299, image: "bookset.jpg", description: "A5, 5 colors" },
  { id: 6, name: "Sunglasses", price: 699, image: "sunglasses.jpg", description: "UV protection" },
].map((product) => ({ ...product, image: `photos/${product.image}` }));

const productById = new Map(products.map((product) => [product.id, product]));
const cart = new Map();
const formatINR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format;
const $ = (selector) => document.querySelector(selector);
const productList = $("#product-list");
const cartItems = $("#cart-items");
const TAX_RATE = 0.18;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(label, action, id, className = "btn-small", ariaLabel) {
  const node = element("button", className, label);
  node.type = "button";
  node.dataset.action = action;
  node.dataset.id = id;
  if (ariaLabel) node.setAttribute("aria-label", ariaLabel);
  return node;
}

function productCard(product) {
  const card = element("article", "card");
  const image = element("img");
  Object.assign(image, {
    src: product.image,
    alt: product.name,
    width: 400,
    height: 300,
    loading: "lazy",
    decoding: "async",
  });

  const body = element("div", "card-body");
  body.append(
    element("h3", "card-title", product.name),
    element("p", "card-price", formatINR(product.price)),
    element("p", "card-desc", product.description)
  );
  const actions = element("div", "card-actions");
  actions.append(
    button("Add to cart", "add", product.id),
    button("Details", "details", product.id)
  );
  body.append(actions);
  card.append(image, body);
  return card;
}

function cartItem(product, quantity) {
  const item = element("article", "cart-item");
  const image = element("img");
  Object.assign(image, {
    src: product.image,
    alt: "",
    width: 80,
    height: 80,
    loading: "lazy",
    decoding: "async",
  });

  const details = element("div");
  details.append(
    element("h3", "cart-item-title", product.name),
    element("p", "cart-item-price", formatINR(product.price))
  );

  const controls = element("div", "qty");
  const input = element("input");
  Object.assign(input, { type: "number", min: "1", step: "1", value: quantity });
  input.setAttribute("aria-label", `Quantity for ${product.name}`);
  input.dataset.action = "quantity";
  input.dataset.id = product.id;
  controls.append(
    button("−", "decrease", product.id, "btn-small", `Decrease quantity of ${product.name}`),
    input,
    button("+", "increase", product.id, "btn-small", `Increase quantity of ${product.name}`)
  );
  details.append(controls);
  item.append(image, details, button("Remove", "remove", product.id, "btn-small btn-danger"));
  return item;
}

function renderCart() {
  const entries = [...cart].map(([id, quantity]) => [productById.get(id), quantity]);
  cartItems.replaceChildren(
    ...(entries.length
      ? entries.map(([product, quantity]) => cartItem(product, quantity))
      : [element("p", "empty-cart", "Your cart is empty.")])
  );

  const subtotal = entries.reduce(
    (sum, [product, quantity]) => sum + product.price * quantity,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE);
  $("#subtotal").textContent = formatINR(subtotal);
  $("#tax").textContent = formatINR(tax);
  $("#total").textContent = formatINR(subtotal + tax);
}

function setQuantity(id, quantity) {
  if (!productById.has(id)) return;
  if (quantity <= 0) cart.delete(id);
  else if (Number.isSafeInteger(quantity)) cart.set(id, quantity);
  renderCart();
}

productList.replaceChildren(...products.map(productCard));
renderCart();

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const control = event.target.closest("[data-action]");
  if (!control) return;

  const id = Number(control.dataset.id);
  const product = productById.get(id);
  const quantity = cart.get(id) ?? 0;

  switch (control.dataset.action) {
    case "add":
      setQuantity(id, quantity + 1);
      break;
    case "details":
      if (product) {
        alert(`${product.name}\n\n${product.description}\nPrice: ${formatINR(product.price)}`);
      }
      break;
    case "decrease":
      setQuantity(id, quantity - 1);
      break;
    case "increase":
      setQuantity(id, quantity + 1);
      break;
    case "remove":
      setQuantity(id, 0);
      break;
  }
});

cartItems.addEventListener("change", (event) => {
  if (
    event.target instanceof HTMLInputElement &&
    event.target.matches('[data-action="quantity"]')
  ) {
    const quantity = Number(event.target.value);
    setQuantity(
      Number(event.target.dataset.id),
      Number.isSafeInteger(quantity) && quantity > 0 ? quantity : 1
    );
  }
});

$("#checkout-btn").addEventListener("click", () => {
  alert(
    cart.size
      ? "Checkout demo: integrate payment later (Razorpay/Stripe)."
      : "Your cart is empty."
  );
});
