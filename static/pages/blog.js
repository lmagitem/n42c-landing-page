const articlePage = `<h1 id="page-title" class="align-center padded-bottom">Article</h1>
  <div id="page-wrapper">
    <div id="article-content"></div>
    <footer id="page-footer">
      - <span id="article-author">Auteur</span>, <time id="article-publication-date">10 septembre 2005</time>
    </footer>
  </div>`;

export const blogContent = {
  content: `<h1 id="page-title" class="align-center padded-bottom">Articles</h1>
  <div id="page-wrapper">
    <div class="article-card">
      <p class="article-card-date">2018-11-18</p>
      <p class="article-card-title"><a href="/#/blog/la-desindustrialisation-une-chance-a-saisir">Désindustrialisation, une chance à saisir</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2017-03-31</p>
      <p class="article-card-title"><a href="/#/blog/la-fin-des-cours-dhistoire">La fin des cours d'histoire</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2016-09-25</p>
      <p class="article-card-title"><a href="/#/blog/le-cheval-de-troie">Le cheval de Troie</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2016-08-07</p>
      <p class="article-card-title"><a href="/#/blog/refuge">Refuge</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2016-01-21</p>
      <p class="article-card-title"><a href="/#/blog/chris-crawfords-lecture-at-the-fipa">Chris Crawford's lecture at the FIPA</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2015-07-17</p>
      <p class="article-card-title"><a href="/#/blog/le-donationware-en-france">Le <i>donationware</i> en France</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2015-06-09</p>
      <p class="article-card-title"><a href="/#/blog/campagne-kickstarter-lancee">Campagne Kickstarter lancée</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2014-09-12</p>
      <p class="article-card-title"><a href="/#/blog/the-dragon-speech-vf">Traduction française du « Dragon Speech »</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2014-04-15</p>
      <p class="article-card-title"><a href="/#/blog/instants-de-jeu">Instants de jeu</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2014-03-02</p>
      <p class="article-card-title"><a href="/#/blog/thedragonspeech">The Dragon Speech</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2011-11-20</p>
      <p class="article-card-title"><a href="/#/blog/entretien-avec-thierry-arbogast">Entretien avec Thierry Arbogast</a></p>
    </div>
    <div class="article-card">
      <p class="article-card-date">2005-09-10</p>
      <p class="article-card-title"><a href="/#/blog/aube-noire">Aube noire</a></p>
    </div>
  </div>`,
};

export const insertArticleContent = (article) => {
  const language = (navigator.language || navigator.userLanguage || "en")
    .substring(0, 2)
    .toLowerCase();
  console.log(language);

  let title = article.title;
  let content = article.content;
  let author = article.author;
  let date = article.date;
  const titleEn = article.titleEn;
  const contentEn = article.contentEn;
  const authorEn = article.authorEn;
  const dateEn = article.dateEn;
  const titleFr = article.titleFr;
  const contentFr = article.contentFr;
  const authorFr = article.authorFr;
  const dateFr = article.dateFr;

// TODO: Externalize translation logic

  if (language == "fr") {
    title = titleFr ?? title;
    title = title ?? titleEn;
    content = contentFr ?? content;
    content = content ?? contentEn;
    author = authorFr ?? author;
    author = author ?? authorEn;
    date = dateFr ?? date;
    date = date ?? dateEn;
  } else {
    title = titleEn ?? title;
    title = title ?? titleFr;
    content = contentEn ?? content;
    content = content ?? contentFr;
    author = authorEn ?? author;
    author = author ?? authorFr;
    date = dateEn ?? date;
    date = date ?? dateFr;
  }

  document.getElementById("main-section").innerHTML = articlePage;
  document.getElementById("page-title").innerHTML = title;
  document.getElementById("article-content").innerHTML = content;
  document.getElementById("article-author").innerHTML = author;
  document.getElementById("article-publication-date").innerHTML = date;
};
