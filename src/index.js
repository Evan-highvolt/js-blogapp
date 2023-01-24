import './index.scss';

const articlesContainer = document.querySelector('.articles-container');

const displayArticles = (articles) => {
    const ArticlesDOM = articles.map((article) => {
        const articleNODE = document.createElement('div');
        articleNODE.classList.add("article");
        articleNODE.innerHTML = `
        <img src=${article.image ? article.image : "assets/images/default_profile.png"} alt="">
                    <h2>${article.title}</h2>
                    <p class="article-author">${article.author} - <span>
                    ${new Date(article.createdAt).toLocaleDateString("fr-FR", {weekday: "long", day: "2-digit", month: "long", year: "numeric",
                })}
                    </span> </p>
                    <p>${article.content}</p>
                    <div class="article-action">
                    <button class="btn btn-primary" data-id=${article._id}>Modifier</button>
                    <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
                    </div>
    `;
        return articleNODE;
    
    });

    articlesContainer.innerHTML = '';
    articlesContainer.append(...ArticlesDOM);

    const deletBtns = articlesContainer.querySelectorAll(".btn-danger");
    const editBtns = articlesContainer.querySelectorAll(".btn-primary");
    deletBtns.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();
            try {
                const target = event.target;
                const articleId = target.dataset.id;

                const response = await fetch(`https://restapi.fr/api/dwwm_evan/${articleId}` , {method: 'DELETE'});
                const body = await response.json();
                fetchArticles();
                console.log(body);
            } catch (error) {
                console.log(error);
            }
        })
    })
    editBtns.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();
            const target = event.target;
            
            const articleId = target.dataset.id;
            location.assign(`./form.html?id=${articleId}`)
        });
    });
};

const fetchArticles = async () => {
    try {
        const response =await fetch("https://restapi.fr/api/dwwm_evan");
        const articles = await response.json();

        if(articles.length !== 0) {
            if(!articles.length) {
                displayArticles([articles]);
            };
        } else {
            articlesContainer.innerHTML = "<p>Pas d'article...</p>";
        }

    } catch (error) {
        console.log(error) ;
    }
};

fetchArticles();