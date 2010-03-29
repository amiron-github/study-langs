#ActiveMerchant::Billing::Base.gateway_mode = :test
#ActiveMerchant::Billing::Base.integration_mode = :test
ActiveMerchant::Billing::Base.integration_mode = :production
ActiveMerchant::Billing::Base.integration(:paypal)
ActiveMerchant::Billing::PaypalGateway.pem_file =  File.read("#{RAILS_ROOT}/config/paypal/paypal_cert_pem.txt")

