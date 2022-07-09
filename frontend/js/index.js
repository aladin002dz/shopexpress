main();

function main() {
  console.log("Hello World!");
  fetch("http://localhost:3001/api/products")
    .then((response) => response.json())
    .then((products) => {
      console.log(products);
      let productList = document.getElementById("products");
      products.forEach((product) => {
        productList.insertAdjacentHTML(
          "beforeend",
          `          
        <div class="card mb-3">
        <div class="row g-0">
        <div class="col-md-4">
            <img src="https://via.placeholder.com/150" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <p class="card-text">
                ${product.description}
            </p>
            <h5 class="card-title">${product.price}</h5>
            </div>
        </div>
        </div>
        </div>`
        );
      });
    })
    .catch((error) => console.log(error));
}
