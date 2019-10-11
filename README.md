# haniwa-lazy-load
Fast and customizable lazy loading for images and iframes with vanilla js

## Usage
**Please use data-src attribute instead of src on elements which you want to be lazy-loaded!***

## Features
- Lazy load images and iframes;
- Custom selectors for elements that should be lazy loaded;
- Loading process customization/visualization;
- Error handling/visualization;
- You can disable lazy loading without any pain and changing HTML;
Yet, script has a little limitation: you should set at least approximate size of lazy loading image in css properties.

## installation
npm i haniwa-lazy-load

## Usage example
Look example directory.

## LazyLoader Options
- selectors[array][required] - selectors for elements that should be lazy loaded(example: ["img", "iframe"]);
- loadHandler[func][not required] - function (element) => function
      called before element starts loading, should return function that will be called when the element is completely loaded
      accepts element itself
      you can build default loadHandler with LazyLoader.buildDefaultLoadHandler, that accept two arguments: selector for loading container and selector for loading inner;
- errorHandler[func][not required] - function(element) => void
      does something with element on loading error
- advance[number][not required][default = 50] - pixels before image is really visible, but it will be loaded;
- setNaturalSizeAfterLoad[bool][not required][default = true] - if true, will set real image size after it will have loaded;

## UnlazyLoader Options
- selectors[array][required];
- setNaturalSizeAfterLoad[bool][not required][default = true];

## Licension
MIT


