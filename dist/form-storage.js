/*!
 * form-storage - Library to store content from forms in localStorage so if browser is refreshed or back button is hit, the data is saved and restored.
 * v0.1.0
 * https://github.com/jgallen23/form-storage
 * copyright Greg Allen 2013
 * MIT License
*/
(function($) {
  $.declare('formStorage', {
    init: function () {
      if(!this.supportsLocalstorage()) return false;

      this.id = this.el.data('formstorage-id');

      this.data = this.getData();

      this.el.on('blur change', 'input, textarea, select', this.proxy(this.save));
    },

    supportsLocalstorage: function () {
      return !!window.localStorage;
    },

    getId: function () {
      return this.id;
    },

    getData: function () {
      return JSON.parse(window.localStorage[this.id] || '[]');
    },

    save: function () {
      this.data = this.el.serializeArray();

      window.localStorage[this.id] = JSON.stringify(this.data);

      this.el.trigger('formStorageSave');
    }
  });
})(jQuery);