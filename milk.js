// ===============================
// Sirauli Dairy - Milk V2 (Part 2A)
// ===============================

let farmers = [];
let milkData = [];
let editIndex = -1;

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

            let item = child.val();
            item.firebaseKey = child.key;

            milkData.push(item);

        });

        showMilk();

    });

    let date = document.getElementById("date");
    if (date) {
        date.value = new Date().toISOString().split("T")[0];
    }

};

// Farmer Dropdown
function loadFarmers() {

    let select = document.getElementById("farmerSelect");

    if (!select) return;

    select.innerHTML = '<option value="">Select Farmer</option>';

    farmers.forEach(function(farmer){

        select.innerHTML += `
        <option value="${farmer.id}">
            ${farmer.name}
        </option>
        `;

    });

}

// Save Milk
function saveMilk(){

    let farmer = document.getElementById("farmerSelect").value;
    let farmerName =
        document.getElementById("farmerSelect").options[
        document.getElementById("farmerSelect").selectedIndex
        ].text;

    let date = document.getElementById("date").value;
    let session = document.getElementById("session").value;
    let liter = document.getElementById("liter").value;
    let fat = document.getElementById("fat").value;
    let rate = document.getElementById("rate").value;

    if(
        farmer=="" ||
        date=="" ||
        liter=="" ||
        fat=="" ||
        rate==""
    ){
        alert("Please fill all fields");
        return;
    }

    let total = Number(liter) * Number(rate);

    let record = {
        farmerId: farmer,
        farmerName: farmerName,
        date: date,
        session: session,
        liter: liter,
        fat: fat,
        rate: rate,
        total: total
    };
if (editIndex == -1) {

    milkRef.push(record)
    .then(function () {
        alert("✅ Milk Saved Successfully");
    })
    .catch(function (error) {
        alert("Firebase Error: " + error.message);
    });

} else {

    milkRef.child(milkData[editIndex].firebaseKey).set(record)
    .then(function () {
        alert("✅ Milk Updated Successfully");
        editIndex = -1;
    })
    .catch(function (error) {
        alert("Firebase Error: " + error.message);
    });

}

    document.getElementById("farmerSelect").value = "";
    document.getElementById("date").value =
        new Date().toISOString().split("T")[0];
    document.getElementById("session").value = "Morning";
    document.getElementById("liter").value = "";
    document.getElementById("fat").value = "";
    document.getElementById("rate").value = "";

  

}

// ===============================
// Show Milk List
// ===============================

function showMilk(){

    let table = document.getElementById("milkTable");

    if(!table) return;

    table.innerHTML = "";

    milkData.forEach(function(item,index){

        table.innerHTML += `
        <tr>
            <td>${item.farmerName}</td>
            <td>${item.date}</td>
            <td>${item.session}</td>
            <td>${item.liter}</td>
            <td>${item.fat}</td>
            <td>${item.rate}</td>
            <td>₹${item.total}</td>
            <td>
                <button onclick="editMilk(${index})">
                    ✏️
                </button>
            </td>
            <td>
                <button onclick="deleteMilk(${index})">
                    🗑️
                </button>
            </td>
        </tr>
        `;

    });

}
// ===============================
// Edit Milk
// ===============================

function editMilk(index){

    let item = milkData[index];

    document.getElementById("farmerSelect").value = item.farmerId;
    document.getElementById("date").value = item.date;
    document.getElementById("session").value = item.session;
    document.getElementById("liter").value = item.liter;
    document.getElementById("fat").value = item.fat;
    document.getElementById("rate").value = item.rate;

    editIndex = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ===============================
// Delete Milk
// ===============================

function deleteMilk(index){

    let ok = confirm("Delete this milk entry?");

    if(!ok) return;

milkRef.child(milkData[index].firebaseKey).remove()
.then(function () {

    alert("✅ Milk Entry Deleted");

})
.catch(function(error){

    alert("Firebase Error: " + error.message);

});

}