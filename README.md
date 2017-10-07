# API

## AUTH


## 1. Login 
method: POST

url: /api/v1/auth/login

```
{
  email: 'string',
  password: string
}
```
## 2. Register
method: POST

url: /api/v1/auth/register

```
{
  email: 'string',
  password: string
}
```

## cart

### 3. Get user carts
method: GET

url: /api/v1/cart
### 4. Create new cart
method: POST

url: /api/v1/cart
```
{
  name: 'string',
  restaurant: 'string'
}
```
### 5. get cart details
method: GET

url: /api/v1/cart/:id
### 6. update cart details
method: patch

url: /api/v1/cart/:id
```
{
  name: string,
  restaurant: string,
  deleted: boolean
}
```
### 7. delete cart
method: delete

url: /api/v1/cart/:id

## order

### 8. create new orders
method: POST

url: /api/v1/order/:cartId/
```
{
  addOrderItems: [
    {
        title: string,
        quantity: number,
    }
  ]
}
```
### 9. update order
method: patch

url: /api/v1/order/:cartId/:id
```
{
    title: string,
    quantity: number
}
```

### 10. delete order 
method: delete
url: /api/v1/order/:cartId/:id

