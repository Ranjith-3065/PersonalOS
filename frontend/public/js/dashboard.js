// ---- Date in navbar ----
const today = new Date();
document.getElementById("todayDate").textContent = today.toDateString();


// -------------------- Identity --------------------
async function loadIdentity() {
  try {
    const res = await fetch('/personalOS/profile/data');
    const data = await res.json();

    if (!data.success) throw new Error("Not logged in");

    const name = data.name;
    const firstName = name.split(" ")[0];
    const firstLetter = firstName[0].toUpperCase();

    // Sidebar
    const sidebarName = document.getElementById("username");
    const sidebarAvatar = document.getElementById("avatar");
    if (sidebarName) sidebarName.textContent = name;
    if (sidebarAvatar) sidebarAvatar.textContent = firstLetter;

    // Navbar
    document.getElementById("navName").textContent = firstName;
    document.getElementById("userArea").style.display = "flex";
    document.getElementById("authLinks").style.display = "none";

    // Greeting
    document.getElementById("greet").textContent = `Welcome Back, ${firstName}`;

  } catch {
    document.getElementById("userArea").style.display = "none";
    document.getElementById("authLinks").style.display = "flex";
    document.getElementById("username").textContent = "Guest";
    document.getElementById("avatar").textContent = "?";
    document.getElementById("greet").textContent = "Welcome to PersonalOS";
  }
}
loadIdentity();


// -------------------- Animate Numbers --------------------
function animate(el, value) {
  el.textContent = value;
  el.style.transform = "scale(1.2)";
  el.classList.add("glow");

  setTimeout(() => {
    el.style.transform = "scale(1)";
    el.classList.remove("glow");
  }, 500);
}


// -------------------- Dashboard --------------------
async function loadDashboard() {
  try {
    const res = await fetch("/personalOS/dashboard/stats");
    const data = await res.json();
    if (!data.success) throw new Error("Failed");

    const stats = data.data;

    const total = document.getElementById("totalTasks");
    const done = document.getElementById("completedToday");
    const overdue = document.getElementById("overdueTasks");
    const prod = document.getElementById("productivity");
    const msg = document.getElementById("statusMessage");
    const ai = document.getElementById("aiMessage");

    animate(total, stats.totalTasks);
    animate(done, stats.completedToday);
    animate(overdue, stats.overdueTasks);
    animate(prod, stats.productivity + "%");

    // Status Message
    if (stats.overdueTasks > 0) {
      msg.textContent = "You have overdue tasks. Fix them now.";
      ai.textContent = "⚠️ Your focus is broken. Clear overdue tasks to regain momentum.";
    } else if (stats.productivity === 100) {
      msg.textContent = "Perfect execution today.";
      ai.textContent = "🔥 You are operating at peak performance. Keep going.";
    } else {
      msg.textContent = "Stay focused. You're building momentum.";
      ai.textContent = "Your progress is steady. One more completed task will boost productivity.";
    }

  } catch (err) {
    console.error("Dashboard error:", err.message);
  }
}

loadDashboard();
