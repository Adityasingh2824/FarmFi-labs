module FarmFi::Initialize {

    use 0x1::Signer;
    use 0x1::Coin;
    use 0x1::Account;
    use 0x1::Event;
    use FarmFi::Token;
    use FarmFi::Staking;
    use FarmFi::Governance;
    use FarmFi::Marketplace;

    struct InitializationEvent has key {
        admin: address,
        token_address: address,
        staking_address: address,
        governance_address: address,
        marketplace_address: address,
    }

    struct InitializationEvents has key {
        event_handle: Event::EventHandle<InitializationEvent>,
    }

    /// Public function to initialize all contracts in the project.
    /// This function should be called only once by the admin to set up the system.
    public fun initialize_all(
        admin: &signer,
        token_name: vector<u8>,
        token_symbol: vector<u8>,
        initial_supply: u64,
        staking_reward_rate: u64,
        voting_period: u64,
        marketplace_fee: u64
    ) {
        let admin_address = Signer::address_of(admin);

        // Initialize Token contract and mint initial supply
        let token_address = initialize_token(admin, token_name, token_symbol, initial_supply);

        // Initialize Staking contract
        let staking_address = initialize_staking(admin, staking_reward_rate);

        // Initialize Governance contract
        let governance_address = initialize_governance(admin, voting_period);

        // Initialize Marketplace contract
        let marketplace_address = initialize_marketplace(admin, marketplace_fee);

        // Emit an event for the successful initialization of all contracts
        emit_initialization_event(admin, admin_address, token_address, staking_address, governance_address, marketplace_address);
    }

    /// Function to initialize the Token contract
    public fun initialize_token(
        admin: &signer,
        name: vector<u8>,
        symbol: vector<u8>,
        initial_supply: u64
    ): address {
        let admin_address = Signer::address_of(admin);

        // Initialize the Token contract and mint initial supply to admin
        Token::initialize(admin, name, symbol, initial_supply);

        // Return the token's address (admin address in this case)
        admin_address
    }

    /// Function to initialize the Staking contract with a reward rate
    public fun initialize_staking(
        admin: &signer,
        reward_rate: u64
    ): address {
        let staking_address = Signer::address_of(admin);

        // Initialize the Staking contract
        Staking::initialize(admin, reward_rate);

        // Return the staking contract's address
        staking_address
    }

    /// Function to initialize the Governance contract with a voting period
    public fun initialize_governance(
        admin: &signer,
        voting_period: u64
    ): address {
        let governance_address = Signer::address_of(admin);

        // Initialize the Governance contract
        Governance::initialize(admin, voting_period);

        // Return the governance contract's address
        governance_address
    }

    /// Function to initialize the Marketplace contract with a fee percentage
    public fun initialize_marketplace(
        admin: &signer,
        marketplace_fee: u64
    ): address {
        let marketplace_address = Signer::address_of(admin);

        // Initialize the Marketplace contract
        Marketplace::initialize(admin, marketplace_fee);

        // Return the marketplace contract's address
        marketplace_address
    }

    /// Emit an event to log all initialized contracts
    public fun emit_initialization_event(
        admin: &signer,
        admin_address: address,
        token_address: address,
        staking_address: address,
        governance_address: address,
        marketplace_address: address
    ) {
        let events = borrow_global_mut<InitializationEvents>(Signer::address_of(admin));
        Event::emit_event(
            &mut events.event_handle,
            InitializationEvent {
                admin: admin_address,
                token_address,
                staking_address,
                governance_address,
                marketplace_address,
            }
        );
    }

    /// Initialize the events resource for logging deployments
    public fun initialize_event_logging(admin: &signer) {
        let event_handle = Event::new<InitializationEvent>(admin);
        move_to(admin, InitializationEvents { event_handle });
    }

    /// Check if the caller is the admin before initializing
    public fun check_admin(admin: &signer, expected_admin: address) {
        assert!(Signer::address_of(admin) == expected_admin, 100, "Not authorized to initialize contracts");
    }
}
