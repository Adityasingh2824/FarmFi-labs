module FarmFi::StakeTokens {

    use 0x1::Signer;
    use 0x1::Vector;
    use 0x1::Coin;
    use 0x1::Event;
    use FarmFi::Token;
    use 0x1::Timestamp;
    
    /// Structure representing a user's stake
    struct Stake has key {
        owner: address,
        staked_amount: u64,
        rewards: u64,
        staking_time: u64,
    }

    /// Event emitted when tokens are staked
    struct StakeEvent has key {
        owner: address,
        amount: u64,
        timestamp: u64,
    }

    /// Event emitted when tokens are unstaked
    struct UnstakeEvent has key {
        owner: address,
        amount: u64,
        rewards: u64,
        timestamp: u64,
    }

    /// Event handles for staking and unstaking events
    struct StakeEvents has key {
        stake_event: Event::EventHandle<StakeEvent>,
        unstake_event: Event::EventHandle<UnstakeEvent>,
    }

    /// Mapping of stakers by address
    struct Stakers has key {
        stakes: vector<Stake>,
    }

    /// Initialize staking events
    public fun initialize_staking_events(admin: &signer) {
        move_to(
            admin,
            StakeEvents {
                stake_event: Event::new<StakeEvent>(admin),
                unstake_event: Event::new<UnstakeEvent>(admin),
            }
        );
    }

    /// Function to stake tokens
    public fun stake_tokens(
        staker: &signer,
        amount: u64
    ) {
        let staker_address = Signer::address_of(staker);

        // Ensure that the staking events are initialized
        assert!(exists<StakeEvents>(staker_address), 100, "Staking events not initialized");

        // Ensure the staker has enough tokens
        let token_balance = Token::balance(staker_address);
        assert!(token_balance >= amount, 101, "Insufficient balance");

        // Transfer tokens to the staking contract
        Token::transfer(staker, @0x1, amount);

        // Register the stake
        let mut stake = Stake {
            owner: staker_address,
            staked_amount: amount,
            rewards: 0,
            staking_time: Timestamp::now_seconds(),
        };
        register_stake(stake);

        // Emit stake event
        let events = borrow_global_mut<StakeEvents>(staker_address);
        Event::emit_event(&mut events.stake_event, StakeEvent {
            owner: staker_address,
            amount,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Function to unstake tokens and claim rewards
    public fun unstake_tokens(
        staker: &signer
    ) {
        let staker_address = Signer::address_of(staker);

        // Retrieve the user's stake
        let mut stake = get_stake(staker_address);
        let staked_duration = Timestamp::now_seconds() - stake.staking_time;

        // Calculate rewards based on the staked duration
        let rewards = calculate_rewards(stake.staked_amount, staked_duration);

        // Transfer the staked amount and rewards back to the user
        Token::transfer(@0x1, staker_address, stake.staked_amount + rewards);

        // Remove the stake from the system
        remove_stake(staker_address);

        // Emit unstake event
        let events = borrow_global_mut<StakeEvents>(staker_address);
        Event::emit_event(&mut events.unstake_event, UnstakeEvent {
            owner: staker_address,
            amount: stake.staked_amount,
            rewards,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Helper function to calculate rewards based on staking time
    fun calculate_rewards(staked_amount: u64, staked_duration: u64): u64 {
        // Simple rewards calculation formula: 1% of staked amount per 30 days
        let reward_rate_per_second: u64 = (staked_amount * 1) / (100 * 30 * 24 * 60 * 60); // 1% per 30 days
        reward_rate_per_second * staked_duration
    }

    /// Helper function to register a new stake
    fun register_stake(stake: Stake) {
        let stakers = borrow_global_mut<Stakers>(@admin).stakes;
        Vector::push_back(&mut stakers, stake);
    }

    /// Helper function to retrieve a user's stake
    fun get_stake(staker_address: address): &mut Stake {
        let stakers = borrow_global_mut<Stakers>(@admin).stakes;
        let mut i = 0;
        while (i < Vector::length(&stakers)) {
            let stake = Vector::borrow_mut(&mut stakers, i);
            if (stake.owner == staker_address) {
                return stake;
            }
            i = i + 1;
        }
        abort(102); // Stake not found
    }

    /// Helper function to remove a user's stake after unstaking
    fun remove_stake(staker_address: address) {
        let stakers = borrow_global_mut<Stakers>(@admin).stakes;
        let mut i = 0;
        while (i < Vector::length(&stakers)) {
            let stake = Vector::borrow_mut(&mut stakers, i);
            if (stake.owner == staker_address) {
                Vector::remove(&mut stakers, i);
                return;
            }
            i = i + 1;
        }
        abort(103); // Stake not found
    }
}
