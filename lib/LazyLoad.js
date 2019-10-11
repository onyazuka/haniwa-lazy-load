const TC = require("haniwa-type-checker");

/*
  opts:
    selectors[array][required] - selectors for elements that should be lazy loaded
    loadHandler[func][not required] - function (element) => function
      called before element starts loading, should return function that will be called when the element is completely loaded
      accepts element itself
      it is better to use default loadHandler
    errorHandler[func][not required] - function(element) => void
      does something with element on loading error
    advance[number][not required][default = 50] - pixels before image is really visible, but it will be loaded
    setNaturalSizeAfterLoad[bool][not required][default = true] - if true, will set real image size after it will have loaded
*/
class LazyLoader {

  constructor(opts) {
    this.opts = opts;
    this.checkOpts();
    const { selectors } = opts;
    // using an object to quickly remove by key
    this.elements = {};
    selectors.forEach(selector => {
      [...document.querySelectorAll(selector)].forEach((element) => {
        this.elements[element.dataset.src] = element;
      });  
    })

    let self = this;
    this.lazyEventListener = () => { self.lazyLoad(); };
    window.addEventListener("resize", this.lazyEventListener);
    window.addEventListener("scroll", this.lazyEventListener);
  }

  checkOpts() {
    const argsCheck = TC.checkObj(this.opts, {
      "selectors": o => TC.isArrayOf(o, TC.isString),
      "loadHandler": o => TC.isOr(TC.isUndefined(o), TC.isFunction(o)),
      "errorHandler": o => TC.isOr(TC.isUndefined(o), TC.isFunction(o)),
      "advance": o => TC.isOr(TC.isUndefined(o), TC.isNumber(o)),
      "setNaturalSizeAfterLoad": o => TC.isOr(TC.isUndefined(o), TC.isBool(o)),
    });
    TC.assert(argsCheck.result, argsCheck.status);
    TC.setObjDefault(this.opts, "advance", LazyLoader.ADVANCE_DEFAULT);
    TC.setObjDefault(this.opts, "setNaturalSizeAfterLoad", LazyLoader.SET_NATURAL_SIZE_AFTER_LOAD_DEFAULT);
  }

  lazyLoad() {
    const { loadHandler, errorHandler, advance, setNaturalSizeAfterLoad } = this.opts;
    for (let key in this.elements) {
      const element = this.elements[key];
      if(isElementVisible(element, advance)) {
        // this element should not be processed twice
        delete this.elements[key];
        let cancelLoading = loadHandler(element);
        element.onload = () => { 
          if(setNaturalSizeAfterLoad) {
            if (element.naturalHeight) element.style.height = element.naturalHeight + "px";
            if (element.naturalWidth) element.style.width = element.naturalWidth + "px";
          }
          if(cancelLoading) cancelLoading();
        };
        element.onerror = () => {
          if(cancelLoading) cancelLoading();
          if(errorHandler) errorHandler(element);
        };
        element.src = element.dataset.src;
      }
    }

    // no anymore need to listen events - all elements on the page are loaded
    if(this.elements.length === 0) {
      window.removeEventListener("resize", this.lazyEventListener);
      window.removeEventListener("scroll", this.lazyEventListener);
    } 
  }

  /*
    Places loading container on top of the loading element.
    Shows a loading spinner inside the loading container.
    Returns function that should be called when loading is ended.
  */
  static buildDefaultLoadHandler(loadingContainerClassName, loadingInnerClassName) {
    return function(element) {
      let loadingDummy = document.createElement("div");
      let loadingDummyInner = document.createElement("div");
      // need it because inner's properties can be overwritten
      let loadingDummyInnerContainer = document.createElement("div");
      loadingDummy.classList.add(loadingContainerClassName);
      loadingDummyInner.classList.add(loadingInnerClassName);
      loadingDummy.style.position = "relative";  
      loadingDummyInnerContainer.style.position = "absolute";
      loadingDummyInnerContainer.style.top = "50%";
      loadingDummyInnerContainer.style.left = "50%";
      loadingDummyInnerContainer.style.transform = "translate(-50%, -50%)";
      let loadingInnerStyle = getComputedStyle(loadingDummyInner);
      loadingDummyInnerContainer.style.width = loadingInnerStyle.width;
      loadingDummyInnerContainer.style.height = loadingInnerStyle.height;
      loadingDummy.append(loadingDummyInnerContainer);
      loadingDummyInnerContainer.append(loadingDummyInner);


      element.parentNode.replaceChild(loadingDummy, element);
      loadingDummy.append(element);
      const visibility = element.style.visibility;
      element.style.visibility = "hidden";

      return function() {
        loadingDummy.parentNode.replaceChild(element, loadingDummy);
        element.style.visibility = visibility;
      };
    }
  }
};
LazyLoader.ADVANCE_DEFAULT = 50;
LazyLoader.SET_NATURAL_SIZE_AFTER_LOAD_DEFAULT = true;


/*
  Use this class if you want to load images in the usual way.
  opts:
    selectors[array] - selector for elements that should be lazy loaded
    setNaturalSizeAfterLoad[bool] - if true, will set real image size after it will have loaded
*/
class UnlazyLoader {

  static unlazy(opts) {
    const { selectors, setNaturalSizeAfterLoad } = opts;
    selectors.forEach(selector => {
      [...document.querySelectorAll(selector)].forEach((element) => {
        element.onload = () => {
          if(setNaturalSizeAfterLoad) {
            if (element.naturalHeight) element.style.height = element.naturalHeight + "px";
            if (element.naturalWidth) element.style.width = element.naturalWidth + "px";
          }
        };
        element.src = element.dataset.src;
        element.removeAttribute("data-src");
      });  
    });
  }
};

function isElementVisible(element, advance = 0) {
  let elRect = element.getBoundingClientRect();
  // replaced conjunction with disjunction - should be a little faster
  return !(
    !(elRect.top < window.innerHeight + advance) ||
    !(elRect.left < window.innerWidth + advance) ||
    !(elRect.bottom > 0 - advance) ||
    !(elRect.right > 0 - advance) 
  );
}

/*
  'func' should be max called once per 'timeout' ms
  NOT USED YET
*/
function throttle(func, timeout) {
  let lastCalledTimestamp = 0;
  return function() {
    let currentTimestamp = Date.now();
    // calling only if timeout has passed
    if ((currentTimestamp - lastCalledTimestamp) > timeout) {
      func.apply(null, arguments);
      lastCalledTimestamp = currentTimestamp;
    }
  }
}

module.exports = LazyLoader;