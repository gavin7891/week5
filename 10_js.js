// gavin cousins

let newArticleCount = 0;

window.addEventListener("DOMContentLoaded", () => {
  // panel
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  if (filterForm) filterForm.style.display = "none";
  if (newForm) newForm.style.display = "none";

  //  filtering 
  filterArticles();
});

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");
  if (!filterForm || !newForm) return;

  // Toggle filter panel
  const isVisible = filterForm.style.display !== "none";
  filterForm.style.display = isVisible ? "none" : "block";

  if (!isVisible) newForm.style.display = "none";
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");
  if (!filterForm || !newForm) return;

  const isVisible = newForm.style.display !== "none";
  newForm.style.display = isVisible ? "none" : "flex";

  if (!isVisible) filterForm.style.display = "none";
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox")?.checked ?? true;
  const showRecipe = document.getElementById("recipeCheckbox")?.checked ?? true;
  const showUpdate = document.getElementById("updateCheckbox")?.checked ?? true;

  const articles = document.querySelectorAll("#articleList article");
  articles.forEach((a) => {
    const isOpinion = a.classList.contains("opinion");
    const isRecipe = a.classList.contains("recipe");
    const isUpdate = a.classList.contains("update");

    let shouldShow = true;
    if (isOpinion) shouldShow = showOpinion;
    else if (isRecipe) shouldShow = showRecipe;
    else if (isUpdate) shouldShow = showUpdate;

    a.style.display = shouldShow ? "" : "none";
  });
}

function addNewArticle() {
  const titleEl = document.getElementById("inputHeader");
  const textEl = document.getElementById("inputArticle");

  const opinionRadio = document.getElementById("opinionRadio");
  const recipeRadio = document.getElementById("recipeRadio");
  const lifeRadio = document.getElementById("lifeRadio");

  const title = (titleEl?.value ?? "").trim();
  const text = (textEl?.value ?? "").trim();

  // Determine type from radios
  let typeClass = "";
  let typeLabel = "";
  if (opinionRadio?.checked) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if (recipeRadio?.checked) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if (lifeRadio?.checked) {
    typeClass = "update";      
    typeLabel = "Update";     
  }

  if (!title || !text || !typeClass) {
    alert("Please enter a Title, choose a Type, and enter Text.");
    return;
  }

  newArticleCount += 1;

  const article = document.createElement("article");
  article.className = typeClass;
  article.id = `new_${typeClass}_${newArticleCount}`;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = typeLabel;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const aLink = document.createElement("a");
  aLink.href = "moreDetails.html";
  aLink.textContent = "Read more...";
  pLink.appendChild(aLink);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  const list = document.getElementById("articleList");
  if (!list) return;

  list.prepend(article);

  // Clear form inputs
  titleEl.value = "";
  textEl.value = "";
  opinionRadio.checked = false;
  recipeRadio.checked = false;
  lifeRadio.checked = false;

  filterArticles();
}
