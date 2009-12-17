#############################################################
#	Application
#############################################################

set :application, "studylanguagesonline"
set :deploy_to, "/home/webmaster/studylanguagesonline"

#############################################################
#	Settings
#############################################################

default_run_options[:pty] = true
ssh_options[:forward_agent] = true
set :use_sudo, true
set :scm_verbose, true
set :rails_env, "production" 

#############################################################
#	Servers
#############################################################

set :user, "webmaster"
set :runner, "webmaster"
set :domain, "study-languages-online.com"
server domain, :app, :web
role :db, domain, :primary => true

#############################################################
#	Git
#############################################################

set :scm, :git
set :branch, "master"
#set :scm_user, 'devel2'
#set :scm_passphrase, "PASSWORD"
set :repository, "dalles@svn.licenzero.ru:/home/devel2/studylanguagesonline.git"
set :deploy_via, :remote_cache

