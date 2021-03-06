require 'digest/sha1'

class Password < ActiveRecord::Base
  belongs_to :user
  attr_accessor :email
  attr_accessor :lang

  validates_presence_of :email, :user
  validates_format_of :email, :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i, :message => :invalid

  protected
  def before_create
    self.reset_code = Digest::SHA1.hexdigest(Time.now.to_s.split(//).sort_by {rand}.join )
    self.expiration_date = 2.weeks.from_now
  end
end
