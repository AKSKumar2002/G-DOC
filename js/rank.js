const sheetURL = 'https://api.sheetbest.com/sheets/36d7b7c7-7c44-412e-baa3-89a9deaede05'; // Replace with your sheet URL

function openModal(employee) {
  document.getElementById("modalName").textContent = employee.Name;
  document.getElementById("modalDept").textContent = `Department: ${employee.Department}`;
  document.getElementById("modalScore").textContent = `${employee.Score}`;
  const meter = document.getElementById("meterFill");
  meter.style.width = "0";
  setTimeout(() => {
    meter.style.width = `${employee.Score}%`;
  }, 100);
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

fetch(sheetURL)
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = "";

    data.forEach((employee, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${employee.Rank}</td>
        <td>${employee.Name}</td>
        <td>${employee.Department}</td>
        <td>${employee.Score}</td>
      `;

      row.onclick = () => openModal(employee);

      row.style.opacity = 0;
      setTimeout(() => {
        row.style.opacity = 1;
        row.style.transition = 'opacity 0.6s ease';
      }, index * 150);

      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error loading data:", error));
