import './index.scss';

const articlesContainer = document.querySelector('.articles-container');
const categoriesContainer = document.querySelector(".categories");
let filter;
let articles;

const displayArticles = () => {
    const ArticlesDOM = articles.filter(article => {
      if(filter) {
        return article.category === filter;
      } else {
        return true;
      }
    }).map((article) => {
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

const displayMenuCategories = (categoriesArray) => {
    const liElements = categoriesArray.map((categoryElement) => {
      const li = document.createElement("li");
      li.innerHTML = `${categoryElement[0]} ( <strong>${categoryElement[1]}</strong> )`;
      li.addEventListener('click', event => {
        if(filter === categoryElement[0]) {
          liElements.forEach(li => li.classList.remove('active'));
          filter = null;  
        } else {
          liElements.forEach(li => li.classList.remove('active'));
          li.classList.add('active');
          filter = categoryElement[0];
          displayArticles();
        }
        displayArticles();
      })
      return li;
    });
  
    categoriesContainer.innerHTML = "";
    categoriesContainer.append(...liElements);
};

const creatMenuCategories =() => {
    const categories = articles.reduce( (acc, article) => {
     if (acc[article.category]) {
      acc[article.category]++
    } else {
        acc[article.category] = 1;
    } 
    
    return acc;
    }, {} );

    const categoriesArray = Object.keys(categories)
                            .map(category => [category, categories[category]])
                            .sort((a, b) => a[0].localeCompare(b[0]))
    console.log(categoriesArray);
    displayMenuCategories(categoriesArray);
};


const fetchArticles = async () => {
    // fonction asynchrone qui recupere les donnees depuis l'API
    try {
      const response = await fetch("https://restapi.fr/api/dwwm_evan");
      articles = await response.json(); // <=== on change 'const' en 'let'
  
      if (!(articles instanceof Array)) {
        // si 'articles' n'est pas un tableau
        articles = [articles]; // on le transforme en tableau
      }
  
      if (articles.length) {
        displayArticles();
        creatMenuCategories();
      } else {
        articlesContainer.innerHTML = "<p>Pas d'articles pour le moment</p>";
      }
    } catch (error) {
      console.log(error);
    }
  };

fetchArticles();