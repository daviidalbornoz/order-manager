// Create Inventory
let inventory = [
    {sku: "SKU-455", name: "Shoes", price: 59.99, stock: 24},
    {sku: "SKU-456", name: "Shirt", price: 18.49, stock: 55},
    {sku: "SKU-457", name: "Pants", price: 27.25, stock: 120},
    {sku: "SKU-458", name: "Jacket", price: 38.99, stock: 9}
]
console.log("One-Line Inventory Summary:"); // Display Summary of Inventory
inventory.forEach(p => {
  console.log(`${p.sku} | ${p.name} | $${p.price.toFixed(2)} | Stock: ${p.stock}`);
    }
);

//Add new product: Watch
inventory.push(
    {sku: "SKU-459", name: "Watch", price: 179.99, stock: 15}
);

//Remove the new product: Watch
let removedProduct = inventory.pop();
console.log(`\nRemoved Last Product: ${removedProduct.sku} | ${removedProduct.name} | $${removedProduct.price} | ${removedProduct.stock}`);

inventory[0].price = 39.99; // Update shoes to sale price
inventory[3].stock += 25; // Restock jackets

// Display updates on console
console.log("\nOne-Line Inventory Summary (Updated):");
inventory.forEach(p => {
  console.log(`${p.sku} | ${p.name} | $${p.price.toFixed(2)} | Stock: ${p.stock}`);
    }
);

// Create orders
let orders = [
    {orderID: "ORDER_244", items: [
        {sku: "SKU-455", quantity: 30}, // Order shoes
        {sku: "SKU-458", quantity: 40} // Order jackets
    ]},
    {orderID: "ORDER_245", items: [
        {sku: "SKU-456", quantity: 45}, // Order shirts
        {sku: "SKU-457", quantity: 15} // Order pants
    ]}
]

// Setting up the tracking variables for the current order
orders.forEach(order => {
  let canFulfill = true; // start off assuming we can fulfill the order
  let failureMessage = ""; // start off with an empty failure message
  let orderTotal = 0; // starts off with 0, if order is fillable, add up (price * qty) for each item

// verify items, this ensures the product exists
  order.items.forEach(item => {                                 // loop through each item in an order
    let product = inventory.find(p => p.sku === item.sku);      // make the product reflect where the product sku matches the order item's sku

// If product sku does not match item sku: Change canFulfill status to false and display failure message
    if (!product && canFulfill) {
      canFulfill = false;           // change canFulfill status
      failureMessage = `\nOrder ${order.orderID} FAILED: SKU ${item.sku} not found.`;
      return;
    }

// If product exists but the current product stock is less than the requested order quantity, display error messaqge
    if (product && product.stock < item.quantity && canFulfill) {
      let shortBy = item.quantity - product.stock;                 // shortBy = order quantity - current inventory stock
      canFulfill = false;                                     // Change canFulfill status
      failureMessage = `\nOrder ${order.orderID} FAILED: ${product.name} (${product.sku}) short by ${shortBy} unit(s).`;    // Display error message showing how much inventory we are short by to fulfill order
      return;
    }
  }
  );

  // If fulfillable, decrement stock + compute total
  if (canFulfill) {
    order.items.forEach(item => {                             // apply to each item in orders array where canFulfill status is true
      let product = inventory.find(p => p.sku === item.sku);  // match SKU's
      product.stock -= item.quantity;                              // decrease the stock in inventory by the order quantity
      orderTotal += product.price * item.quantity;                 // calculate the order total
    });

    console.log(`\nOrder ${order.orderID} SUCCESS: Total = $${orderTotal.toFixed(2)}`);   // Display the success message
  } else {
    console.log(failureMessage);        // Display failure message if cannot be fulfilled
  }
});