
def on_index(path, request)
	params = request.params

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

			File.open("delivery.log", "a") do |fp|
				buffer = mail.to_s
				fp.puts "\r\n== Message Boundary : #{buffer.length} bytes ==\r\n" + buffer
			end

			mail.deliver!

			if params["from"]
				return redirect("success")
			else
				return redirect("success-no-reply")
			end
		end
	end
	
	return nil
end

def on_send(path, request)
	begin
		return on_index(path, request)
	rescue
		return :unavailable
	end
end