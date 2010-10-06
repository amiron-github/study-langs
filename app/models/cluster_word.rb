class ClusterWord < ActiveRecord::Base
belongs_to :word
belongs_to :cluster
end
