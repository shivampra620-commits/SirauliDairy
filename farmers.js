// ===============================
// Sirauli Dairy - Farmers Module
// ===============================

let farmers = [];
let editIndex = -1;

// Page Load
window.onload = function () {

    farmersRef.on("value", function(snapshot){

        farmers = [];

        snapshot.forEach(function(child){

            let farmer = child.val();

            farmer.firebaseKey = child.key;

            farmers.push(farmer);

        });

        showFarmers();

    });

};

// Save Farmer
function saveFarmer() {

    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let village = document.getElementById("village").value.trim();

    if (name == "" || mobile == "" || village == "") {
        alert("Please fill all fields");
        return;
    }

    let farmer;

    if (editIndex == -1) {

        let farmerId = "F" + String(farmers.length + 1).padStart(3, "0");

        farmer = {
            id: farmerId,
            name: name,
            mobile: mobile,
            village: village
        };

        farmers.push(farmer);

    } else {

let key = farmers[editIndex].firebaseKey;

farmersRef.child(key).update({

    id: farmers[editIndex].id,
    name: name,
    mobile: mobile,
    village: village

})
.then(function(){

    alert("✅ Farmer Updated Successfully");

})
.catch(function(error){

    alert("Firebase Error: " + error.message);

});

editIndex = -1;

return;

    }

    localStorage.setItem("farmers", JSON.stringify(farmers));
// Save to Firebase
farmersRef.push({
    id: farmer.id,
    name: farmer.name,
    mobile: farmer.mobile,
    village: farmer.village
})
.then(function () {
    console.log("✅ Farmer Saved in Firebase");
})
.catch(function (error) {
    alert("Firebase Error: " + error.message);
});
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("village").value = "";

    showFarmers();

    alert("✅ Farmer Saved Successfully");

}

// Show Farmers
function showFarmers() {

    let table = document.getElementById("farmerTable");

    if (!table) return;

    table.innerHTML = "";

    farmers.forEach(function (farmer, index) {

        table.innerHTML += `
        <tr>
            <td>${farmer.id}</td>
            <td>${farmer.name}</td>
            <td>${farmer.mobile}</td>
            <td>${farmer.village}</td>
            <td>
                <button onclick="editFarmer(${index})">✏️</button>
            </td>
            <td>
                <button onclick="deleteFarmer(${index})">🗑️</button>
            </td>
        </tr>
        `;

    });

}

// Edit Farmer
function editFarmer(index) {

    let farmer = farmers[index];

    document.getElementById("name").value = farmer.name;
    document.getElementById("mobile").value = farmer.mobile;
    document.getElementById("village").value = farmer.village;

    editIndex = index;

}

// Delete Farmer


function deleteFarmer(index) {
    if (!confirm("Delete this Farmer?")) return;

    const farmer = farmers[index];

    if (!farmer || !farmer.firebaseKey) {
        alert("Farmer record not found!");
        return;
    }

    farmersRef.child(farmer.firebaseKey).remove()
        .then(function () {
            alert("Delete successful in Firebase");
        })
        .catch(function (error) {
            alert("Firebase Delete Error: " + error.message);
        });
}
