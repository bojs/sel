module.exports = sel;

var sel = function (selector) {
  return select(parse(selector);
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
