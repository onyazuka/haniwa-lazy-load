# haniwa-lazy-load
Fast and customizable lazy loading for images and iframes with vanilla js

## Features
- Lazy loading of images and iframes;
- Custom selectors for elements that should be lazy loaded;
- You can specify src attribute of lazy elements;
- Loading process customization/visualization;
- Error handling/visualization;
- You can disable lazy loading without any pain and changing HTML;

## installation
npm i haniwa-lazy-load

## Usage example
For basic usage, look example directory.

You can always detach lazy loading with:
```javascript
lazyLoader.detach();
``` 

and attach it later with:
```javascript
lazyLoader.attach();
```

If you load your images dynamically, you can always add new elements to lazy load:
```javascript
lazyLoader.updateWithSelectors(["img[data-src]", "iframe"]);
lazyLoader.lazyLoad();
```

## LazyLoader Options
- selectors[array][required] - selectors for elements that should be lazy loaded(example: ["img", "iframe"]);
- loadHandler[func][not required] - function (element) => function;
      called before element starts loading, should return function that will be called when it is completely loaded;
      accepts element itself;
      you can build default loadHandler with LazyLoader.buildDefaultLoadHandler, that accept two arguments: selector for loading container and selector for loading inner;
- errorHandler[func][not required] - function(element) => void;
      does something with the element on a loading error;
- advance[number][not required][default = 50] - pixels before an image starts loading;
- setNaturalSizeAfterLoad[bool][not required][default = true] - if true, will set real image size after it will have loaded;
- lazyAttribute[string][not required][default = 'data-src'] - attribute in which real 'src' is written. When content is loaded, it will be replaced with 'src'.

## UnlazyLoader Options
- selectors[array][required];
- setNaturalSizeAfterLoad[bool][not required][default = true];
- lazyAttribute[string][not required][default = 'data-src']

## Licension
MIT


