<?php

  /**
   *
   *   Setting timezone locally
   *
   */
  date_default_timezone_set('America/Montreal');

  /**
   *
   *   Prevents WordPress theme from auto-updating
   *
   */
  add_filter( 'auto_update_plugin', '__return_false' );
  add_filter( 'auto_update_theme', '__return_false' );
  add_filter( 'automatic_updater_disabled', '__return_true' );
  add_filter( 'auto_update_core', '__return_false' );

  /**
   *
   *   Removes WordPress version from <head>
   *
   */
  remove_action('wp_head', 'wp_generator');

  /**
   *
   *   Removes admin pages
   *
   */
  function admin_remove (){
   remove_menu_page('edit-comments.php');
  }
  add_action('admin_menu', 'admin_remove');

  /**
   *
   *   Disable XML-RPC to prevent vulnerability
   *
   */
  add_filter('xmlrpc_enabled', '__return_false');

  /**
   *
   *   Add support for thumbnails
   *
   */
  add_theme_support('post-thumbnails');

  /**
   *
   *   Add support for menu
   *
   */
  add_theme_support('menus');

  /**
   *
   *   Add support for widgets
   *
   */
  // add_theme_support('widgets');

  /**
   *
   *   Remove Emojis
   *
   */
  remove_action( 'wp_head', 'print_emoji_detection_script', 7);
  remove_action( 'wp_print_styles', 'print_emoji_styles');
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );

  /**
   *
   *   Hide Admin bar on frontend
   *
   */
  add_filter('show_admin_bar', '__return_false');

?>