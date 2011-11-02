#############################################################
#	Application
#############################################################

set :application, "studylanguagesonline"
set :deploy_to, "/opt/studylanguagesonline"

#############################################################
#	Settings
#############################################################

default_run_options[:pty] = true
ssh_options[:forward_agent] = true
set :use_sudo, false
set :scm_verbose, true
set :rails_env, "production" 

#############################################################
#	Servers
#############################################################

#set :user, "studylanguagesonline"
#set :runner, "studylanguagesonline"
set :user, "sshadmin"
set :runner, "sshadmin"
set :domain, "184.107.74.179"
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

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end



