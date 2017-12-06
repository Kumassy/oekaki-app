<?php

function array_filter_keys($baseArray, $filter) {
  return array_intersect_key($baseArray, array_flip($filter));
}
