<?php

  function theme_stylesheets_scripts() {
    // Make sure we do not alter scripts and styles in admin
    if(!is_admin()) {

      // De-register the default jQuery on pages that don't need it
      wp_deregister_script( 'jquery' );
      if( is_page('contact') ){
        wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-1.12.4.min.js', '', '', false );
      }

      // Fonts
      wp_enqueue_style( 'calcq_fonts-css', 'https://fonts.googleapis.com/css?family=Maven+Pro:400,700,900|Roboto:300,400,700', '', '', 'screen' );

      // Main styles
      wp_enqueue_style( 'calcq_main-css', get_template_directory_uri().'/assets/css/style.css', '', '', 'screen' );

      // Swiper
      if(is_front_page()) {
        wp_enqueue_style( 'calcq_swiper-css', get_template_directory_uri().'/assets/css/vendor/swiper.min.css', '', '', 'screen' );
        wp_enqueue_script( 'calcq_swiper-js', get_template_directory_uri().'/assets/js/vendor/swiper.min.js', '', '', true );
      }

      // the main js
      wp_enqueue_script( 'calcq_main-js', get_template_directory_uri().'/assets/js/all.js', '', '', true );

    }
  }

  // Plug into WordPress to run our theme_stylesheets_scripts() function
  add_action( 'wp_enqueue_scripts', 'theme_stylesheets_scripts' );

?>
