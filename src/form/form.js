
import './form.scss';
const cancelBtn = document.querySelector(".btn-secondary");
let articleId;


const initForm = async () => {
    const submitBtn = document.querySelector('.btn-primary');
    const params = new URL(location.href);
    articleId = params.searchParams.get("id");
    if (articleId) {
        const response = await fetch(`https://restapi.fr/api/dwwm_evan/${articleId}`);
        if (response.status < 299) {
            const article = await response.json();
            console.log(article)
            //on va remplir notre formulaire
            submitBtn.innerText ="sauvegarder";
            fillForm(article);
        }
    };
};

const fillForm = (article) => {
    const author = document.querySelector('input[name="author"]');
    const image = document.querySelector('input[name="image"]');
    const category = document.querySelector('input[name="category"]');
    const title = document.querySelector('input[name="title"]');
    const content = document.querySelector("textarea");

    author.value = article.author;
    image.value = article.image;
    category.value = article.category;
    title.value = article.title;
    content.value = article.content;
};

initForm();

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
            let response; 
             if (articleId) {
                response = await fetch("https://restapi.fr/api/dwwm_evan",{
                         method: "PATCH",
                         headers: { 'Content-Type': 'application/json'},
                         body: json
                     });
             }  else {
                response = await fetch("https://restapi.fr/api/dwwm_evan",{
                         method: "POST",
                         headers: { 'Content-Type': 'application/json'},
                         body: json
                     });
                    }
        if (response.status < 299); {
        location.assign('./index.html');
        };
        } catch (error) {
            console.log(error);
        }
    }
})