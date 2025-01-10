import React from 'react'
import "./Timer.css"

const Timer = () => {
  return (
    <div>
      <section class="intro">
        <div class="container">
          <h1>Animated Timeline</h1>
        </div>
      </section>

      <section class="timeline">
        <ul>
          <li>
            <div>
              <time>2012</time>
              One unbreakable shield against the coming darkness; One last blade, forged in defiance of fate; Let them be my legacy to the galaxy I conquered; And my final gift to the species I failed
            </div>
          </li>

          <li>
            <div>
              <time>2013</time>
              Offer the incantation of activation, speak forth the litany of retribution and deliver unto the enemy the wrath of the Omnissiah.
            </div>
          </li>

          <li>
            <div>
              <time>2014</time>
              The lives of millions, and the honour of our Chapter, hang in the balance brothers. Failure is not an option.
            </div>
          </li>

          <li>
            <div>
              <time>2015</time>
              Treat them with honour, my Brothers. Not because they will bring us victory this day, but because their fate will one day be ours.
            </div>
          </li>

          <li>
            <div>
              <time>2016</time>
              Lead us from death to victory, from falsehood to truth. Lead us from despair to hope, from faith to slaughter. Lead us to His strength and an eternity of war. Let His wrath fill our hearts. Death, war, and blood; in vengeance serve the Emperor and the name of Dorn!
            </div>
          </li>

          <li>
            <div>
              <time>2017</time>
              Trust in the Emperor at the hour of battle. Trust to him to intercede, and protect his warriors true as they deal death on alien soil. Turn their seas to red with the blood of their slain. Crush their hopes, their dreams And turn their songs into cries of lamentation.
            </div>
          </li>

          <li>
            <div>
              <time>2018</time>
              We are the Ultramarines, the Sons of Guilliman. Whilst we draw breath, we stand. Whilst we stand, we fight. Whilst we fight, we prevail. Nothing shall stay our wrath.
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}

(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();

export default Timer