// Instrucción 1
let productos = [
  { nombre: "Camiseta", precio: 15, stock: 10 },
  { nombre: "Pantalones", precio: 25, stock: 8 },
  { nombre: "Zapatos", precio: 50, stock: 5 },
  { nombre: "Sombrero", precio: 10, stock: 20 },
];

// Instrucción 2
let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) {
    let alredyInCart = false;
    for (let article of carrito){
        if (article.nombre === productoNombre) alredyInCart = true;
    }
    for (let producto of productos) {
        if (producto.nombre === productoNombre) {
            if (producto.stock >= cantidad && alredyInCart === false) {
                carrito.push({
                nombre: productoNombre,
                cantidad: cantidad,
                precio: producto.precio,
                });

                producto.stock -= cantidad;
                console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
            }else if(producto.stock >= cantidad && alredyInCart=== true){
                for (let article of carrito){
                    if (article.nombre === productoNombre) article.cantidad += cantidad;
                }
                producto.stock -= cantidad;
                console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
            }else {
                console.error(`No hay suficiente stock de ${productoNombre}`);
            }
            return;
        }
    }
    console.error(`El producto "${productoNombre}" no existe.`);
}

function quitarDelCarrito(productoNombre, cantidad){
    for (let article of carrito){
        if (article.nombre === productoNombre){
            if (article.cantidad > cantidad){
                article.cantidad -= cantidad
                for(let producto of productos){
                    if (producto.nombre === productoNombre) producto.stock += cantidad;
                }
                console.info(`${cantidad} ${productoNombre}(s) quitados(s) del carrito`);
            }else if(article.cantidad === cantidad){
                carrito.splice(carrito.indexOf(article), 1)
                for(let producto of productos){
                    if (producto.nombre === productoNombre) producto.stock += cantidad;
                }
                console.info(`${cantidad} ${productoNombre}(s) quitados(s) del carrito`);
            }else{
                console.error(`No hay tantos ${productoNombre}(s) en el carrito`);
            }
            return;
        }
    }
    console.error(`El producto "${productoNombre}" no está en el carrito.`);
}

// Instrucción 3
function calcularTotal() {
    let total = 0;
    for (let item of carrito) {
        total += item.precio * item.cantidad;
    }

    return total;
}

// Instrucción 4
function aplicarDescuento(total) {
  if (total > 100) {
    //Aplica un 10% de descuento
    return total * 0.9;
  }

  return total;
}

//Instrucción 5
function procesarCompra() {
    let i = 3
    console.log("Procesando compra...");
    let countdownTimer = setInterval(function() {

        console.log(i);
        i = i - 1;

        if (i <= -1) {
            clearInterval(countdownTimer);
            let total = calcularTotal();
            total = aplicarDescuento(total);
            console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
        }

    }, 1000);
}

// Instrucción 6
agregarAlCarrito("Pantalones", 3);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Pantalones", 4);
agregarAlCarrito("Zapatos", 2);
agregarAlCarrito("Camisetas", 3);
agregarAlCarrito("Camiseta", 3);
agregarAlCarrito("Pantalones", 2);

quitarDelCarrito("Pantalones", 3)
quitarDelCarrito("Pantalones", 6)
quitarDelCarrito("Pantalones", 4)
quitarDelCarrito("Guantes", 4)

agregarAlCarrito("Pantalones", 7);


console.log(carrito);
/* let total = calcularTotal();
total = aplicarDescuento(total);
console.log(total); */
procesarCompra();