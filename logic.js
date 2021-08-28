function showCustomer() {
  var x = document.getElementById("customerDetails");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showTable() {
  var x = document.getElementById("customerTable");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showremoveCustomer() {
  var x = document.getElementById("customerRemoval");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function idGenerator() {
    function randid() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaa'-'aaaa
    return randid() + '-' + randid() ;
}

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

let bookingData = [];

function loadTableData(bookingData){
  const tableBody = document.getElementById('tableData');
  let dataHTML = '';

  for(let booking of bookingData){
    dataHTML += `<tr><td>${booking.id}</td><td>${booking.name}</td><td>${booking.number}</td><td>${booking.time}</td></tr>`;
  }

  tableBody.innerHTML = dataHTML;
}

function countingCustomer(){
  document.getElementById("Counter").textContent = "Current Capacity: " + bookingData.length + "/25";
  document.getElementById("Counter").style.color = "black";
}

function addCustomer(){
  if(bookingData.length < 25){
    var id_in = idGenerator();
    var name_in = document.querySelector(".custName").value;
    var number_in = document.querySelector(".custNum").value;
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

function loadErrorMessage(Msg){
  console.log("test")
  document.getElementById("errorMsg").textContent = Msg;
  document.getElementById("errorMsg").style.color = "red";
  document.getElementById("Counter").style.color = "red";
}

function removeCustomer(){
  var id_remove = document.querySelector(".snNum").value;
  let index = bookingData.findIndex(({id}) => id == id_remove)
  if(index > -1){
    bookingData.splice(index, 1);
    document.getElementById("errorMsg").textContent = "";
  }else{
    loadErrorMessage('ID not found!');
  }
  loadTableData(bookingData);
  countingCustomer();
}
