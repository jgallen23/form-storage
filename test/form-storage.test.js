suite('form-storage', function() {
  var demoForm, fixtureData;

  setup(function() {
    demoForm = $('#demo-form').clone();
    fixtureData = demoForm.serializeArray();
    localStorage.removeItem('demo-form');
    demoForm.removeData();
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

  suite('load saved', function() {
    test('input[type=text] data', function (){
      localStorage.setItem('demo-form', JSON.stringify(fixtureData));

      demoForm.find('input[type="text"]').val('this should be replaced');

      demoForm.formStorage();

      assert.equal(JSON.stringify(fixtureData), JSON.stringify(demoForm.serializeArray()));
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

  suite('clear data', function() {
    test('clear', function() {
      localStorage.setItem('demo-form', JSON.stringify(fixtureData));

      demoForm.formStorage();

      demoForm.formStorage('clear');

      assert.equal(typeof localStorage['demo-form'], 'undefined');
    });
  });
});