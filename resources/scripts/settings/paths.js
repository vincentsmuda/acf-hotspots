module.exports = (function(){
  var Paths = function(src){
      this.src = src;
      this.dest = './acf-hotspots/';
      this.assets = this.dest+'assets/';
      this.node = './node_modules/';

      this.scriptsSrc = this.src+'scripts/';
      this.markupSrc = this.src+'markup/';
      this.stylesSrc = this.src+'styles/';

      this.jsSrc = this.scriptsSrc+'js/';
      this.cssSrc = this.stylesSrc+'css/';
      this.scssSrc = this.stylesSrc+'scss/';
      this.htmlSrc = this.markupSrc+'html/';

      this.jsDest = this.assets+'js/';
      this.cssDest = this.assets+'css/';

      this.jsVendors = [
        // this.jsSrc + 'vendor/**/*.js',
        // this.node + 'lory.js/dist/lory.min.js'
      ];
    },
    paths = new Paths('./resources/');
  return paths
})();