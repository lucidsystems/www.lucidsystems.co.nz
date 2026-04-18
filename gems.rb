# frozen_string_literal: true

source 'https://rubygems.org'

group :preload do
	gem 'utopia', '~> 2.24'
	gem 'utopia-gallery'
	gem 'utopia-analytics'
	gem 'async-service-supervisor'
	
	gem 'variant'
end

group :test do
	gem 'sus'
	gem 'sus-fixtures-async-http'
	gem 'covered'
	
	gem 'rack-test'
	
	gem 'benchmark-http'
end

group :production do
	gem 'falcon'
end
