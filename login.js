// ===============================
// Admin Save
// ===============================
function saveAdmin() {

    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value.trim();

    if (username === "" || password === "") {
        alert("Username और Password भरें");
        return;
    }

    adminRef.set({
        username: username,
        password: password
    })
    .then(function () {

        alert("✅ Admin Account Created");

        window.location.href = "index.html";

    })
    .catch(function (error) {

        alert("Firebase Error: " + error.message);

    });

}

// ===============================
// Admin Login
// ===============================
function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    adminRef.once("value", function(snapshot){

        if(!snapshot.exists()){

            alert("पहले Admin Account बनाइए");

            window.location.href = "setup.html";

            return;

        }

        let admin = snapshot.val();

        if(username === admin.username && password === admin.password){

            alert("✅ Login Successful");

            window.location.href = "dashboard.html";

        }else{

            document.getElementById("msg").innerHTML =
            "❌ Username या Password गलत है";

        }

    });

}