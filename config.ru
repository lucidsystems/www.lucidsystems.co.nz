#!/usr/bin/env rackup

UTOPIA_ENV = (ENV['UTOPIA_ENV'] || ENV['RACK_ENV'] || :development).to_sym
$LOAD_PATH << File.join(File.dirname(__FILE__), "lib")

require 'utopia/middleware/all'

require 'utopia/tags/environment'
require 'utopia/tags/google-analytics'

require 'utopia/tags/gallery'

require 'rack/cache'

require 'xapian/rack/search'

require 'mail'

Mail.defaults do
	delivery_method :smtp, { :enable_starttls_auto => false }
end

if UTOPIA_ENV == :development
	use Rack::ShowExceptions
else
	use Utopia::Middleware::ExceptionHandler, "/errors/exception"
	use Utopia::Middleware::MailExceptions
end

use Rack::ContentLength

use Xapian::Rack::Search, {
	:database => Utopia::Middleware.default_root('xapian.db'),
	:roots => [
		'/',
		'http://www.led-lighting.co.nz/',
		'http://www.litepanels.co.nz/',
		'http://www.drobo.co.nz/',
	],
	:domains => ["www.led-lighing.co.nz", "www.litepanels.co.nz", "www.drobo.co.nz"]
}

use Utopia::Middleware::Redirector, {
	:strings => {
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
		
		# Contact Details
		'/lucidcontact.php' => '/company/contact-details',
		
		# Solutions
		'/lucidsolprebuilt.html' => '/services/infinity-systems/',

		# Software Freedom Day
		'/sfd' => 'http://wiki.softwarefreedomday.org/2011/NewZealand/Christchurch/lucidsystems',
	},
	:patterns => [
		# Variations of the old printing works page URL
		[Regexp.starts_with('/printingworks'), '/projects/printing-works'],
		
		# Variations of the /contact URL, details provided by Henri
		[Regexp.starts_with('/contact'), '/company/contact-details'],
	],
	:errors => {
		404 => "/errors/file-not-found"
	}
}

use Utopia::Middleware::Requester
use Utopia::Middleware::DirectoryIndex
use Utopia::Middleware::Controller
use Utopia::Middleware::Static

if UTOPIA_ENV == :production
	use Rack::Cache, {
		:metastore   => "file:#{Utopia::Middleware::default_root("cache/meta")}",
		:entitystore => "file:#{Utopia::Middleware::default_root("cache/body")}",
		:verbose => false
	}
end

use Utopia::Middleware::Content

run lambda { |env| [404, {}, []] }
