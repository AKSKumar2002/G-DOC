const sheetURL = 'https://api.sheetbest.com/sheets/36d7b7c7-7c44-412e-baa3-89a9deaede05';
let allData = [];

function openModal(employee) {
  document.getElementById("modalName").textContent = employee.Name;
  document.getElementById("modalDept").textContent = `Department: ${employee.Department}`;
  document.getElementById("modalEmail").textContent = `Email: ${employee.Email}`;
  document.getElementById("modalPhone").textContent = `Phone: ${employee.Phone}`;
  document.getElementById("modalPosition").textContent = `Position: ${employee.Position}`;
  document.getElementById("modalPhoto").src = employee.PhotoURL || "https://via.placeholder.com/100";
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function searchEmployee() {
  const searchId = document.getElementById("searchInput").value.trim().toUpperCase();
  if (!searchId) return alert("Please enter Employee ID");
  const found = allData.find(emp => emp.EmployeeID.toUpperCase() === searchId);
  if (found) openModal(found);
  else alert("Employee not found");
}

fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    allData = data;

    const topTen = [...data]
      .sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score))
      .slice(0, 10);

    const tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = "";

    topTen.forEach((employee, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.Stack}</td>
        <td>${employee.Name}</td>
        <td>${employee.EmployeeID}</td>
        <td>${employee.Department}</td>
        <td>${employee.Score}</td>
      `;
      row.onclick = () => openModal(employee);
      row.style.opacity = 0;
      setTimeout(() => {
        row.style.opacity = 1;
        row.style.transition = 'opacity 0.6s ease';
      }, index * 100);
      tableBody.appendChild(row);
    });
  })
  .catch(err => console.error("Error:", err));

document.getElementById("searchInput").addEventListener("keyup", function (e) {
  if (e.key === "Enter") searchEmployee();
});
