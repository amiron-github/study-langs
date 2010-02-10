#ActiveMerchant::Billing::Base.gateway_mode = :test
ActiveMerchant::Billing::Base.integration_mode = :paypal
ActiveMerchant::Billing::PaypalGateway.pem_file =  "#{RAILS_ROOT}/config/paypal/paypal_cert_pem.txt"

