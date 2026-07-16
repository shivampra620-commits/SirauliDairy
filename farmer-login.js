// ===============================
// Farmer Login (Firebase)
// ===============================

function farmerLogin() {

    let farmerId = document.getElementById("farmerId").value.trim();
    let mobile = document.getElementById("mobile").value.trim();

    if (farmerId == "" || mobile == "") {

        document.getElementById("msg").innerHTML =
        "❌ सभी जानकारी भरें";

        return;

    }

    farmersRef.once("value", function(snapshot){

        let found = false;

        snapshot.forEach(function(child){

            let farmer = child.val();

            if(farmer.id == farmerId && farmer.mobile == mobile){

                found = true;

                localStorage.setItem(
                    "currentFarmer",
                    JSON.stringify(farmer)
                );

                window.location.href = "farmer-dashboard.html";

            }

        });

        if(!found){

            document.getElementById("msg").innerHTML =
            "❌ Farmer ID या Mobile Number गलत है";

        }

    });

}