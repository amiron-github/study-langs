class FcategoriesController < ApplicationController
layout "admin"
require_role "admin"


  # GET /fcategories
  # GET /fcategories.xml
  def index
    @fcategories = Fcategory.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @fcategories }
    end
  end

  # GET /fcategories/1
  # GET /fcategories/1.xml
  def show
    @fcategory = Fcategory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @fcategory }
    end
  end

  # GET /fcategories/new
  # GET /fcategories/new.xml
  def new
    @fcategory = Fcategory.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @fcategory }
    end
  end

  # GET /fcategories/1/edit
  def edit
    @fcategory = Fcategory.find(params[:id])
  end

  # POST /fcategories
  # POST /fcategories.xml
  def create
    @fcategory = Fcategory.new(params[:fcategory])

    respond_to do |format|
      if @fcategory.save
        flash[:notice] = 'Fcategory was successfully created.'
        format.html { redirect_to(@fcategory) }
        format.xml  { render :xml => @fcategory, :status => :created, :location => @fcategory }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @fcategory.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /fcategories/1
  # PUT /fcategories/1.xml
  def update
    @fcategory = Fcategory.find(params[:id])

    respond_to do |format|
      if @fcategory.update_attributes(params[:fcategory])
        flash[:notice] = 'Fcategory was successfully updated.'
        format.html { redirect_to(@fcategory) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @fcategory.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /fcategories/1
  # DELETE /fcategories/1.xml
  def destroy
    @fcategory = Fcategory.find(params[:id])
    @fcategory.destroy

    respond_to do |format|
      format.html { redirect_to(fcategories_url) }
      format.xml  { head :ok }
    end
  end
end
