// mr.D Smooth Scroller JS
// Created by Carl Durocher - www.carldurocher.com
// Free, just keep my credential in here please.
// Version 1.0.1

(function (global) {
  'use strict';

  // Polyfill for requestAnimationFrame and cancelAnimationFrame
  (function () {
    if (!global.requestAnimationFrame) {
      global.requestAnimationFrame = function (callback) {
        return global.setTimeout(callback, 1000 / 60);
      };
    }
    if (!global.cancelAnimationFrame) {
      global.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  })();

  function SmoothScroll(options) {
    this.options = options || {};
    this.isScrolling = false;
    this.velocity = 0;
    this.deceleration = this.options.deceleration || 0.93; // Deceleration factor
    this.sensitivity = this.options.sensitivity || 0.05; // Sensitivity factor
    this.init();
  }

  SmoothScroll.prototype.init = function () {
    const duration = this.options.duration || 500;
    const easing = this.options.easing || this.easeOutQuad;

    const animateScroll = () => {
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

      if (Math.abs(this.velocity) > 0.05) { // Lower threshold for smoother stop
        this.currentScrollY = Math.max(0, Math.min(this.currentScrollY + this.velocity, maxScrollY));
        window.scrollTo(0, this.currentScrollY);
        this.velocity *= this.deceleration;

        // Stop scrolling if at the top or bottom
        if (this.currentScrollY === 0 || this.currentScrollY === maxScrollY) {
          this.velocity = 0;
          this.isScrolling = false;
        } else {
          requestAnimationFrame(animateScroll);
        }
      } else {
        this.isScrolling = false;
      }
    };

    const handleScroll = (deltaY) => {
      if (this.isScrolling) {
        this.velocity += deltaY * this.sensitivity;
        return;
      }
      this.currentScrollY = window.pageYOffset;
      this.velocity = deltaY * this.sensitivity;
      this.isScrolling = true;
      requestAnimationFrame(animateScroll);
    };

    const smoothScrollTo = (targetY) => {
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const animate = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const nextY = easing(timeElapsed, startY, distance, duration);
        window.scrollTo(0, nextY);

        if (timeElapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, targetY);
        }
      };

      requestAnimationFrame(animate);
    };

    // Add smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const targetY = targetElement.offsetTop;
          smoothScrollTo(targetY);
        }
      });
    });

    window.addEventListener('wheel', (event) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    }, { passive: false });

    window.addEventListener('keydown', (event) => {
      const scrollAmount = 40;
      let deltaY = 0;
      switch (event.key) {
        case 'ArrowUp':
          deltaY = -scrollAmount;
          break;
        case 'ArrowDown':
          deltaY = scrollAmount;
          break;
        case 'PageUp':
          deltaY = -window.innerHeight;
          break;
        case 'PageDown':
          deltaY = window.innerHeight;
          break;
        default:
          return; // exit if not a key we handle
      }
      event.preventDefault();
      handleScroll(deltaY);
    }, { passive: false });
  };

  SmoothScroll.prototype.easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  };

  if (document.body.classList.contains('mrd-smooth')) {
    global.addEventListener('DOMContentLoaded', () => {
      // Read custom options from the body element
      const body = document.body;
      const options = {
        duration: parseInt(body.getAttribute('data-scroll-duration')) || 800,
        deceleration: parseFloat(body.getAttribute('data-scroll-deceleration')) || 0.93,
        sensitivity: parseFloat(body.getAttribute('data-scroll-sensitivity')) || 0.05,
        easing: function (t, b, c, d) { // Custom easing function
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
      };
      new SmoothScroll(options);
    });
  }

  // Created by Carl Durocher - www.carldurocher.com
  // Free, just keep my credential in here please.

})(window);