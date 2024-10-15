module FarmFiLabs::Staking {

    use Aptos::Signer;
    use Aptos::Token;
    use Aptos::Event;
    use Aptos::Account;
    use Aptos::Timestamp;

    /// Struct to represent staking information for each user
    struct StakingInfo {
        staked_amount: u64,
        reward_amount: u64,
        staking_start_time: u64,
    }

    /// Struct to hold staking-related global data
    struct StakingData {
        total_staked: u64,
        reward_rate: u64,
        staking_duration: u64,
        staking_events: Event::EventHandle<StakingEvent>,
    }

    /// Event emitted when staking happens
    struct StakingEvent has copy, drop, store {
        staker: address,
        staked_amount: u64,
        timestamp: u64,
    }

    /// Resource for each staker to store their staking information
    struct StakeHolder has key {
        staking_info: StakingInfo,
    }

    /// Initialize the staking contract with global parameters
    public fun initialize(account: &signer, reward_rate: u64, staking_duration: u64) {
        let staking_events = Event::new_event_handle<StakingEvent>(account);
        move_to(account, StakingData {
            total_staked: 0,
            reward_rate: reward_rate,
            staking_duration: staking_duration,
            staking_events: staking_events,
        });
    }

    /// Allow a user to stake tokens
    public fun stake_tokens(account: &signer, amount: u64) {
        let staker_address = Signer::address_of(account);

        // Retrieve or create StakeHolder resource for the user
        if (!exists<StakeHolder>(staker_address)) {
            let staking_info = StakingInfo {
                staked_amount: amount,
                reward_amount: 0,
                staking_start_time: Timestamp::now_seconds(),
            };
            move_to(account, StakeHolder { staking_info });
        } else {
            let holder = borrow_global_mut<StakeHolder>(staker_address);
            holder.staking_info.staked_amount += amount;
        }

        // Update the total staked in the global StakingData
        let staking_data = borrow_global_mut<StakingData>(Account::address_of(account));
        staking_data.total_staked += amount;

        // Emit a staking event
        Event::emit_event(&mut staking_data.staking_events, StakingEvent {
            staker: staker_address,
            staked_amount: amount,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Unstake tokens after the required staking period
    public fun unstake_tokens(account: &signer) {
        let staker_address = Signer::address_of(account);
        assert!(exists<StakeHolder>(staker_address), 0x1);

        let holder = borrow_global_mut<StakeHolder>(staker_address);
        let current_time = Timestamp::now_seconds();
        let staking_duration = borrow_global<StakingData>(Account::address_of(account)).staking_duration;

        // Ensure staking period has passed
        assert!(current_time >= holder.staking_info.staking_start_time + staking_duration, 0x2);

        let unstaked_amount = holder.staking_info.staked_amount;

        // Update global staking data
        let staking_data = borrow_global_mut<StakingData>(Account::address_of(account));
        staking_data.total_staked -= unstaked_amount;

        // Reset the staker's information
        holder.staking_info.staked_amount = 0;
    }

    /// Claim staking rewards based on the staked amount and duration
    public fun claim_rewards(account: &signer) {
        let staker_address = Signer::address_of(account);
        assert!(exists<StakeHolder>(staker_address), 0x3);

        let holder = borrow_global_mut<StakeHolder>(staker_address);
        let current_time = Timestamp::now_seconds();

        // Calculate rewards based on time staked
        let reward_rate = borrow_global<StakingData>(Account::address_of(account)).reward_rate;
        let time_staked = current_time - holder.staking_info.staking_start_time;
        let rewards = (holder.staking_info.staked_amount * reward_rate * time_staked) / 1000000;

        holder.staking_info.reward_amount += rewards;
    }

    /// Get the total staked amount
    public fun get_total_staked(): u64 {
        let staking_data = borrow_global<StakingData>(Account::address_of(Account::create_signer()));
        staking_data.total_staked
    }

    /// Get staking info for a particular user
    public fun get_staking_info(staker: address): StakingInfo acquires StakeHolder {
        assert!(exists<StakeHolder>(staker), 0x4);
        borrow_global<StakeHolder>(staker).staking_info
    }

}
