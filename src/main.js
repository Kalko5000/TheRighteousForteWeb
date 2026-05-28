/**
 * @author Thomas Edward Bradley
 * @since Mar 15, 2025
 * @description Main Function to call upon all the code we need to fill in our Canvas
 * @see {@link https://github.com/Kalko5000/TheRighteousForteWeb}
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "/TheRighteousForteWeb/img/ValhalisPlayerVer.webp"; // Location of image, github instance
// img.src = "img/ValhalisPlayerVer.webp"; // Location of image, local instance

// Code Variables
let scale = 1;
const scaleFactor = 1.1; // Zoom per scroll
let originX, originY;

// Listener Variables
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;

/**
 * @desc Main function called on program boot: sets up cavas, draws image & sets up event listeners
 */
const main = function() {
  img.onload = function () {
    img.width = canvas.width;
    img.height = canvas.height;

    originX = canvas.width / 2;
    originY = canvas.height / 2;

    drawImage();
    setupEventListeners();
  };
}

/**
 * @desc Draws the image to the canvas (applying relevant panning & zoom)
 */
function drawImage() {
  // console.log("Canvas:", canvas.width, canvas.height);
  // console.log("Img:", img.width, img.height);

  ctx.save();                       // Save unscaled state
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(originX, originY);  // Apply Pan
  ctx.scale(scale, scale);          // Apply Zoom

  ctx.drawImage(img, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
  ctx.restore();
}

/**
 * @desc 
 * @param {float} value 
 * @param {float} min 
 * @param {float} max 
 * @returns 
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * @desc 
 */
function enforcePanLimits() {
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  
  const minX = canvas.width - scaledWidth / 2;
  const maxX = scaledWidth / 2;
  const minY = canvas.height - scaledHeight / 2;
  const maxY = scaledHeight / 2;

  originX = clamp(originX, minX, maxX);
  originY = clamp(originY, minY, maxY);
}

/**
 * @desc Adds listeners to the canvas that trigger when the user performs certain actions
 */
function setupEventListeners() {
  /**
   * @desc Updates scale when zooming with Mouse Wheel
   */
  canvas.addEventListener("wheel", function (event) {
    event.preventDefault();                   // Prevents default page action (in this case page scroll)

    const zoom = event.deltaY < 0 ? scaleFactor : 1 / scaleFactor;

    const newScale = scale * zoom;
    if (newScale < 1 || newScale > 5) return; // Ensure we never zoom out beyond original size

    // Adjust origin to keep zoom centered on the mouse
    originX = event.offsetX - (event.offsetX - originX) * zoom;
    originY = event.offsetY - (event.offsetY - originY) * zoom;

    scale = newScale;
    enforcePanLimits();
    drawImage();
  });

  /**
   * @desc Updates relevant settings when user holds LMB over image
   */
  canvas.addEventListener("mousedown", function (event) {
    if (event.button === 0) { // Left mouse button
      isDragging = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      canvas.style.cursor = "grabbing";
    }
  });

  /**
   * @desc Check if LMB is held, if so updates panning settings and draws new image to canvas 
   */
  canvas.addEventListener("mousemove", function (event) {
    if (isDragging) {
      originX += (event.clientX - lastMouseX);
      originY += (event.clientY - lastMouseY);

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;

      enforcePanLimits();
      drawImage();
    }
  });

  /**
   * @desc Updates settings when LMB stops being held
   */
  canvas.addEventListener("mouseup", function () {
    isDragging = false;
    canvas.style.cursor = "grab";
  });

  /**
   * @desc Updates settings when cursor enters the canvas space
   */
  canvas.addEventListener("mouseenter", function () {
    // Leave dragging as it's previous value, should be false
    canvas.style.cursor = "grab";
  });

  /**
   * @desc Updates settings when cursor leaves the canvas space
   */
  canvas.addEventListener("mouseleave", function () {
    isDragging = false;
    canvas.style.cursor = "default";
  });
}

main();