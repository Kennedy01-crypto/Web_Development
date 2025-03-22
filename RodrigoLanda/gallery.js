// Modal functionality
const modal = document.querySelector(".modal");
const modalImg = modal.querySelector("img");
const closeBtn = modal.querySelector(".close-modal");
const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent gallery sliding when clicking image

    requestAnimationFrame(() => {
      modal.classList.add("active");
      modalImg.src = img.src;
    });
  });
});

closeBtn.addEventListener("click", () => {
  requestAnimationFrame(() => {
    modal.classList.remove("active");
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    requestAnimationFrame(() => {
      modal.classList.remove("active");
    });
  }
});
// ---------------------------------------------------------------------------------------------------------------------------------
const track = document.querySelector(".slides");
const images = [...document.querySelectorAll(".item img")];
let isMobile = window.innerWidth <= 768;

// Prevent image dragging
// for (const image of images) {
//   image.setAttribute("draggable", "false");
// }

//new Prevent image dragging
function preventImageDragging() {
  images.forEach((image) => {
    image.setAttribute("draggable", "false");
  });
}

preventImageDragging();

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

let mouseClick = 0;
let start = 0;
let end = 0;
let t = 0.04;
let transformAnimate = 0;
let rangeStart = 0;
let rangeEnd = 0;
let tRange = 0.02;
const maxRange = window.innerHeight / 2;
let autoScrollActive = true;
let autoScrollSpeed = 0.1; // Adjust speed as needed
let scrollDirection = -1; // -1 for right, 1 for left

// Initialize dataset values
// track.dataset.mouseStart = "0";
// track.dataset.prevPercentage = "0";
// track.dataset.percentage = "0";

//New Initialize dataset values
function initializeTrackData() {
  track.dataset.mouseStart = "0";
  track.dataset.prevPercentage = "0";
  track.dataset.percentage = "0";
}

initializeTrackData();

function handleMouseDown(e) {
  if (isMobile) return;

  const { clientX } = e.touches ? e.touches[0] : e;
  mouseClick = 1;
  autoScrollActive = false;
  track.dataset.mouseStart = clientX;
}

function calculateSlidePercentage(e) {
  const maxValue = window.innerWidth / 2;
  const offset = parsefloat(track.dataset.mouseStart) - e.clientX;
  const percentage = (offset / maxValue) * -100;
  return percentage;
}

function calculateTransform(percentage) {
  let transform = Math.max(
    Math.min(percentage + parseFloat(track.dataset.prevPercentage), 0),
    -100
  );
  return parseFloat(transform.toFixed(3));
}
// --------------------------------------

// -----------------------------------------------
function updateSlideData(transform) {
  track.dataset.percentage = transform;
  end = transform;
  rangeEnd = +(maxRange * (end / 100)).toFixed(0);
}

function handleMouseMove(e) {
  if (mouseClick === 0 || isMobile) return;
  // ----------------------------
  // ----------------------------
  const eventData = e instanceof TouchEvent ? e.touches[0] : e;
  const percentage = calculateSlidePercentage(eventData);
  const transform = calculateTransform(percentage);
  updateSlideData(transform);
}

function handleMouseUp() {
  if (isMobile) return;

  mouseClick = 0;
  track.dataset.prevPercentage = track.dataset.percentage;
  transformAnimate = track.dataset.percentage;
  end = parseFloat(transformAnimate);
}

function updateAutoScroll() {
  if (!autoScrollActive) return;

  let currentPosition = parseFloat(track.dataset.percentage || 0);

  // Update position based on direction
  currentPosition += autoScrollSpeed * scrollDirection;

  // Check bounds and reverse direction if needed
  if (currentPosition <= -100) {
    scrollDirection = 1; // Start moving left
    currentPosition = -100;
  } else if (currentPosition >= 0) {
    scrollDirection = -1; // Start moving right
    currentPosition = 0;
  }

  end = currentPosition;
  track.dataset.percentage = currentPosition.toString();
  track.dataset.prevPercentage = currentPosition.toString();
}

function applyImageEffects(stopAnimation) {
  images.forEach((img) => {
    img.style.objectPosition = `${rangeStart}px center`;
    img.style.transform = stopAnimation > 0 ? "scale(0.95)" : "scale(1)";
  });
}

function performAnimation() {
  if (isMobile) return;

  console.log("performAnimation called");

  if (autoScrollActive) {
    updateAutoScroll();
  }

  start = parseFloat(lerp(start, end, t).toFixed(6));
  track.style.transform = `translate3d(${start}%, -50%, 0)`;
  rangeStart = +lerp(rangeStart, rangeEnd, tRange).toFixed(1);

  const stopAnimation = parseInt(Math.abs(end - start), 10);
  applyImageEffects(stopAnimation);

  requestAnimationFrame(performAnimation);
}

// Start animation if on desktop
if (!isMobile) {
  performAnimation();
}

// Resume auto-scroll after user inactivity
let autoScrollTimeout;
function resumeAutoScroll() {
  clearTimeout(autoScrollTimeout);
  autoScrollTimeout = setTimeout(() => {
    autoScrollActive = true;
  }, 5000); // Resume auto-scroll 5 seconds after last interaction
}

// Handle resize
function handleResize() {
  isMobile = window.innerWidth <= 768;

  if (isMobile) {
    track.style.transform = "none";
    images.forEach((img) => {
      img.style.transform = "none";
      img.style.objectPosition = "center";
    });
    autoScrollActive = false;
  } else {
    start = 0;
    end = 0;
    track.dataset.prevPercentage = "0";
    track.dataset.percentage = "0";
    autoScrollActive = true;
    scrollDirection = -1;
    if (!mouseClick) performAnimation();
  }
}

window.addEventListener("resize", handleResize);

// Event listeners
["mousedown", "touchstart"].forEach((evt) => {
  window.addEventListener(
    evt,
    (e) => {
      handleMouseDown(e);
      resumeAutoScroll();
    },
    { passive: true }
  );
});

["mousemove", "touchmove"].forEach((evt) => {
  window.addEventListener(
    evt,
    (e) => {
      handleMouseMove(e);
      resumeAutoScroll();
    },
    { passive: true }
  );
});

["mouseup", "touchend"].forEach((evt) => {
  window.addEventListener(evt, (e) => {
    handleMouseUp();
    resumeAutoScroll();
  });
});

// Stop auto-scroll when user hovers
track.addEventListener("mouseenter", () => {
  autoScrollActive = false;
});

// Resume auto-scroll when user leaves
track.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!mouseClick) {
      autoScrollActive = true;
    }
  }, 1000);
});
