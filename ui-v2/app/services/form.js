import Service from '@ember/service';
import builderFactory from 'consul-ui/utils/form/builder';
const builder = builderFactory();
const forms = {};
export default Service.extend({
  // a `get` method is added via the form initializer
  build: function(obj, name) {
    return builder(...arguments);
  },
});
