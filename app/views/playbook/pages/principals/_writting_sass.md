# Writing Sass

#### Class names, chaining, and SASS
A kit should be named using prefixed complex classes to try and avoid naming collision and style bleed. Class chaining should be avoided if possible.

---

1. Use extend a class using & when possible and avoid class chaining when possible.
2. When you must use a chained class try to avoid setting multiple properties.
3. If your using chained classes have simple names make sure they don't collide with our utilities, and try to nest them under a parent class to avoid bleed
