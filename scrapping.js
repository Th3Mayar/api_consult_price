import axios from "axios";
import cheerio from "cheerio";

async function scrapeEbayProductInfo(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const descriptionSpans = [
      $(".ux-textspans.ux-textspans--BOLD").first().text().trim(),
      $(".ux-textspans.ux-textspans--SECONDARY.ux-textspans--BOLD").first().text().trim(),
      $(".ux-textspans").eq(2).text().trim(), // Obtener el tercer span
      $(".infotip__content .ux-textspans").text().trim()
    ];

    const cleanSpans = descriptionSpans.map(span => span.replace(/\|/g, '').trim());
    const description = cleanSpans.join(' ');

    // Limitar la descripción a 271 caracteres y finalizar en el primer punto después de esos caracteres
    /*if (description.length > 271) {
      const truncatedDescription = description.substring(0, 271);
      const lastDotIndex = truncatedDescription.lastIndexOf('.');
      description = truncatedDescription.substring(0, lastDotIndex + 1);
    }*/

    const productName = $(".x-item-title__mainTitle").text().trim();
    const pricebien = $(".x-price-primary .ux-textspans").first().text().trim();
    const price = +pricebien.match(/\d+(\.\d+)?/g).join(".");
    /*console.log(pricebien);
    console.log("Nombre del producto:", productName);
    console.log("Precio:", price);
    console.log("Description: ", description);*/

    // Obtener rutas de las imágenes
    const imageUrls = [];
    $(".ux-image-carousel-item.image").each((index, element) => {
      const imageUrl = $(element)
        .find("img.ux-image-magnify__image--original")
        .attr("data-src");
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });

    //console.log("Rutas de las imágenes:", imageUrls);

    return {
      nombre: productName,
      descripcion: description,
      precio: price,
      images: imageUrls,
    };
  } catch (error) {
    console.error(
      "Error al obtener la información del producto:",
      error.message
    );
  }
}

export default scrapeEbayProductInfo;
