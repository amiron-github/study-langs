class EnwordsController < ApplicationController
require_role "admin"
layout "admin"

  # GET /enwords
  # GET /enwords.xml
  def index
    @enwords = Enword.all
	@encategory = Encategory.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  {render :xml =>@enwords }
    end
  end
  
  def cat_index
	cat = Encategory.find(params[:encategory])
	@encategory = cat
	@words = cat.enwords.find(:all, :order =>"order_num")
	respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @enword }
    end
  end
  
  def cat_edit
	cat = Encategory.find(params[:encategory])
	@encategory = cat
	@words = cat.enwords.find(:all, :order =>"order_num")
	respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @enword }
    end
  end

  # GET /enwords/1
  # GET /enwords/1.xml
  def show
    @enword = Enword.find(params[:id])
	@encategory_id = @enword.encategory_id
	@encategory_title = @enword.encategory.title
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @enword }
    end
  end

  # GET /enwords/new
  # GET /enwords/new.xml
  def new
    @enword = Enword.new
	@encategories = Encategory.all
	if params[:encategory]
		@encategory = Encategory.find(params[:encategory])
		if @encategory.enwords.length > 0
			@last = @encategory.enwords.find(:first, :order =>"order_num DESC").order_num
		else 
			@last=0
		end
	else 
		@encategory =Encategory.find(:first)
		@last=0
	end
	@encategory_title = @encategory.title
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @enword }
    end
  end
  
  def new_list 
	@encategories = Encategory.all
	word = Enword.find(:first)
	@attributes = word.attributes
	if params[:encategory] 
		@encategory = Encategory.find( params[:encategory] )
		if @encategory.enwords.length >0
			@last=@encategory.enwords.find(:first, :order =>"order_num DESC").order_num
		else 
			@last=0
		end
	else 
		@encategory = Encategory.find(:first)
		@last=0
	end
  end
  
  def create_list
	params[:enword].values.each do |t|
		@enword = Enword.new(t)
		@enword.save
	end
	if request.xhr?
		render :js => '$("<div></div>").html("<br><b>This list has been successfully created.</b>").dialog({modal: true, title: "Saving new list", buttons: {"OK": function() {$( this ).dialog( "close" )}}})'
	else
		redirect_to(:back)
	end
  end
  
  def save_enword_attributes
	params[:enword].values.each do |t|
		enword = Enword.find(t[:id] )
		t.delete(:id)
		enword.update_attributes(t)
	end
	if request.xhr?
		render :js => '$("<div></div>").html("<br><b>Changes are saved</b>").dialog({height: 140,modal: true, title: "Saving Attributes"})'
	else
		flash[:notice] = 'Enword was successfully created.'
		redirect_to (:back)
	end
  end 
  
  def save_enword_changes
	@changesLen = params[:enword].length.to_s;
	params[:enword].values.each do |t|
		enword = Enword.find(t[:id])
		t.delete( :id )
		enword.update_attributes(t)
	end
	if request.xhr?
		render :js => '$("#saved_changes b").text("Successfully updated '+ @changesLen +' entries. "); $("#saved_changes").dialog("open")';
	else
		redirect_to(:back)
	end
  end
  
  def quick_show
	enword = Enword.find(params[:id])
	@attributes = []
	@attributes = [ 
	['ID', enword.id],
	['Text', enword.text],
	['Translation', enword.translate],
	['Transcript', enword.translate],
	['HTML', enword.html],
	['Sound link', enword.sound_url],
	[ 'Image link', enword.image_url],
	['Updated', enword.updated_at.to_s(:short)]
	]
	text = ''
	@attributes.each  do |attribute|
		pair = '<tr><td style=\"padding-right: 15px; text-align: right\"><b>'+attribute[0].to_s+':</b> </td><td> '+attribute[1].to_s+'</td></tr>' 
		text += pair 
	end
	render :js => 'quick_info("<table>'+text+'</table>", '+enword.id.to_s+')'
  end
  
  def quick_edit
	params[:enword].values.each do |t|
		enword = Enword.find(t[:id])
		@elId = t[:id]
		t.delete(:id )
		enword.update_attributes(t)
	end
	if request.xhr?
		render :js => '$("#enw_'+@elId+'").css({backgroundColor: "#FAFFCF"}); $(".enw-update-note").text("Updated").effect("highlight", 1000); show_updates("'+@elId+'")'
	else
		redirect_to(:back)
	end
  end
  
  def quick_create
		@enword = Enword.new(params[:enword])
		@enword.save
	if request.xhr?
		last_saved = @enword
		render :js => 'show_last_created('+last_saved.id.to_s+',"'+last_saved.text+'","'+last_saved.html+'","'+last_saved.translate+'","'+last_saved.transcribe+'","'+last_saved.sound_url+'","'+last_saved.image_url+'",'+last_saved.order_num.to_s+')'
	else
		redirect_to('/enwords')
	end
  end

  # GET /enwords/1/edit
  def edit
    @enword = Enword.find(params[:id])
	@encategory_id = @enword.encategory_id
	@encategories = Encategory.all
  end

  # POST /enwords
  # POST /enwords.xml
  def create
    @enword = Enword.new(params[:enword])
	@enword.encategory_id = (params[:encategory])
    respond_to do |format|
      if @enword.save
        flash[:notice] = 'Enword was successfully created.'
        format.html { redirect_to(@enword) }
        format.xml  { render :xml => @enword, :status => :created, :location => @enword }
      else
        format.html { render :action =>"new" }
        format.xml  { render :xml => @enword.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  # PUT /enwords/1
  # PUT /enwords/1.xml
  def update
    @enword = Enword.find(params[:id])
	@enword.encategory_id = (params[:encategory])
    respond_to do |format|
      if @enword.update_attributes(params[:enword])
        flash[:notice] = 'Enword was successfully updated.'
        format.html {redirect_to(@enword)}
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @enword.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /enwords/1
  # DELETE /enwords/1.xml
  def destroy
    @enword = Enword.find(params[:id])
    @enword.destroy
    respond_to do |format|
      format.html { redirect_to(:back) }
      format.xml  { head :ok }
    end
  end
end
