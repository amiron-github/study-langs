class WordsController < ApplicationController
require_role "admin"
layout "admin"

  # GET /words
  # GET /words.xml
  def index
    @enwords = Word.all
	@encategory = Category.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @words }
    end
  end
  
  def cat_index
	cat = Category.find(params[:encategory])
	@encategory = cat
	@words = cat.words.find(:all, :order =>"order_num")
	respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @enword }
    end
  end
  
  def cat_edit
	cat = Category.find(params[:encategory])
	@encategory = cat
	@words = cat.words.find(:all, :order =>"order_num")
	respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @word }
    end
  end

  # GET /words/1
  # GET /words/1.xml
  def show
    @enword = Word.find(params[:id])
	@encategory_id = @enword.category_id
	@encategory_title = @enword.category.title
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @word }
    end
  end
  
  # GET /words/new
  # GET /words/new.xml
  def new
    @enword = Word.new
	@encategories = Category.all
	if params[:encategory]
		@encategory = Category.find(params[:encategory])
		if @encategory.words.length > 0
			@last = @encategory.words.find(:first, :order =>"order_num DESC").order_num
		else 
			@last=0
		end
	else 
		@encategory =Category.find(:first)
		@last=0
	end
	@encategory_title = @encategory.title
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @enword }
    end
  end  
  
  def new_list 
	@encategories = Category.all
	word = Word.find(:first)
	@attributes = word.attributes
	if params[:encategory] 
		@encategory = Category.find( params[:encategory] )
		if @encategory.words.length >0
			@last=@encategory.words.find(:first, :order =>"order_num DESC").order_num
		else 
			@last=0
		end
	else 
		@encategory = Category.find(:first)
		@last=0
	end
  end

  def create_list
	params[:enword].values.each do |t|
		@enword = Word.new(t)
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
		enword = Word.find(t[:id])
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
		enword = Word.find(t[:id])
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
	enword = Word.find(params[:id])
	#@attributes = []
	#@attributes = [ 
	#['ID', enword.id],
	#['Text', enword.text],
	#['Translation', enword.translate.to_s.gsub(/'/,"\'") ],
	#['Transcript', enword.transcribe.to_s.gsub(/'/,"\'") ],
	#['HTML', enword.html.to_s.gsub(/'/,"\'") ],
#	['Sound link', enword.sound_url],
#	[ 'Image link', enword.image_url],
#	['Updated', enword.updated_at.to_s(:short)]
#	]
#	text = ''
#	@attributes.each  do |attribute|
#		pair = '<tr><td style="padding-right: 15px; text-align: right"><b>'+attribute[0].to_s+':</b> </td><td> '+attribute[1].to_s+'</td></tr>' 
#		text += pair 
#	end
	info = enword.translate

	render :js => 'quick_info(\'<table>'+info.gsub(/'/, "\\\'").to_s+'</table>\', '+enword.id.to_s+')'
  end

  def quick_edit
	params[:enword].values.each do |t|
		enword = Word.find(t[:id])
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
		@enword = Word.new(params[:enword])
		@enword.save
	if request.xhr?
		last_saved = @enword
		render :js => 'show_last_created('+last_saved.id.to_s+',"'+last_saved.text+'","'+last_saved.html+'","'+last_saved.translate+'","'+last_saved.transcribe+'","'+last_saved.sound_url+'","'+last_saved.image_url+'",'+last_saved.order_num.to_s+')'
	else
		redirect_to('/words')
	end
  end  

  # GET /words/1/edit
  def edit
    @enword = Word.find(params[:id])
	@encategory_id = @enword.category_id
	@encategories = Category.all
  end

  # POST /words
  # POST /words.xml
  def create
    @enword = Word.new(params[:word])
	@enword.category_id = (params[:encategory])
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

  # PUT /words/1
  # PUT /words/1.xml
  def update
    @enword = Word.find(params[:id])
	@enword.category_id = (params[:encategory])
    respond_to do |format|
      if @enword.update_attributes(params[:word])
        flash[:notice] = 'Word was successfully updated.'
        format.html {redirect_to(@enword)}
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @enword.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /words/1
  # DELETE /words/1.xml
  def destroy
    @word = Word.find(params[:id])
    @word.destroy
    respond_to do |format|
      format.html { redirect_to(:back) }
      format.xml  { head :ok }
    end
  end
end
