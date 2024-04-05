  export function validateName() {
    const name = document.getElementById('contact-name').value;
    const submitError = document.getElementById('submit-error');
    if (name.length === 0) {
      submitError.innerHTML = 'Emri duhet të plotësohet!';
      return false;
    }
    if(name.split(' ').length >1) {
      submitError.innerHTML = 'Emri duhet të jetë i plotë!';
      return false;
    }
    submitError.innerHTML = "<span style='color: green'>Emri është në rregull!</span>";
    return true;
  }

  export function validateSurname(){
    const surname = document.getElementById('contact-surname').value;
    const submitError = document.getElementById('submit-error');

    if(surname.length === 0){
        submitError.innerHTML = 'Mbiemri duhet të plotësohet !';
        return false;
    }
    if(surname.split(' ').length >1){
        submitError.innerHTML = 'Mbiemri duhet të jetë i plotë !';
        return false;
    }
    submitError.innerHTML = "<span style='color: green'>Mbiemri është në rregull!</span>";
    return true;
  }

  export function validatePhone(){
    const phone = document.getElementById('contact-phone').value;
    const submitError = document.getElementById('submit-error');

    if(phone.length === 0){
        submitError.innerHTML = 'Nr tel duhet të plotësohet';
        return false
    }
    if(!phone.match(/^\+383\d{8}$/)){
        submitError.innerHTML = 'Numri duhet të jetë të fillojë me +383 dhe nuk duhet te kaloje limitin!';
        return false;
    }
    // if(phone.length !== 12){
    //     submitError.innerHTML = 'Nr tel duhet të jetë 12 numra !'
    //     return false;
    // }
    submitError.innerHTML = "<span style='color: green'>Nr.Tel është në rregull!</span>";
    return true;
  }

    
  export function validateEmail(){
  const email = document.getElementById('contact-email').value;
  const submitError = document.getElementById('submit-error');

  if(email.length === 0){
      submitError.innerHTML = 'Email duhet të plotësohet !';
      return false;
  }
  if(!email.match(/^[a-z0-9]+(-[a-z0-9]+)*@[a-z]+(-[a-z]+)*\.(com|net)$/)){
      submitError.innerHTML = 'Email nuk është valid ! ';
      return false;
  }
  submitError.innerHTML = "<span style='color: green'>Email është në rregull!</span>";
  return true;
}

export function validateMessage(){
    const message = document.getElementById('contact-message').value;
    const required = 30;
    const left = required - message.length;
    const submitError = document.getElementById('submit-error');

    if(left > 0){
        submitError.innerHTML = "Minimumi i karaktereve duhet të jetë 30, ju deri tash keni shtypur: " + message.length;
        return false;
    }

    submitError.innerHTML = "<span style='color: green'>Mesazhi është në rregull!</span>";
    return true;
  }

  export function validateForm(event) {
    //event.preventDefault();
    const submitError = document.getElementById('submit-error');

    if(!validateName() || !validateSurname() ||  !validatePhone() || !validateEmail() || !validateMessage()){
      alert('Rishikoni te dhenat me lart!');
    } else {
      submitError.innerHTML = '';
      document.forms[0].submit();
    }
  }
