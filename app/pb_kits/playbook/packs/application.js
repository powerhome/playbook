import "./main.scss";

import "./pb_body.js";
import "./pb_button.js";
import "./pb_caption.js";
import "./pb_card.js";
import "./pb_title.js";
import "./pb_layout.js";
import "./pb_vertical_nav.js";
import "./pb_image.js";
import "./pb_table.js";
// END PACKS -- Leave comment for kit generator

import "../../../../fonts/fontawesome.js"
import "../../../../fonts/regular.js"

$(document).on('click', '[data-toggle]', function(e){
  e.preventDefault();
  var kit_container = $(this).closest('.pb--doc');
  var toggle_target = $(this).data('toggle');
  $(kit_container).find('[data-action="toggle"]').hide();
  $(kit_container).find('[data-togglable="'+toggle_target+'"]').show();
});
