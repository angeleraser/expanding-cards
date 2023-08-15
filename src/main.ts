import { getParentNodeByClassname } from "./utils/getParentNodeByClassname";

const cardsContainerEl = document.getElementById(
  "cards-container"
) as HTMLElement;

cardsContainerEl.addEventListener("click", (e) => {
  const { target } = e;
  const element = target as HTMLElement;
  const cardEl = getParentNodeByClassname(element, "card");

  if (cardEl) {
    const allCardsEl = Array.from<HTMLElement>(
      cardsContainerEl.querySelectorAll(".card")
    );

    allCardsEl.forEach((card) => {
      const isClickedCard = card === cardEl;

      card.style.flex = isClickedCard ? `${allCardsEl.length}` : "1";
      card.classList[isClickedCard ? "add" : "remove"]("card-active");
    });
  }
});

function createCardComponent(props: {
  title: string;
  img: { url: string; alt: string };
}) {
  return `
  <article class="card">
    <img loading="lazy" class="card-image" src="${props.img.url}" alt="${props.img.alt}" />
    <div class="card-footer">
      <h2>${props.title}</h2>
    </div>
  </article>
`;
}

async function getRandomImageByCategory(category: string): Promise<string> {
  const resp = await fetch(
    `https://random.imagecdn.app/v1/image?category=${category}&format=json`
  );
  const data = await resp.json();
  return data.url;
}

async function init() {
  const imageCategories = [
    "nature",
    "technology",
    "food",
    "abstract",
    "wildlife",
  ];

  const images = await Promise.all(
    imageCategories.map((category) => {
      return getRandomImageByCategory(category);
    })
  );

  const cardsComponentsHtml = images.map((src, i) => {
    const title = imageCategories[i].replace("_", " ");
    return createCardComponent({
      title,
      img: { url: src, alt: title },
    });
  });

  cardsContainerEl.innerHTML = cardsComponentsHtml.join("");

  const firstCardEl = cardsContainerEl.querySelector(".card") as HTMLElement;
  firstCardEl?.classList.add("card-active");
  firstCardEl.style.flex = `${cardsComponentsHtml.length}`;
}

init();
