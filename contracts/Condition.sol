pragma solidity >=0.4.2;

contract Condition {
    // condition id
    string public id;
    // condition description
    string public desc;


    function Condition1(string memory _id, string memory _desc) public{
      id = _id;
      desc = _desc;
    }

    // Set condition ID
    function setId(string memory _id) public{

        id = _id;
    }

    // Set condition Description
    function setDesc(string memory _desc) public {

        desc = _desc;
    }
}
