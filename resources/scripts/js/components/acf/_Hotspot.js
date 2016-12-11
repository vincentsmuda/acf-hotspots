/**
 *
 *	Hotspot Class
 *
 */

var HotspotInput = (function($){

  let class_base = 'acf-hotspot';

  class HotspotPoint {

    /**
     *  Construct the point
     */
    constructor (attributes) {
      this.class_point    = class_base + '__point';
      this.x              = attributes.x;
      this.y              = attributes.y;
      this.context 				= attributes.context;
      this.i              = this.context.points.length;
      this.point          = this.create_point(attributes.x,attributes.y);

      if(!attributes.exists) {
        this.inputs       = this.create_inputs(attributes.x,attributes.y);
      }
    }


    /**
     *  Creates the HTML inputs
     */
    create_inputs (x,y) {
      let clone = this.context.spot_clone.cloneNode(true),
          clone_fields = clone.getElementsByClassName('acf-hotspot__input'),
          clone_number = this.i,
          clone_title = clone.getElementsByClassName('acf-hotspot__label')[0];

      for (var i = 0, l = clone_fields.length; i < l; i++) {
        let field_name = clone_fields[i].getAttribute('data-name').replace('!!N!!', clone_number);
        clone_fields[i].setAttribute('name', field_name);
      }

      clone_title.innerHTML = clone_title.innerHTML.replace(/!!N!!/g, clone_number+1);

      clone.getElementsByClassName(class_base + '__input--x')[0].value = x;
      clone.getElementsByClassName(class_base + '__input--y')[0].value = y;

      this.context.spot_clone_original.parentNode.appendChild(clone);

      return clone;
    }


    /**
     *  Creates the point's HTML
     */
    create_point (x,y) {

      let point_element = document.createElement('div'),
          point_number = document.createTextNode(this.i+1);
      point_element.classList.add(this.class_point);
      point_element.style.left = (x * 100) + '%';
      point_element.style.top = (y * 100) + '%';
      point_element.appendChild(point_number);

      this.context.main_image.parentNode.insertBefore(
        point_element,
        this.context.main_image
      );

      return point_element;

    }

  }

  return class HotspotItem {

    /**
     *  What we need to run the class
     */
    constructor ($el) {
      this.el 					  = $el;
      this.source_image   = $('.' + class_base + '__upload .acf-image-uploader .view img', $el);
      this.img_src        = '';
      this.main_image     = this.el[0].getElementsByClassName( class_base + '__image')[0];
      this.points         = [];
      this.spot_clone     = this.generate_spot_clone();
      this.init();
    }


    /**
     *  Adds existing points to item
     */
    add_exisiting_points() {
      let existing_points = document.getElementsByClassName(class_base + '__point-fields');
      for (var i = 0, l = existing_points.length; i < l; i++) {
        let x = existing_points[i].getElementsByClassName(class_base + '__input--x')[0].value,
            y = existing_points[i].getElementsByClassName(class_base + '__input--y')[0].value;
        this.points.push(new HotspotPoint({
          x: x,
          y: y,
          context: this,
          exists: true
        }));
      }
    }


    /**
     *  Generates spot fields clone
     */
    generate_spot_clone() {
      let original = this.el[0].getElementsByClassName(class_base + '__clone-base')[0],
          clone = original.cloneNode(true);
      this.spot_clone_original = original;
      clone.classList.remove(class_base + '__clone-base');
      clone.classList.add(class_base + '__point-fields');
      return clone;
    }


    /**
     *  Changes the hotspot imagearea to reflect the uploaded image
     */

    change_hotspot_image() {
      this.img_src = this.source_image[0].getAttribute('src');
      this.img_src = this.img_src.replace(/-\d+x\d+\./g,'.');
      this.main_image.setAttribute('src', this.img_src);
    }


    /**
     *  Upload Watcher
     */

    watch_for_new_image() {
      this.source_image.on(
        'load error',
        () => this.change_hotspot_image()
      );
    }


    /**
     *  Listen for user clicks on image
     */

    listen_for_user_clicks() {
      this.main_image.addEventListener(
        'click',
        e => this.create_hotspot_point(e.offsetX,e.offsetY)
      );
    }


    /**
     *  Creates a new hotspot
     */

    create_hotspot_point (x,y) {

      if(!confirm('Are you sure you would like to create a new point?')) return;

      let width = this.main_image.offsetWidth,
          height = this.main_image.offsetHeight,
          point = new HotspotPoint({
            x: x/width,
            y: y/height,
            context: this
          });

      return this.points.push(point);

    }


    /**
     *  Triggers necessary watchers and events
     */

    init() {
      this.watch_for_new_image();
      this.change_hotspot_image();
      this.listen_for_user_clicks();
      this.add_exisiting_points();
    }

  }

  // return Hotspot;

})(jQuery);
