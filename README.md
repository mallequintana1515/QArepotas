# QArepotas

Sitio web de pedidos para comida rápida. Permite mostrar productos, seleccionar cantidades, completar datos del cliente y enviar el pedido directamente por WhatsApp.

## Qué Incluye

- Banner principal con mensaje de bienvenida.
- Carrusel de producto destacado con imagen, nombre, ingredientes y precio.
- Navegación superior y menú móvil.
- Link de ubicación con Google Maps en escritorio y celular.
- Modal de menú completo con productos y bebidas.
- Bebidas con fotos, nombres y precios actualizados.
- Selector de cantidades por producto con botones `+` y `-`.
- Resumen del pedido con total automático.
- Formulario para nombre del cliente, dirección y forma de pago.
- Opción de pago por `Transferencia` o `Efectivo`.
- Si el pago es en efectivo, permite indicar si necesita devuelta o si paga completo.
- Envío del pedido a WhatsApp con el detalle completo.
- Botón de WhatsApp activo aunque el cliente quiera escribir primero sin seleccionar productos.
- Horario de atención y nota de cobertura de domicilio.
- Encabezado en rojo oscuro con acentos amarillos para combinar con la identidad visual.
- Diseño adaptable para computador y celular.

## Actualizaciones Recientes

- Se agregaron fotos y precios actualizados para las bebidas del menú.
- Se agregaron las bebidas: Hit personal, Poni Malta, Postobón, Agua, Hit litro, Coca-Cola 1/4, Gatorade y Coca-Cola personal.
- Se retiraron los botones visibles de promociones del encabezado, del menú móvil y de la pantalla principal.
- Se quitó la tarjeta visible de promoción en la pantalla principal.
- Se cambió el color del encabezado a rojo oscuro con detalles amarillos para combinar mejor con el resto de la página.
- Se corrigieron textos con acentos y caracteres dañados.
- Se unificó el número de WhatsApp: `573044247299`.
- Se corrigió el enlace de Google Maps para que sea igual en escritorio y celular.
- Se mejoró la experiencia móvil del menú y del modal de pedidos.
- Se agregó horario de atención: todos los días de `6:00 p. m.` a `12:00 a. m.`.
- Se agregó información de zona de entrega local.
- Se habilitó el botón `Pedir por WhatsApp` para que siempre funcione.

## Cómo Funciona

### 1. Vista Principal

La pantalla inicial muestra:

- logo,
- accesos rápidos,
- mensaje principal,
- producto destacado,
- horario y zona de entrega,
- botón para abrir el menú.

### 2. Menú De Productos

Al abrir el menú, el usuario puede:

- ver todos los productos disponibles,
- ver las fotos de las bebidas,
- agregar o quitar cantidades,
- ver el total en tiempo real,
- escribir su nombre,
- escribir su dirección,
- elegir la forma de pago,
- enviar el pedido por WhatsApp.

### 3. Pago

El pedido puede hacerse con:

- `Transferencia`
- `Efectivo`

Si elige `Efectivo`, aparece una opción extra para indicar:

- `Necesito devuelta`
- `Pago completo`

### 4. Pedido Por WhatsApp

El botón de WhatsApp genera un mensaje con:

- nombre del cliente,
- dirección,
- forma de pago,
- detalle de cada producto y su cantidad,
- total final.

Si el cliente no selecciona productos, el botón igual abre WhatsApp con un mensaje simple para iniciar el pedido.

## Productos Incluidos

- Desgranado de pollo: `$20.000`
- Burrito: `$20.000`
- Arepa rellena: `$18.000`
- Quesadillas: `$20.000`
- Maicitos gratinados: `$18.000`
- Perro caliente: `$12.000`
- Chuzo: `$17.000`
- Hamburguesa: `$12.000`

## Bebidas Incluidas

- Hit personal: `$4.000`
- Poni Malta: `$4.000`
- Postobón: `$4.000`
- Agua: `$3.000`
- Hit litro: `$7.000`
- Coca-Cola 1/4: `$10.000`
- Gatorade: `$6.000`
- Coca-Cola personal: `$4.000`

## Archivos Principales

- `index.html`: estructura del sitio.
- `styles.css`: estilos visuales, encabezado y diseño responsive.
- `script.js`: carrusel, menú, control de cantidades y envío a WhatsApp.
- `images/`: imágenes del logo, productos y bebidas.

## Requisitos

- No necesita instalación de dependencias.
- Solo necesitas abrir `index.html` en un navegador.
- Para verlo desde celular en la misma red, puedes servirlo con:

```powershell
python -m http.server 8001 --bind 0.0.0.0
```

Y abrir desde el celular:

```text
http://IP-DE-TU-PC:8001
```

## Notas

- El pedido se envía al WhatsApp configurado en `script.js`.
- El link de ubicación está configurado en `index.html`.
- Los accesos visibles a promociones fueron retirados para dejar la navegación enfocada en menú, ubicación y pedido.
