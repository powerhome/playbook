<div class="pb_pill_kit_warning"><div class="pb_title_kit_size_4 pb_pill_text">Disclaimer</div></div> 
Our Pagination kit depends on the <a href="https://github.com/mislav/will_paginate" target="_blank"> will_paginate</a> library.

Follow the basic pagination setup.

In your view, instead of rendering will paginate like: `<%= will_paginate @users %>`, you can use our kit.

You need to add: <code>require "playbook/pagination_renderer"</code> in your apps controller file.