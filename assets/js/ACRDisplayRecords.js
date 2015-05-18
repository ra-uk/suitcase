/* global control */
'use strict';

var HSA_list = [
    "Rodney Kamaliza",
    "Mercy Macholowe",
    "Luka M'bawa",
    "Ben Banda",
    "Cosmas Bakili",
    "Mackson Khalawako",
    "Gladys Kaselo",
    "Tobias Kadzoma",
    "Asnty Chikapaza",
    "George Koloko",
    "Mabvuto Mandere",
    "Acklen Mdoka",
    "Maxwel Kadzilawa",
    "Chisomo Chisada ", 
    "Beatrice Chikaoneka",
    "Charles Isaac",
    "George Chidulo",
    "Emma Muwa",
    "Pemphero Katondo",
    "Catherine Kazembe"
];

function display() {
    var month = scanQueries.getQueryParameter(scanQueries.month);
    var arr_month = month.split(',');
    var hsa = scanQueries.getQueryParameter(scanQueries.hsa_name);
    var arr_hsa = hsa.split(','); 

    var total = 0;
    //TODO : temporary we don't care about months
    if (arr_hsa.length == 1) {
      if (arr_hsa[0] == "all") {
        HSA_list.forEach(function(entry){
          var record = scanQueries.getExistingRecordsByHSA(entry);
          var subTotal = record.getCount();
          if (subTotal !== 0) {
            createRow(entry, subTotal);
            total += subTotal;
          }
        });
      } else {
        // one HSA and one MONTH
        // so only one row to display
        var record = scanQueries.getExistingRecordsByHSA(arr_hsa[0]);
        total = record.getCount();
        createRow(arr_hsa[0], total);
      }
    } else {
      arr_hsa.forEach(function(entry) {
        var record = scanQueries.getExistingRecordsByHSA(entry);
        var subTotal = record.getCount();
        createRow(entry, subTotal);
        total += subTotal;
      });
    }
    $('#total').html(total);
}

function createRow(name, value) {
  var newRow = document.createElement("tr");
  newRow.className = "active";
  var newcell1 = document.createElement("td")
  newcell1.innerText = name;
  newcell1.className = "col-md-2";
  newRow.appendChild(newcell1);

  var newcell2 = document.createElement("td")
  newcell2.innerText = value;
  newcell2.className = "col-md-2";
  newRow.appendChild(newcell2);

  var myTable = document.getElementById("report-table");
  myTable.appendChild(newRow);
}
 