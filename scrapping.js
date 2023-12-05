import axios from 'axios';
import cheerio from 'cheerio';

async function scrapeEbayProductInfo(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const description = $('.merText body__5616e150 primary__5616e150').text().trim();
    const productName = $('.x-item-title__mainTitle').text().trim();
    const pricebien = $('.x-price-primary .ux-textspans').first().text().trim();
    const price = +pricebien.match(/\d+(\.\d+)?/g).join(".");
    console.log(pricebien)
    console.log('Nombre del producto:', productName);
    console.log('Precio:', price);

    // Obtener rutas de las imágenes
    const imageUrls = [];
    $('.ux-image-carousel-item.image').each((index, element) => {
      const imageUrl = $(element)
        .find('img.ux-image-magnify__image--original')
        .attr('data-src');
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });

    console.log('Rutas de las imágenes:', imageUrls);
    return {
        nombre: productName,
        descripcion: description,
        precio: price,
        images: imageUrls
    }
  } catch (error) {
    console.error('Error al obtener la información del producto:', error.message);
  }
}

export default scrapeEbayProductInfo;