// import libraries which we need
const Proxy = require("../../recrypt-js/index").Proxy;
const PRE = require("../../recrypt-js/index");
const Web3 =require('web3');
import contract from 'truffle-contract';
import ethjsabi from 'ethjs-abi';
const CryptoJS=require('crypto-js');
var imgText= require('../converted.js');
// Import our contract artifacts and turn them into usable abstractions.
import patient_artifacts from '../../build/contracts/Patient.json'
import condition_artifacts from '../../build/contracts/Condition.json'

// Patient is our usable abstraction, which we'll use through the code below.
var Patient = contract(patient_artifacts);
var Condition = contract(condition_artifacts);
var aesKey="BlockChainEHR";
var accounts, account;

var kp_A = Proxy.generate_key_pair();
var sk_A = Proxy.to_hex(kp_A.get_private_key().to_bytes());
var pk_A = Proxy.to_hex(kp_A.get_public_key().to_bytes());

var kp_B = Proxy.generate_key_pair();
var sk_B = Proxy.to_hex(kp_B.get_private_key().to_bytes());
var pk_B = Proxy.to_hex(kp_B.get_public_key().to_bytes());

var myPatientInstance;
var myConditionInstance;
if (typeof window === 'undefined') {
  global.window = {}
}
window.onload = function() {

console.log("window onload...");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
   
web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    //account=web3.personal.newAccount("BE1010be");
    account=accs[1];
    console.log("accounts : " + account);
    //console.log(web3.fromWei(web3.eth.getBalance(account)));
  initializePatient();
    //return account;
  });
// Initialize
function initializePatient() {
  console.log("initializing patient...");
 
  console.log("Unlocking account..");
console.log("accounts : " + account);
web3.personal.unlockAccount(account,"BE1010be",15000);
    Patient.setProvider(web3.currentProvider);
Patient.new({from: account, gas: 4712386}).then(
function(patient) {
console.log(patient);
myPatientInstance = patient;
    console.log("Patient contract address...." + myPatientInstance.address);
$("#patientContractAddress").html(myPatientInstance.address);

});
}


// // Update Patient
function updatePatient(name, dob, gender, condition, desc,allergies,physician,aadhar,address,contact,doa,hospName,bedNo,EHRDate,image) {
console.time("ET");
console.log("Updating patient...");
console.log("update patient - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);

console.log("Updating patient");
var encName= CryptoJS.AES.encrypt(name,aesKey).toString();
var encDOB=CryptoJS.AES.encrypt(dob,aesKey).toString();
var encGender=CryptoJS.AES.encrypt(gender,aesKey).toString();
//var encCondition=CryptoJS.AES.encrypt(condition,aesKey).toString();
var encDesc=CryptoJS.AES.encrypt(desc,aesKey).toString();
var encAllergies=CryptoJS.AES.encrypt(allergies,aesKey).toString();
var encPhysician=CryptoJS.AES.encrypt(physician,aesKey).toString();
var encAadhar=CryptoJS.AES.encrypt(aadhar,aesKey).toString();
var encAddress=CryptoJS.AES.encrypt(address,aesKey).toString();
var encContact=CryptoJS.AES.encrypt(contact,aesKey).toString();
var encDOA=CryptoJS.AES.encrypt(doa,aesKey).toString();
var enchospName=CryptoJS.AES.encrypt(hospName,aesKey).toString();
var encbedNo=CryptoJS.AES.encrypt(bedNo,aesKey).toString();
var encEHRDate=CryptoJS.AES.encrypt(EHRDate,aesKey).toString();
var encImage=CryptoJS.AES.encrypt(image,aesKey).toString();
myPatientInstance.setPatient(encName, encDOB, encGender, condition, encDesc,encAllergies,encPhysician,encAadhar,encAddress,encContact ,encDOA,enchospName,encbedNo,encEHRDate, encImage, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     })
// });
console.timeEnd("ET");
}

// // Update Patient Name
function updatePatientName(name) {

console.log("Updating patient name...");
console.log("update patient name- unlock account....");
web3.personal.unlockAccount(account, "BE1010be");
var encName= CryptoJS.AES.encrypt(name,aesKey).toString();
console.log("AES Encrypted Name:"+encName);

myPatientInstance.setName(encName, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient name updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     })
// });
}

