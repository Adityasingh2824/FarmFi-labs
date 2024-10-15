module FarmFiLabs::Marketplace {

    use Aptos::Signer;
    use Aptos::Account;
    use Aptos::Vector;
    use Aptos::Event;
    use Aptos::Coin;
    use Aptos::Timestamp;

    /// Struct representing a commodity listed for sale
    struct Commodity has copy, drop, store {
        owner: address,
        price: u64,
        quantity: u64,
        description: vector<u8>,
    }

    /// Struct for the marketplace that holds listed commodities
    struct Marketplace has key {
        commodities: vector<Commodity>,
        sale_event: Event::EventHandle<SaleEvent>,
    }

    /// Struct representing a sale event
    struct SaleEvent has copy, drop, store {
        seller: address,
        buyer: address,
        price: u64,
        quantity: u64,
        description: vector<u8>,
        timestamp: u64,
    }

    /// Initializes the marketplace and sets up events
    public fun initialize(account: &signer) {
        let sale_event = Event::new_event_handle<SaleEvent>(account);
        move_to(account, Marketplace {
            commodities: Vector::empty<Commodity>(),
            sale_event: sale_event,
        });
    }

    /// Allows farmers to list their commodities for sale
    public fun list_commodity(
        account: &signer,
        price: u64,
        quantity: u64,
        description: vector<u8>
    ) {
        let owner = Signer::address_of(account);
        let marketplace = borrow_global_mut<Marketplace>(Account::address_of(account));

        // Create a new commodity listing
        let commodity = Commodity {
            owner: owner,
            price: price,
            quantity: quantity,
            description: description,
        };

        // Add the commodity to the marketplace
        Vector::push_back(&mut marketplace.commodities, commodity);
    }

    /// Allows users to purchase a commodity listed in the marketplace
    public fun purchase_commodity(
        account: &signer,
        commodity_id: u64,
        quantity: u64,
        payment_amount: u64
    ) {
        let buyer = Signer::address_of(account);
        let marketplace = borrow_global_mut<Marketplace>(Account::address_of(account));

        // Check if the commodity exists
        assert!(commodity_id < Vector::length(&marketplace.commodities), 0x1);

        // Get the commodity details
        let commodity = &mut Vector::borrow_mut(&mut marketplace.commodities, commodity_id);

        // Check if sufficient quantity is available
        assert!(commodity.quantity >= quantity, 0x2);

        // Check if payment is correct
        assert!(payment_amount == commodity.price * quantity, 0x3);

        // Transfer payment from the buyer to the seller
        Coin::transfer(account, commodity.owner, payment_amount);

        // Update commodity quantity after purchase
        commodity.quantity = commodity.quantity - quantity;

        // Emit a sale event
        Event::emit_event(
            &mut marketplace.sale_event,
            SaleEvent {
                seller: commodity.owner,
                buyer: buyer,
                price: commodity.price,
                quantity: quantity,
                description: commodity.description,
                timestamp: Timestamp::now_seconds(),
            },
        );
    }

    /// Allows users to remove their commodity from the marketplace
    public fun remove_commodity(account: &signer, commodity_id: u64) {
        let owner = Signer::address_of(account);
        let marketplace = borrow_global_mut<Marketplace>(Account::address_of(account));

        // Check if the commodity exists and belongs to the owner
        assert!(commodity_id < Vector::length(&marketplace.commodities), 0x4);
        let commodity = &Vector::borrow(&marketplace.commodities, commodity_id);
        assert!(commodity.owner == owner, 0x5);

        // Remove the commodity from the marketplace
        Vector::swap_remove(&mut marketplace.commodities, commodity_id);
    }

    /// Retrieve details of a specific commodity
    public fun get_commodity(account: &signer, commodity_id: u64): Commodity {
        let marketplace = borrow_global<Marketplace>(Account::address_of(account));
        assert!(commodity_id < Vector::length(&marketplace.commodities), 0x6);
        Vector::borrow(&marketplace.commodities, commodity_id)
    }

    /// Get the total number of commodities listed in the marketplace
    public fun get_total_commodities(): u64 {
        let marketplace = borrow_global<Marketplace>(Account::address_of(Account::create_signer()));
        Vector::length(&marketplace.commodities) as u64
    }

}
