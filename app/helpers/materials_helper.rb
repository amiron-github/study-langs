module MaterialsHelper
  def material_body_to_publish(content)
	ad_horizont = render :partial => '/site/ad_horizont'
	ad_btm = render :partial => '/site/ad_btm'

	new_content = ERB.new(content).result(binding)
	return new_content
  end
end
