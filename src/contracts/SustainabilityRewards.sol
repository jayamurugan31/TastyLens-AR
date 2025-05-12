// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SustainabilityRewards {
    struct Restaurant {
        bool isVerified;
        uint256 sustainabilityScore;
        uint256 totalRewardsIssued;
    }

    struct User {
        uint256 tokenBalance;
        uint256 totalOrders;
        uint256 sustainableOrders;
    }

    mapping(address => Restaurant) public restaurants;
    mapping(address => User) public users;
    
    event TokensMinted(address user, uint256 amount);
    event TokensRedeemed(address user, uint256 amount);
    event RestaurantVerified(address restaurant, uint256 score);

    function verifyRestaurant(address _restaurant, uint256 _score) external {
        require(_score <= 100, "Score must be between 0 and 100");
        restaurants[_restaurant].isVerified = true;
        restaurants[_restaurant].sustainabilityScore = _score;
        emit RestaurantVerified(_restaurant, _score);
    }

    function mintRewardTokens(address _user, uint256 _orderAmount, bool _isSustainable) external {
        require(restaurants[msg.sender].isVerified, "Restaurant not verified");
        
        uint256 rewardTokens = calculateRewards(_orderAmount, _isSustainable);
        users[_user].tokenBalance += rewardTokens;
        users[_user].totalOrders++;
        
        if (_isSustainable) {
            users[_user].sustainableOrders++;
        }
        
        restaurants[msg.sender].totalRewardsIssued += rewardTokens;
        emit TokensMinted(_user, rewardTokens);
    }

    function redeemTokens(uint256 _amount) external {
        require(users[msg.sender].tokenBalance >= _amount, "Insufficient tokens");
        users[msg.sender].tokenBalance -= _amount;
        emit TokensRedeemed(msg.sender, _amount);
    }

    function calculateRewards(uint256 _orderAmount, bool _isSustainable) internal pure returns (uint256) {
        // Base reward is 1% of order amount
        uint256 baseReward = _orderAmount / 100;
        
        // Additional 2% for sustainable orders
        if (_isSustainable) {
            baseReward += (_orderAmount * 2) / 100;
        }
        
        return baseReward;
    }

    function getUserStats(address _user) external view returns (
        uint256 tokenBalance,
        uint256 totalOrders,
        uint256 sustainableOrders
    ) {
        User memory user = users[_user];
        return (user.tokenBalance, user.totalOrders, user.sustainableOrders);
    }

    function getRestaurantStats(address _restaurant) external view returns (
        bool isVerified,
        uint256 sustainabilityScore,
        uint256 totalRewardsIssued
    ) {
        Restaurant memory restaurant = restaurants[_restaurant];
        return (
            restaurant.isVerified,
            restaurant.sustainabilityScore,
            restaurant.totalRewardsIssued
        );
    }
}