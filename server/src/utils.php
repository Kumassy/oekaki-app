<?php

function array_filter_keys($baseArray, $filter) {
  return array_intersect_key($baseArray, array_flip($filter));
}

function print_stderr($obj) {
  file_put_contents('php://stderr', print_r($obj, TRUE));
}

function normalizeHiraganaString($string) {
  $search = array('ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'っ', 'づ', 'で', 'ど', 'ば', 'ぱ', 'び', 'ぴ', 'ぶ', 'ぷ', 'べ', 'ぺ', 'ぼ', 'ぽ', 'ゃ', 'ゅ', 'ょ', 'ゎ', 'ゐ', 'ゑ', 'ゔ');
  $replace = array('あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'つ', 'て', 'と', 'は', 'は', 'ひ', 'ひ', 'ふ', 'ふ', 'へ', 'へ', 'ほ', 'ほ', 'や', 'ゆ', 'よ', 'わ', 'い', 'え', 'う');
  return str_replace($search, $replace, $string);
}

function mbStringReverse($string) {
  $array = preg_split("//u", $string, -1, PREG_SPLIT_NO_EMPTY);
  return implode(array_reverse($array));
}

function isShiritoriSuccess($previous, $next) {
  $reversed_previous = mbStringReverse($previous);
  $reversed_next = mbStringReverse($next);


  $last_char_of_previous = mb_substr(normalizeHiraganaString($reversed_previous), 0, 1);
  $first_char_of_next = mb_substr(normalizeHiraganaString($next), 0, 1);
  $last_char_of_next = mb_substr(normalizeHiraganaString($reversed_next), 0, 1);
  return $last_char_of_previous === $first_char_of_next && $last_char_of_next !== 'ん';
}
