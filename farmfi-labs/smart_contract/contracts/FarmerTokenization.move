module <ADDRESS>::FarmerTokenization {
    use std::signer;
    use std::vector;
    use std::error;
    use <ADDRESS>::GrainToken;
    
    // Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINSUFFICIENT_RESERVE: u64 = 2;
    const ETOKENIZATION_FAILED: u64 = 3;
    
    // Struct to represent tokenized grain from a farmer
    struct FarmerTokenizedGrain has key {
        farmer: address,
        grain_amount: u64,
        token_amount: u64,
        token_id: u64,
    }
    
    // Storage for all tokenized grain entries
    struct TokenizedGrains has key {
        entries: vector<FarmerTokenizedGrain>,
    }
    
    // Initialize the FarmerTokenization module
    public fun initialize(account: &signer) {
        move_to(account, TokenizedGrains {
            entries: vector::empty<FarmerTokenizedGrain>(),
        });
    }
    
    // Tokenize grain from a farmer
    public fun tokenize_grain(account: &signer, grain_amount: u64) {
        let farmer_address = signer::address_of(account);

        // Check if the farmer has sufficient grain reserve
        if (!GrainToken::exists(farmer_address)) {
            abort EINSUFFICIENT_RESERVE;
        }

        let farmer_balance = GrainToken::borrow_global<GrainToken::Balance>(farmer_address);
        if (farmer_balance.balance < grain_amount) {
            abort EINSUFFICIENT_RESERVE;
        }

        // Mint new tokens equivalent to the grain amount
        let token_amount = grain_amount; // 1-to-1 ratio for simplicity
        GrainToken::mint(account, token_amount);

        // Add the tokenized grain entry
        let tokenized_grains = borrow_global_mut<TokenizedGrains>(farmer_address);
        let new_tokenized_grain = FarmerTokenizedGrain {
            farmer: farmer_address,
            grain_amount,
            token_amount,
            token_id: vector::length(&tokenized_grains.entries) as u64,
        };

        vector::push_back(&mut tokenized_grains.entries, new_tokenized_grain);
    }
    
    // Get all tokenized grains for a farmer
    public fun get_tokenized_grains(farmer: address): vector<FarmerTokenizedGrain> {
        let tokenized_grains = borrow_global<TokenizedGrains>(farmer);
        tokenized_grains.entries
    }

    // Redeem grain tokens for grain
    public fun redeem_tokens(account: &signer, token_id: u64, token_amount: u64) {
        let farmer_address = signer::address_of(account);
        let tokenized_grains = borrow_global_mut<TokenizedGrains>(farmer_address);

        if (token_id >= vector::length(&tokenized_grains.entries)) {
            abort ETOKENIZATION_FAILED;
        }

        let tokenized_grain = vector::borrow_mut(&mut tokenized_grains.entries, token_id);

        if (tokenized_grain.token_amount < token_amount) {
            abort EINSUFFICIENT_RESERVE;
        }

        // Burn the tokens and reduce the grain amount
        GrainToken::burn(account, token_amount);
        tokenized_grain.token_amount = tokenized_grain.token_amount - token_amount;
        tokenized_grain.grain_amount = tokenized_grain.grain_amount - token_amount;
    }
}
