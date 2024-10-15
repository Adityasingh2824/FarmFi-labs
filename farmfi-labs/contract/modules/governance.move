module FarmFiLabs::Governance {

    use Aptos::Signer;
    use Aptos::Event;
    use Aptos::Account;
    use Aptos::Token;
    use Aptos::Timestamp;
    use Aptos::Vector;

    /// Represents a proposal in the governance system
    struct Proposal has copy, drop, store {
        proposer: address,
        description: vector<u8>,
        yes_votes: u64,
        no_votes: u64,
        end_time: u64,
        finalized: bool,
        passed: bool,
    }

    /// Stores global governance data
    struct GovernanceData has key {
        proposals: vector<Proposal>,
        event_handle: Event::EventHandle<ProposalCreatedEvent>,
    }

    /// Event emitted when a new proposal is created
    struct ProposalCreatedEvent has copy, drop, store {
        proposal_id: u64,
        proposer: address,
        description: vector<u8>,
        timestamp: u64,
    }

    /// Struct for each user storing their voting power
    struct StakeHolder has key {
        voting_power: u64,
    }

    /// Initialize the governance system
    public fun initialize(account: &signer) {
        let event_handle = Event::new_event_handle<ProposalCreatedEvent>(account);
        move_to(account, GovernanceData {
            proposals: Vector::empty<Proposal>(),
            event_handle: event_handle,
        });
    }

    /// Function to create a proposal
    public fun create_proposal(account: &signer, description: vector<u8>, duration_in_seconds: u64) {
        let proposer = Signer::address_of(account);
        let end_time = Timestamp::now_seconds() + duration_in_seconds;

        // Create a new proposal
        let new_proposal = Proposal {
            proposer: proposer,
            description: description,
            yes_votes: 0,
            no_votes: 0,
            end_time: end_time,
            finalized: false,
            passed: false,
        };

        // Store the proposal in governance data
        let governance_data = borrow_global_mut<GovernanceData>(Account::address_of(account));
        Vector::push_back(&mut governance_data.proposals, new_proposal);

        // Emit an event for proposal creation
        let proposal_id = Vector::length(&governance_data.proposals) - 1;
        Event::emit_event(&mut governance_data.event_handle, ProposalCreatedEvent {
            proposal_id: proposal_id as u64,
            proposer: proposer,
            description: description,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Vote on a proposal with the given proposal ID
    public fun vote(account: &signer, proposal_id: u64, vote_yes: bool) {
        let voter_address = Signer::address_of(account);
        let governance_data = borrow_global_mut<GovernanceData>(Account::address_of(account));
        assert!(proposal_id < Vector::length(&governance_data.proposals), 0x1);

        let proposal = &mut Vector::borrow_mut(&mut governance_data.proposals, proposal_id);
        assert!(Timestamp::now_seconds() <= proposal.end_time, 0x2); // Voting is still open
        assert!(!proposal.finalized, 0x3); // Proposal not finalized

        let holder = borrow_global<StakeHolder>(voter_address);
        let voting_power = holder.voting_power;

        if vote_yes {
            proposal.yes_votes += voting_power;
        } else {
            proposal.no_votes += voting_power;
        }
    }

    /// Finalize a proposal after voting ends
    public fun finalize_proposal(account: &signer, proposal_id: u64) {
        let governance_data = borrow_global_mut<GovernanceData>(Account::address_of(account));
        assert!(proposal_id < Vector::length(&governance_data.proposals), 0x4);

        let proposal = &mut Vector::borrow_mut(&mut governance_data.proposals, proposal_id);
        assert!(Timestamp::now_seconds() > proposal.end_time, 0x5); // Voting period is over
        assert!(!proposal.finalized, 0x6); // Proposal not yet finalized

        proposal.finalized = true;
        if proposal.yes_votes > proposal.no_votes {
            proposal.passed = true;
        } else {
            proposal.passed = false;
        }
    }

    /// Retrieve a specific proposal
    public fun get_proposal(account: &signer, proposal_id: u64): Proposal {
        let governance_data = borrow_global<GovernanceData>(Account::address_of(account));
        assert!(proposal_id < Vector::length(&governance_data.proposals), 0x7);
        Vector::borrow(&governance_data.proposals, proposal_id)
    }

    /// Allow a user to claim voting power based on their staked tokens
    public fun claim_voting_power(account: &signer, staked_tokens: u64) {
        let staker_address = Signer::address_of(account);

        // Ensure the user has enough stake to claim voting power
        if (!exists<StakeHolder>(staker_address)) {
            move_to(account, StakeHolder { voting_power: staked_tokens });
        } else {
            let holder = borrow_global_mut<StakeHolder>(staker_address);
            holder.voting_power += staked_tokens;
        }
    }

    /// Get the total number of proposals created
    public fun get_total_proposals(): u64 {
        let governance_data = borrow_global<GovernanceData>(Account::address_of(Account::create_signer()));
        Vector::length(&governance_data.proposals) as u64
    }

}
