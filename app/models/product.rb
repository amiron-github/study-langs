class Product < ActiveRecord::Base
   has_many :oder

   attr_accessible :user_id, :amount, :item_id, :txn_id, :status, :type_id, :ord_id, :expired_at

end
