
ACCESS_CONTROLS = {
	"Access-Control-Allow-Origin" => "*",
	"Access-Control-Allow-Headers" => "X-Requested-With",
	"Access-Control-Max-Age" => "60"
}

def send_email(request)
	params = request.params

	if request.options?
		# Allow AJAX requests from different domains.
		success! headers: ACCESS_CONTROLS
	end

	if request.post?
		params["from"] = nil if params["from"].length == 0
		
		begin
			message = StringIO.new
			message.puts "Referrer: #{request.referrer}"
			message.puts
			message.puts params["message"]
			
			mail = Mail.new do
				from params["from"] || "anonymous@lucidsystems.co.nz"
				
				to 'lucid@lucidsystems.org'
				subject "www.lucidsystems.co.nz: #{params["subject"]}"
				body message.string
			end

			mail.deliver!

			if request.xhr?
				# You also need to provide access control headers here.
				success! headers: ACCESS_CONTROLS
			else
				redirect!(params["from"] ? "success" : "success-no-reply")
			end
		end
	end
end

on 'index' do |request|
	send_email(request)
end

on 'send' do |
	begin
		send_email(request)
	rescue
		fail! :unavailable
	end
end
