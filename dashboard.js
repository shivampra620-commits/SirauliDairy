// ===============================
// Dashboard Firebase
// ===============================

let totalFarmers = 0;
let totalMilk = 0;
let totalPayment = 0;

// Total Farmers
farmersRef.on("value", function(snapshot){

    totalFarmers = snapshot.numChildren();

    document.getElementById("farmerCount").innerHTML = totalFarmers;

});

// Total Milk
milkRef.on("value", function(snapshot){

    totalMilk = 0;

    snapshot.forEach(function(child){

        let item = child.val();

        totalMilk += Number(item.liter);

    });

    document.getElementById("milkCount").innerHTML = totalMilk;

});

// Total Payment
paymentsRef.on("value", function(snapshot){

    totalPayment = 0;

    snapshot.forEach(function(child){

        let item = child.val();

        totalPayment += Number(item.paidAmount);

    });

    document.getElementById("paymentCount").innerHTML = totalPayment;

});

// Logout
function logout(){

    alert("✅ Logout Successful");

    window.location.href = "index.html";

}

// Change Password
function changePassword(){

    let oldPass = document.getElementById("oldPassword").value.trim();
    let newPass = document.getElementById("newPassword").value.trim();

    if(oldPass=="" || newPass==""){

        alert("Please fill all fields");
        return;

    }

    adminRef.once("value",function(snapshot){

        let admin = snapshot.val();

        if(oldPass != admin.password){

            alert("❌ Old Password Wrong");
            return;

        }

        adminRef.update({

            password:newPass

        }).then(function(){

            alert("✅ Password Changed Successfully");

            document.getElementById("oldPassword").value="";
            document.getElementById("newPassword").value="";

        });

    });

}