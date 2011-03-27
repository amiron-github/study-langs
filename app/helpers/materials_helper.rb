module MaterialsHelper
  def material_body_to_publish(content)
	ad_horizont = render :partial => '/site/ad_horizont'
	ad_btm = render :partial => '/site/ad_btm'

	new_content = ERB.new(content).result(binding)
	return new_content
  end
  def status_info(status)
	info = Material::STATUS[0]
	Material::STATUS.each do |item|
		if item[2] == status
			info = item
		end
	end
	return info
  end
end
