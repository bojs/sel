var extend = require('extend'),
    dictionary = require('dictionary');

module.exports = sel;

var sel = function (selector) {
  return new Sel(selector);
};

var Sel = function (selector) {
  this.nodes = toArray(select(parse(selector)));
};

var sel.plugin = function () {
  var self = this;
  toArray(arguments).forEach(function (plugin) {
    dictionary(plugin).each(function (fn, name) {
      self[name] = function (args) {
        self.nodes.forEach(function (node, index, nodes) {
          fn(extend(args, [{
            node: node,
            index: index,
            nodes: nodes,
            sel: sel
          }]));
        });
        return self;
      };
    });
  });
};

var parse = function (selector) {
  var type, 
      val;
  
  if (/^[#][\w]+$]/.test(selector)) {
    type = 'id';
    val = selector.slice(1);
  } else if (/^[.][\w]+$/.test(selector)) {
    type = 'class';
    val = selector.slice(1);
  } else if (/^[\w]+$/.test(selector)) {
    type = 'tag';
    val = selector;
  }

  return {
    type: type,
    val: val
  };
};

var select = function (selector) {
  var type = selector.type,
      val = selector.val,
      selection;

  if (type === 'id') {
    selection = document.getElementById(val);
  } else if (type === 'class') {
    selection = document.getElementsByClassName(val);
  } else if (type === 'tag') {
    selection = document.getElementsByTagName(val);
  }

  return selection;
};

var toArray = function (obj) {
  return obj.length ? Array.prototype.slice.call(obj) : [].concat(obj);
};
