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

let scale = 1;
const scaleFactor = 1.1; // Zoom factor per scroll
let originX, originY;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;

const main = function() {
  img.onload = function () {
    img.width = canvas.width;
    img.height = canvas.height;
    originX = canvas.width / 2;
    originY = canvas.height / 2;
    drawImage();
    setupEventListeners(); // Call function to set up interactions
  };
}

function drawImage() {
    console.log("Canvas:", canvas.width, canvas.height);
    console.log("Img:", img.width, img.height);

    ctx.save();          // save unscaled state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(originX, originY); // apply pan if needed
    ctx.scale(scale, scale);         // apply zoom AFTER clearing

    // draw stretched image to fill canvas
    ctx.drawImage(img, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    ctx.restore();
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

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

function setupEventListeners() {
    canvas.addEventListener("wheel", function (event) {
        event.preventDefault();

        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        const zoom = event.deltaY < 0 ? scaleFactor : 1 / scaleFactor;

        const newScale = scale * zoom;
        if (newScale < 1 || newScale > 5) return; // Ensure we never zoom out beyond original size

        // Adjust origin to keep zoom centered on the mouse
        originX = mouseX - (mouseX - originX) * zoom;
        originY = mouseY - (mouseY - originY) * zoom;

        scale = newScale;
        enforcePanLimits();
        drawImage();
    });

    canvas.addEventListener("mousedown", function (event) {
        if (event.button === 0) { // Left mouse button
            isDragging = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            canvas.style.cursor = "grabbing";
        }
    });

    canvas.addEventListener("mousemove", function (event) {
        if (isDragging) {
            const dx = event.clientX - lastMouseX;
            const dy = event.clientY - lastMouseY;

            originX += dx;
            originY += dy;

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            enforcePanLimits();
            drawImage();
        }
    });

    canvas.addEventListener("mouseup", function () {
        isDragging = false;
        canvas.style.cursor = "grab";
    });

    canvas.addEventListener("mouseleave", function () {
        isDragging = false;
        canvas.style.cursor = "grab";
    });
}

main();