

module <ADDRESS>::GrainToken {
    use std::signer;
    use std::vector;
    use std::string;
    use std::error;
    use std::coin;

    // Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINSUFFICIENT_BALANCE: u64 = 2;
    const ENO_CROP_FOUND: u64 = 3;

    // Resource representing a batch of tokenized crops
    struct CropToken has key, store {
        total_supply: u64,   // Total supply of tokenized crops
        crop_type: string::String, // Type of crop (e.g., wheat, rice)
        unit_value: u64,     // Value of each tokenized unit
    }

    // Resource to hold user balances for specific crop tokens
    struct CropBalance has key {
        balance: u64,    // User's balance of crop tokens
        crop_type: string::String, // Type of crop (each crop has a separate balance)
    }

    // Initialize a new crop token with a specified type and initial supply
    public fun initialize_crop(
        account: &signer, 
        crop_type: string::String, 
        initial_supply: u64, 
        unit_value: u64
    ) {
        // Move the CropToken to the account's address
        move_to(account, CropToken {
            total_supply: initial_supply,
            crop_type: crop_type,
            unit_value: unit_value,
        });

        // Initialize the creator's balance for the crop
        move_to(account, CropBalance {
            balance: initial_supply,
            crop_type: crop_type,
        });
    }

    // Mint new crop tokens (e.g., after a new harvest)
    public fun mint_crop(account: &signer, amount: u64, crop_type: string::String) {
        let crop_token = borrow_global_mut<CropToken>(signer::address_of(account));

        // Ensure that the minted crop type matches the existing one
        assert!(crop_token.crop_type == crop_type, ENO_CROP_FOUND);

        crop_token.total_supply = crop_token.total_supply + amount;

        // Update the user's balance for the specific crop
        let balance = borrow_global_mut<CropBalance>(signer::address_of(account));
        balance.balance = balance.balance + amount;
    }

    // Burn crop tokens (e.g., after consumption or sale)
    public fun burn_crop(account: &signer, amount: u64, crop_type: string::String) {
        let crop_token = borrow_global_mut<CropToken>(signer::address_of(account));
        let balance = borrow_global_mut<CropBalance>(signer::address_of(account));

        // Ensure that the burn request matches the crop type and sufficient balance exists
        assert!(crop_token.crop_type == crop_type, ENO_CROP_FOUND);
        assert!(balance.balance >= amount, EINSUFFICIENT_BALANCE);

        crop_token.total_supply = crop_token.total_supply - amount;
        balance.balance = balance.balance - amount;
    }

    // Transfer crop tokens between users
    public fun transfer_crop(from: &signer, to: address, amount: u64, crop_type: string::String) {
        let sender_balance = borrow_global_mut<CropBalance>(signer::address_of(from));
        
        // Ensure the transfer is of the correct crop type and has sufficient balance
        assert!(sender_balance.crop_type == crop_type, ENO_CROP_FOUND);
        assert!(sender_balance.balance >= amount, EINSUFFICIENT_BALANCE);

        sender_balance.balance = sender_balance.balance - amount;

        // Check if the recipient has a balance for the crop, if not, create one
        if (!exists<CropBalance>(to)) {
            move_to(&signer::address_of(from), CropBalance {
                balance: amount,
                crop_type: crop_type,
            });
        } else {
            let recipient_balance = borrow_global_mut<CropBalance>(to);
            recipient_balance.balance = recipient_balance.balance + amount;
        }
    }

    // Get the balance of a specific user's crop tokens
    public fun get_balance(account: address, crop_type: string::String): u64 {
        if (!exists<CropBalance>(account)) {
            return 0;
        }

        let balance = borrow_global<CropBalance>(account);

Manav Personal, [24-09-2024 21:23]
// Ensure the request is for the correct crop type
        assert!(balance.crop_type == crop_type, ENO_CROP_FOUND);

        balance.balance
    }

    // Get the total supply of a specific crop token
    public fun get_total_supply(crop_type: string::String): u64 acquires CropToken {
        let crop_token = borrow_global<CropToken>(@0x1);

        // Ensure the crop type exists
        assert!(crop_token.crop_type == crop_type, ENO_CROP_FOUND);

        crop_token.total_supply
    }
}