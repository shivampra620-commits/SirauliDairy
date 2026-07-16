// ===============================
// Sirauli Dairy - Ledger (Firebase)
// ===============================

let farmers = [];
let milkData = [];
let payments = [];

// Page Load
window.onload = function () {

    farmersRef.on("value", function(snapshot){

        farmers = [];

        snapshot.forEach(function(child){
            farmers.push(child.val());
        });

        loadFarmers();

    });

    milkRef.on("value", function(snapshot){

        milkData = [];

        snapshot.forEach(function(child){
            milkData.push(child.val());
        });

        loadLedger();

    });

    paymentsRef.on("value", function(snapshot){

        payments = [];

        snapshot.forEach(function(child){
            payments.push(child.val());
        });

        loadLedger();

    });

};

// Farmer Dropdown
function loadFarmers(){

    let select = document.getElementById("farmerSelect");

    if(!select) return;

    select.innerHTML = "<option value=''>All Farmers</option>";

    farmers.forEach(function(farmer){

        select.innerHTML += `
        <option value="${farmer.id}">
            ${farmer.name}
        </option>
        `;

    });

}

// Ledger
function loadLedger(){

    let table = document.getElementById("ledgerTable");

    if(!table) return;

    table.innerHTML = "";

    let farmerId = document.getElementById("farmerSelect").value;
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;

    let totalMilk = 0;
    let totalAmount = 0;
    let totalPaid = 0;

    milkData.forEach(function(item){

        if(farmerId != "" && item.farmerId != farmerId) return;
        if(fromDate != "" && item.date < fromDate) return;
        if(toDate != "" && item.date > toDate) return;

        totalMilk += Number(item.liter);
        totalAmount += Number(item.total);

        table.innerHTML += `
        <tr>
            <td>${item.date}</td>
            <td>${item.session}</td>
            <td>${item.liter}</td>
            <td>${item.fat}</td>
            <td>${item.rate}</td>
            <td>₹${item.total}</td>
        </tr>
        `;

    });

    payments.forEach(function(item){

        if(farmerId != "" && item.farmerId != farmerId) return;

        totalPaid += Number(item.paidAmount || 0);

    });

    let balance = totalAmount - totalPaid;

    document.getElementById("summary").innerHTML =
    "🥛 Total Milk : " + totalMilk + " L<br>" +
    "💰 Total Amount : ₹" + totalAmount + "<br>" +
    "💵 Total Paid : ₹" + totalPaid + "<br>" +
    "📌 Balance : ₹" + balance;

}

// Download PDF
async function downloadLedger(){

    const { jsPDF } = window.jspdf;

    let doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sirauli Dairy Ledger",20,20);

    doc.setFontSize(12);

    doc.text(document.getElementById("summary").innerText,20,40);

    doc.save("Ledger.pdf");

}