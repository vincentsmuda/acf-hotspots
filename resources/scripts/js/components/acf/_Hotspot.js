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
        this.create_inputs(attributes.x,attributes.y);
      }

      this.point_events();
    }


    /**
     *  Creates the HTML inputs
     */
    create_inputs (x,y) {
      let clone = this.context.spot_clone.cloneNode(true),
          clone_fields = getClass(class_base + '__input', clone),
          clone_number = this.i,
          clone_title = getClass(class_base + '__label', clone)[0];

      for (var i = 0, l = clone_fields.length; i < l; i++) {
        let field_name = clone_fields[i].getAttribute('data-name').replace('!!N!!', clone_number);
        clone_fields[i].setAttribute('name', field_name);
      }

      clone_title.innerHTML = clone_title.innerHTML.replace(/!!N!!/g, clone_number+1);

      getClass(class_base + '__input--x', clone)[0].value = x;
      getClass(class_base + '__input--y', clone)[0].value = y;

      this.context.spot_clone_original.parentNode.appendChild(clone);

      return this.get_inputs_object(clone);
    }


    /**
     *  Handles repositioning of point and updating of its values
     */
    reposition (i) {
      let inputs = this.inputs.inputs;
      this.i = i;
      this.point.parentNode.appendChild(this.point);
      for (var j = 0, l = inputs.length; j < l; j++) {
        inputs[j].setAttribute(
          'name',
          inputs[j].getAttribute('name').replace(
            /points]\[\d+\]\[/,
            'points][' + i + ']['
          )
        );
      }
    }


    /**
     *  Get inputs object
     */
    get_inputs_object (wrapper) {
      this.inputs = {
        wrapper: wrapper,
        inputs: getClass(class_base + '__input', wrapper),
        x: getClass(class_base + '__input--x', wrapper)[0],
        y: getClass(class_base + '__input--y', wrapper)[0]
      };
      this.handle_remove();
      return this.inputs;
    }


    /**
     *  Creates the point's HTML
     */
    create_point (x,y) {

      let point_element = document.createElement('div');
      point_element.classList.add(this.class_point);
      point_element.style.left = (x * 100) + '%';
      point_element.style.top = (y * 100) + '%';

      this.context.main_image.parentNode.appendChild(
        point_element
      );

      return point_element;

    }


    /**
     *  Updates the position values in the inputs
     */
    update_position(x,y) {
      this.x = x;
      this.y = y;
      this.inputs.x.value = x;
      this.inputs.y.value = y;
      this.point.style.left = x*100 + '%';
      this.point.style.top = y*100 + '%';
    }


    /**
     *  handles the listener for the remove button
     */
    handle_remove() {
      if(this.inputs.wrapper === undefined) return;
      let remove_button = getClass('acf-hotspot__delete',this.inputs.wrapper)[0];
      remove_button.addEventListener(
        'click',
        (e) => {
          e.preventDefault()
          this.remove()
        }
      )
    }


    /**
     *  Removes this point
     */
    remove() {
      if(confirm('Are you sure you would like to remove point #' + (this.i+1) + '? (this change will only persist if you save/update this post)')) {
        let points = this.context.points;
        points.splice(this.i, 1);
        for (let i = 0, l = points.length; i < l; i++) {
          points[i].reposition(i);
        }
        this.point.parentNode.removeChild(this.point);
        this.inputs.wrapper.parentNode.removeChild(this.inputs.wrapper);
        // TODO: Delete this instance
      }
    }


    /**
     *  Makes this point draggable on the image
     */
    make_draggable () {
      let self = this,
          main_image = this.context.main_image;
      $( this.point ).draggable({
        containment: 'parent',
        scroll: false,
        // start: function() {},
        // drag: function() {},
        stop: function(e) {
          let x = self.point.offsetLeft / main_image.offsetWidth,
              y = self.point.offsetTop / main_image.offsetHeight;
          self.update_position(x,y);
        }
      });
    }


    /**
     *  Point Events
     */
    point_events () {
      // this.handle_remove();
      this.make_draggable();
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
      this.main_image     = getClass( class_base + '__image', this.el[0])[0];
      this.points         = [];
      this.spot_clone     = this.generate_spot_clone();
      this.init();
    }


    /**
     *  Adds existing points to item
     */
    add_exisiting_points() {
      let existing_points = getClass(class_base + '__point-fields', this.el[0]);
      for (let i = 0, l = existing_points.length; i < l; i++) {
        let x = getClass(class_base + '__input--x', existing_points[i])[0].value,
            y = getClass(class_base + '__input--y', existing_points[i])[0].value,
            point = new HotspotPoint({
              x: x,
              y: y,
              context: this,
              exists: true
            });
        point.get_inputs_object(existing_points[i]);
        this.points.push(point);
      }
    }


    /**
     *  Generates spot fields clone
     */
    generate_spot_clone() {
      let original = getClass(class_base + '__clone-base', this.el[0])[0],
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
     *  Sorts all references to the given point
     */
    sort_points (from, to) {
      this.points.splice(to, 0, this.points.splice(from, 1)[0]);
      for (var i = 0, l = this.points.length; i < l; i++) {
        this.points[i].reposition(i);
      }
    }

    /**
     *  Reorders the point information
     */
    sortabe() {
      let self = this,
          sorted_item = -1;
      $( '.' + class_base + '__information', this.el ).sortable({
        // revert: true,
        handle: '.' + class_base + '__label',
        start: function( event, ui ) {
          sorted_item = ui.item.index();
        },
        beforeStop: function( event, ui ) {
          if(sorted_item !== ui.item.index()) {
            self.sort_points(sorted_item-1, ui.item.index()-1);
          }
          sorted_item = -1;
        }
      });
    }


    /**
     *  Triggers necessary watchers and events
     */

    init() {
      this.watch_for_new_image();
      this.change_hotspot_image();
      this.listen_for_user_clicks();
      this.add_exisiting_points();
      this.sortabe();
    }

  }

  // Set helper functions:``
  function getClass(string, context) {
    if(context === undefined) context = document;
    return context.getElementsByClassName(string);
  }

})(jQuery);
