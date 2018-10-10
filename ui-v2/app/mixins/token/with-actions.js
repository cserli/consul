import Mixin from '@ember/object/mixin';
import WithBlockingActions from 'consul-ui/mixins/with-blocking-actions';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create(WithBlockingActions, {
  settings: service('settings'),
  repo: service('settings'),
  actions: {
    use: function(item) {
      return get(this, 'repo')
        .findBySlug(get(item, 'AccessorID'), this.modelFor('dc').dc.Name)
        .then(item => {
          return get(this, 'settings')
            .persist({
              token: {
                AccessorID: get(item, 'AccessorID'),
                SecretID: get(item, 'SecretID'),
              },
            })
            .then(() => {
              return this.refresh();
            });
        });
    },
    logout: function(item) {
      return get(this, 'feedback').execute(() => {
        return get(this, 'settings')
          .delete('token')
          .then(() => {
            return this.refresh();
          });
      }, 'logout');
    },
    clone: function(item) {
      return get(this, 'feedback').execute(() => {
        return get(this, 'repo')
          .clone(item)
          .then(item => {
            // cloning is similar to delete in that
            // if you clone from the listing page, stay on the listing page
            // whereas if you clone form another token, take me back to the listing page
            // so I can see it
            return this.afterDelete(...arguments);
          })
          .then(function() {
            return item;
          });
      }, 'clone');
    },
  },
});
