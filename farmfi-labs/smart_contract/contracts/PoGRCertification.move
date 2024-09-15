module <ADDRESS>::PoGRCertification {
    use std::signer;
    use std::vector;
    use std::error;

    // Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EINVALID_CERTIFICATE: u64 = 2;
    const EINSUFFICIENT_RESERVE: u64 = 3;

    // Struct to represent a PoGR certificate
    struct PoGRCertificate has key {
        grain_amount: u64,
        issue_date: u64,
        expiry_date: u64,
        certifier: address,
    }

    // Storage for all PoGR certificates
    struct Certificates has key {
        certificates: vector<PoGRCertificate>,
    }

    // Initialize the PoGRCertification module
    public fun initialize(account: &signer) {
        move_to(account, Certificates {
            certificates: vector::empty<PoGRCertificate>(),
        });
    }

    // Issue a new PoGR certificate
    public fun issue_certificate(account: &signer, grain_amount: u64, issue_date: u64, expiry_date: u64, certifier: address) {
        let cert_address = signer::address_of(account);

        if (cert_address != certifier) {
            abort ENOT_AUTHORIZED;
        }

        let certificates = borrow_global_mut<Certificates>(cert_address);
        let new_certificate = PoGRCertificate {
            grain_amount,
            issue_date,
            expiry_date,
            certifier,
        };

        vector::push_back(&mut certificates.certificates, new_certificate);
    }

    // Validate a PoGR certificate
    public fun validate_certificate(account: address, index: u64): bool {
        let certificates = borrow_global<Certificates>(account);
        let certificate = vector::borrow(&certificates.certificates, index);

        // Check if the certificate is still valid
        if (certificate.expiry_date < std::time::now_seconds()) {
            return false;
        }

        true
    }

    // Use a PoGR certificate (consume its value)
    public fun use_certificate(account: &signer, index: u64, amount: u64) {
        let cert_address = signer::address_of(account);
        let certificates = borrow_global_mut<Certificates>(cert_address);

        if (index >= vector::length(&certificates.certificates)) {
            abort EINVALID_CERTIFICATE;
        }

        let certificate = vector::borrow_mut(&mut certificates.certificates, index);
        
        if (certificate.grain_amount < amount) {
            abort EINSUFFICIENT_RESERVE;
        }

        certificate.grain_amount = certificate.grain_amount - amount;
    }

    // Get all certificates for an account
    public fun get_certificates(account: address): vector<PoGRCertificate> {
        let certificates = borrow_global<Certificates>(account);
        certificates.certificates
    }
}
