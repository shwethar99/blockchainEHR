pragma solidity >=0.4.2;
import "./Condition.sol";

contract Patient {


  string public name = "";
  string public dateOfBirth = "";
  string public gender = "" ;
  string public image ="";
  address[] conditions;
  string public dateOfAdmission="";
  string public conditionDesc="";
  string public allergies="";
  string public physician="";
  string public aadhar="";
  string public address1="";
  string public contact="";
  string public hospName="";
  string public bedNo="";
  string public EHRDate="";
  // Event that is fired when patient is changed
  event patientChanged(string whatChanged);

  //function Patient() public{
  //  conditions = new Condition[](10);
//name = "Patient 1";
 // }

  // FAMILY^GIVEN^MIDDLE
  function setName(string memory _name) public{
    name = _name;
   emit patientChanged("name changed"); // fire the event
  }
  // YYYYMMDD
  function setDateOfBirth(string memory _dateOfBirth) public{
    dateOfBirth = _dateOfBirth;
   emit patientChanged("dateOfBirth changed"); // fire the event
  }
  // M,F,U,O
  function setGender(string memory _gender) public{
    gender = _gender;
   emit patientChanged("gender changed"); // fire the event
  }
function setImage(string memory _image) public{
    image = _image;
   emit patientChanged("image changed"); // fire the event
  }
function setDateOfAdmission(string memory _dateOfAdmission) public {
dateOfAdmission=_dateOfAdmission;
emit patientChanged("date of admission changed.");
}

  function setPatient(string memory _name, string memory _dateOfBirth, string memory _gender, string memory _condition, string memory _conditionDesc, string memory _allergies, string memory _physician, string memory _aadhar, string memory _address1,string memory _contact,string memory _dateOfAdmission,string memory _hospName, string memory _bedNo, string memory _EHRDate, string memory _image) public{
    name = _name;
    dateOfBirth = _dateOfBirth;
    gender = _gender;
    Condition c = new Condition();
    c.Condition1(_condition, _condition);
    conditions.push(address(c));
    conditionDesc=_conditionDesc;
    allergies=_allergies;
    physician=_physician;
   aadhar=_aadhar;
   address1=_address1;
   contact=_contact;
   dateOfAdmission=_dateOfAdmission;
   hospName=_hospName;
   bedNo=_bedNo;
   EHRDate=_EHRDate;
   image=_image;
   emit patientChanged("Patient Changed"); // fire the event
  }
  
  function setDescription(string memory _conditionDesc) public{
    conditionDesc=_conditionDesc;
    emit patientChanged("Condition description changed");
 }
  function addCondition(string memory _id, string memory _desc) public{
    Condition c = new Condition();
    c.Condition1(_id,_desc);
    conditions.push(address(c));
   emit patientChanged("condition added");
  }
  
  function getCondition() public returns (address[] memory ) {
    return conditions;
  }
 function getAllergy() public view returns (string memory ) {
    return allergies;
  }
function getPhysician() public view returns (string memory ) {
    return physician;
  }
function setAllergies(string memory _allergies) public{
     allergies=_allergies;
     emit patientChanged("allergy added");
  }
  function setPhysician(string memory _physician) public{
    physician=_physician;
    emit patientChanged("physician added");
  }
 function setAadhar(string memory _aadhar) public{
    aadhar=_aadhar;
    emit patientChanged("aadhar added");
  }
  function setAddress(string memory _address1) public{
    address1=_address1;
    emit patientChanged("address added");
  }
   function setContact(string memory _contact) public{
    contact=_contact;
    emit patientChanged("contact added");
  }

  
}
