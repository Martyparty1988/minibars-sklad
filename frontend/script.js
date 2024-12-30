const API_URL = "http://localhost:3000/api/items";

// Načíst položky skladu pro danou vilu
async function loadStock() {
  const villa = new URLSearchParams(window.location.search).get("villa");
  const response = await fetch(`${API_URL}/${villa}`);
  const items = await response.json();

  const container = document.getElementById("stock-items");
  container.innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("stock-item");

    const icon = document.createElement("span");
    icon.textContent = item.icon;

    const details = document.createElement("div");
    details.innerHTML = `<strong>${item.name}</strong> - ${item.quantity} ks (${item.price} ${item.currency})`;

    div.appendChild(icon);
    div.appendChild(details);
    container.appendChild(div);
  });
}

// Přidat novou položku
async function addItem() {
  const name = document.getElementById("itemName").value;
  const quantity = parseInt(document.getElementById("itemQuantity").value);

  if (!name || quantity < 0) {
    alert("Vyplňte správně název a množství.");
    return;
  }

  // Logika pro odeslání na server by byla zde
  alert(`Položka ${name} s množstvím ${quantity} byla přidána.`);
}

// Generovat fakturu
function generateInvoice() {
  const guests = parseInt(document.getElementById("guests").value);
  const nights = parseInt(document.getElementById("nights").value);
  const discount = document.getElementById("discount").checked;

  const cityTax = guests * nights * 2; // 2 € za hosta/noc
  let total = cityTax;

  const invoiceDetails = `<p>City Tax: ${cityTax} €</p>`;
  document.getElementById("invoice").innerHTML = invoiceDetails + `<h3>Celkem: ${total} €</h3>`;
}