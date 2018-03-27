class User < ApplicationRecord
  has_many :pages
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable


   def self.sign_in_or_create_user(sign_in_params)

     uri = URI.parse("https://nitro.powerhrg.com/api/v1/users/login")
     request = Net::HTTP::Get.new(uri)
     request.basic_auth(sign_in_params[:email], sign_in_params[:password])
     req_options = {
       use_ssl: uri.scheme == "https",
     }

     response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
       http.request(request)
     end

     if response.code == "200"
       user = self.find_or_create_user(response.body)
       return true, user
     else
       return false, JSON.parse(response.body)
     end
   end

   def name
     return self.goes_by
   end

   # This doesn't update existing users
   def self.find_or_create_user(user_info)
     user_info = JSON.parse(user_info)

     user = User.find_or_initialize_by(nitro_id: user_info['id'].to_i)
     user.first_name = user_info['first_name']
     user.middle_name = user_info['middle_name']
     user.last_name = user_info['last_name']
     user.nick_name = user_info['nick_name']
     user.preferred_name = user_info['preferred_name']
     user.goes_by = user_info['goes_by']
     user.email = user_info['email']
     user.avatar_url = user_info['avatar_url']
     user.avatar_thumb_url = user_info['avatar_thumb_url']
     user.title = user_info['title']

     user.save

     return user
   end

end
