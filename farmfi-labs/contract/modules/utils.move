module FarmFiLabs::Utils {

    use Aptos::Account;
    use Aptos::Coin;
    use Aptos::Vector;
    use Aptos::Timestamp;

    /// Safe addition function to prevent overflow
    public fun safe_add(a: u64, b: u64): u64 {
        let sum = a + b;
        assert!(sum >= a, 0x1); // Ensures no overflow
        sum
    }

    /// Safe subtraction function to prevent underflow
    public fun safe_sub(a: u64, b: u64): u64 {
        assert!(a >= b, 0x2); // Ensure no underflow
        a - b
    }

    /// Safe multiplication function to prevent overflow
    public fun safe_mul(a: u64, b: u64): u64 {
        let product = a * b;
        assert!(b == 0 || product / b == a, 0x3); // Ensures no overflow
        product
    }

    /// Validate if an address is valid in the system
    public fun validate_address(address: address) {
        assert!(Account::exists(address), 0x4); // Check if the account exists on the blockchain
    }

    /// Utility to transfer tokens between two addresses
    public fun transfer_tokens(sender: &signer, recipient: address, amount: u64) {
        Coin::transfer(sender, recipient, amount);
    }

    /// Get the current blockchain timestamp in seconds
    public fun get_current_timestamp(): u64 {
        Timestamp::now_seconds()
    }

    /// Emit a custom event (generic for reuse in other contracts)
    public fun emit_event<T>(event_handle: &mut Event::EventHandle<T>, event: T) {
        Event::emit_event(event_handle, event);
    }

    /// Check if an account has sufficient balance of a given coin type
    public fun has_sufficient_balance<CoinType: store>(account: address, amount: u64): bool {
        let balance = Coin::balance<CoinType>(account);
        balance >= amount
    }

    /// Helper function to compare two timestamps
    public fun compare_timestamps(timestamp1: u64, timestamp2: u64): bool {
        timestamp1 <= timestamp2
    }

    /// Utility to retrieve the length of a vector (useful in multiple contexts)
    public fun get_vector_length<T>(vec: vector<T>): u64 {
        Vector::length(&vec) as u64
    }

}
