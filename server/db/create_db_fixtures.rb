require 'yaml'

yaml = YAML.load_file "seed.yml"

# images
keys = {}
keys["images"] = %w(id name created_at updated_at)
keys["users"] = %w(id username password image_id created_at updated_at)
keys["threads"] = %w(id is_open created_at updated_at)
keys["posts"] = %w(id user_id thread_id image_id answer created_at updated_at)
keys["comments"] = %w(id user_id thread_id comment created_at updated_at)

tables = %w(images users threads posts comments)

tables.each do |table|
  File.open("fixture_#{table}.csv","w") do |file|
    yaml[table].each do |image|
      array = keys[table].map do |key|
        image[key].to_s
      end
      file.puts array.join(",")
    end
  end
end
