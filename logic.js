import scrapeEbayProductInfo from "./scrapping.js";
import {htmlSendNotify} from './message/index.js';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function registrarNotification(input) {
  const { usuario, producto, precio, notification, mensaje} = input;
  const query = `
    mutation NuevaNotificacion($input: NotificacionInput) {
      nuevaNotificacion(input: $input) {
        notification
        precio
      }
    }
    `;

    try {
      const response = await fetch("https://api-price-notify.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              usuario,
              producto,
              precio,
              notification,
              mensaje,
            },
          },
        }),
      });
  
      const data = await response.json();
      //console.log(data);
      return data; 
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }

}

async function obtenerProductosUsuario() {
  try {
    const query = `
      query obtenerUsuariosConProductos {
        obtenerUsuariosConProductos {
          id
          nombre
          apellido
          productos {
            id
            nombre
            descripcion
            precio
            precioStop
            url
          }
        }
      }
    `;

    const response = await fetch("https://api-price-notify.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });

    const data = await response.json();
    const usuariosConProductos = data.data.obtenerUsuariosConProductos;

    // Mostrar los datos de los productos de manera legible
    const usuariosConProductosLegibles = usuariosConProductos.map(
      (usuario) => {
        usuario.productos.map(async (producto) => {
          const ebayInfo = await scrapeEbayProductInfo(producto.url);
          if (ebayInfo?.precio == producto.precioStop) {
            await registrarNotification({
              producto: producto.id,
              usuario: usuario.id,
              precio: producto.precio,
              mensaje: `The product "${producto.nombre}" has reached its end.`,
              notification: htmlSendNotify({
                usuario,
                producto
              })
            });
          }
        });
      }
    );
  } catch (error) {
    console.error("Error al obtener la notification", error);
  }
}

async function logic() {
  while (true) {
    await obtenerProductosUsuario();
    await delay(86400000);
  }
}

export default logic;
