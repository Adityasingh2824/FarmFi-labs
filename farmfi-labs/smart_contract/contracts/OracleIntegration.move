module <ADDRESS>::OracleIntegration {
    use std::signer;
    use std::vector;
    use std::error;

    // Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINVALID_DATA: u64 = 2;

    // Struct to represent oracle data entry
    struct OracleData has key {
        data: vector<u8>,
        timestamp: u64,
        source: address,
    }

    // Storage for all oracle data entries
    struct OracleDataEntries has key {
        entries: vector<OracleData>,
    }

    // Initialize the OracleIntegration module
    public fun initialize(account: &signer) {
        move_to(account, OracleDataEntries {
            entries: vector::empty<OracleData>(),
        });
    }

    // Submit data from an oracle
    public fun submit_data(account: &signer, data: vector<u8>, timestamp: u64) {
        let oracle_address = signer::address_of(account);

        // Authorization check: Only designated oracles can submit data
        if (!is_authorized_oracle(oracle_address)) {
            abort ENOT_AUTHORIZED;
        }

        let oracle_data_entries = borrow_global_mut<OracleDataEntries>(oracle_address);
        let new_data_entry = OracleData {
            data,
            timestamp,
            source: oracle_address,
        };

        vector::push_back(&mut oracle_data_entries.entries, new_data_entry);
    }

    // Get the latest oracle data
    public fun get_latest_data(oracle: address): Option<OracleData> {
        let oracle_data_entries = borrow_global<OracleDataEntries>(oracle);
        if (vector::length(&oracle_data_entries.entries) == 0) {
            return Option::none<OracleData>();
        }

        let latest_data_entry = vector::borrow(&oracle_data_entries.entries, vector::length(&oracle_data_entries.entries) - 1);
        Option::some<OracleData>(*latest_data_entry)
    }

    // Get all data entries from an oracle
    public fun get_all_data(oracle: address): vector<OracleData> {
        let oracle_data_entries = borrow_global<OracleDataEntries>(oracle);
        oracle_data_entries.entries
    }

    // Helper function to check if an address is an authorized oracle
    fun is_authorized_oracle(oracle: address): bool {
        // Logic to check if the oracle is authorized
        // For this example, we'll assume all addresses are authorized oracles
        true
    }
}
