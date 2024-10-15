module FarmFi::MarketplaceTrade {

    use 0x1::Signer;
    use 0x1::Vector;
    use 0x1::Coin;
    use FarmFi::Token;
    use 0x1::Event;
    use 0x1::Account;
    use 0x1::Timestamp;

    /// Struct to hold a commodity listed in the marketplace
    struct Commodity has key {
        id: u64,
        seller: address,
        token_id: u64,
        price: u64,
        quantity: u64,
    }

    /// Struct to emit events when commodities are listed or sold
    struct MarketplaceEvents has key {
        list_event: Event::EventHandle<CommodityListedEvent>,
        purchase_event: Event::EventHandle<CommodityPurchasedEvent>,
    }

    /// Event emitted when a commodity is listed
    struct CommodityListedEvent has copy, store {
        id: u64,
        seller: address,
        token_id: u64,
        price: u64,
        quantity: u64,
        timestamp: u64,
    }

    /// Event emitted when a commodity is purchased
    struct CommodityPurchasedEvent has copy, store {
        id: u64,
        buyer: address,
        seller: address,
        token_id: u64,
        price: u64,
        quantity: u64,
        timestamp: u64,
    }

    /// Store all commodities listed for sale in a vector
    struct Marketplace has key {
        commodities: vector<Commodity>,
    }

    /// Initialize the marketplace and events
    public fun initialize_marketplace(admin: &signer) {
        move_to(admin, Marketplace { commodities: Vector::empty<Commodity>() });
        move_to(
            admin,
            MarketplaceEvents {
                list_event: Event::new<CommodityListedEvent>(admin),
                purchase_event: Event::new<CommodityPurchasedEvent>(admin),
            },
        );
    }

    /// List a commodity on the marketplace
    public fun list_commodity(
        seller: &signer,
        token_id: u64,
        price: u64,
        quantity: u64
    ) {
        let seller_address = Signer::address_of(seller);
        let commodity_id = Timestamp::now_seconds(); // Unique ID based on timestamp

        let commodity = Commodity {
            id: commodity_id,
            seller: seller_address,
            token_id,
            price,
            quantity,
        };

        let marketplace = borrow_global_mut<Marketplace>(@0xAdmin);
        Vector::push_back(&mut marketplace.commodities, commodity);

        // Emit a list event
        let events = borrow_global_mut<MarketplaceEvents>(@0xAdmin);
        Event::emit_event(&mut events.list_event, CommodityListedEvent {
            id: commodity_id,
            seller: seller_address,
            token_id,
            price,
            quantity,
            timestamp: Timestamp::now_seconds(),
        });
    }

    /// Buy a commodity from the marketplace
    public fun buy_commodity(
        buyer: &signer,
        commodity_id: u64,
        quantity: u64
    ) {
        let buyer_address = Signer::address_of(buyer);
        let marketplace = borrow_global_mut<Marketplace>(@0xAdmin);
        let mut i = 0;
        let mut found = false;

        // Search for the commodity by ID
        while (i < Vector::length(&marketplace.commodities)) {
            let commodity = Vector::borrow_mut(&mut marketplace.commodities, i);
            if (commodity.id == commodity_id) {
                found = true;
                // Ensure there is enough quantity to purchase
                assert!(commodity.quantity >= quantity, 101, "Not enough quantity available");
                
                let total_price = commodity.price * quantity;

                // Transfer the payment from buyer to seller
                Token::transfer(buyer, commodity.seller, total_price);

                // Deduct the quantity from the listed commodity
                commodity.quantity = commodity.quantity - quantity;

                // Emit purchase event
                let events = borrow_global_mut<MarketplaceEvents>(@0xAdmin);
                Event::emit_event(&mut events.purchase_event, CommodityPurchasedEvent {
                    id: commodity.id,
                    buyer: buyer_address,
                    seller: commodity.seller,
                    token_id: commodity.token_id,
                    price: commodity.price,
                    quantity,
                    timestamp: Timestamp::now_seconds(),
                });

                // Remove the commodity from the list if all quantity is bought
                if (commodity.quantity == 0) {
                    Vector::remove(&mut marketplace.commodities, i);
                }
                break;
            }
            i = i + 1;
        }

        assert!(found, 102, "Commodity not found");
    }

    /// View commodities for sale
    public fun view_commodities(): vector<Commodity> {
        let marketplace = borrow_global<Marketplace>(@0xAdmin);
        marketplace.commodities
    }
}
