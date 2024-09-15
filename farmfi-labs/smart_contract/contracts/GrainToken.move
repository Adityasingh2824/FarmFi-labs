module <ADDRESS>::GrainToken {
    use std::signer;
    use std::vector;
    use std::string;
    use std::error;
    use std::coin;

    // Define the error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINSUFFICIENT_BALANCE: u64 = 2;

    // The GrainToken resource type
    struct GrainToken has key, store {
        total_supply: u64,
    }

    // Resource to hold user balances
    struct Balance has key {
        balance: u64,
    }

    // Initialize the GrainToken with a specified initial supply
    public fun initialize(account: &signer, initial_supply: u64) {
        let creator_address = signer::address_of(account);
        move_to(account, GrainToken {
            total_supply: initial_supply,
        });

        // Create initial balance for the creator
        move_to(account, Balance {
            balance: initial_supply,
        });
    }

    // Mint new tokens and add to the total supply
    public fun mint(account: &signer, amount: u64) {
        let grain_token = borrow_global_mut<GrainToken>(signer::address_of(account));
        grain_token.total_supply = grain_token.total_supply + amount;

        let balance = borrow_global_mut<Balance>(signer::address_of(account));
        balance.balance = balance.balance + amount;
    }

    // Burn tokens and reduce the total supply
    public fun burn(account: &signer, amount: u64) {
        let grain_token = borrow_global_mut<GrainToken>(signer::address_of(account));
        let balance = borrow_global_mut<Balance>(signer::address_of(account));

        if (balance.balance < amount) {
            abort EINSUFFICIENT_BALANCE;
        }

        grain_token.total_supply = grain_token.total_supply - amount;
        balance.balance = balance.balance - amount;
    }

    // Transfer tokens between users
    public fun transfer(from: &signer, to: address, amount: u64) {
        let sender_balance = borrow_global_mut<Balance>(signer::address_of(from));
        if (sender_balance.balance < amount) {
            abort EINSUFFICIENT_BALANCE;
        }

        sender_balance.balance = sender_balance.balance - amount;

        if (!exists<Balance>(to)) {
            move_to(&signer::address_of(from), Balance {
                balance: amount,
            });
        } else {
            let recipient_balance = borrow_global_mut<Balance>(to);
            recipient_balance.balance = recipient_balance.balance + amount;
        }
    }

    // Get the balance of a specific account
    public fun get_balance(account: address): u64 {
        if (!exists<Balance>(account)) {
            return 0;
        }

        let balance = borrow_global<Balance>(account);
        balance.balance
    }

    // Get the total supply of the GrainToken
    public fun get_total_supply(): u64 acquires GrainToken {
        let grain_token = borrow_global<GrainToken>(@0x1);
        grain_token.total_supply
    }
}
