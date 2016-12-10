"use strict";!function(t){function n(t){}"undefined"!=typeof acf.add_action?acf.add_action("ready append",function(e){acf.get_fields({type:"hotspots"},e).each(function(){n(t(this))})}):t(document).on("acf/setup_fields",function(e,f){t(f).find('.field[data-field_type="hotspots"]').each(function(){n(t(this))})})}(jQuery);
//# sourceMappingURL=acf-hotspots-render.js.map
