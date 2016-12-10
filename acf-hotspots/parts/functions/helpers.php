<?php

  /*
   *
   *  Generate email url
   *
   */
  function ds_generate_email( $email, $class = '', $text = '', $is_link = true ) {
    $exploded_email = explode('@', $email);
    $username = $exploded_email[0];
    $domain = $exploded_email[1];
    return '<span class="masked_email ' . $class . '" data-masked-lined="' . $is_link . '" data-masked-name="' . $username . '" data-masked-domain="' . $domain . '">' . $text . '</span>';
  }

  /*
   *
   *  Dump and Die
   *
   */
  function dd( $content ) {
    // echo '<pre>';
    print_r($content);
    // echo '</pre>';
    exit();
  }

?>