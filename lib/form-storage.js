(function($) {
  $.declare('formStorage', {
    init: function () {
      if(!this.supportsLocalstorage()) return false;

      this.id = this.el.data('formstorage-id');

      this.data = this.getData();

      this.restore();

      this.el.on('blur change', 'input, textarea, select', this.proxy(this.save));

      this.el.trigger('formStorageInit');
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
      if(!this.supportsLocalstorage()) return false;

      this.data = this.el.serializeArray();

      window.localStorage[this.id] = JSON.stringify(this.data);

      this.el.trigger('formStorageSave');
    },

    restore: function () {
      if(!this.supportsLocalstorage()) return false;
      
      if(!this.data.length) return;

      var i, field, c = this.data.length;

      var newObject = {};

      // Copy values into an object for multi-select type support
      for(i = 0; i < c; i++) {
        field = this.data[i];

        if(newObject[field.name]) {
          newObject[field.name].push(field.value);
        } else {
          newObject[field.name] = [field.value];
        }
      }

      for(i in newObject) {
        field = newObject[i];
        this.el.find('[name="' + i + '"]').val(field);
      }

      this.el.trigger('formStorageRestore');
    },

    clear: function () {
      if(!this.supportsLocalstorage()) return false;

      if(window.localStorage[this.id]) {
        delete window.localStorage[this.id];
      }

      this.el.trigger('formStorageClear');
    }
  });
})(jQuery);