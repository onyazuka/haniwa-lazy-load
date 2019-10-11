import LazyLoader from "haniwa-lazy-load";

const LL = LazyLoader.LazyLoader;
const ULL = LazyLoader.UnlazyLoader;

// your error handler
function onErrorHandler(element) {
  let errorImg = document.createElement("img");
  errorImg.src = "https://pm1.narvii.com/6058/e5287e8be91b3a46bef78276895fe1094eef6a16_hq.jpg";
  element.parentNode.replaceChild(errorImg, element);
}

// use this if you want to return normal loading process
/*window.addEventListener("DOMContentLoaded", () => {
  ULL.unlazy({
    selectors: ["img", "iframe"],
    setNaturalSizeAfterLoad: true,
  });
});*/

window.onload = () => {
  const lazyLoader = new LL({
    selectors: ["img", "iframe"],
    loadHandler: LL.buildDefaultLoadHandler("lazy-load-loading-container", "lazy-load-loading"),
    errorHandler: onErrorHandler,
  });
  lazyLoader.lazyLoad();
};
