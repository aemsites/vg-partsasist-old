import { readBlockConfig } from '../../scripts/lib-franklin.js';

function addRequiredDiv(fieldName) {
  const requiredNode = document.createElement('div');
  requiredNode.innerText = fieldName.includes('email') ? 'A valid email address is required' : 'This field is required';
  requiredNode.classList.add('required-field');
  const pDiv = fieldName.includes('paragraphText') ? document.querySelector(`#contact textarea[name=${fieldName}]`).parentNode : document.querySelector(`#contact input[name=${fieldName}]`).parentNode;
  pDiv.insertAdjacentElement('afterend', requiredNode);
}
function validateForm(event) {
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
  event.preventDefault();
  if (document.querySelector('#contact input[name="firstName"]').value === '') {
    addRequiredDiv('firstName');
  }

  if (document.querySelector('#contact input[name="lastName"]').value === '') {
    addRequiredDiv('lastName');
  }

  if (document.querySelector('#contact input[name="email-address"]').value === '' || !emailRegex.test(document.querySelector('#contact input[name="email-address"]').value)) {
    addRequiredDiv('email-address');
  }

  if (document.querySelector('#contact textarea[name="paragraphText"]').value === '') {
    addRequiredDiv('paragraphText');
  }
}

function fieldFocus(event) {
  const pDiv = event.currentTarget.parentNode.parentNode;
  if (pDiv.children.length > 2) {
    pDiv.children[2].remove();
  }
  console.log(pDiv.children.length);
}
export default async function decorate(block) {
  const config = readBlockConfig(block);
  console.log(config);
  block.innerHTML = '<form id="contact"><div class="form-element col-left">'
      + '<div>First Name</div>'
      + '<div><input type="text" name="firstName"/></div>'
      + '</div>'
      + '<div class="form-element col-right">'
      + '<div>Last Name</div>'
      + '<div><input type="text" name="lastName"/></div>'
      + '</div>'
      + '<div class="form-element picker">'
      + '<div>Are you a dealer or a customer?</div>'
      + '<div><select name="dealer-customer"><option value="dealer">Dealer</option><option value="customer">Customer</option><option value="other">Other</option></select></div>'
      + '</div>'
      + '<div class="form-element">'
      + '<div>Phone</div>'
      + '<div><input type="text" name="phone"/></div>'
      + '</div>'
      + '<div class="form-element">'
      + '<div>Email Address</div>'
      + '<div><input type="text" name="email-address"/></div>'
      + '</div>'
      + '<div class="form-element question">'
      + '<div>How can we help you?</div>'
      + '<div><textarea name="paragraphText"></textarea></div>'
      + '</div>'
      + '<div class="form-element">'
      + '<div><input type="submit" value="Submit"/></div>'
      + '</div></form>';

  const form = block.querySelector('#contact');
  const inputs = block.querySelectorAll('#contact input');
  inputs.forEach((input) => {
    input.addEventListener('focus', fieldFocus);
  });

  const ta = block.querySelector('#contact textarea');
  ta.addEventListener('focus', fieldFocus);
  form.addEventListener('submit', validateForm);
}
