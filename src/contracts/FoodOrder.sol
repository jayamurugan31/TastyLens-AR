// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodOrder {
    struct Order {
        address customer;
        address restaurant;
        uint256 orderId;
        uint256 amount;
        bool isPaid;
        bool isVerified;
        bool isDelivered;
        uint256 timestamp;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderCreated(uint256 orderId, address customer, address restaurant, uint256 amount);
    event OrderPaid(uint256 orderId);
    event OrderVerified(uint256 orderId);
    event OrderDelivered(uint256 orderId);

    function createOrder(address _restaurant, uint256 _amount) external returns (uint256) {
        orderCount++;
        orders[orderCount] = Order({
            customer: msg.sender,
            restaurant: _restaurant,
            orderId: orderCount,
            amount: _amount,
            isPaid: false,
            isVerified: false,
            isDelivered: false,
            timestamp: block.timestamp
        });

        emit OrderCreated(orderCount, msg.sender, _restaurant, _amount);
        return orderCount;
    }

    function payOrder(uint256 _orderId) external payable {
        Order storage order = orders[_orderId];
        require(msg.sender == order.customer, "Not the customer");
        require(!order.isPaid, "Already paid");
        require(msg.value == order.amount, "Incorrect amount");

        order.isPaid = true;
        payable(order.restaurant).transfer(msg.value);

        emit OrderPaid(_orderId);
    }

    function verifyOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(msg.sender == order.restaurant, "Not the restaurant");
        require(order.isPaid, "Not paid yet");
        require(!order.isVerified, "Already verified");

        order.isVerified = true;
        emit OrderVerified(_orderId);
    }

    function confirmDelivery(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(msg.sender == order.customer, "Not the customer");
        require(order.isVerified, "Not verified yet");
        require(!order.isDelivered, "Already delivered");

        order.isDelivered = true;
        emit OrderDelivered(_orderId);
    }

    function getOrder(uint256 _orderId) external view returns (Order memory) {
        return orders[_orderId];
    }
}