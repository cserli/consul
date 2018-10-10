import Service from '@ember/service';
import { getOwner } from '@ember/application';

import qsaFactory from 'consul-ui/utils/dom/qsa-factory';
// TODO: Move to utils/dom
import getComponentFactory from 'consul-ui/utils/get-component-factory';
import normalizeEvent from 'consul-ui/utils/dom/normalize-event';

// ember-eslint doesn't like you using a single $ so use double
// use $_ for components
const $$ = qsaFactory();
let $_;

const $html = document.documentElement;
export default Service.extend({
  init: function() {
    this._super(...arguments);
    $_ = getComponentFactory(getOwner(this));
  },
  normalizeEvent: function() {
    return normalizeEvent(...arguments);
  },
  root: function() {
    return $html;
  },
  elements: function(selector, context) {
    return $$(selector, context);
  },
  // TODO: This should return a single element
  element: function(selector, context) {
    return $$(selector, context);
  },
  // ember components aren't strictly 'dom-like'
  // but if you think of them as a web component 'shim'
  // then it makes more sense to think of them as part of the dom
  // with traditional/standard web components you wouldn't actually need this
  // method as you could just get to their methods from the dom element
  component: function(selector, context) {
    // TODO: support passing a dom element, when we need to do that
    return $_([...this.element(selector, context)][0]);
  },
});
