document.getElementById("btnAddProduct").addEventListener("click", addProduct);

function addProduct(e) {
  e.preventDefault();
  const price = document.getElementById("inputPrice").value;
  const description = document.getElementById("inputDescription").value;
  const selectedImage = document.getElementById("inputImage").files[0];
  const productData = {
    price,
    description,
  };

  const post = new FormData();
  post.append("postData", JSON.stringify(productData));
  post.append("myfile", selectedImage);

  fetch("http://localhost:3001/api/products/", {
    method: "post",
    /*     headers: {
      Authorization: `Bearer ${user.token}`,
    }, */
    body: post,
  })
    .then((reponse) => {
      console.log("Response: ");
      console.log(reponse);
      if (reponse.ok) {
        alert("Post ajouté avec succés!");
        window.location.replace("../index.html");
      } else {
        alert("Error Adding product!");
      }
    })
    .then();
}
