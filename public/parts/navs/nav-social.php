<?php

  /*
   *
   *  UTILITY NAVIGATION
   *  This is the top most navigation bar on the website containing non
   *  essential links
   *
   */

  // Grab the navigation data
  include_once "parts/data/social-links.php";

?>

<ul class="social-nav">
  <?php
    foreach ($SOCIALLINKS as $link_text => $link_value) {
      echo '<li class="social-nav__item">',
        '<a href="' , $link_value , '" class="social-nav__link">' ,
        '<i class="fa fa-' , $link_text , '" aria-hidden="true"></i>' ,
        '</a></li>';
    }
  ?>
</ul>
