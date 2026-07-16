window.onload = function () {

    let farmer = JSON.parse(localStorage.getItem("currentFarmer"));

    if (!farmer) {
        window.location.href = "farmer-login.html";
        return;
    }

    document.getElementById("farmerName").innerHTML = farmer.name;

    let milkData = JSON.parse(localStorage.getItem("milkData")) || [];

    let table = document.getElementById("ledgerTable");

    table.innerHTML = "";

    milkData.forEach(function(item){

        if(item.farmerId == farmer.id){

            table.innerHTML += `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.liter} L</td>
                    <td>₹${item.total}</td>
                </tr>
            `;

        }

    });

};