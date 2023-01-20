import './index.scss';

const articlesContainer = document.querySelector('.articles-container');

const displayArticles = (articles) => {
    const ArticlesDOM = articles.map((article) => {
        const articleNODE = document.createElement('div');
        articleNODE.classList.add("article");
        articleNODE.innerHTML = `
        <img src=${article.image ? article.image : "assets/images/default_profile.png"} alt="">
                    <h2>${article.title}</h2>
                    <p class="article-author">${article.author}</p>
                    <p>${article.content}</p>
                    <div class="article-action">
                        <button class="btn btn-danger" data.id=${article._id}>Supprimer</button>
                    </div>
    `;
        return articleNODE;
    
    });

    articlesContainer.innerHTML = '';
    articlesContainer.append(...ArticlesDOM);
};

const fetchArticles = async () => {
    try {
        const response =await fetch("https://restapi.fr/api/dwwm_evan");
        const articles = await response.json();

        if(!articles.length) {
            displayArticles([articles])
        } else {
            displayArticles(articles);
        }
        console.log(articles);
    } catch (error) {
        console.log(error) ;
    }
};

fetchArticles();