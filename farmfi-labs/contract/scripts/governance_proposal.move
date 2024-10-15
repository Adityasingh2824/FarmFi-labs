module FarmFi::GovernanceProposal {
    
    use 0x1::Signer;
    use 0x1::Vector;
    use 0x1::Event;
    use 0x1::Coin;
    use FarmFi::Token;
    
    /// Structure to represent a proposal.
    struct Proposal has key {
        id: u64,
        creator: address,
        description: vector<u8>,
        for_votes: u64,
        against_votes: u64,
        quorum: u64,
        executed: bool,
        end_time: u64,
    }

    /// Proposal vote event
    struct VoteEvent has key {
        voter: address,
        proposal_id: u64,
        vote_for: bool,
    }

    /// Event to track proposal creation and votes
    struct GovernanceEvents has key {
        create_event: Event::EventHandle<Proposal>,
        vote_event: Event::EventHandle<VoteEvent>,
    }

    struct Proposals has key {
        proposals: vector<Proposal>,
    }

    /// Initialize the governance events for proposal and voting tracking
    public fun initialize_governance_events(admin: &signer) {
        move_to(
            admin,
            GovernanceEvents {
                create_event: Event::new<Proposal>(admin),
                vote_event: Event::new<VoteEvent>(admin),
            }
        );
    }

    /// Create a new proposal with a description and quorum
    public fun create_proposal(
        creator: &signer,
        description: vector<u8>,
        quorum: u64,
        voting_period: u64
    ) {
        let creator_address = Signer::address_of(creator);

        // Ensure that the governance module exists
        assert!(exists<GovernanceEvents>(creator_address), 100, "Governance not initialized");

        // Get the current time to set voting period
        let end_time = CurrentTime::now_seconds() + voting_period;

        let mut proposal = Proposal {
            id: generate_proposal_id(),
            creator: creator_address,
            description,
            for_votes: 0,
            against_votes: 0,
            quorum,
            executed: false,
            end_time,
        };

        // Emit an event for the proposal creation
        let events = borrow_global_mut<GovernanceEvents>(creator_address);
        Event::emit_event(&mut events.create_event, proposal);

        // Save the proposal
        save_proposal(proposal);
    }

    /// Function for users to vote on proposals
    public fun vote(
        voter: &signer,
        proposal_id: u64,
        vote_for: bool
    ) {
        let voter_address = Signer::address_of(voter);

        // Ensure that governance events are initialized
        assert!(exists<GovernanceEvents>(voter_address), 100, "Governance not initialized");

        // Load the proposal
        let mut proposal = get_proposal(proposal_id);
        assert!(proposal.end_time > CurrentTime::now_seconds(), 101, "Voting period has ended");

        // Cast the vote
        if vote_for {
            proposal.for_votes = proposal.for_votes + 1;
        } else {
            proposal.against_votes = proposal.against_votes + 1;
        }

        // Emit a vote event
        let events = borrow_global_mut<GovernanceEvents>(voter_address);
        Event::emit_event(&mut events.vote_event, VoteEvent {
            voter: voter_address,
            proposal_id,
            vote_for,
        });

        // Update the proposal
        update_proposal(proposal);
    }

    /// Execute a proposal if voting is over and quorum is reached
    public fun execute_proposal(
        executor: &signer,
        proposal_id: u64
    ) {
        let executor_address = Signer::address_of(executor);

        // Load the proposal
        let mut proposal = get_proposal(proposal_id);
        assert!(proposal.end_time <= CurrentTime::now_seconds(), 102, "Voting period is not over");
        assert!(!proposal.executed, 103, "Proposal has already been executed");

        // Ensure quorum is reached
        let total_votes = proposal.for_votes + proposal.against_votes;
        assert!(total_votes >= proposal.quorum, 104, "Quorum not reached");

        // Execute based on the majority vote
        if proposal.for_votes > proposal.against_votes {
            // Execute logic for successful proposal
            execute_successful_proposal(executor, proposal);
        } else {
            // Proposal failed, mark as executed
            proposal.executed = true;
        }

        // Save the proposal
        update_proposal(proposal);
    }

    /// Helper function to generate a unique proposal ID
    fun generate_proposal_id(): u64 {
        let proposal_count = Proposals::length(borrow_global_mut<Proposals>(@admin).proposals);
        proposal_count + 1
    }

    /// Save a new proposal in the proposals vector
    fun save_proposal(proposal: Proposal) {
        let proposals = borrow_global_mut<Proposals>(@admin).proposals;
        Vector::push_back(&mut proposals, proposal);
    }

    /// Update an existing proposal
    fun update_proposal(proposal: Proposal) {
        let mut proposals = borrow_global_mut<Proposals>(@admin).proposals;
        let index = find_proposal_index(&proposals, proposal.id);
        Vector::borrow_mut(&mut proposals, index) = proposal;
    }

    /// Retrieve a proposal by its ID
    public fun get_proposal(proposal_id: u64): &mut Proposal {
        let proposals = borrow_global_mut<Proposals>(@admin).proposals;
        let index = find_proposal_index(&proposals, proposal_id);
        Vector::borrow_mut(&mut proposals, index)
    }

    /// Find the index of a proposal by its ID
    fun find_proposal_index(proposals: &vector<Proposal>, proposal_id: u64): u64 {
        let mut i = 0;
        while (i < Vector::length(proposals)) {
            let proposal = Vector::borrow(proposals, i);
            if (proposal.id == proposal_id) {
                return i;
            }
            i = i + 1;
        }
        abort(105); // Proposal not found
    }

    /// Logic to execute successful proposals
    fun execute_successful_proposal(executor: &signer, proposal: Proposal) {
        // Business logic to be executed if the proposal passes (e.g., staking changes, new rules)
        proposal.executed = true;
    }
}
