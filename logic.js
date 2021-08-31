/* Hide and show elements on click */
function showHide(ID) {
  var x = document.getElementById(ID);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

/* Making sure that only Add or Remove form cannot be shown together*/
function showHideSwap(ID, ID1){
  var x = document.getElementById(ID);
  var y = document.getElementById(ID1);
  if (y.style.display === "block" && x.style.display === "none"){
    y.style.display = "none";
    x.style.display = "block";
  } else if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


/* Function for homepage */
function makeDefault() {
  var x = document.getElementById("customerDetails");
  var y = document.getElementById("customerTable");
  var z = document.getElementById("customerRemoval");
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
}

/* Function to generate ID */
function idGenerator() {
    function randid() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaa'-'aaaa
    return randid() + '-' + randid() ;
}

/* Function to generate date time */
function createDateTme(){
  var d = new Date,
  dformat = [d.getMonth()+1,
             d.getDate(),
             d.getFullYear()].join('/')+' '+
            [d.getHours(),
             d.getMinutes(),
             d.getSeconds()].join(':');
  return dformat;
}

/* To create HTML for table*/
let bookingData = [];

function loadTableData(bookingData){
  const tableBody = document.getElementById('tableData');
  let dataHTML = '';

  for(let booking of bookingData){
    dataHTML += `<tr><td>${booking.id}</td><td>${booking.name}</td><td>${booking.number}</td><td>${booking.time}</td></tr>`;
  }

  tableBody.innerHTML = dataHTML;
}

/* functions to manage customers movement and count */
function countingCustomer(){
  document.getElementById("Counter").textContent = "Current Capacity: " + bookingData.length + "/25";
  document.getElementById("Counter").style.color = "black";
}

function addCustomer(){
  if(bookingData.length < 25){
    var id_in = idGenerator();
    var name_in = document.getElementById("customerName").value;
    var number_in = document.getElementById("customerNumber").value;
    var time_in = createDateTme();
    bookingData.push({id: id_in, name: name_in, number: number_in, time: time_in})
    document.getElementById("customerName").value = "";
    document.getElementById("customerNumber").value = "";
    loadTableData(bookingData);
    countingCustomer();
  } else{
    loadErrorMessage("Reached maximum limit. Remove a customer now.");
  }
}

function removeCustomer(){
  var id_remove = document.getElementById("serialNumber").value;
  let index = bookingData.findIndex(({id}) => id == id_remove)
  if(index > -1){
    bookingData.splice(index, 1);
    document.getElementById("errorMsg").textContent = "";
    document.getElementById("serialNumber").value = "";
  }else{
    loadErrorMessage('ID not found!');
  }
  loadTableData(bookingData);
  countingCustomer();
}


function popCustomer(){
  bookingData.shift();
  loadTableData(bookingData);
  countingCustomer();
  document.getElementById("errorMsg").textContent = "";
}

/* functions to populate error message */
function loadErrorMessage(Msg){
  console.log("test")
  document.getElementById("errorMsg").textContent = Msg;
  document.getElementById("errorMsg").style.color = "red";
  document.getElementById("Counter").style.color = "red";
}
