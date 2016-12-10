<?php

  /*
   *
   *  FOOTER
   *  Found at the bottom of the site with non essential navigation
   *
   */

  // Grab the navigation data
  include_once "parts/data/navigation.php";

?>

<footer class="footer">

  <ul class="footer__nav fll ul-reset">
    <?php

      // Loop through the navigation elements
      foreach ($NAVIGATION as $link_title => $link_value) {

        $link_url = is_string($link_value) ? $link_value : $link_value['link'] ;

        echo '<li class="footer-nav__list-item"><a href="' , $link_url ,
          '" class="footer-nav__link">' , $link_title , '</a></li>';

      }

    ?>
  </ul>

  <div class="flr">
    <?php include 'parts/navs/social.php'; ?>
  </div>

</footer>
