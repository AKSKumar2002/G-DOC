const sheetURL = 'https://api.sheetbest.com/sheets/36d7b7c7-7c44-412e-baa3-89a9deaede05';
const params = new URLSearchParams(window.location.search);
const empID = params.get("id");

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const emp = data.find(e => e.EmployeeID === empID);
    if (!emp) return alert("Employee not found!");

    document.getElementById("name").textContent = emp.Name;
    document.getElementById("position").textContent = "Position: " + emp.Position;
    document.getElementById("email").textContent = "Email: " + emp.Email;
    document.getElementById("phone").textContent = "Phone: " + emp.Phone;
    document.getElementById("department").textContent = "Department: " + emp.Department;
    document.getElementById("photo").src = emp.PhotoURL || "https://via.placeholder.com/150";
    document.getElementById("bio").textContent = emp.Bio || "";

    if (emp.Rank === "1") {
      document.getElementById("crown").style.display = "block";
    }

    const score = parseInt(emp.Score);
    const circle = document.getElementById("scorePath");
    const text = document.getElementById("scoreText");

    let current = 0;
    const interval = setInterval(() => {
      if (current >= score) clearInterval(interval);
      else {
        current++;
        const pct = `${current}, 100`;
        circle.setAttribute("stroke-dasharray", pct);
        text.textContent = `${current}%`;
      }
    }, 20);
  });

function toggleMode() {
  document.body.classList.toggle("dark");
}
