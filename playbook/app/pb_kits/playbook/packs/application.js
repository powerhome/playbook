// import '../../../../fonts/fontawesome-min.js'
import '../../../../fonts/regular-min.js'
import '../../../../fonts/custom-icons.js'




// Things i know 
// -- upgrade fontawesome to when it supports the `fak` custom icon sets which i think is 5.14.0 -- but we should just upgrade to latest anyway
// -- Font awesome is picky. This plugin eases the entire process by giving FA exactly what it needs. SVGO Compressor by sketch.
// -- Furthermore on it's pickiness, i had to resize the symbol to be 16x20 MAX pixels. It cannot be bigger, or FA won't accept it.

// -- We would need to go through all our icons and get them small, and then export (the plugin kicks in whenever you export -- you only need to have it installed ), so they have a single svg path, etc.

// --  I'm not sure what is included exactly in our custom-icons script that I got from the website... BUT the other icons-- namely our fontawesome stuff still seems in tact.
// --  We still need the import 'regular-min.js', BUT we can no longer include fontawesome-min.js .... this new script (custom-icons.js) takes the place of that one PLUS includes our custom icons.
// --  Our current pricing plan allows for 250 uploaded custom icons. If we hit that limit, we'll need to fork out some more cash.
// --  We should also just point our stuff to the latest FontAwesome instead of manually pulling it in and copying the minified JS... Are we doing that because we don't want an accidental version slip? Are we doing that because we want full control? 
// --  The custom-icons script changes everytime a new script is added... so we should just point to the src, instead of copying/pasting everytime. 
