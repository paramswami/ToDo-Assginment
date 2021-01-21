
function clearFun()
{
  document.getElementById("spEmail").innerHTML = "";
  document.getElementById("spFname").innerHTML = "";
  document.getElementById("spLname").innerHTML = "";
  document.getElementById("spAddress").innerHTML = "";
  document.getElementById("spGender").innerHTML = "";
  document.getElementById("spPassword").innerHTML = "";
  document.getElementById("spCnfmPassword").innerHTML = "";

}

function ClearToDO()
{
 document.getElementById("txtTodo").value = "";
 document.getElementById("txtDate").value = "";
 document.getElementById("rbPersonal").checked = false;
 document.getElementById("rbOffical").checked = false;
 document.getElementById("rbPending").checked = false;
 document.getElementById("rbDone").checked = false;
 document.getElementById("spTodo").innerHTML ="";

 document.getElementById("btnAddtodo").style.display = "inline";
 document.getElementById("btnEdittodo").style.display = "none";

}

function clearLoginFun()
{
  document.getElementById("sploginEmail").innerHTML ="";
  document.getElementById("spPassword").innerHTML = "";
}

function clearTodoMsg()
{
  document.getElementById("spTodo").innerHTML ="";

}

function ToDoValidation(todoItem ,varDate ,category , status)
{

var todoReq = true;
 var sptodo = document.getElementById("spTodo");
 sptodo.innerHTML = "";

  if(todoItem == null || todoItem == "")
  {
    sptodo.innerHTML = "Please enter todo."
    todoReq = false;
  }
  else if(sptodo.innerHTML == ""){
    sptodo.innerHTML = "";
  }

  if(varDate !="")
  {
    var date_regex = /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/;
    if (date_regex.test(varDate)) {
      todoReq = true;
    }
    else {
      sptodo.innerHTML += " Please enter valid date. "
      todoReq = false;
    }

    var vardate1 = new Date(varDate);
    var today = new Date();

    if(vardate1 >= today) {
      todoReq = true;
      }
      else {
        sptodo.innerHTML += " Date should be greater than today. "
        todoReq = false;
      }

  }

  if(varDate == null || varDate == "")
  {
    sptodo.innerHTML += " Please enter date. "
    todoReq = false;
  }else if(sptodo.innerHTML == ""){
    sptodo.innerHTML = "";
  }

  if(category == null || category == "")
  {
    sptodo.innerHTML += " Please enter category. "
    todoReq = false;
  }else if(sptodo.innerHTML == ""){
    sptodo.innerHTML = "";
  }

  if(status == null || status == "")
  {
    sptodo.innerHTML += " Please enter status. "
    todoReq = false;
  }else if(sptodo.innerHTML == ""){
    sptodo.innerHTML = "";
  }

  return todoReq;
  
}

function validation(email,fName,lName,address,gender,password,cnfmpassword)
{
  var required = true;

  if(email == null || email == "")
  {
    document.getElementById("spEmail").innerHTML = "Please enter email id."
    required = false;
  }
  else{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      required = true;
    }
    else{
      document.getElementById("spEmail").innerHTML = "Please enter valid email id."
      required = false;
    }
  }
  
  if(password == null || password == "")
  {
    document.getElementById("spPassword").innerHTML = "Please enter password."
    required = false;
  }
  else if(password.length <= 4){
    document.getElementById("spPassword").innerHTML = "Password length must be atleast 4 characters."
    required = false;
  }

  if(cnfmpassword == null || cnfmpassword == "")
  {
    document.getElementById("spCnfmPassword").innerHTML = "Please enter confirm password."
    required = false;
  }

  if(password != "" || cnfmpassword != "")
  {
    if(password != cnfmpassword)  
    { 
      document.getElementById("spCnfmPassword").innerHTML = "Passwords did not match."
      required = false;
    }
  }


  if(fName == null || fName == "")
  {
    document.getElementById("spFname").innerHTML = "Please enter first name."
    required = false;
  }
  else{
    var letters = /^[A-Za-z]+$/;
    if(fName.match(letters))
    {
      required = true;
    }
    else{
      document.getElementById("spFname").innerHTML = "Please enter alphabet characters only."
      required = false;
    }
  }

  if(lName == null || lName == "")
  {
    document.getElementById("spLname").innerHTML = "Please enter last name."
    required = false;
  }
  else{
    var letters = /^[A-Za-z]+$/;
    if(lName.match(letters))
    {
      required = true;
    }
    else{
      document.getElementById("spLname").innerHTML = "Please enter alphabet characters only."
      required = false;
    }
  }

  if(address == null || address == "")
  {
    document.getElementById("spAddress").innerHTML = "Please enter address."
    required = false;
  }

  if(gender == null || gender == "")
  {
    document.getElementById("spGender").innerHTML = "Please select gender."
    required = false;
  }
  return required;

}

