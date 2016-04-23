require 'sinatra/reloader'     
require 'sinatra'

get '/' do
  erb :index
end

get '/login' do
 erb :login
end



