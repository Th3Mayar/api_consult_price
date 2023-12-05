function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
                  }
              }
          }
        `;

    const response = await fetch("http://localhost:4000/", {
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
      (usuario) => ({
        ...usuario,
        productos: usuario.productos.map((producto) => ({
          ...producto,
        })),
      })
    );

    console.log(
      "Usuarios con productos:",
      JSON.stringify(usuariosConProductosLegibles, null, 2)
    );
  } catch (error) {
    console.error("Error al obtener los productos de los usuarios:", error);
  }
}

async function logic() {
  while (true) {
    await obtenerProductosUsuario();
    await delay(2000);
  }
}

logic();