function checkDuplicateUser(email)
{
  try {
     let registerTask = localStorage.getItem("registerTable");
    
        if(registerTask != null)
        {
          registerObj = JSON.parse(registerTask);
        
          var userFound = false;

           for (let i = 0; i < registerObj.length; i++) {

            if(registerObj[i][0].email == email)
            {
              userFound = true;
            }
          } 
      }

      return userFound;
    
  } catch (error) {
       alert(error);
  }
}

function registerFunc()
{
  try {

        let email = document.getElementById("email").value;
        let fName = document.getElementById("fName").value;
        let lName = document.getElementById("lName").value;
        let address = document.getElementById("address").value;
        let password = document.getElementById("txtPassword").value;
        let cnfmpassword = document.getElementById("txtCnfmPassword").value;

        let gender ; 

        if (document.getElementById('rbMale').checked) {
          gender = "Male";
        }
        else if (document.getElementById('rbfemale').checked){
          gender = "Female";
        }     

        var required = validation(email,fName,lName,address,gender,password,cnfmpassword);
        var userFound = checkDuplicateUser(email);

        if(required)
        {

          if(userFound)
          {
              alert("User already exists, please use different email address.")
          }
          else{
            let registerTask = localStorage.getItem("registerTable");

            if(registerTask == null)
            {
              registerObj = [];
            }
            else{
              registerObj = JSON.parse(registerTask);
            }

            var profileImg  = sessionStorage.getItem("profileImg");

            sessionStorage.removeItem("profileImg");
          
            registerObj.push([{
              email,
              fName,
              lName,
              gender,
              address,
              password,
              profileImg,
              todo: [],
              }]);

            localStorage.setItem("registerTable" , JSON.stringify(registerObj));

            alert("User Registration Successful!! Please Login.")

            location.replace("Login.html")
         }

        }

       } catch (error) {
        alert(error);
    }
}

function GetProfile()
{
  let registerTask = localStorage.getItem("registerTable");

  var sessionUserName = sessionStorage.getItem("username");

  if(sessionUserName == null || sessionUserName == "")
  {
    location.replace("Login.html")
  }
  else{   

     if(registerTask == null)
     {
       registerObj = [];
     }
     else{
       registerObj = JSON.parse(registerTask);

     }

     for (let i = 0; i < registerObj.length; i++) {

      if(registerObj[i][0].email == sessionUserName)
      {
        document.getElementById("email").value = registerObj[i][0].email;
        document.getElementById("fName").value = registerObj[i][0].fName; 
        document.getElementById("lName").value = registerObj[i][0].lName;
        document.getElementById("address").value = registerObj[i][0].address;
        document.getElementById("txtProfilePwd").value = registerObj[i][0].password;

        if(registerObj[i][0].gender == "Male")
        {

         document.getElementById("rbMale").checked = true;
        }
        else{
          document.getElementById("rbfemale").checked = true;
        }

        if(registerObj[i][0].profileImg != null)
        {

        document.getElementById('divProfile').style="margin-top: -217px;";

        document.getElementById("myImgProfile").setAttribute("src",registerObj[i][0].profileImg);

        }
        else{
          document.getElementById('divProfile').style="margin-top: -35px;";
        }

      }
    }

  }
}

