let inventory = [
    { sku: "SKU-455", name: "Shoes", price: 59.99, stock: 24 },
    { sku: "SKU-456", name: "Shirt", price: 18.49, stock: 55 },
    {sku: "SKU-457", name: "Pants", price: 27.25, stock: 120 },
    { sku: "SKU-458", name: "Jacket", price: 38.99, stock: 9 }
]
console.log("One-Line Inventory Summary:");
inventory.forEach(p => {
  console.log(`${p.sku} | ${p.name} | $${p.price.toFixed(2)} | Stock: ${p.stock}`);
    }
);