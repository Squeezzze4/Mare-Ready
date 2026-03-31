document.getElementById("mareForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const mareName = document.getElementById("mareName").value.trim();
  const lastHeatValue = document.getElementById("lastHeat").value;
  const method = document.getElementById("method").value;
  const vetName = document.getElementById("vetName").value.trim();
  const vetContact = document.getElementById("vetContact").value.trim();
  const checkDays = parseInt(document.getElementById("checkDays").value, 10);

  const lastHeat = new Date(lastHeatValue);
  const checkDates = [];

  let planHtml = "<strong>Upcoming Check Dates:</strong><br>";
  let calendarHtml = "<strong>Calendar:</strong><br>";

  for (let i = 0; i < checkDays; i++) {
    const checkDate = new Date(lastHeat);
    checkDate.setDate(checkDate.getDate() + 6 + i);

    const readableDate = checkDate.toDateString();
    const isoDate = checkDate.toISOString();

    checkDates.push(isoDate);
    planHtml += `Check ${mareName} on: ${readableDate}<br>`;
    calendarHtml += `📅 ${readableDate}<br>`;
  }

  const message = `Hi Dr. ${vetName}, can you please check ${mareName}? She should be close to ovulation. Please let me know your availability.`;

  document.getElementById("planOutput").innerHTML = planHtml;
  document.getElementById("calendarPreview").innerHTML = calendarHtml;
  document.getElementById("vetMessage").innerHTML = message;

  await fetch("https://hooks.zapier.com/hooks/catch/17315887/ung3hst/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mareName: mareName,
      method: method,
      vetName: vetName,
      vetContact: vetContact,
      checkDates: checkDates,
      message: message
    })
  });

  alert("Plan generated and sent to calendar!");
});
