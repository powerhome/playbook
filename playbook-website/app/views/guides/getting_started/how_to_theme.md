---
title: How to Theme
description: You can customize and theme Playbook components by setting your own variable values instead of using the default Sass values.
icon: wrench
---

For a comprehensive overview of our tokens, refer to the [Tokens](https://playbook.powerapp.cloud/tokens) or review our [variables](https://github.com/powerhome/playbook/tree/master/playbook/app/pb_kits/playbook/tokens).

#### Index

[Assigning Variable Values](#Assigning-Variable-Values)
‣ [Sass Variable Assignment](#Sass-Variable-Assignment)
‣ [The !default Flag](#The-default-Flag)
‣ [Order of Variable Assignment](#Order-of-Variable-Assignment)
[Example: Customizing z-index](#Example-Customizing-z-index)

Do you have design requirements that differ from Playbook's default settings?

You can customize and theme Playbook components by setting your own variable values instead of using the default Sass values. 

## Assigning Variable Values

### Sass Variable Assignment

When you assign a new value to a Sass variable, the previous value is overwritten:

```scss
// Initial value
 $primary: red;

 // New value
 $primary: blue;
```

### The !default Flag

To accommodate your design system needs, we use the `!default` flag with Playbook's tokens. This allows you to configure variables before the CSS is generated.

For instance, here are some of our color tokens:
```scss
$royal:               #0056CF !default;
 $purple:              #9E64E9 !default;
 $teal:                #00C4D7 !default;
 $default:             #93a8b8 !default;
 $primary:             $royal !default;
```

The `!default` flag ensures that a variable is assigned a value only if it hasn't already been defined or if its value is null. If the variable already has a value, the existing value will be retained:

```scss
// Custom value
 $primary: red;

 // Default value isn't assigned
 $primary: $royal !default;
```

For more details, refer to the [Sass documentation](https://sass-lang.com/documentation/variables/#default-values). 

### Order of Variable Assignment

The order in which you assign variables is crucial when using `!default`. Ensure that you set your custom variables *before* Playbook Sass styles. 

If you declare variables after importing Playbook, the default values will remain unchanged.

For example, if you first declare `@import 'playbook.scss'` and then set `$primary` to another color, Playbook components will use the default color instead of your custom color:

```scss
@import 'playbook.scss';

 // _colors.scss
 $primary: $royal !default;

 // _reset.scss
 // Link colors are $royal
 a {
  color: $primary;
 }

 // application.scss
 // Only later uses of $primary are red
 $primary: red;
```

## Example: Customizing z-index

Let's say you need to increase the max z-index value in Playbook.

Assign the variable before importing Playbook:

```scss
$z_10: 1000000;
 @import 'playbook.scss';
```

Alternatively, if you use the `@use` rule:

```scss
@use 'playbook' with (
   $z_10: 1000000,
 );
```