class MaterialsController < ApplicationController


layout "admin",  :except => [:preview_ajax]
require_role "admin", :except => [:publish]


# instruction to publish
# 


  # GET /materials
  # GET /materials.xml
  def index
	
	if params[:langs]
		@langs = params[:langs]
		@mat = Material.find(:all, :conditions=> ['langs=?', @langs] , :order => 'id DESC')
	else 
		@mat = Material.find(:all, :order => 'id DESC')
	end
	
    @materials = @mat.paginate :page => params[:page], :per_page=> 50
	
	
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @materials }
    end
  end

  # GET /materials/1
  # GET /materials/1.xml
  def show
	
    @material = Material.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @material }
    end
  end
  
  def publish
	@t_page = request.path
	@material = Material.find(:first, :conditions=> ['page_url=?',@t_page])
	if logged_in?
		@no_ad = true
	end
		layout = determine_layout

    respond_to do |format|
	  if @material.page_template == 1
		format.html {render :action => 'publish_ex', :layout => layout} 
		format.xml  { render :xml => @material }	  
	  elsif @material.page_template == 2
		format.html {render :action => 'publish', :layout => 'grammar_comments'} 
		format.xml  { render :xml => @material }
	  else
		format.html {render :action => 'publish', :layout => layout} 
		format.xml  { render :xml => @material }
	  end
    end
  rescue StandardError => e
    logger.warn e
   render :file => "pages/404.html", :status => '404 Not Found', :layout => layout	
  end
  
  def publish_developer
	@t_page = request.path
	@material = Material.find(:first, :conditions=> ['page_url=?',@t_page])
		layout = determine_layout

    respond_to do |format|
      format.html {render :action => 'publish', :layout => layout} 
      format.xml  { render :xml => @material }
    end
  rescue StandardError => e
    logger.warn e
   render :file => "pages/404.html", :status => '404 Not Found', :layout => layout	
  end

  # GET /materials/new
  # GET /materials/new.xml
  def new
    @material = Material.new
    render :action => 'edit'
  end

  # GET /materials/1/edit
  def edit
    @material = Material.find(params[:id])
  end

  # POST /materials
  # POST /materials.xml
  def create
    @material = Material.new(params[:material])
      if @material.save
        flash[:notice] = 'Material was successfully created.'
        redirect_to :action => "edit", :id => @material.id
      else
		flash[:notice] = 'Material was not created.'
        format.html { render :action => "new" }
      end

  end

  # PUT /materials/1
  # PUT /materials/1.xml
  def update
    @material = Material.find(params[:id])
      if @material.update_attributes(params[:material])
        flash[:notice] = 'Material was successfully updated.'
		redirect_to :back
      else
        flash[:notice] = 'Material was notupdated.'
        redirect_to :back
      end

  end
 	

  # DELETE /materials/1
  # DELETE /materials/1.xml
  def destroy
    @material = Material.find(params[:id])
    @material.destroy

    respond_to do |format|
      format.html { redirect_to(materials_url) }
      format.xml  { head :ok }
    end
  end
  
private
	def determine_layout
		layout_lang = params[:lang]
		add_lang = params[:to_lang]
		layout = 'application'
		case layout_lang 
			when 'fr'
				if add_lang == 'en'
					layout =  'fr_en_application.rhtml'
				elsif add_lang == 'ru'
					layout =  'fr_ru_application.rhtml'
				end
			when 'ru'
				if add_lang == 'en'
					layout =  'ru_en_application.rhtml'
				elsif add_lang == 'jp'
					layout =  'ru_jp_application.rhtml'
				end
		end
		if params[:special_layout] == 'mobile'
			layout =  'mobile.rhtml'
		end
		return layout
	end  
  

end

