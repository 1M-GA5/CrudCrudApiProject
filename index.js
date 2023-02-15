const form = document.getElementById("product-form");
const foodList = document.getElementById("food-list");
const skincareList = document.getElementById("skincare-list");
const electronicList = document.getElementById("electronic-list");
const apiUrl = {
  food: "https://crudcrud.com/api/3e2e8ac973dc4a22bbc59512c65f3b0d/newApi",
  skincare: "https://crudcrud.com/api/3e2e8ac973dc4a22bbc59512c65f3b0d/newApi",
  electronic: "https://crudcrud.com/api/3e2e8ac973dc4a22bbc59512c65f3b0d/newApi"
};

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = form.elements["name"].value;
    const price = form.elements["price"].value;
    const category = form.elements["category"].value;
  
    // Create product object
    const product = {
      name: name,
      price: price,
      category: category
    };
  
    // Send product to API
    fetch(apiUrl[category], {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      // Add product to list
      const li = document.createElement("li");
      li.textContent = `Name: ${data.name}, Price: ${data.price}, Category: ${data.category}`;
      
      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function() {
        // Delete product from API
        fetch(`${apiUrl[category]}/${data._id}`, {
          method: "DELETE"
        })
        .then(() => {
          // Remove product from list
          li.remove();
        })
        .catch(error => console.error(error));
      });
      
      li.appendChild(deleteBtn);
  
      if (data.category === "food") {
        foodList.appendChild(li);
      } else if (data.category === "skincare") {
        skincareList.appendChild(li);
      } else if (data.category === "electronic") {
        electronicList.appendChild(li);
      }
  
   
      form.reset();
    })
    .catch(error => console.error(error));
  });