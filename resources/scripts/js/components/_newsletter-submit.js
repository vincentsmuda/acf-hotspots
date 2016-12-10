/**
 *
 *	Newsletter Submit
 * 	This will apply ajax submits to the newsletters
 *
 *  Some mailchip returns:
 *  Object {result: "error", msg: "0 - An email address must contain a single @"}
 *  main.js:1 Object {result: "error", msg: "0 - The username portion of the email address is invalid (the portion before the @: )"}
 *  main.js:1 Object {result: "error", msg: "0 - The domain portion of the email address is invalid (the portion after the @: )"}
 *  main.js:1 Object {result: "success", msg: "Almost finished... We need to confirm your email a…ase click the link in the email we just sent you."}msg: "Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you."result: "success"
 *
 */

var newsletter_cb = null,
    newsletter_script = null,
    newsletter_forms = [];

(function(){

    var forms = document.getElementsByClassName('newsletter__form'),
        head = document.getElementsByTagName('head')[0],
        jsonP = function(url, input){
          newsletter_script = document.createElement('script');
          newsletter_script.src = url+
            '&EMAIL='+input[0].value
          head.appendChild(newsletter_script);
        },
        NewsletterForm = function(form){

          var self = this;
          self.form = form;
          self.formurl = self.form.getAttribute('action');
          self.button = self.form.getElementsByClassName('newsletter__submit')[0];
          self.input = self.form.getElementsByClassName('newsletter__input')[0];
          self.msg = self.form.getElementsByClassName('newsletter__message')[0];
          self.submit = function(e){

            // stop default action
            e.preventDefault();

            // remove all previous states
            self.form.classList.remove('in-progress');
            self.form.classList.remove('error');
            self.form.classList.remove('complete');

            // Set in progress state
            self.form.classList.add('in-progress');

            // check against mailchimp for validity
            jsonP(self.formurl, [self.input]);

          }

          self.form.addEventListener('submit', self.submit);

          newsletter_forms[newsletter_forms.length] = self;

        },
        init = function(){
            for (var i = 0; i < forms.length; i++) {
                forms[i] = new NewsletterForm(forms[i]);
            }
        };

    /* Validate Request */
    newsletter_cb = function(data){

        var status = data.result,
            msg = data.msg,
            resp_msg = '',
            resp_class = '';

        for (var i = newsletter_forms.length - 1; i >= 0; i--) {
            if(newsletter_forms[i].form.classList.contains('in-progress')){
                var self = newsletter_forms[i];
                break;
            }
        }

        self.msg.style.display = 'inline-block';

        switch (status) {
          case 'success':
            resp_msg = '<span class="home-box-newsletter-title"">Success!</span><br/>'+msg;
            resp_class = 'complete';
            break;
          case 'error':
            resp_msg = (msg.split(' - '))[1];
            resp_class = 'error';
            break;
          default:
            resp_msg = ('Oops, something went wrong. Try again later.');
            resp_class = 'error';
        }

        self.msg.innerHTML = (resp_msg);
        self.form.classList.remove('in-progress');
        self.form.classList.add(resp_class);

        // Clear out script for GC
        head.removeChild(newsletter_script);
        newsletter_script = null;

    }

    // init forms logic
    init();

})();