// // Update Patient DOB
function updatePatientDOB(dob) {

console.log("Updating patient dob...");
console.log("update patient dob - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encDOB= CryptoJS.AES.encrypt(dob,aesKey).toString();
console.log("AES Encrypted Date Of Birth:"+encDOB);


myPatientInstance.setDateOfBirth(encDOB, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient DOB updated successfully");

              getPatientChangeEventLog();
            }

          );

// console.log("Calling SetName...");
// myPatientInstance.SetName(name, {from: accounts[0], gas: 4712387}).then(
// function() {
//       console.log("Calling SetDateOfBirth...");
//       myPatientInstance.SetDateOfBirth(dob, {from: accounts[0], gas: 4712387}).then(
//     function() {
//           console.log("Calling SetGender...");
//           myPatientInstance.SetGender(gender, {from: accounts[0], gas: 4712387}).then(
//         function(){
//               $("#updatePatientResult").html("Patient updated successfully");
//
//               getPatientChangeEventLog();
//             }
//
//             )
//     })
// });
}

// // Update Patient Gender
function updatePatientGender(gender) {

console.log("Updating patient gender...");
console.log("update patient gender - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encGender= CryptoJS.AES.encrypt(gender,aesKey).toString();
console.log("AES Encrypted Gender:"+encGender);


myPatientInstance.setGender(encGender, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient gender updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updatePatientAllergies(allergies) {

console.log("Updating patient allergies...");
console.log("update patient allergies - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encAllergies= CryptoJS.AES.encrypt(allergies,aesKey).toString();
console.log("AES Encrypted Allergies:"+encAllergies);


myPatientInstance.setAllergies(encAllergies, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient allergies updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updatePatientPhysician(physician) {

console.log("Updating patient physician...");
console.log("update patient physician - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encPhysician= CryptoJS.AES.encrypt(physician,aesKey).toString();
console.log("AES Encrypted physician:"+encPhysician);


myPatientInstance.setPhysician(encPhysician, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient physician updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updatePatientAadhar(aadhar) {

console.log("Updating patient aadhar...");
console.log("update patient aadhar - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encAadhar= CryptoJS.AES.encrypt(aadhar,aesKey).toString();
console.log("AES Encrypted aadhar:"+encAadhar);


myPatientInstance.setAadhar(encAadhar, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient aadhar updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updatePatientAddress(address) {

console.log("Updating patient address...");
console.log("update patient address - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encAddress= CryptoJS.AES.encrypt(address,aesKey).toString();
console.log("AES Encrypted address:"+encAddress);


myPatientInstance.setAddress(encAddress, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient address updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updatePatientContact(contact) {

console.log("Updating patient contact...");
console.log("update patient contact - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encContact= CryptoJS.AES.encrypt(contact,aesKey).toString();
console.log("AES Encrypted contact:"+encContact);


myPatientInstance.setContact(encContact, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient contact updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updateConditionDescription(desc){
  console.log("Updating condition description..");
  console.log("Update condition description-unlock account...");
  web3.personal.unlockAccount(account,"BE1010be",15000);
   var recryDesc=PRE.encryptData(pk_A, desc);
var rk = PRE.generateReEncrytionKey(sk_A, pk_B);
PRE.reEncryption(rk, recryDesc);
console.log("Recrypted Image:"+recryDesc.cipher);
var descKey=recryDesc.key;
//console.log("AES Encrypted desc:"+encDesc);
   myPatientInstance.setDescription(desc, {from:account, gas:4712387}).then(
      function(){
          $("#updatePatientResult").html("Patient condition description updated successfully");
          getPatientChangeEventLog();
      }
     );
}
function updatePatientImage(image) {

console.log("Updating patient image...");
console.log("update patient image - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encImg= CryptoJS.AES.encrypt(image,aesKey).toString();
console.log("AES Encrypted desc:"+encImg);


myPatientInstance.setImage(encImg, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient image updated successfully");

              getPatientChangeEventLog();
            }

          );


}
function updateDateOfAdmission(dateOfAdmission) {

console.log("Updating date of admission...");
console.log("update date of admission - unlock account....");
web3.personal.unlockAccount(account, "BE1010be",15000);
var encDOA= CryptoJS.AES.encrypt(dateOfAdmission,aesKey).toString();
console.log("AES Encrypted desc:"+encDOA);


myPatientInstance.setDateOfAdmission(encDOA, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient date of admission updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// // Update Patient Condition
function updatePatientCondition(condition) {

console.log("Updating patient condition...");
console.log("update patient condition - unlock account....");
web3.personal.unlockAccount(account);



myPatientInstance.addCondition(condition, condition, {from: account, gas: 4712387}).then(
        function(){
              $("#updatePatientResult").html("Patient condition updated successfully");

              getPatientChangeEventLog();
            }

          );


}

// Read audit log
function getPatientChangeEventLog(){

//   var patientChangedEventAll = myPatientInstance.PatientChanged({},
//     {address:myPatientInstance.address
//     ,fromBlock: 0, toBlock: 'latest'});
// patientChangedEventAll.get(function(err, logs) {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   logs.forEach(function(log) {
//
//     console.log("Key="+ log.args.key + " Value="+ log.args.value);
//
//
//   }
//   //patientChangedEventAll.stopWatching();
//   // append details of result.args to UI
// });



  var logFilter = web3.eth.filter({address:myPatientInstance.address
    , fromBlock:0});
   logFilter.get(function(error, result){
    if(!error){
      console.log(result);
      console.log("Patient change event: " + result);

      var patientLogTable = $("#patientLog");
      var patientLogHtml = "<tr><th>Event</th><th>Name</th><th>DOB</th><th>Gender</th><th>Date of Admission</th><th>Conditions</th><th>condition Description</th><th>allergies</th><th>Physician</th><th>aadhar</th><th>address</th><th>contact</th><th>Hospital Name</th><th>bedNo</th><th>EHR date</th><th>Block #</th></tr>";
      result.forEach(function(e) {
        var abi = patient_artifacts.abi;
        console.log(abi);
        console.log(e.data);
console.log("Abi:"+abi);
        const data = ethjsabi.decodeEvent(abi[0], e.data);
        //var data=e.data;
        console.log(data);
        console.log("Decode Data: " + data[0]);

        var pi = web3.eth.contract(abi).at(e.address);
        console.log("Encrypted name:"+pi.name.call(e.blockNumber));
        console.log("Encrypted DOB:"+pi.dateOfBirth.call(e.blockNumber));
        console.log("Encrypted gender:"+pi.gender.call(e.blockNumber));
        console.log("Encrypted DOA:"+pi.dateOfAdmission.call(e.blockNumber));
         //console.log("Encrypted conditon:"+pi.getCondition.call(e.blockNumber));
        console.log("Encrypted description:"+pi.conditionDesc.call(e.blockNumber));
       console.log("Encrypted allergy:"+pi.getAllergy.call(e.blockNumber));
       console.log("Encrypted physician:"+pi.getPhysician.call(e.blockNumber));
      console.log("Encrypted Aadhar:"+pi.aadhar.call(e.blockNumber));
      console.log("Encrypted Address:"+pi.address1.call(e.blockNumber));
      console.log("Encrypted contact:"+pi.contact.call(e.blockNumber));
       console.log("Encrypted hospital name:"+pi.hospName.call(e.blockNumber));
        console.log("Encrypted bed no:"+pi.bedNo.call(e.blockNumber));
        console.log("Encrypted ehr date:"+pi.EHRDate.call(e.blockNumber));
        var decName=CryptoJS.AES.decrypt(pi.name.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
        var decDOB=CryptoJS.AES.decrypt(pi.dateOfBirth.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
         var decGender=CryptoJS.AES.decrypt(pi.gender.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
        // var decConditions=CryptoJS.AES.decrypt(pi.getCondition.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
         var decDOA=CryptoJS.AES.decrypt(pi.dateOfAdmission.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
       var decDesc=CryptoJS.AES.decrypt(pi.conditionDesc.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
       var decAllergies=CryptoJS.AES.decrypt(pi.getAllergy.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
      var decPhysician=CryptoJS.AES.decrypt(pi.getPhysician.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
   var decAadhar=CryptoJS.AES.decrypt(pi.aadhar.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
   var decAddress=CryptoJS.AES.decrypt(pi.address1.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
   var decContact=CryptoJS.AES.decrypt(pi.contact.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
   var dechospName=CryptoJS.AES.decrypt(pi.hospName.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
  var decbedNo=CryptoJS.AES.decrypt(pi.bedNo.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
var decEHRDate=CryptoJS.AES.decrypt(pi.EHRDate.call(e.blockNumber),aesKey).toString(CryptoJS.enc.Utf8);
        console.log("Decrypted Name=" + decName);
        console.log("dateOfBirth=" + decDOB);
        console.log("gender=" + decGender);
        console.log("date of admission="+decDOA);
        console.log("Department="+pi.getCondition.call(e.blockNumber));
        console.log("condition description="+decDesc);
        console.log("allergies="+decAllergies);
        console.log("physician="+decPhysician);
        console.log("aadhar="+decAadhar);
        console.log("address="+decAddress);
        console.log("contact="+decContact);
        console.log("hospital name="+dechospName);
        console.log("bed no="+decbedNo);
        console.log("ehr date="+decEHRDate);
        var name = decName;
        var dob = decDOB;
        var gender =decGender;
        var conditions = pi.getCondition.call(e.blockNumber);
        var dateOfAdmission=decDOA;
        var formatedConditions = formatConditions(conditions);
        var allergies=decAllergies;
        var phys=decPhysician;
        var desc=decDesc;
        var addr=decAddress;
        var aadhar=decAadhar;
        var contact=decContact;
        var hospName=dechospName;
        var bedNo=decbedNo;
        var EHRDate=decEHRDate;
        patientLogHtml = patientLogHtml + "<tr><td>" + data[0] + "</td><td>" + name + "</td><td>" + dob + "</td><td>" + gender + "</td><td>"+ dateOfAdmission + "</td><td>" + formatedConditions + "</td><td>"+desc+"</td><td>"+allergies+"</td><td>"+phys+"</td><td>" +aadhar+"</td><td>"+addr+"</td><td>"+contact+"</td><td>"+ hospName+"</td><td>"+ bedNo+"</td><td>"+ EHRDate+"</td><td>"+ e.blockNumber + "</td></tr>";

        // web3.eth.getBlock(e.blockNumber, function(err, block) {
        //   myPatientInstance.name(e.blockNumber, function(err,name) {
        //     myPatientInstance.dateOfBirth(e.blockNumber, function(err,dateOfBirth) {
        //       myPatientInstance.gender(e.blockNumber, function(err,gender) {
        //         // Add an object with all the data so it can be displayed
        //         console.log("Name: " + name);
        //         console.log("DOB: " + dateOfBirth);
        //         console.log("gender: " + gender);
        //
        //       });
        //     });
        //   });
        //   });
      }
    );

    patientLogTable.html(patientLogHtml);
    }
  });


}

function formatConditions(conditions){

  var conditionAbi = condition_artifacts.abi;
  var formatedConditions = "";
  for (var i = 0; i < conditions.length; i++) {

  if(conditions[i] != null && conditions[i] != ""){
    var ci = web3.eth.contract(conditionAbi).at(conditions[i]);
    formatedConditions = formatedConditions + ci.desc();
  }

  }

  return formatedConditions;
}



// Wire up the UI elements


$("#updatePatient").click(function() {
var name = $("#patientName").val();
var dob = $("#patientDOB").val();
    var gender = $("#patientGender").val();
    var condition = $("#patientCondition").val();
    var desc=$("#patientConditionDescription").val();
    var allergy=$("#patientAllergies").val();
    var phys=$("#patientPhysician").val();
    var aadhar=$("#patientAadhar").val();
    var address=$("#patientAddress").val();
    var contact=$("#patientContact").val();
    var doa=$("#patientDOA").val();
    var hospName=$("#hospName").val();
   var bedNo=$("#bedNo").val();
   var EHRDate=$("#EHRDate").val();
    var image = imgText;
updatePatient(name, dob, gender, condition,desc,allergy,phys,aadhar,address,contact,doa,hospName,bedNo,EHRDate,image);
});

  $("#updatePatientName").click(function() {

    var name = $("#patientName").val();
updatePatientName(name);
});

  $("#updatePatientDOB").click(function() {
var dob = $("#patientDOB").val();

updatePatientDOB(dob);

    });

  $("#updatePatientGender").click(function() {

    var gender = $("#patientGender").val();

updatePatientGender(gender);
});
$("#updateAllergies").click(function() {

    var allergies = $("#patientAllergies").val();

updatePatientAllergies(allergies);
});
$("#updatePhysician").click(function() {

    var phys = $("#patientPhysician").val();

updatePatientPhysician(phys);
});
$("#updateAadhar").click(function() {

    var aadhar = $("#patientAadhar").val();

updatePatientAadhar(aadhar);
});
$("#updateAddress").click(function() {

    var addr = $("#patientAddress").val();

updatePatientAddress(addr);
});
$("#updateContact").click(function() {

    var contact = $("#patientContact").val();

updatePatientContact(contact);
});
$("#updateDOA").click(function() {

    var DOA = $("#patientDOA").val();

updateDateOfAdmission(DOA);
});

 $("#updatePatientImage").click(function() {
 console.log('Encoded img:'+imgText);
 updatePatientImage(imgText);
   
 
});

  $("#updatePatientCondition").click(function() {

    var condition = $("#patientCondition").val();
   
updatePatientCondition(condition);
});

/*$("#updatePatientDateOfAdmission").click(function() {

    var dateOfAdmission = $("#patientDateOfAdmission").val();
   
updateDateOfAdmission(dateOfAdmission);
});*/

$("#updateDescription").click(function(){
  var desc=$("#patientConditionDescription").val();
   updateConditionDescription(desc);
});

};


