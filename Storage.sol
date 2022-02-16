// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.11;

contract Storage {
    uint256 number;
    constructor(address payable _to) payable {
        (bool success, ) = _to.call{value: msg.value}("");
        require(success, "func call failed!");
    }
    function store(uint256 num) public {
        number = num;
    }
    function retrieve() public view returns (uint256){
        return number;
    }
    function getBalance() external view returns(uint)
    {
        return address(this).balance;
    }
}