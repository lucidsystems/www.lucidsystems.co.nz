#!/usr/bin/env rackup

# Setup default encoding:
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

# Setup the server environment:
RACK_ENV = ENV.fetch('RACK_ENV', :development).to_sym unless defined?(RACK_ENV)

# Allow loading library code from lib directory:
$LOAD_PATH << File.expand_path("lib", __dir__)

require 'utopia'
require 'utopia/tags/gallery'
require 'utopia/tags/google-analytics'
require 'xapian/rack/search'
require 'rack/cache'

if RACK_ENV == :production
	use Utopia::ExceptionHandler, "/errors/exception"
	use Utopia::MailExceptions
elsif RACK_ENV == :development
	use Rack::ShowExceptions
end

use Rack::Sendfile

if RACK_ENV == :production
	use Rack::Cache,
		metastore: "file:#{Utopia::default_root("cache/meta")}",
		entitystore: "file:#{Utopia::default_root("cache/body")}",
		verbose: RACK_ENV == :development
end

use Xapian::Rack::Search, {
	:database => Utopia::default_root('xapian.db'),
	:roots => [
		'/',
		'http://www.led-lighting.co.nz/',
		'http://www.litepanels.co.nz/',
		'http://solar-panels.nz/',
	],
	:domains => ["www.led-lighing.co.nz", "www.litepanels.co.nz", "solar-panels.nz"]
}

use Rack::ContentLength

use Utopia::Redirector,
	patterns: [
		Utopia::Redirector::DIRECTORY_INDEX,
		# Variations of the old printing works page URL
		[:starts_with, '/printingworks', '/projects/printing-works'],
		
		# Variations of the /contact URL, details provided by Henri
		[:starts_with, '/contact', '/company/contact-details'],
	],
	strings: {
		'/' => '/welcome/index',
		'/links/drobo/reseller' => '/products/drobo',
		'/links/backblaze' => 'http://www.backblaze.com/partner/af0692',
		'/links/spideroak' => 'https://spideroak.com/download/promo/lucidsystems',
		
		# Contact Page
		'/lucidcontact.php' => '/company/contact-us',
		
		# LBackup
		'/tools/lbackup/download' => '/projects/lbackup',
		'/tools/lbackup' => '/projects/lbackup',
		'/lbackup' => '/projects/lbackup',
		'/download/utilities/LBackup.zip' => 'http://www.lbackup.org/download/LBackup.zip',
		
		# AddItemToDock
		'/luciddocktools.html' => '/projects/additemtodock',
		'/download/utilities/additemtodock.dmg.zip' => '/projects/additemtodock/additemtodock.zip',
		'/download/utilities/additemtodock.dmg' => '/projects/additemtodock/additemtodock.zip',
		
		# PrintingWorks
		'/download/utilities/PrinterSetup.zip' => '/projects/printing-works',
		'/printingworks/printingmanager/index' => '/projects/printing-works',
		'/lucidprintersetup.html' => '/projects/printing-works',
		
		# Solutions
		'/lucidsolprebuilt.html' => '/services/infinity-systems/',
		
		# Software Freedom Day
		'/sfd' => 'http://wiki.softwarefreedomday.org/2011/NewZealand/Christchurch/lucidsystems',
	},
	errors: {
		404 => "/errors/file-not-found"
	}

use Utopia::Localization,
	:default_locale => 'en',
	:locales => ['en', 'de', 'ja', 'zh'],
	:nonlocalized => ['/_static/', '/_cache/']

use Utopia::Controller,
	cache_controllers: (RACK_ENV == :production)

use Utopia::Static

use Utopia::Content,
	cache_templates: (RACK_ENV == :production),
	tags: {
		'deferred' => Utopia::Tags::Deferred,
		'override' => Utopia::Tags::Override,
		'node' => Utopia::Tags::Node,
		'environment' => Utopia::Tags::Environment.for(RACK_ENV),
		'gallery' => Utopia::Tags::Gallery,
		'google-analytics' => Utopia::Tags::GoogleAnalytics,
	}

run lambda { |env| [404, {}, []] }
