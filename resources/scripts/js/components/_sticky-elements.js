/**
 *
 *  Sticky Elements
 *  Sticks the element to the top of the screen relative to the parent and scoll.
 *
 * 	Paramaters:
 * 	data-ignoreend (bool) whether or not the the element should stick even after reaching its parent's end.
 *  data-offsetstart (number) the start offset at which the element should start sticking
 *
 *  Usage:
 *  <div class="sticky" data-offsetstart="0" data-ignoreend="false"></div>
 *
 */

(function(){

  var sticky_elements = document.getElementsByClassName('sticky'),
      Sticky = function(el){
        this.el = el;
        this.par = el.parentNode;
        this.body = document.body;
        this.state = -1;
        this.offset_start = this.el.getAttribute('data-offsetstart') || 0;
        this.ignore_end = this.el.getAttribute('data-ignoreend') || false;
        this.init();
      };

  Sticky.prototype.scroll = function (e) {

    var top = window.pageYOffset || document.documentElement.scrollTop,
        scroll_diff = top - this.prev_top;

    this.prev_top = top;

    if(this.state !== 1 && top+this.el_top > this.el_start && (top < this.el_end || this.ignore_end)) {
      this.el_top = 0;
      this.state = 1;
      requestAnimationFrame(() => {
        this.el.classList.remove('sticky--top','sticky--bottom');
        this.el.classList.add('sticky--middle');
        this.el.style.top = '0px';
      });
    } else if(this.state !== 2 && top+this.el_top >= this.el_end && !this.ignore_end) {
      this.el_top = 0;
      this.state = 2;
      requestAnimationFrame(() => {
        this.el.classList.remove('sticky--top','sticky--middle');
        this.el.classList.add('sticky--bottom');
        this.el.style.top = 'auto';
      });
    } else if(top+this.el_top <= this.el_start && this.state !== 0) {
      this.el_top = 0;
      this.state = 0;
      requestAnimationFrame(() => {
        this.el.classList.remove('sticky--middle','sticky--bottom');
        this.el.classList.add('sticky--top');
        this.el.style.top = this.offset_start + 'px';
      });
    }

    if(this.state === 1 && this.el_scroll_diff < 0) {
      if(
        (this.el_top === 0 && scroll_diff < 0) ||
        (this.el_top === this.el_scroll_diff && scroll_diff > 0)
      ) return;
      this.el_top = this.el_top - scroll_diff;
      if(this.el_top < this.el_scroll_diff || this.el_top > 0){
        this.el_top = this.el_top > 0 ? 0 : this.el_scroll_diff;
      }
      requestAnimationFrame(() => {
        this.el.style.top = this.el_top + 'px';
      });
    }

  };

  Sticky.prototype.calculate = function () {
    this.win_height = window.innerHeight;
    this.body_Rect = this.body.getBoundingClientRect();
    this.par_rect = this.par.getBoundingClientRect();
    this.prev_top = 0;
    this.el_rect = this.el.getBoundingClientRect();
    this.el_top = 0;
    this.el_height = this.el.offsetHeight;
    this.el_scroll_diff = this.win_height - this.el_height;
    this.el_start = this.par_rect.top - this.body_Rect.top + this.offset_start;
    this.el_end = this.par_rect.bottom - this.body_Rect.top - this.el_rect.height;
  };

  Sticky.prototype.init = function () {
    this.calculate();
    this.scroll();
    window.addEventListener('resize', e => this.calculate(e));
    window.addEventListener('scroll', e => this.scroll(e));
  };

  for (var i = 0; i < sticky_elements.length; i++)
    new Sticky(sticky_elements[i]);

})();
