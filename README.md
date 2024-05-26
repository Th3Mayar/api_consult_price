# Documentación del Script de Scraping de Páginas de Ventas

Este script está diseñado para obtener información de productos de páginas de ventas, como eBay, mediante técnicas de scraping.

## Instalación

1. Clona el repositorio en tu máquina local.

2. Instala las dependencias necesarias utilizando npm:

   ```bash
   npm install

2. Uso

    El script proporciona dos endpoints para interactuar con él:

  1. POST /scrapping
     
  - Descripción: Obtiene información detallada de un producto de eBay utilizando su URL.
  - Método HTTP: POST
  - Datos requeridos: Un objeto JSON con la URL del producto en eBay

  ```bash
    {
      "url": "https://www.ebay.com/itm/Producto-Ejemplo/1234567890"
    }
  ```

Respuesta exitosa:

  - Código 200 OK con un objeto JSON que contiene información del producto.
    
Respuesta de error:
  - Código 400 Bad Request si no se proporciona una URL válida, o Código 500 Internal Server Error si ocurre un error durante el proceso de scraping.

  5. GET /logic
     
Descripción: 
  - Ejecuta la lógica definida en el script para procesar los productos obtenidos mediante scraping y devuelve los productos con alertas.  
  - Respuesta exitosa: Código 200 OK con un array de objetos JSON que contienen los productos con alertas.
  - Respuesta de error: Código 500 Internal Server Error si ocurre un error al procesar los productos con alertas.

  6. Ejecucion:

```bash
node index.js
