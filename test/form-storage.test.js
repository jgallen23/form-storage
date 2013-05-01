suite('form-storage', function() {
  var demoForm = $('#demo-form');
  var fixtureData = demoForm.serializeArray();

  setup(function() {
    localStorage.removeItem('demo-form');
  });

  suite('init', function() {
    test('get form id', function() {
      demoForm.formStorage();

      assert.equal(demoForm.formStorage('getId'), 'demo-form');
    });

    test('load existing form data', function() {
      localStorage.setItem('demo-form', JSON.stringify(fixtureData));

      demoForm.formStorage();

      assert.equal(JSON.stringify(demoForm.formStorage('getData')), JSON.stringify(fixtureData));
    });
  });

  suite('handle form events', function() {
    test('blur', function(done) {
      demoForm.formStorage();

      demoForm.one('formStorageSave', function() {
        assert.ok(true);
        done();
      });

      demoForm.find('input, textarea, select').trigger('blur');
    });

    test('change', function(done) {
      demoForm.formStorage();

      demoForm.one('formStorageSave', function() {
        assert.ok(true);
        done();
      });

      demoForm.find('input, textarea, select').trigger('change');
    });

    test('save data', function(done) {
      demoForm.formStorage();

      demoForm.one('formStorageSave', function() {
        assert.equal(JSON.stringify(demoForm.formStorage('getData')), JSON.stringify(demoForm.serializeArray()));
        done();
      });

      demoForm.find('input').first().val('new value').trigger('change');
    });
  });
});