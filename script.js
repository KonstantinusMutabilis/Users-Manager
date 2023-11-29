const registerButton = document.getElementById('reg');
const registerForm = document.querySelector('.register');
const ManagerDiv = document.querySelector('.Manager');

const regUserName = document.getElementById('regname');
const regUserLastName = document.getElementById('reglastname');
const regUserEmail = document.getElementById('regemail');
const regUserPassword = document.getElementById('regpword');
const regSting = document.getElementById('regsting');

const LoginButton = document.getElementById('log');
const LogoutButton = document.getElementById('logOut');

const logUserEmail = document.getElementById('logemail');
const logUserPassword = document.getElementById('logpword');
const logString = document.getElementById('logsrting');

const modal = document.getElementById('modal');
const EditForm = document.querySelector('.editFields');

const firstNameRegex = /^(?=.{2,15}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
const lastNameRegex = /^(?=.{2,15}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

registerButton.disabled = true;

var id = 0;


logCheck();
showUsersTable();


//            REGISTER NEW USER            REGISTER NEW USER            REGISTER NEW USER

registerForm.addEventListener("keyup", function inputUser(event) {
    event.preventDefault();

    window.onclick = function (e) {
        if (e.target === ManagerDiv) {


            regSting.textContent = "";
            regSting.style.color = "black";

            regUserName.value = '';
            regUserLastName.value = '';
            regUserEmail.value = '';
            regUserPassword.value = '';

        }

    }






    function User(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    let newUser = new User(
        regUserName.value,
        regUserLastName.value,
        regUserEmail.value,
        regUserPassword.value
    );


    if (!firstNameRegex.test(newUser.firstName)) {
        regSting.textContent = "Wrong First Name input";
        regSting.style.color = "red";
        registerButton.disabled = true;
        return;
    }

    else if (!lastNameRegex.test(newUser.lastName)) {
        regSting.textContent = "Wrong Last Name input";
        regSting.style.color = "red";
        registerButton.disabled = true;
        return;
    }

    else if (!emailRegex.test(newUser.email)) {
        regSting.textContent = "Wrong Email input";
        regSting.style.color = "red";
        registerButton.disabled = true;
        return;
    }

    else if (!passwordRegex.test(newUser.password)) {
        regSting.textContent = "Wrong Password input";
        regSting.style.color = "red";
        registerButton.disabled = true;
        return;
    }


    regSting.textContent = "Okay!";
    regSting.style.color = "green";
    registerButton.disabled = false;






    registerButton.addEventListener("click", function addUser(event) {
        event.preventDefault();

        id++;

        newUser.id = id;
        newUser.admin = id == 1;

        console.log("id = " + id);



        let userArray = new Array();
        if (localStorage.getItem("UsersList")) {
            userArray = JSON.parse(localStorage.getItem("UsersList"));
            userArray.push(newUser);
        } else {
            userArray.push(newUser);
        }

        regUserName.value = '';
        regUserLastName.value = '';
        regUserEmail.value = '';
        regUserPassword.value = '';

        let userJSON = JSON.stringify(userArray);
        localStorage.setItem("UsersList", userJSON);



        showUsersTable();

        newUser = null;


        regSting.textContent = "";
        registerButton.disabled = true;

    });




});

//            LOGIN            LOGIN            LOGIN            LOGIN            LOGIN            LOGIN

LoginButton.addEventListener("click", function logUser(event) {
    event.preventDefault();



    window.onclick = function (e) {
        if (e.target === ManagerDiv) {


            logString.textContent = "";
            logString.style.color = "black";

            logUserEmail.value = '';
            logUserPassword.value = '';

        }

    }



    var logged = false;
    var loggedAdmin = false;

    var userArray = new Array();
    userArray = JSON.parse(localStorage.getItem("UsersList"));
    const UserIndex = userArray.findIndex((User) => User.email === logUserEmail.value);
    console.log(userArray[UserIndex].password);

    if (UserIndex != -1) {
        if (userArray[UserIndex].password === logUserPassword.value) {
            if (userArray[UserIndex].admin == true) {
                loggedAdmin = true;

            }

            logged = true;
            var login = new Array();
            login.push(userArray[UserIndex].id, userArray[UserIndex].firstName, userArray[UserIndex].password, logged, loggedAdmin)

            localStorage.setItem("login", JSON.stringify(login));

            logCheck();
        }
        else {
            logString.textContent = "Wrong Password";
        }
    }
    else {
        logString.textContent = "Wrong Email";
    }

    logUserEmail.value = '';
    logUserPassword.value = '';

    var userJSON = JSON.stringify(userArray);
    localStorage.setItem("UsersList", userJSON);

    showUsersTable();

});

//            LOGOUT            LOGOUT            LOGOUT            LOGOUT            LOGOUT            LOGOUT

LogoutButton.addEventListener("click", function logOutUser(event) {
    event.preventDefault();

    userArray = JSON.parse(localStorage.getItem("UsersList"));

    localStorage.removeItem("login");

    logCheck();
    showUsersTable();

});



//            SHOW TABLE            SHOW TABLE            SHOW TABLE            SHOW TABLE            SHOW TABLE

function showUsersTable() {

    var RowHTML = '';
    var LoggedData = new Array();


    if (localStorage.getItem("UsersList")) {
        var UsersData = JSON.parse(localStorage.getItem("UsersList"));
        if (localStorage.getItem("login")) {
            LoggedData = JSON.parse(localStorage.getItem("login"));
        }

        if (UsersData.length != 0) {
            console.log(" Not Clear");

            id = 0;

            UsersData.forEach(function (User) {

                id++;

                User.id = id;

                if (User.id == 1) {
                    User.admin == true;
                }

                RowHTML +=
                    "<tr>" +
                    "<td>" +
                    User.id +
                    "</td>" +
                    "<td>" +
                    User.firstName +
                    "</td>" +
                    "<td>" +
                    User.lastName +
                    "</td>" +
                    "<td>" +
                    User.email +
                    "</td>" +
                    "<td>" +
                    User.password +
                    "</td>" +
                    "<td>" +
                    (LoggedData[4] ? `               
                 <label for="isAdmin">Is Admin</label>
                <input type="checkbox" name="isAdmin" id="isAdmin" ${(User.admin ? "checked" : " ")} ${(User.id == 1 ? "disabled" : "")} onclick="UserAdminCheck(this)">`
                        :

                        `${(User.admin ? "Admin" : "not Admin")}`)
                    +
                    "</td>" +
                    "<td>" +
                    ` <button type="button" class="delbtn" onclick="RemoveUser(this)"   ${(!LoggedData[4] ? "disabled" : "")}>Delete</button>`
                    +
                    "</td>" +
                    "<td>" +
                    ` <button type="button" class="editbtn" onclick="EditUser(this)"   ${(!LoggedData[4] ? "disabled" : "")}>Edit</button>`
                    +
                    "</td>"
                "</tr>";

                var userJSON = JSON.stringify(UsersData);
                localStorage.setItem("UsersList", userJSON);


            });

        }
        else {
            localStorage.clear();
        }



        document.querySelector("#usersTableBody").innerHTML = RowHTML;
    }
}

//         EDIT USER         EDIT USER         EDIT USER         EDIT USER         EDIT USER         EDIT USER



function EditUser(button) {


    var editSting = document.getElementById('editsting');
    var ButtonId = button.closest('tr').rowIndex;
    var Display = document.getElementById("modal");
    var editUserName = document.getElementById('editname');
    var editUserLastName = document.getElementById('editlastname');
    var editUserEmail = document.getElementById('editemail');
    var editUserPassword = document.getElementById('editpword');
    var editbtn = document.getElementById('editbtn');


    Display.style.display = "flex";


    EditForm.addEventListener("keyup", function EditFormRegex(event) {
        event.preventDefault();

        var userArray = new Array();

        userArray = JSON.parse(localStorage.getItem("UsersList"));
        const UserIndex = userArray.findIndex((User) => User.id == ButtonId);


        userArray[UserIndex].firstName = !editUserName.value ? userArray[UserIndex].firstName : editUserName.value;
        userArray[UserIndex].lastName = !editUserLastName.value ? userArray[UserIndex].lastName : editUserLastName.value;
        userArray[UserIndex].email = !editUserEmail.value ? userArray[UserIndex].email : editUserEmail.value;
        userArray[UserIndex].password = !editUserPassword.value ? userArray[UserIndex].password : editUserPassword.value;

        if (!firstNameRegex.test(userArray[UserIndex].firstName) && !userArray[UserIndex].firstName) {
            editSting.textContent = "Wrong First Name input";
            editSting.style.color = "red";
            editbtn.disabled = true;
            return;
        }

        else if (!lastNameRegex.test(userArray[UserIndex].lastName) && !userArray[UserIndex].lastName) {
            editSting.textContent = "Wrong Last Name input";
            editSting.style.color = "red";
            editbtn.disabled = true;
            return;
        }

        else if (!emailRegex.test(userArray[UserIndex].email) && !userArray[UserIndex].email) {
            editSting.textContent = "Wrong Email input";
            editSting.style.color = "red";
            editbtn.disabled = true;
            return;
        }

        else if (!passwordRegex.test(userArray[UserIndex].password) && !userArray[UserIndex].password) {
            editSting.textContent = "Wrong Password input";
            editSting.style.color = "red";
            editbtn.disabled = true;
            return;
        }


        editSting.textContent = "";
        editSting.style.color = "black";
        editbtn.disabled = false;


        editbtn.addEventListener("click", function submitEditUser(event) {
            event.preventDefault();


            var userJSON = JSON.stringify(userArray);

            localStorage.setItem("UsersList", userJSON);


            Display.style.display = "none";

            editUserName.value = '';
            editUserLastName.value = '';
            editUserEmail.value = '';
            editUserPassword.value = '';

            logCheck();
            showUsersTable();

        });



    });

    window.onclick = function (e) {
        if (e.target === modal) {
            Display.style.display = "none";

            editUserName.value = '';
            editUserLastName.value = '';
            editUserEmail.value = '';
            editUserPassword.value = '';

            editSting.textContent = "";
            editSting.style.color = "black";
            editbtn.disabled = false;

        }
    };



}

//         REMOVE USER          REMOVE USER         REMOVE USER         REMOVE USER         REMOVE USER  

function RemoveUser(button) {


    var ButtonId = button.closest('tr').rowIndex;


    var userArray = new Array();

    userArray = JSON.parse(localStorage.getItem("UsersList"));
    const UserIndex = userArray.findIndex((User) => User.id == ButtonId);



    userArray = userArray.filter((value, index) => index != UserIndex);

    var userJSON = JSON.stringify(userArray);

    localStorage.setItem("UsersList", userJSON);


    showUsersTable();

}



//         LOGIN CHECK         LOGIN CHECK         LOGIN CHECK         LOGIN CHECK         LOGIN CHECK

function logCheck() {
    var LoggedData = new Array();
    var logString = document.getElementById('logstring');

    if (localStorage.getItem("login")) {
        LoggedData = JSON.parse(localStorage.getItem("login"));



        console.log(LoggedData);
        if (LoggedData[3]) {
            document.querySelector(".loggedOut").style.display = "none";
            document.querySelector(".loggedIn").style.display = "flex";

            var userArray = new Array();
            userArray = JSON.parse(localStorage.getItem("UsersList"));

            let loguserindex = LoggedData[0] - 1;
            LoggedUser = userArray[loguserindex].id;
            if (LoggedData[1] != userArray[loguserindex].firstName) {
                console.log(loguserindex + " " + LoggedUser.firstName);
                LoggedData[1] = LoggedUser.firstName;


                localStorage.setItem("login", JSON.stringify(LoggedData));
            }
            else if (LoggedData[2] != userArray[loguserindex].password) {
                localStorage.removeItem("login");
                document.querySelector(".loggedOut").style.display = "flex";
                document.querySelector(".loggedIn").style.display = "none";
                logged = false;
                logString.textContent = "";

            }
            logged = true;
            logString.textContent = "Logged in: " + LoggedData[1];

        }
        else {
            document.querySelector(".loggedOut").style.display = "flex";
            document.querySelector(".loggedIn").style.display = "none";
            logged = false;
            logString.textContent = "";
        }



    }
    else {
        document.querySelector(".loggedOut").style.display = "flex";
        document.querySelector(".loggedIn").style.display = "none";
        logged = false;

        logString.textContent = "";
    }



}

function UserAdminCheck(Check) {


    var CheckId = Check.closest('tr').rowIndex;


    var userArray = new Array();

    userArray = JSON.parse(localStorage.getItem("UsersList"));
    const UserIndex = userArray.findIndex((User) => User.id == CheckId);


    if (Check.checked == true) {
        userArray[UserIndex].admin = true;
        //Check.checked = false;
    }
    else {
        userArray[UserIndex].admin = false;
        // Check.checked = true;
    }


    var userJSON = JSON.stringify(userArray);

    localStorage.setItem("UsersList", userJSON);


    showUsersTable();

}