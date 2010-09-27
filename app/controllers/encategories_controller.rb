class EncategoriesController < ApplicationController
layout "admin"
require_role "admin"
  # GET /encategories
  # GET /encategories.xml
  def index
    @encategories = Encategory.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @encategories }
    end
  end

  # GET /encategories/1
  # GET /encategories/1.xml
  def show
    @encategory = Encategory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @encategory }
    end
  end

  # GET /encategories/new
  # GET /encategories/new.xml
  def new
    @encategory = Encategory.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @encategory }
    end
  end

  # GET /encategories/1/edit
  def edit
    @encategory = Encategory.find(params[:id])
  end

  # POST /encategories
  # POST /encategories.xml
  def create
    @encategory = Encategory.new(params[:encategory])

    respond_to do |format|
      if @encategory.save
        flash[:notice] = 'Encategory was successfully created.'
        format.html { redirect_to(@encategory) }
        format.xml  { render :xml => @encategory, :status => :created, :location => @encategory }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @encategory.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /encategories/1
  # PUT /encategories/1.xml
  def update
    @encategory = Encategory.find(params[:id])

    respond_to do |format|
      if @encategory.update_attributes(params[:encategory])
        flash[:notice] = 'Encategory was successfully updated.'
        format.html { redirect_to(@encategory) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @encategory.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /encategories/1
  # DELETE /encategories/1.xml
  def destroy
    @encategory = Encategory.find(params[:id])
    @encategory.destroy

    respond_to do |format|
      format.html { redirect_to(encategories_url) }
      format.xml  { head :ok }
    end
  end
end
