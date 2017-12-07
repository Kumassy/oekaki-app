<?php

function array_filter_keys($baseArray, $filter) {
  return array_intersect_key($baseArray, array_flip($filter));
}

function print_stderr($obj) {
  file_put_contents('php://stderr', print_r($obj, TRUE));
}
