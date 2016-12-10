<?php

	/**
	 *
	 *   Change the Excerpt more string
	 *
	 */
	function wpdocs_excerpt_more( $more ) {
		return '...';
	}
	add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );

?>