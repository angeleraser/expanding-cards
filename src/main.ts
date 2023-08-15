const cardsContainerEl = document.getElementById(
  "cards-container"
) as HTMLElement;

const imageCategories = [
  "nature",
  "city",
  "technology",
  "food",
  "still_life",
  "abstract",
  "wildlife",
];

cardsContainerEl.addEventListener("click", (e) => {
  const { target } = e;
  const element = target as HTMLElement;
  const cardEl = getParentNodeByClassName(element, "card");

  if (cardEl) {
    const cardsEl = [
      ...cardsContainerEl.querySelectorAll(".card"),
    ] as Array<HTMLElement>;

    cardsEl.forEach((card) => {
      if (card === cardEl) {
        card.classList.add("card-active");
        card.style.flex = `${cardsEl.length}`;
      } else {
        card.classList.remove("card-active");
        card.style.flex = "1";
      }
    });
  }
});

function getParentNodeByClassName(
  element: HTMLElement,
  className: string
): HTMLElement | null {
  if (!element.parentElement) return null;

  return element.parentElement.classList.contains(className)
    ? element.parentElement
    : getParentNodeByClassName(element.parentElement, className);
}

function createCardComponent(props: {
  title: string;
  img: { url: string; alt: string };
}) {
  return `
  <article class="card">
    <img
      loading="lazy"
      class="card-image"
      src="${props.img.url}"
      alt="${props.img.alt}"
    />

    <div class="card-footer">
      <h2>${props.title}</h2>
    </div>
</article>
`;
}

async function getRandomImageByCategory(category: string) {
  const resp = await fetch(
    `https://random.imagecdn.app/v1/image?category=${category}&format=json`
  );

  const data = await resp.json();

  return {
    category: category.replace("_", " "),
    src: data.url,
  };
}

async function init() {
  const images = await Promise.all(
    imageCategories.map((category) => {
      return getRandomImageByCategory(category);
    })
  );

  const cardsComponents = images.map((img) => {
    return createCardComponent({
      title: img.category,
      img: { url: img.src, alt: img.category },
    });
  });

  cardsContainerEl.innerHTML = cardsComponents.join("");
}

init()
