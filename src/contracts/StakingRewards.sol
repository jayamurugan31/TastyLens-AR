// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingRewards {
    struct Stake {
        uint256 amount;
        uint256 timestamp;
        uint256 lockPeriod;
        bool isActive;
    }

    mapping(address => Stake[]) public stakes;
    mapping(address => uint256) public rewards;
    uint256 public constant REWARD_RATE = 10; // 10% APY
    uint256 public constant MIN_STAKE_PERIOD = 7 days;

    event Staked(address indexed user, uint256 amount, uint256 lockPeriod);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event RewardClaimed(address indexed user, uint256 amount);

    function stake(uint256 amount, uint256 lockPeriod) external {
        require(amount > 0, "Cannot stake 0 tokens");
        require(lockPeriod >= MIN_STAKE_PERIOD, "Lock period too short");

        stakes[msg.sender].push(Stake({
            amount: amount,
            timestamp: block.timestamp,
            lockPeriod: lockPeriod,
            isActive: true
        }));

        emit Staked(msg.sender, amount, lockPeriod);
    }

    function unstake(uint256 stakeIndex) external {
        require(stakeIndex < stakes[msg.sender].length, "Invalid stake index");
        Stake storage userStake = stakes[msg.sender][stakeIndex];
        require(userStake.isActive, "Stake already withdrawn");
        require(
            block.timestamp >= userStake.timestamp + userStake.lockPeriod,
            "Lock period not ended"
        );

        uint256 reward = calculateReward(userStake);
        userStake.isActive = false;
        rewards[msg.sender] += reward;

        emit Unstaked(msg.sender, userStake.amount, reward);
    }

    function claimRewards() external {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        rewards[msg.sender] = 0;
        emit RewardClaimed(msg.sender, reward);
    }

    function calculateReward(Stake memory _stake) public pure returns (uint256) {
        uint256 stakingDuration = _stake.lockPeriod;
        uint256 annualReward = (_stake.amount * REWARD_RATE) / 100;
        return (annualReward * stakingDuration) / 365 days;
    }

    function getActiveStakes(address user) external view returns (
        uint256[] memory amounts,
        uint256[] memory timestamps,
        uint256[] memory lockPeriods,
        uint256[] memory rewards
    ) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < stakes[user].length; i++) {
            if (stakes[user][i].isActive) {
                activeCount++;
            }
        }

        amounts = new uint256[](activeCount);
        timestamps = new uint256[](activeCount);
        lockPeriods = new uint256[](activeCount);
        rewards = new uint256[](activeCount);

        uint256 j = 0;
        for (uint256 i = 0; i < stakes[user].length; i++) {
            if (stakes[user][i].isActive) {
                amounts[j] = stakes[user][i].amount;
                timestamps[j] = stakes[user][i].timestamp;
                lockPeriods[j] = stakes[user][i].lockPeriod;
                rewards[j] = calculateReward(stakes[user][i]);
                j++;
            }
        }

        return (amounts, timestamps, lockPeriods, rewards);
    }

    function getAvailableRewards(address user) external view returns (uint256) {
        return rewards[user];
    }
}