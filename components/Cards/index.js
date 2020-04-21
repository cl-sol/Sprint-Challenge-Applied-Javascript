// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each 'article' in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Use your function to create a card for each of the articles and add the card to the DOM.

const articleCards = document.querySelector(".cards-container");

axios.get("https://lambda-times-backend.herokuapp.com/articles")
    .then(response => {
        console.log(response);
        const articles = response.data.articles;
        const articleKeys = Object.keys(articles);
        //returns array of keys in obj
        articleKeys.forEach(articleTopic => {
            response.data.articles[articleTopic].forEach(individualArticle => {
                articleCards.append(cardCreator(individualArticle))
            })
        })
        })
    .catch(error => {
        console.log(error);
    })

function cardCreator(obj) {
    const articleCard = document.createElement("div");
    const headline = document.createElement("div");
    const author = document.createElement("div");
    const articlePic = document.createElement("img");
    const authorName = document.createElement("span");

    articleCard.classList.add("card");
    headline.classList.add("headline");
    author.classList.add("author");
    articlePic.classList.add("img-container");

    headline.textContent = obj.headline;
    articlePic.src = obj.authorPhoto;
    authorName.textContent = obj.authorName;

    articleCard.append(headline);
    articleCard.append(author);

    author.append(articlePic);
    author.append(authorName);

    return articleCard;
}