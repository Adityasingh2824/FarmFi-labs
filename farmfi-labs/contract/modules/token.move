module FarmFi::Token {

    use 0x1::Signer;
    use 0x1::Event;
    use 0x1::Coin;
    use 0x1::Vector;
    use 0x1::Account;

    /// Struct for holding the total supply of the token
    struct TokenSupply has key {
        total_supply: u64,
    }

    /// Struct for holding individual balances
    struct TokenBalance has key, store {
        balance: u64,
    }

    /// Events for tracking token operations
    struct TokenEvents has key {
        mint_event: Event::EventHandle<TokenMintedEvent>,
        transfer_event: Event::EventHandle<TokenTransferredEvent>,
        burn_event: Event::EventHandle<TokenBurnedEvent>,
    }

    /// Event emitted when tokens are minted
    struct TokenMintedEvent has copy, store {
        receiver: address,
        amount: u64,
        timestamp: u64,
    }

    /// Event emitted when tokens are transferred
    struct TokenTransferredEvent has copy, store {
        sender: address,
        receiver: address,
        amount: u64,
        timestamp: u64,
    }

    /// Event emitted when tokens are burned
    struct TokenBurnedEvent has copy, store {
        amount: u64,
        timestamp: u64,
    }

    /// Initialize the token system and set the initial supply
    public fun initialize(admin: &signer, initial_supply: u64) {
        move_to(admin, TokenSupply { total_supply: initial_supply });
        move_to(
            admin,
            TokenEvents {
                mint_event: Event::new<TokenMintedEvent>(admin),
                transfer_event: Event::new<TokenTransferredEvent>(admin),
                burn_event: Event::new<TokenBurnedEvent>(admin),
            },
        );

        // Give the initial supply to the admin
        let admin_address = Signer::address_of(admin);
        move_to(admin, TokenBalance { balance: initial_supply });

        // Emit mint event for admin
        let events = borrow_global_mut<TokenEvents>(@0xAdmin);
        Event::emit_event(&mut events.mint_event, TokenMintedEvent {
            receiver: admin_address,
            amount: initial_supply,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Mint new tokens (admin only)
    public fun mint(admin: &signer, amount: u64, receiver: address) {
        assert!(Signer::address_of(admin) == @0xAdmin, 100, "Unauthorized mint");

        // Update total supply
        let supply = borrow_global_mut<TokenSupply>(@0xAdmin);
        supply.total_supply = supply.total_supply + amount;

        // Update receiver's balance
        if (exists<TokenBalance>(receiver)) {
            let balance = borrow_global_mut<TokenBalance>(receiver);
            balance.balance = balance.balance + amount;
        } else {
            move_to(&receiver, TokenBalance { balance: amount });
        }

        // Emit mint event
        let events = borrow_global_mut<TokenEvents>(@0xAdmin);
        Event::emit_event(&mut events.mint_event, TokenMintedEvent {
            receiver,
            amount,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Transfer tokens between users
    public fun transfer(sender: &signer, receiver: address, amount: u64) {
        let sender_address = Signer::address_of(sender);

        // Ensure sender has enough tokens
        let sender_balance = borrow_global_mut<TokenBalance>(sender_address);
        assert!(sender_balance.balance >= amount, 101, "Insufficient balance");

        // Deduct tokens from sender
        sender_balance.balance = sender_balance.balance - amount;

        // Add tokens to receiver's balance
        if (exists<TokenBalance>(receiver)) {
            let receiver_balance = borrow_global_mut<TokenBalance>(receiver);
            receiver_balance.balance = receiver_balance.balance + amount;
        } else {
            move_to(&receiver, TokenBalance { balance: amount });
        }

        // Emit transfer event
        let events = borrow_global_mut<TokenEvents>(@0xAdmin);
        Event::emit_event(&mut events.transfer_event, TokenTransferredEvent {
            sender: sender_address,
            receiver,
            amount,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Burn tokens from the admin's supply
    public fun burn(admin: &signer, amount: u64) {
        assert!(Signer::address_of(admin) == @0xAdmin, 102, "Unauthorized burn");

        // Decrease total supply
        let supply = borrow_global_mut<TokenSupply>(@0xAdmin);
        assert!(supply.total_supply >= amount, 103, "Insufficient total supply");
        supply.total_supply = supply.total_supply - amount;

        // Decrease admin's balance
        let admin_balance = borrow_global_mut<TokenBalance>(@0xAdmin);
        assert!(admin_balance.balance >= amount, 104, "Insufficient balance to burn");
        admin_balance.balance = admin_balance.balance - amount;

        // Emit burn event
        let events = borrow_global_mut<TokenEvents>(@0xAdmin);
        Event::emit_event(&mut events.burn_event, TokenBurnedEvent {
            amount,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// View the balance of an account
    public fun get_balance(account: address): u64 {
        if (exists<TokenBalance>(account)) {
            let balance = borrow_global<TokenBalance>(account);
            balance.balance
        } else {
            0
        }
    }

    /// View the total supply of the token
    public fun get_total_supply(): u64 {
        let supply = borrow_global<TokenSupply>(@0xAdmin);
        supply.total_supply
    }
}
