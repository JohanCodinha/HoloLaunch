require 'sinatra/reloader'     
require 'sinatra'

get '/' do
  erb :index
end



get '/app' do
	erb :app
end



get '/pastlaunches' do
	erb :pastlaunches
end