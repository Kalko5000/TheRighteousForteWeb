/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @author Thomas Edward Bradley
 * @since Mar 15, 2025
 * @description Main Function to call upon all the code we need to fill in our Canvas
 * @see {@link https://github.com/Kalko5000/TheRighteousForteWeb}
 * @example {blank}
 */

const main = function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();        // Create an image element
  img.src = "../img/CoolRat.png"; // Set the image source (replace with your actual image path)

  img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image onto the canvas
  };
}

main();