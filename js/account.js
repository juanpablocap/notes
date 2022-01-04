// User login manager 

const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');

// form valid no-valid check

const checkInput = (expression, element, inputValue) => {
    let isOk = false;
    if(expression.test(inputValue)) {
        isOk = true;
        if(element.classList.contains('is-invalid')){
            element.classList.remove('is-invalid');
        }
    }else{
        if(element.classList.contains('is-valid')){
            element.classList.remove('is-valid');
        }
    }
    return isOk
}

// character user and password check regular expressions

const verification = (user, password) =>{
    let userCorrect = false;
    let passwordCorrect = false;
    let userPatron = /^[a-z0-9_-]{3,12}$/; // de 3 a 12
    let passwordPatron = /^[a-z0-9_-]{4,12}$/; // de 4 a 12

    userCorrect = checkInput(userPatron, userInput, user);
    passwordCorrect = checkInput(passwordPatron, passInput, password);

    return {userCorrect, passwordCorrect} // object desc
}

const login =  async (event) =>{
    event.preventDefault();

    const {userCorrect, passwordCorrect} = verification(userInput.value, passInput.value);
    if(userCorrect === true && passwordCorrect === true){
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        let user = data.find(item=> item.user === userInput.value);
        if (user?.password === passInput.value){
            localStorage.setItem('notes', JSON.stringify(user.notes));
            localStorage.setItem('user', JSON.stringify(user));
            window.location.assign(window.location.origin + '/main.html');
        }else{
            document.getElementById('msg').style.display='block'
            setTimeout(()=>{
                document.getElementById('msg').style.display='none'
            }, 4000)
        }
    }
}

const logout = async () =>{
    const user = JSON.parse(localStorage.getItem('user'));
    const notesLS = JSON.parse(localStorage.getItem('notes'));
    user.notes= notesLS;
    await fetch('http://localhost:3000/users/'+ user.id,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    });
    localStorage.clear();
    window.location.assign(window.location.origin);
  }
  