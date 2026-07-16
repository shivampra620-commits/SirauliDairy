// ===========================
// Report Module
// ===========================

let farmers = [];
let milkData = [];

window.onload = function () {

    farmersRef.on("value", function(snapshot){

        farmers = [];

        let farmerFilter =
        document.getElementById("farmerFilter");

        farmerFilter.innerHTML =
        '<option value="">All Farmers</option>';

        snapshot.forEach(function(child){

            let farmer = child.val();

            farmers.push(farmer);

            farmerFilter.innerHTML += `
            <option value="${farmer.id}">
                ${farmer.name}
            </option>
            `;

        });

    });

    milkRef.on("value", function(snapshot){

        milkData = [];

        snapshot.forEach(function(child){

            let item = child.val();

            milkData.push(item);

        });

        loadReport();

    });

};
function loadReport() {

    let farmer =
    document.getElementById("farmerFilter").value;

    let fromDate =
    document.getElementById("fromDate").value;

    let toDate =
    document.getElementById("toDate").value;

    let table =
    document.getElementById("reportTable");

    table.innerHTML = "";

    let totalLiter = 0;
    let totalAmount = 0;
    let totalEntries = 0;

    milkData.forEach(function (item) {

        // Farmer Filter
        if (farmer != "" && item.farmerId != farmer)
            return;

        // From Date Filter
        if (fromDate != "" && item.date < fromDate)
            return;

        // To Date Filter
        if (toDate != "" && item.date > toDate)
            return;
              totalLiter += Number(item.liter);
        totalAmount += Number(item.total);
        totalEntries++;

        table.innerHTML += `
        <tr>
            <td>${item.date}</td>
            <td>${item.farmerName}</td>
            <td>${item.liter}</td>
            <td>${item.fat}</td>
            <td>${item.rate}</td>
            <td>₹${item.total}</td>
        </tr>
        `;

    });

    document.getElementById("summary").innerHTML =
        "🥛 Total Milk : " + totalLiter + " L" +
        "<br><br>💰 Total Amount : ₹" + totalAmount +
        "<br><br>📋 Total Entries : " + totalEntries;
}
// ===========================
// Auto Refresh Report
// ===========================

document.getElementById("farmerFilter").addEventListener("change", loadReport);

document.getElementById("fromDate").addEventListener("change", loadReport);

document.getElementById("toDate").addEventListener("change", loadReport);

// ===========================
// Print Report
// ===========================

function printReport() {
    window.print();
}