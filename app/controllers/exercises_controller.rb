class ExercisesController < ApplicationController
require_role "admin"
layout "admin"
  # GET /exercises
  # GET /exercises.xml
  
  #User.find($).user_tests.all(:include => :exercise, :conditions => {'exercises.category_id' => 2}) // user and category id 
  # User.find($).user_tests.all(:include => {:exercise => :category} , :conditions => {'categories.title' => 'Formulas of politeness'}) // user and category id
  
  def index
	if params[:search]
			@exercises = Exercise.search params[:search]
			@exercises = @exercises.paginate :page => params[:page], :order => 'created_at DESC', :per_page=> 100
	else
		@exercises = Exercise.find(:all, :order=>'id DESC')
		@exercises = @exercises.paginate :page => params[:page]
	end
	@categories = Category.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @exercises }
    end
  end

  def list_edit
	@encategory = 'exercises'
	@words = Exercise.find(:all, :order=>'id DESC')
	@words = @words.paginate :page => params[:page], :per_page=> 40
	respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @word }
    end
  end
  
  def save_exercise_changes
	@changesLen = params[:enword].length.to_s;
	params[:enword].values.each do |t|
		enword = Exercise.find(t[:id])
		t.delete( :id )
		enword.update_attributes(t)
	end
	if request.xhr?
		render :js => '$("#saved_changes b").text("Successfully updated '+ @changesLen +' entries. "); $("#saved_changes").dialog("open")';
	else
		redirect_to(:back)
	end
  end 

  
   def search
	if params[:search]
			@exercises = Exercise.search params[:search]
			@exercises = @exercises.paginate :page => params[:page], :order => 'created_at DESC', :per_page=> 100
	else
		@exercises = Exercise.find(:all, :order=>'id DESC')
		@exercises = @exercises.paginate :page => params[:page]
	end
	@categories = Category.all
    render :action => 'index'
  end

  # GET /exercises/1
  # GET /exercises/1.xml
  def show
    @exercise = Exercise.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @exercise }
    end
  end

  # GET /exercises/new
  # GET /exercises/new.xml
  def new
    @exercise = Exercise.new
	@categories = Category.all
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @exercise }
    end
  end

  # GET /exercises/1/edit
  def edit
    @exercise = Exercise.find(params[:id])
	@categories = Category.all
	#@test_category = @test.category_id
  end

  # POST /exercises
  # POST /exercises.xml
  def create
    @exercise = Exercise.new(params[:exercise])

    respond_to do |format|
      if @exercise.save
        flash[:notice] = 'Exercise was successfully created.'
        format.html { redirect_to(exercises_url) }
        format.xml  { render :xml => @exercise, :status => :created, :location => @exercise }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @exercise.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /exercises/1
  # PUT /exercises/1.xml
  def update
    @exercise = Exercise.find(params[:id])

    respond_to do |format|
      if @exercise.update_attributes(params[:exercise])
        flash[:notice] = 'Exercise was successfully updated.'
        format.html { redirect_to(exercises_url) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @exercise.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  def new_list 
	@categories = Category.find(:all, :order=> 'lang, order_num')
	exercise = Exercise.find(:first)
	@attributes = exercise.attributes
	if params[:category] 
		@category = Category.find( params[:category] )
	else 
		@category = Category.find(:first)
		@last=0
	end
  end  
  
   def create_list
    @failed  = ""
	params[:exercise].values.each do |t|
		@exercise = Exercise.new(t)
		if @exercise.save
		else
			@failed = @failed+"<br>failed: "+no_js(@exercise.test_id)
		end
	end
	@ok 
	if request.xhr?
		render :js => '$("<div></div>").html("<br><b>This list has been created.</b>'+@failed+'").dialog({modal: true, title: "Saving new list", buttons: {"OK": function() {$( this ).dialog( "close" )}}})'
	else
		redirect_to(:back)
	end
  end  
  
  
  
  

  # DELETE /exercises/1
  # DELETE /exercises/1.xml
  def destroy
    @exercise = Exercise.find(params[:id])
    @exercise.destroy

    respond_to do |format|
      format.html { redirect_to(exercises_url) }
      format.xml  { head :ok }
    end
  end
end
