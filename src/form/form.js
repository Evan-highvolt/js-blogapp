import './form.scss';
const cancelBtn = document.querySelector(".btn-secondary");


cancelBtn.addEventListener('click', () =>{
    location.assign("./index.html")
});

const formIsValid = (data) => {
    let errors = [];
    if (!data.author || !data.category || !data.content || !data.title) {
        errors.push("Vous devez renseigner tous les champs")
    }

    if(errors.length) {
        let errorHtml = '';
        errors.forEach(error =>{ 
              errorHtml += `<li>${error}</li>`
         });
         errorList.innerHTML = errorHtml;
         return false;
    } else {
        errorList.innerHTML = '';
        return true;
    }
}

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");

form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const entries = formData.entries();

    const data = Object.fromEntries(entries);

    if (formIsValid(data)) {
        try {
            const json = JSON.stringify(data); 
               
            const response = await fetch("https://restapi.fr/api/dwwm_evan",{
                    method: "POST",
                    headers: { 'Content-Type': 'application/json'},
                    body: json
                });
        if (response.status > 299); {
        location.assign('./index.html');
        };
        console.log(body);
        } catch (error) {
            console.log(error);
        }
    }
})