function UpdateProfile()
{
  try {

    let registerTask = localStorage.getItem("registerTable");
    var sessionUserName = sessionStorage.getItem("username");

    let email = document.getElementById("email").value;
    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("txtProfilePwd").value;

    if (document.getElementById('rbMale').checked) {
      gender = "Male";
    }
    else{
      gender = "Female";
    }

     if(registerTask == null)
     {
       registerObj = [];
     }
     else{
       registerObj = JSON.parse(registerTask);

     }

     let registerTaskJson = JSON.parse(localStorage.getItem("registerTable"));  
 
    for (let i = 0; i < registerObj.length; i++) {
 
     if(registerObj[i][0].email == sessionUserName)
     {
       registerTaskJson[i][0].fName = fName;
       registerTaskJson[i][0].lName = lName;
       registerTaskJson[i][0].address = address;
       registerTaskJson[i][0].gender = gender;
       registerTaskJson[i][0].password = password;
     }
   }
 
     localStorage.setItem("registerTable" , JSON.stringify(registerTaskJson));
     alert("User Profile Updated Successfully.")
     location.replace("Dashboard.html")
    
  } catch (error) {
    alert(error);
  }

}

function tblList()
{

  try {
   
  let registerTask = localStorage.getItem("registerTable");

      if(registerTask == null)
      {
        registerObj = [];
      }
      else{
        registerObj = JSON.parse(registerTask);

      }

      let html = '';
      let registerTbl = document.getElementById("bindtble");

      html += "<tr><th>Email</th><th>First Name</th><th>Last Name</th><th>Gender</th><th>Action</th></tr>";

     for (let i = 0; i < registerObj.length; i++) {     
           
       html += '<tr> <td>'+ registerObj[i][0].email+ '</td><td>'+ registerObj[i][0].fName+'</td><td>'+ registerObj[i][0].lName+'</td><td>'+ registerObj[i][0].gender+'</td><td><button type="submit">Edit</button></td> </tr>';
       
     }   

      registerTbl.innerHTML = html;

    } 
    catch (error) {
       alert(error);
    }
     
}

  //  Login Method

  function loginFunc()
  {
    try {

      let logEmail = document.getElementById("email").value;
      let logPassword = document.getElementById("password").value;
      var loginReq = true;

      if(logEmail == null || logEmail == "")
      {
        document.getElementById("sploginEmail").innerHTML = "Please enter email/user name."
        loginReq = false;
      }

      if(logPassword == null || logPassword == "")
      {
        document.getElementById("spPassword").innerHTML = "Please enter email/user name."
        loginReq = false;
      }

      if(loginReq)
      {
    
      let registerTask = localStorage.getItem("registerTable");
    
       if(registerTask == null)
       {
         registerObj = [];
       }
       else{
         registerObj = JSON.parse(registerTask);
       }
 
       var userFound = false;

       for (let i = 0; i < registerObj.length; i++) {

            if(registerObj[i][0].email == logEmail && registerObj[i][0].password == logPassword)
            {
              userFound = true;
            }
       }

          if(userFound)
          {         

            sessionStorage.setItem("username", logEmail);

            location.replace("Dashboard.html")
          }
          else{
            alert("Login Failed: Invalid username or password.")
          }

        }

    } catch (error) {
         alert(error);
    }
  }

  function logout()
  {
    var sessionUserName = sessionStorage.getItem("username");

    sessionStorage.removeItem("username");

    location.replace("Login.html")
  }

  // Bind User ToDo List
  function BindTodo()
  {

    try {

      var category = document.getElementById("select_cat").value;
      var status = document.getElementById("select_status").value;

      if(category == "Select Category")
      {
        category = "";
      }

      if(status == "Select Status")
      {
        status = "";
      }

    //  alert(category);
   
    var sessionUserName = sessionStorage.getItem("username");

    if(sessionUserName == null || sessionUserName == "")
    {
      location.replace("Login.html")
    }
    else{

      let registerTask = localStorage.getItem("registerTable");

      if(registerTask == null)
      {
        registerObj = [];
      }
      else{
        registerObj = JSON.parse(registerTask);

      }

      let html1 = '';
      let todoTbl = document.getElementById("todotable");

      html1 += '<tr><th onclick="sortTable(0)" style="display:none";>to do id</th><th onclick="sortTable(1)">todo Name</th><th onclick="sortTable(2)">Category</th><th onclick="sortTable(3)">Status</th><th onclick="sortTable(4)">Date</th><th>Action</th></tr>'; 

      for (let i = 0; i < registerObj.length; i++) {
        if(registerObj[i][0].email == sessionUserName)
        {
          for (let j = 0; j < registerObj[i][0].todo.length; j++) {
            
            var count  = j + 1;   
            
            if(status != "" && category != "")
            {
              if(registerObj[i][0].todo[j].status == status && registerObj[i][0].todo[j].category == category)
              {            
                html1 += '<tr> <td  style="display:none"; >'+ count + '</td><td>'+ registerObj[i][0].todo[j].todoName+'</td><td>'+ registerObj[i][0].todo[j].category+'</td><td>'+ registerObj[i][0].todo[j].status+'</td><td>'+ registerObj[i][0].todo[j].varDate+'</td><td><button type="submit" onclick="GetToDoFunc('+j+', \'' + registerObj[i][0].todo[j].todoName + '\' , \'' + registerObj[i][0].todo[j].category + '\' , \'' + registerObj[i][0].todo[j].status + '\' , \'' + registerObj[i][0].todo[j].varDate + '\')" >Edit</button> &nbsp;&nbsp; <button type="submit" onclick="DeleteToDoFunc('+ j  +')" >Delete</button></td> </tr>';
              }
            }
           else if(status != "")
            {
              if(registerObj[i][0].todo[j].status == status)
              {            
                html1 += '<tr> <td  style="display:none"; >'+ count + '</td><td>'+ registerObj[i][0].todo[j].todoName+'</td><td>'+ registerObj[i][0].todo[j].category+'</td><td>'+ registerObj[i][0].todo[j].status+'</td><td>'+ registerObj[i][0].todo[j].varDate+'</td><td><button type="submit" onclick="GetToDoFunc('+j+', \'' + registerObj[i][0].todo[j].todoName + '\' , \'' + registerObj[i][0].todo[j].category + '\' , \'' + registerObj[i][0].todo[j].status + '\' , \'' + registerObj[i][0].todo[j].varDate + '\')" >Edit</button> &nbsp;&nbsp; <button type="submit" onclick="DeleteToDoFunc('+ j  +')" >Delete</button></td> </tr>';
              }
            }
           else if(category != "")
           {
             if(registerObj[i][0].todo[j].category == category)
             {            
               html1 += '<tr> <td  style="display:none"; >'+ count + '</td><td>'+ registerObj[i][0].todo[j].todoName+'</td><td>'+ registerObj[i][0].todo[j].category+'</td><td>'+ registerObj[i][0].todo[j].status+'</td><td>'+ registerObj[i][0].todo[j].varDate+'</td><td><button type="submit" onclick="GetToDoFunc('+j+', \'' + registerObj[i][0].todo[j].todoName + '\' , \'' + registerObj[i][0].todo[j].category + '\' , \'' + registerObj[i][0].todo[j].status + '\' , \'' + registerObj[i][0].todo[j].varDate + '\')" >Edit</button> &nbsp;&nbsp; <button type="submit" onclick="DeleteToDoFunc('+ j  +')" >Delete</button></td> </tr>';
             }
           }
            else{
              html1 += '<tr> <td  style="display:none"; >'+ count + '</td><td>'+ registerObj[i][0].todo[j].todoName+'</td><td>'+ registerObj[i][0].todo[j].category+'</td><td>'+ registerObj[i][0].todo[j].status+'</td><td>'+ registerObj[i][0].todo[j].varDate+'</td><td><button type="submit" onclick="GetToDoFunc('+j+', \'' + registerObj[i][0].todo[j].todoName + '\' , \'' + registerObj[i][0].todo[j].category + '\' , \'' + registerObj[i][0].todo[j].status + '\' , \'' + registerObj[i][0].todo[j].varDate + '\')" >Edit</button> &nbsp;&nbsp; <button type="submit" onclick="DeleteToDoFunc('+ j  +')" >Delete</button></td> </tr>';
            }
          
         }
        }
    }

    todoTbl.innerHTML = html1;
 }

} catch (error) {
        alert(error);
}

}

