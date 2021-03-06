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
set :user, "root"
set :runner, "root"
set :domain, "185.143.172.65"
server domain, :www, :web
role :db, domain, :primary => true

#############################################################
#	Git
#############################################################

set :scm, :git
set :branch, "master"
#set :scm_user, 'devel2'
#set :scm_passphrase, "PASSWORD"
set :repository, "git@github.com:amiron-github/study-langs.git"
set :deploy_via, :remote_cache

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :www, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end



