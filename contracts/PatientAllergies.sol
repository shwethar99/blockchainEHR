pragma solidity >=0.4.2;

contract PatientAllergies {
    // the address of the owner (the patient)
    address public owner;
    // address of physician that can add allergies
    address public physician;
    // name of the patient LAST^FIRST
    string public name;
    // array of allergies this patient has
    string public allergies;

    // constructor that sets the owner to the address creating
    // this smart contract
    function PatientAllergies1() public{
        owner = msg.sender;
    }

    // allows owner to change the patient name
    function SetName(string memory _name) public{
        // only allow the owner to change the patient name
        if(msg.sender != owner) {
            assert(msg.sender==owner);
        }
        name = _name;
    }

    // allows physician to add an allergy
    function AddAllergy(string memory _allergie) public {
        if(msg.sender != physician) {
            assert(msg.sender==physician);
        }
        allergies=_allergie;
    }

    // allows owner to set the physician that can add allergies
    function SetPhysician(address _physician) public{
        if(msg.sender != owner) {
            assert(msg.sender==owner);
        }
        physician = _physician;
    }
}
