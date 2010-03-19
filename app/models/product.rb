class Product < ActiveRecord::Base
   belongs_to :oder

   attr_accessible :user_id, :amount, :item_id, :txn_id, :status, :type_id, :ord_id, :expired_at

end
