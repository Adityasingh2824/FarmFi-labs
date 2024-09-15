module <ADDRESS>::MerchantServices {
    use std::signer;
    use std::vector;
    use std::error;
    use <ADDRESS>::GrainToken;

    // Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINSUFFICIENT_PAYMENT: u64 = 2;
    const ENO_SUCH_SERVICE: u64 = 3;

    // Struct to represent a service offered by a merchant
    struct Service has key {
        id: u64,
        name: vector<u8>,
        description: vector<u8>,
        price: u64,
        available: bool,
    }

    // Storage for merchant services
    struct MerchantServices has key {
        services: vector<Service>,
    }

    // Initialize the MerchantServices module
    public fun initialize(account: &signer) {
        move_to(account, MerchantServices {
            services: vector::empty<Service>(),
        });
    }

    // Add a new service offered by the merchant
    public fun add_service(account: &signer, name: vector<u8>, description: vector<u8>, price: u64) {
        let merchant_address = signer::address_of(account);
        let services = borrow_global_mut<MerchantServices>(merchant_address);
        
        let new_service = Service {
            id: vector::length(&services.services) as u64,
            name,
            description,
            price,
            available: true,
        };

        vector::push_back(&mut services.services, new_service);
    }

    // Update the availability of a service
    public fun set_service_availability(account: &signer, service_id: u64, available: bool) {
        let merchant_address = signer::address_of(account);
        let services = borrow_global_mut<MerchantServices>(merchant_address);

        if (service_id >= vector::length(&services.services)) {
            abort ENO_SUCH_SERVICE;
        }

        let service = vector::borrow_mut(&mut services.services, service_id);
        service.available = available;
    }

    // Purchase a service using grain tokens
    public fun purchase_service(buyer: &signer, merchant: address, service_id: u64, payment_amount: u64) {
        let services = borrow_global<MerchantServices>(merchant);

        if (service_id >= vector::length(&services.services)) {
            abort ENO_SUCH_SERVICE;
        }

        let service = vector::borrow(&services.services, service_id);

        if (!service.available) {
            abort ENO_SUCH_SERVICE;
        }

        if (payment_amount < service.price) {
            abort EINSUFFICIENT_PAYMENT;
        }

        // Transfer grain tokens as payment from buyer to merchant
        GrainToken::transfer(buyer, merchant, payment_amount);
    }

    // Get all services offered by a merchant
    public fun get_services(merchant: address): vector<Service> {
        let services = borrow_global<MerchantServices>(merchant);
        services.services
    }

    // Get details of a specific service
    public fun get_service(merchant: address, service_id: u64): Service {
        let services = borrow_global<MerchantServices>(merchant);
        if (service_id >= vector::length(&services.services)) {
            abort ENO_SUCH_SERVICE;
        }

        let service = vector::borrow(&services.services, service_id);
        *service
    }
}
