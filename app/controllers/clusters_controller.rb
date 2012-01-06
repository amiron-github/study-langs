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
	@categories = Category.find(:all, :order=> 'lang, order_num')
	@words = @cluster.words.find(:all, :include => :cluster_words, :order => 'cluster_words.order_num, order_num')
	
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @cluster }
    end
  end
  
  def save_cluster_order 
  	cluster = Cluster.find(params[:cluster_id])
	params[:word].values.each do |t|
		entry = cluster.cluster_words.find(:first, :conditions=> ['word_id=?', t[:id]])
		entry.update_attribute(:order_num, t[:order_num])
	end
	render :js => '$("<div></div>").html("<div style=\"padding: 20px 25px;\"><b>The order have been saved.</b></div>").dialog({width: 400, modal: true,title: "Saving attributes: Items order  ", buttons: { "Close": function() { $(this).dialog("close"); } }, close: function() { $(this).dialog("destroy");$(this).remove();}}); showOrder();'
  
  end 
  
  def add_to_cluster
	cluster = Cluster.find(params[:id])
	params[:word].values.each do |word_id|
		word = Word.find(word_id)
		cluster.involves(word)
	end
	redirect_to(cluster)
  end
  
  def select_to_remove
	cluster = Cluster.find(params[:id])
	words = cluster.words.find(:all, :include => :cluster_words, :order => 'cluster_words.order_num')
	if params[:attr]
		t_attr = params[:attr]
	else 
		t_attr = 'translate'
	end
	
	attributes = ['<table><tr>']
	words.each_with_index do |word,index|
		if index % 16 == 0
			attributes << '<td>'
		end
		attributes << '<div><input type=\"checkbox\" value=\"'+word.id.to_s+'\" name=\"word['+index.to_s+']\">'+ERB::Util.html_escape(word[t_attr])+'</div>'
		if index % 16 == 15 && index != words.length 
			attributes << '</td>'
		end
	end
	attributes << '</td></tr></table>'
	attributes = attributes.join(" ")
	render :js => '$("#remove_from_list").html("<div style=\"text-align: left; padding: 20px 30px\">'+attributes+'</div>"); $("#words_to_remove").dialog("open") '
  
  
  end
  
  def words_to_add
	#ERB::Util.html_escape()
	category = Category.find(params[:category])
	words = category.words.find(:all, :order =>"order_num")
	if params[:attr]
		t_attr = params[:attr]
	else 
		t_attr = 'translate'
	end
	
	modal = params[:modal]
	if modal != 'false' 
		modal = 'true'
	end
	@mod = 16
	if words.length > 100
		@mod = 20
	end
	attributes = ['<table><tr>']
	words.each_with_index do |word,index|
		if index % @mod == 0
			attributes << '<td>'
		end
		attributes << '<div><input type=\"checkbox\" value=\"'+word.id.to_s+'\" name=\"word['+index.to_s+']\">'+ERB::Util.html_escape(word[t_attr])+'</div>'
		if index % @mod == (@mod-1) && index != words.length 
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
