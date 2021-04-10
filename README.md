# Server de Tuttifrutti Store

**DB:** MongoDB

## Como usar variables de entorno

Copia en archivo `.env.dist` y cambia el nombre de la copia a `.env`.

Añade los valores que usaremos como variables de entorno en caso de que falten:

```
PORT=
HASH_SECRET=
```

## Como usar seeds

Se han creado dos seeds para poder generar datos de usarios y productos aleatorios.

```js
  npm run db:seeds
```

- Crea las colecciones de la base de datos y las rellena con información aleatoria

---

```js
  npm run db:seeds randomness
```

- Crea las colecciones de la base de datos y las rellena siempre con la misma información si no existe

---

```js
  npm run db:delete
```

- Borra las colecciones de la base de datos (si hubiera algo que borrar)

---

- El número de filas de cada tabla pueden generarse en base a un índice entero. Para ello cambiar en el fichero `.env` el valor de dichas variables (en caso de no poner esos valores, por defecto se crean 5 usuarios y 5 productos):
  1. USERS_ROWS=50
  2. PRODUCTS_ROWS=500