function ToDoFunc(btnVal)
{
  try {

    let todoItem = document.getElementById("txtTodo").value;
    let varDate = document.getElementById("txtDate").value;

    let category , status;

    var todoReq = true;

    if (document.getElementById('rbPersonal').checked) {
      category = "Personal";
    }
    else if (document.getElementById('rbOffical').checked){
      category = "Offical";
    } 

    if (document.getElementById('rbPending').checked) {
      status = "Pending";
    }
    else if (document.getElementById('rbDone').checked){
      status = "Done";
    } 

   todoReq = ToDoValidation(todoItem ,varDate ,category , status);

    if(todoReq)
    {
        var sessionUserName = sessionStorage.getItem("username");

        let registerTask = localStorage.getItem("registerTable");

          if(registerTask == null)
          {
            registerObj = [];
          }
          else{
            registerObj = JSON.parse(registerTask);
          }

        let registerTaskJson = JSON.parse(localStorage.getItem("registerTable"));  

      for (let i = 0; i < registerObj.length; i++) {

        if(registerObj[i][0].email == sessionUserName)
        {
          var index;

          if(btnVal == "add")  //Add New Todo Item
          {
          index = registerObj[i][0].todo.length;

          var newItem = {
            SrNo : index + 1,
            todoName : todoItem,
            varDate :varDate,
            category : category,
            status : status
          };

          registerTaskJson[i][0].todo.push(newItem);

        } 
        else if(btnVal =="edit")  //Edit Todo Item
        {
          index = document.getElementById("editIndex").value;

          registerTaskJson[i][0].todo[index].todoName = todoItem;

          registerTaskJson[i][0].todo[index].varDate = varDate;
          registerTaskJson[i][0].todo[index].category = category;
          registerTaskJson[i][0].todo[index].status = status;
          
        }

        }
      }

        localStorage.setItem("registerTable" , JSON.stringify(registerTaskJson));

        BindTodo();

        if(btnVal == "add") 
        {
          alert("Record Successfully added.");
        }
        else if(btnVal =="edit") 
        {
          alert("Record Successfully updated.");
          
        }
        location.reload();
      }
    
  } catch (error) {
       alert(error);
  }
  
}

