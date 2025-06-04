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

// Drag logic with left and top limits
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

  let newLeft = elementX + deltaX;
  let newTop = elementY + deltaY;

  // Limit left movement between 40px and 700px
  if (newLeft < 40) newLeft = 40;
  if (newLeft > 900) newLeft = 900;

  // Limit top movement to minimum 40px
  if (newTop < 40) newTop = 40;

  navbar.style.left = `${newLeft}px`;
  navbar.style.top = `${newTop}px`;

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
  navItems.forEach(item => item.style.display = "none");
  closeBtn.style.display = "none";
  menuBtn.style.display = "block";
};

menuBtn.onclick = () => {
  container.style.width = "510px";
  cursor.style.transform = "scale(1)";
  navItems.forEach(item => item.style.display = "block");
  closeBtn.style.display = "block";
  menuBtn.style.display = "none";
};

// Initialize to first nav item
handleNavClick(0);
