# mrD-SmoothScroller

mrd-smoothscroller.js is a lightweight and highly customizable JavaScript library designed to enhance the user experience by providing smooth scrolling capabilities for web pages. By intercepting native scroll events, this library animates the scrolling process, offering a more pleasant and visually appealing navigation experience. SmoothScroll.js is perfect for developers looking to implement smooth, animated scrolling for mouse wheel, trackpad, and keyboard navigation.

## Key Features:

1. **Smooth Scrolling**: Ensures smooth, animated scrolling for all types of input, including mouse wheel, trackpad, and keyboard, enhancing the overall user experience.
2. **Customizable Options**: Offers extensive customization, allowing developers to set custom scroll durations, sensitivity levels, and deceleration factors to tailor the scrolling behavior to their specific needs.
3. **Ease-In-Out Effects**: Supports smooth ease-in-out effects, providing a natural and intuitive scrolling experience that mimics real-world physics.
4. **Anchor Link Scrolling**: Automatically handles smooth scrolling to page sections when navigation links are clicked, ensuring seamless transitions between different parts of the webpage.
5. **Easy Integration**: Simple to set up with minimal configuration required. Developers can leverage `data-*` attributes to customize scrolling options directly within their HTML.
6. **Polyfill Included**: Includes polyfills for `requestAnimationFrame` and `cancelAnimationFrame`, ensuring compatibility with a wide range of browsers and providing a consistent experience across all platforms.

## Installation and Usage:

To get started with SmoothScroll.js, follow these steps:

1. **Include the Library**: Download the `mrd-smoothscroller.js` file and include it in your HTML file:
   ```html
   <script src="path/to/mrd-smoothscroller.js"></script>

   OR use the free CDN:
   <script src="https://cdn.jsdelivr.net/gh/monsieurdd/mrD-SmoothScroller@latest/mrd-smoothscroller.js"></script>
   

   
2. **Include custom attributes if you need to change the smoothness **:
   ```html
   <body data-scroll-duration="1000"
      data-scroll-deceleration="0.96"
      data-scroll-sensitivity="0.05"
      data-scroll-isScrolling="false"
      data-scroll-velocity="0">
