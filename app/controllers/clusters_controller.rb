class ClustersController < ApplicationController
layout "admin"
require_role "admin"

  # GET /clusters
  # GET /clusters.xml
  def index
    @clusters = Cluster.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @clusters }
    end
  end

  # GET /clusters/1
  # GET /clusters/1.xml
  def show
    @cluster = Cluster.find(params[:id])
	@categories = Category.all
	@words = @cluster.words.find(:all)
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @cluster }
    end
  end
  
  def add_to_cluster
  
	cluster = Cluster.find(params[:id])
	params[:word].values.each do |word_id|
		word = Word.find(word_id)
		cluster.involves(word)
	end
	redirect_to(cluster)
  end
  
  def words_to_add
	#ERB::Util.html_escape()
	category = Category.find(params[:category])
	words = category.words.find(:all, :order =>"order_num")
	
	modal = params[:modal]
	if modal != 'false' 
		modal = 'true'
	end
	attributes = ['<table><tr>']
	words.each_with_index do |word,index|
	
		if index % 16 == 0
			attributes << '<td>'
		end
		attributes << '<div><input type=\"checkbox\" value=\"'+word.id.to_s+'\" name=\"word['+index.to_s+']\">'+ERB::Util.html_escape(word.translate)+'</div>'
		if index % 16 == 15 && index != words.length 
			attributes << '</td>'
		end
	end
	attributes << '</td></tr></table>'
	
	attributes = attributes.join(" ")
	render :js => '$("#to_add_list").html("<div style=\"text-align: left; padding: 20px 30px\">'+attributes+'</div>"); $("#words-to-add").dialog("open") '
  end 
  
  
  def remove_from_cluster
	cluster = Cluster.find(params[:id])
	
	params[:word].values.each do |word_id|
		word = Word.find(word_id)
		cluster.removes(word)
	end

	#cluster.removes(word)
	redirect_to(cluster)
  end

  # GET /clusters/new
  # GET /clusters/new.xml
  def new
    @cluster = Cluster.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @cluster }
    end
  end

  # GET /clusters/1/edit
  def edit
    @cluster = Cluster.find(params[:id])
  end

  # POST /clusters
  # POST /clusters.xml
  def create
    @cluster = Cluster.new(params[:cluster])

    respond_to do |format|
      if @cluster.save
        flash[:notice] = 'Cluster was successfully created.'
        format.html { redirect_to(@cluster) }
        format.xml  { render :xml => @cluster, :status => :created, :location => @cluster }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @cluster.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /clusters/1
  # PUT /clusters/1.xml
  def update
    @cluster = Cluster.find(params[:id])

    respond_to do |format|
      if @cluster.update_attributes(params[:cluster])
        flash[:notice] = 'Cluster was successfully updated.'
        format.html { redirect_to(@cluster) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @cluster.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /clusters/1
  # DELETE /clusters/1.xml
  def destroy
    @cluster = Cluster.find(params[:id])
    @cluster.destroy

    respond_to do |format|
      format.html { redirect_to(clusters_url) }
      format.xml  { head :ok }
    end
  end
end
