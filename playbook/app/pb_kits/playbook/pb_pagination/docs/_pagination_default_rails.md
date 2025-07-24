<div class="pb_pill_kit_warning"><div class="pb_title_kit_size_4 pb_pill_text">Disclaimer</div></div> 
Our Pagination kit depends on the <a href="https://github.com/mislav/will_paginate" target="_blank"> will\_paginate library. </a> Please follow the basic will\_paginate setup.

Once you have perfomed the paginated query in your controller file you can use our kit (see code example below) instead of `<%= will_paginate @users %>` in your view file.

You need to add: <code>require "playbook/pagination_renderer"</code> in your apps controller file.

Note: If the total page count is 0 or 1, the Pagination kit will not be displayed as there aren't multiple pages to navigate.