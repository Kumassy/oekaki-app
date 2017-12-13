search =
%(ぁぃぅぇぉがぎぐげござじずぜぞだぢっづでどばぱびぴぶぷべぺぼぽゃゅょゎゐゑゔ)

replace =
%(あいうえおかきくけこさしすせそたちつつてとははひひふふへへほほやゆよわいえう)

search.each_char do |c|
  print "\'#{c}\', "
end
puts
puts

replace.each_char do |c|
  print "\'#{c}\', "
end
