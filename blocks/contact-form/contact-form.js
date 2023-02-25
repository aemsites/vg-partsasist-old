import { readBlockConfig } from '../../scripts/lib-franklin.js';

function validateForm(event) {
  event.preventDefault();
  console.log(event);
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
  form.addEventListener('submit', validateForm);
}
