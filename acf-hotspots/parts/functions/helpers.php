<?php

  /*
   *
   *  Dump and Die
   *
   */
  if (!function_exists('dd')) {
    function dd( $content ) {
      // echo '<pre>';
      print_r($content);
      // echo '</pre>';
      exit();
    }
  }

?>
