import "./main.scss";

import "./pb_body.js";
import "./pb_button.js";
import "./pb_caption.js";
import "./pb_card.js";
import "./pb_heading.js";
import "./pb_layout.js";
import "./pb_vertical_nav_list.js";
import "./pb_image.js";
// END PACKS -- Leave comment for kit generator

$(document).on('click', '[data-toggle]', function(e){
  e.preventDefault();
  var kit_container = $(this).closest('.pb--doc');
  var toggle_target = $(this).data('toggle');
  $(kit_container).find('[data-action="toggle"]').hide();
  $(kit_container).find('[data-togglable="'+toggle_target+'"]').show();
});
