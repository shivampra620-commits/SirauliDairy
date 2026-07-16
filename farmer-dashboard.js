// ===============================
// Farmer Dashboard (Firebase)
// ===============================

window.onload = function () {

    let farmer = JSON.parse(localStorage.getItem("currentFarmer"));

    if (!farmer) {

        window.location.href = "farmer-login.html";
        return;

    }

    document.getElementById("farmerName").innerHTML =
    "👋 Welcome, " + farmer.name;

    let totalMilk = 0;
    let totalAmount = 0;

    milkRef.on("value", function(snapshot){

        totalMilk = 0;
        totalAmount = 0;
let table = document.getElementById("milkTable");

table.innerHTML = "";

snapshot.forEach(function(child){

    let item = child.val();

    if(item.farmerId == farmer.id){

        table.innerHTML += `
        <tr>
            <td>${item.date}</td>
            <td>${item.session}</td>
            <td>${item.liter}</td>
            <td>${item.fat}</td>
            <td>₹${item.total}</td>
        </tr>
        `;

    }

});
        snapshot.forEach(function(child){

            let item = child.val();

            if(item.farmerId == farmer.id){

                totalMilk += Number(item.liter);
                totalAmount += Number(item.total);

            }

        });

        document.getElementById("totalMilk").innerHTML =
        totalMilk + " L";

        document.getElementById("totalAmount").innerHTML =
        "₹" + totalAmount;
paymentsRef.on("value", function(snapshot){

    let totalPaid = 0;

    snapshot.forEach(function(child){

        let payment = child.val();

        if(payment.farmerId == farmer.id){

            totalPaid += Number(payment.paidAmount);

        }

    });

    document.getElementById("totalPaid").innerHTML =
    "₹" + totalPaid;

    let balance = totalAmount - totalPaid;

    document.getElementById("balance").innerHTML =
    "₹" + balance;

});
    });

};

// ===============================
// Logout
// ===============================

function logoutFarmer(){

    localStorage.removeItem("currentFarmer");

    window.location.href = "farmer-login.html";

}