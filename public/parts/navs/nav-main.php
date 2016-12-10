<?php

  /*
   *
   *  NAVIGATION
   *  This is the main navigation for the website
   *
   */

  // Grab the navigation data
  include_once "parts/data/navigation.php";

?>

<div class="sticky block--100 block--no-pad" data-ignoreend="false" data-offsetstart="30">

  <a href="/" class="logo__link fll">
    <svg class="logo" viewbox="0 0 340 60">
      <text fill="#ffffff"
            font-size="35"
            font-family="Helvetica Neue"
            alignment-baseline="middle"
            x="0"
            y="32">
        Starter
      </text>
    </svg>
  </a>

  <nav class="main-nav flr">
    <a href="#side-tap" class="side-tap show-on-mobile"></a>
    <ul class="main-nav__list side-tap__nav flr">
      <?php

        // Loop through the navigation elements
        foreach ($NAVIGATION as $link_title => $link_value) {

          $link_url = is_string($link_value) ? $link_value : $link_value['link'] ;

          echo '<li class="main-nav__list-item"><a href="' , $link_url , '" class="main-nav__link">' , $link_title , '</a>';

            // If subnav exists, loop through the items
            if(is_array($link_value)) {
              echo '<ul class="main-nav__list main-nav__sub">';
                foreach ($link_value as $subnav_link_title => $subnav_link_value) {
                  if($subnav_link_title == 'link') continue;
                  echo '<li><a href="' , $subnav_link_value , '" class="main-nav__link main-nav__sub-link">' , $subnav_link_title , '</a></li>';
                }
              echo '</ul>';
            }

          echo '</li>';

        }

      ?>
    </ul>
  </nav>

</div>
