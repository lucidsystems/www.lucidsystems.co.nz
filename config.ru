#!/usr/bin/env rackup

require_relative 'config/environment'

require 'utopia/gallery'
require 'utopia/analytics'
require 'rack/freeze'

if RACK_ENV == :production
	# Handle exceptions in production with a error page and send an email notification:
	use Utopia::Exceptions::Handler
	use Utopia::Exceptions::Mailer
else
	# We want to propate exceptions up when running tests:
	use Rack::ShowExceptions unless RACK_ENV == :test
	
	# Serve the public directory in a similar way to the web server:
	use Utopia::Static, root: 'public'
end

use Rack::Sendfile

use Utopia::ContentLength

# Variations of the old printing works page URL
use Utopia::Redirection::Moved, '/printingworks', '/projects/printing-works', flatten: true

# Variations of the /contact URL, details provided by Henri
use Utopia::Redirection::Moved, '/contact', '/company/contact-us', flatten: true

use Utopia::Redirection::Rewrite, {
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
}

use Utopia::Redirection::DirectoryIndex

use Utopia::Redirection::Errors,
	404 => '/errors/file-not-found'

use Utopia::Controller

use Utopia::Static

# Serve dynamic content
use Utopia::Content, namespaces: {
	'gallery' => Utopia::Gallery::Tags.new,
	'analytics' => Utopia::Analytics,
}

run lambda { |env| [404, {}, []] }
