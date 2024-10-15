module FarmFi::DeployContract {

    use 0x1::Coin;
    use 0x1::Signer;
    use 0x1::Account;
    use 0x1::Event;
    use 0x1::Framework::AptosFramework;
    use FarmFi::Token;
    use FarmFi::Staking;
    use FarmFi::Governance;
    use FarmFi::Marketplace;

    struct DeploymentEvent has key {
        deployer: address,
        token_address: address,
        staking_address: address,
        governance_address: address,
        marketplace_address: address,
    }

    struct DeploymentEvents has key {
        event_handle: Event::EventHandle<DeploymentEvent>,
    }

    /// Stores all deployment events, which can be accessed later
    public fun initialize_events(account: &signer) {
        let event_handle = Event::new<DeploymentEvent>(account);
        move_to(account, DeploymentEvents {
            event_handle,
        });
    }

    /// Main function to deploy the contracts
    public fun deploy_all(account: &signer, initial_token_supply: u64) {
        let deployer = Signer::address_of(account);

        // Deploy Token Contract and Mint Initial Supply
        let token_address = deploy_token(account, initial_token_supply);

        // Deploy Staking Contract
        let staking_address = deploy_staking(account);

        // Deploy Governance Contract
        let governance_address = deploy_governance(account);

        // Deploy Marketplace Contract
        let marketplace_address = deploy_marketplace(account);

        // Emit an event after deployment
        emit_deployment_event(account, deployer, token_address, staking_address, governance_address, marketplace_address);
    }

    /// Helper function to deploy the Token contract and mint initial supply
    public fun deploy_token(account: &signer, initial_supply: u64): address {
        let admin_address = Signer::address_of(account);

        // Initialize Token contract and mint initial supply to the admin
        Token::initialize(account, admin_address, initial_supply);

        // Return Token module address
        admin_address
    }

    /// Helper function to deploy the Staking contract
    public fun deploy_staking(account: &signer): address {
        let staking_address = Signer::address_of(account);

        // Initialize Staking contract (passing necessary parameters)
        Staking::initialize(account);

        // Return Staking module address
        staking_address
    }

    /// Helper function to deploy the Governance contract
    public fun deploy_governance(account: &signer): address {
        let governance_address = Signer::address_of(account);

        // Initialize Governance contract
        Governance::initialize(account);

        // Return Governance module address
        governance_address
    }

    /// Helper function to deploy the Marketplace contract
    public fun deploy_marketplace(account: &signer): address {
        let marketplace_address = Signer::address_of(account);

        // Initialize Marketplace contract
        Marketplace::initialize(account);

        // Return Marketplace module address
        marketplace_address
    }

    /// Emit an event to track deployments
    public fun emit_deployment_event(
        account: &signer,
        deployer: address,
        token_address: address,
        staking_address: address,
        governance_address: address,
        marketplace_address: address
    ) {
        let events = borrow_global_mut<DeploymentEvents>(Signer::address_of(account));
        Event::emit_event(
            &mut events.event_handle,
            DeploymentEvent {
                deployer,
                token_address,
                staking_address,
                governance_address,
                marketplace_address,
            }
        );
    }

    /// Ensure that only the deployer can invoke deployment-related actions.
    public fun check_deployer(account: &signer, deployer: address) {
        assert!(Signer::address_of(account) == deployer, 100, "Not the authorized deployer");
    }
}
