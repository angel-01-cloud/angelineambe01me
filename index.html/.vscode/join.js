  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    // Reset
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-text').forEach(el => el.style.display='none');

    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const message = document.getElementById('message').value.trim();

    if(name === ''){
      document.getElementById('name').classList.add('error');
      document.getElementById('nameError').style.display='block';
      valid = false;
    }
    if(dob === ''){
      document.getElementById('dob').classList.add('error');
      document.getElementById('dobError').style.display='block';
      valid = false;
    }
    if(!email.includes('@') || email === ''){
      document.getElementById('email').classList.add('error');
      document.getElementById('emailError').style.display='block';
      valid = false;
    }
    if(password.length < 6){
      document.getElementById('password').classList.add('error');
      document.getElementById('passError').style.display='block';
      valid = false;
    }
    if(message === ''){
      document.getElementById('message').classList.add('error');
      document.getElementById('msgError').style.display='block';
      valid = false;
    }

    if(valid){
      document.getElementById('successMsg').style.display='block';
      
      // This is where data goes - you can see it in console
      console.log({name, dob, email, password, message});

      // Optional: redirect like your old URL was doing
      // window.location.href = `success.html?name=${name}&email=${email}`;

      setTimeout(()=> {
        form.reset();
        document.getElementById('successMsg').style.display='none';
      }, 3000);
    }
  });

