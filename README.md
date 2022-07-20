# Shop Express

Expressjs Web Api

- Database engine used is **SQLite**, the file `data.db`.
- Passwords encryption use the library **bcrypt**.
- Token is generated using the library **jsonwebtoken**.
- Images uploading/downloading use the middleware **multer**.

**First Use**: download or clone the code, and then use the command

```bash
    npm install
```

**Running Server**:

```bash
    node index.js
```

## Get All Products

`http://localhost:3001/api/products`

## Signup

**post** http request to `http://localhost:3001/api/auth/signup`

**body**:

```json
{
  "email": "example@email.com",
  "pwd": "password"
}
```

## login

**post** http request to `http://localhost:3001/api/auth/login`

**body**:

```json
{
  "email": "example@email.com",
  "pwd": "password"
}
```

## Add Product

**post** http request to `http://localhost:3001/api/products`

**FormData**:

```js
const productData = {
  price,
  description,
};

const productInfo = new FormData();
productInfo.append("productData", JSON.stringify(productData));
productInfo.append("myfile", selectedImage);
```
