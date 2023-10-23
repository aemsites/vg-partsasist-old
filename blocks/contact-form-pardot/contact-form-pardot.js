
window.logResult= function(json) {
    debugger;
    if(json.result === "success"){
        formSuccess();
    } else if(json.result === "error") {
        formError();
    }
};
      
async function makePardotFormCall(event, endpoint, form) {
        
    var url =    "https://go.roadchoice.com/l/999771/2023-09-14/qcrx"; //form.attr("action");
    var dataURI =   {};
    form.querySelectorAll("input, textarea, select").forEach(function(element) {
        var inputType = element.tagName.toUpperCase() === "INPUT" && element.type.toUpperCase();
        if (inputType !== "BUTTON" && inputType !== "SUBMIT") {
            dataURI[element.name] = element.value;
        }
    });
    debugger;
    var serializedData = serialize(dataURI);

    // Create the script element dynamically through JavaScript 
	var scriptElement = document.createElement("script"); 
		
	// Set the src and id attributes of the script element 
	scriptElement.setAttribute("src", url + '?' + serializedData); 
	scriptElement.setAttribute("id", "jsonp"); 
	var oldScriptElement= document.getElementById("jsonp"); 
		
	// Get the head element 
	var head = document.getElementsByTagName("head")[0]; 
	if(oldScriptElement == null) {		 
		/* If there is no script element then append a new element to the head. */
	    head.appendChild(scriptElement); 
	} else { 	
		/* If there is already a element in the head, then replace it with the new script element. */
		head.replaceChild(scriptElement, oldScriptElement); 
    }         
    // prevent default  action
    return false;
}

function serialize(obj){
    let str = [];
    for(let p in obj){
        if(obj.hasOwnProperty(p)){
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    return str.join('&');
}

function formSuccess() {
    alert("Thank you for your subscription")        
}
function formError() {
    alert("An error ocurred");      
}       

/**
 * decorate the contact form
 * @param {HTMLElement} block form element
 */
export default async function decorate(block) {
    //const config = readBlockConfig(block);
    const config =  "https://go.roadchoice.com/l/999771/2023-09-14/qcrx";
    block.innerHTML = `
    <form id="contact-form-pardot" method="post">
      <div class="row">
        <div class="form-element col-left">
          <div class="required">First Name</div>
          <div><input type="text" name="firstName"/></div>
        </div>
        <div class="form-element col-right">
          <div class="required">Last Name</div>
          <div><input type="text" name="lastName"/></div>
        </div>
      </div>
      <div class="form-element picker">
        <div>Are you a dealer or a customer?</div>
        <div>
          <select name="dealer-customer">
            <option value="Dealer">Dealer</option>
            <option value="Customer">Customer</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div class="form-element">
        <div>Phone</div>
        <div><input type="text" name="phone"/></div>
      </div>
      <div class="form-element">
        <div class="required">Email Address</div>
        <div><input type="text" name="email-address"/></div>
      </div>
      <div class="form-element question">
        <div class="required">How can we help you?</div>
        <div><textarea name="paragraph-text"></textarea></div>
      </div>
      <div class="form-element">
        <div><button type="submit"/>Submit</button></div>
      </div>
    </form>
    `;
    const form = block.querySelector('#contact-form-pardot');
    form.addEventListener('submit', (event) => makePardotFormCall(event, config.endpoint, form));
}