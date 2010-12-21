
def on_index(path, request)
	params = request.params

	if request.post?
		params["from"] = nil if params["from"].length == 0
		
		begin
			mail = Mail.new do
				from params["from"] || "anonymous@lucidsystems.org"
				
				to 'lucid@lucidsystems.org'
				subject "www.lucidsystems.org: #{params["subject"]}"
				body params["message"]
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
