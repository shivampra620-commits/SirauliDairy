// ===============================
// Payment System
// ===============================

let farmers = [];
let milkData = [];
let payments = [];

// Load Farmer List
window.onload = function () {

    farmersRef.on("value", function(snapshot){

        farmers = [];

        let farmer = document.getElementById("farmer");

        if (!farmer) return;

        farmer.innerHTML = '<option value="">Select Farmer</option>';

        snapshot.forEach(function(child){

            let item = child.val();

            farmers.push(item);

            farmer.innerHTML += `
            <option value="${item.id}">
                ${item.name}
            </option>
            `;

        });

    });

    milkRef.on("value", function(snapshot){

        milkData = [];

        snapshot.forEach(function(child){

            milkData.push(child.val());

        });

    });

};
// ===============================
// Calculate Payment
// ===============================

function calculatePayment() {

    let farmer = document.getElementById("farmer").value;
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;

    let totalMilk = 0;
    let totalAmount = 0;

    milkData.forEach(function(item){

        if (farmer != "" && item.farmerId != farmer)
            return;

        if (fromDate != "" && item.date < fromDate)
            return;

        if (toDate != "" && item.date > toDate)
            return;

        totalMilk += Number(item.liter);
        totalAmount += Number(item.total);

    });

    document.getElementById("milk").innerHTML = totalMilk;
    document.getElementById("amount").innerHTML = totalAmount;

}
// ===============================
// Save Payment
// ===============================

function savePayment() {

    let payment = {

        farmerId: document.getElementById("farmer").value,

        fromDate: document.getElementById("fromDate").value,

        toDate: document.getElementById("toDate").value,

        totalMilk: document.getElementById("milk").innerHTML,

        totalAmount: document.getElementById("amount").innerHTML,

        paidAmount: document.getElementById("paid").value,

        balance:
            Number(document.getElementById("amount").innerHTML) -
            Number(document.getElementById("paid").value)

    };

    payments.push(payment);

    localStorage.setItem("payments", JSON.stringify(payments));

    alert("✅ Payment Saved Successfully");

}
// ===============================
// Auto Balance
// ===============================

document.getElementById("paid").addEventListener("input", function () {

    let total = Number(document.getElementById("amount").innerHTML);

    let paid = Number(document.getElementById("paid").value);

    let balance = total - paid;

    if (balance < 0) {
        balance = 0;
    }

    document.getElementById("balance").innerHTML = balance;

});