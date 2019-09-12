import _ from 'lodash';
import './style/index.css'; // loader=> css-loader module, style-loader
import './style/a.scss';
import $ from 'jquery';

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  // dom.className = 'box';
  dom.classList.add('box');
  return dom;
}

document.body.appendChild(createDomElement());
console.log(1222);

const [a, b, c] = [1, 2, 3];
console.log('a :', a);
console.log('b :', b);
console.log('c :', c);

$(function() {
  $('.box').click(() => {
    alert(1);
  });
});