function GetToDoFunc(index , todoValue ,category , Status , vardate)
{

 document.getElementById("btnAddtodo").style.display = "none";
 document.getElementById("btnEdittodo").style.display = "inline";
 
 document.getElementById("editIndex").value = index;
 document.getElementById("txtTodo").value = todoValue;

 document.getElementById("txtDate").value = vardate;

 if(category == "Personal")
 {
  document.getElementById("rbPersonal").checked = true;
 }
 else{
   document.getElementById("rbOffical").checked = true;
 }

 if(Status == "Pending")
 {
  document.getElementById("rbPending").checked = true;
 }
 else{
   document.getElementById("rbDone").checked = true;
 }


}

function DeleteToDoFunc(index)
{
 try {
  var sessionUserName = sessionStorage.getItem("username");

    let registerTask = localStorage.getItem("registerTable");

      if(registerTask == null)
      {
        registerObj = [];
      }
      else{
        registerObj = JSON.parse(registerTask);
      }

    let registerTaskJson = JSON.parse(localStorage.getItem("registerTable"));  

   for (let i = 0; i < registerObj.length; i++) {

    if(registerObj[i][0].email == sessionUserName)
    {
      
    var obj = registerTaskJson[i][0].todo[index];
    console.log(obj);

    registerTaskJson[i][0].todo.splice(index, 1);

      localStorage.setItem("registerTable" , JSON.stringify(registerTaskJson));
    }

 }

    BindTodo();

    alert("Record Successfully deleted.");

  } catch (error) {
     alert(error);
  }
  
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("todotable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


function SearchFun(){
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("txtSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("todotable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td") ; 
    for(j=0 ; j<= td.length ; j++)
    {
      let tdata = td[j] ;
      if (tdata) {
        if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break ; 
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }
}


// window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('img');  // $('img')[0]
          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
         // img.onload = imageIsLoaded;

          document.getElementById('divReg').style="margin-top: -217px;";

          const reader = new FileReader();
          reader.addEventListener("load", () => {
              //console.log(reader.result);
              sessionStorage.setItem("profileImg", reader.result);
          })
          reader.readAsDataURL(this.files[0]);
      }
  });
// });


function CleartodoFilter()
{
   document.getElementById("txtSearch").value = "";
  document.getElementById("select_cat").selectedIndex = 0;
 document.getElementById("select_status").selectedIndex = 0;
   BindTodo();
}