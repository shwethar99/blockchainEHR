pragma solidity >=0.4.2;
//import "./Condition.sol";

contract PatientWithConditionStruct {

  string public name;
  string public dateOfBirth;
  string public gender;
  //Condition[] conditions;

  struct Condition{
    // condition id
    string id;
    // condition description
    string desc;
  }

  mapping (uint => Condition) conditions;
  uint public conditionCounter = 0;

  // Event that is fired when patient is changed
  event patientChanged(string whatChanged);

  /*function Patient() public{
    conditions = new Condition[](10);
  }*/

  // FAMILY^GIVEN^MIDDLE
  function setName(string memory _name) public {
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

  function setPatient(string memory _name, string memory _dateOfBirth, string memory _gender, string memory _condition) public {
    name = _name;
    dateOfBirth = _dateOfBirth;
    gender = _gender;
    conditions[conditionCounter] = Condition(_condition, _condition);
    conditionCounter++;
    /*Condition c = new Condition(_condition, _condition);
    conditions.push(c);*/
    emit patientChanged("Patient Changed"); // fire the event
  }

  function addCondition(string memory _id, string memory _desc) public{
    /*Condition c = new Condition(_id, _desc);
    conditions.push(c);*/
    conditions[conditionCounter] = Condition(_id, _desc);
    conditionCounter++;
    emit patientChanged("condition added");
  }

  function getCondition(uint index) public view returns (string memory _id, string memory _desc) {
    string memory id = conditions[index].id;
    string memory desc = conditions[index].desc;

    return (id, desc);
  }
}
