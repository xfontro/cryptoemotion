require File.expand_path('../config/environment', __FILE__)
require 'faye'

if ENV['RACK_ENV'] == 'development'
  puts 'Loading NewRelic in developer mode ...'
  require 'new_relic/rack/developer_mode'
  use NewRelic::Rack::DeveloperMode
end

Faye::WebSocket.load_adapter('thin')
use Faye::RackAdapter, :mount => '/faye', :timeout => 10000

NewRelic::Agent.manual_start

run CryptoEmotion::App.instance
