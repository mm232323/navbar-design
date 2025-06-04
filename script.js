const navItems = Array.from({ length: 5 }, (_, i) => document.getElementById(`l${i + 1}`));
const mover = document.getElementById("mover");
const navbar = document.getElementById("navbar");
const container = document.getElementById("container");
const closeBtn = document.getElementById("close");
const menuBtn = document.getElementById("menu");
const cursor = document.getElementById("cursor");

const defaultScale = "scale(1)";
const activeScale = "scale(1.3)";
const defaultTop = "0px";
const activeTop = "-40px";
const cursorPositions = ["20px", "85px", "154px", "217px", "280px"];

let isDragging = false;
let lastX = 0;
let lastY = 0;

// Handle nav item click
function handleNavClick(index) {
  cursor.style.left = cursorPositions[index];
  navItems.forEach((item, i) => {
    item.style.transform = i === index ? activeScale : defaultScale;
    item.style.top = i === index ? activeTop : defaultTop;
  });
}

// Attach click listeners to nav items
navItems.forEach((item, i) => {
  item.onclick = () => handleNavClick(i);
});

// Drag logic with constraints
mover.onmousedown = (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  document.body.style.userSelect = "none";
};

document.onmousemove = (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  const style = window.getComputedStyle(navbar);
  let elementX = parseInt(style.left, 10) || 0;
  let elementY = parseInt(style.top, 10) || 0;

  let newX = elementX + deltaX;
  let newY = elementY + deltaY;

  // Apply constraints
  newX = Math.max(40, Math.min(900, newX));
  newY = Math.max(40, newY);

  navbar.style.left = `${newX}px`;
  navbar.style.top = `${newY}px`;

  lastX = e.clientX;
  lastY = e.clientY;
};

document.onmouseup = () => {
  isDragging = false;
  document.body.style.userSelect = "";
};

// Close and menu logic
closeBtn.onclick = () => {
  container.style.width = "150px";
  cursor.style.transform = "scale(0)";
  navItems.forEach(item => item.style.transform = "scale(0)");
  navItems.forEach(item => item.style.display = "none");
  closeBtn.style.display = "none";
  menuBtn.style.display = "block";
};

menuBtn.onclick = () => {
  container.style.width = "510px";
  cursor.style.transform = "scale(1)";
  navItems.forEach(item => item.style.display = "block");
  navItems.forEach(item => item.style.transform = "scale(1)");
  closeBtn.style.display = "block";
  menuBtn.style.display = "none";
};

// Initialize to first nav item
handleNavClick(0);
