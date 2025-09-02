async function get() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  let array_pokemon = data.results;

  let pokemon = await Promise.all(
    array_pokemon.map(async (poke) => {
      // extrai o ID do URL
      let id = poke.url.split("/")[6];
      // busca a foto
      let img = await get_foto(id);

      return {
        nome: poke.name,
        url: poke.url,
        img: img
      };
    })
  );

  console.log(pokemon);
  return pokemon;
}

async function get_foto(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data.sprites.front_default;
}

let reviews = [];
let currentItem = 0;

const job = document.getElementById('job');
const info = document.getElementById('info');
const image = document.getElementById('person-img')

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

window.addEventListener('DOMContentLoaded', async function () {
  reviews = await get();
  showPerson(currentItem);
});

function showPerson(person) {
  const item = reviews[person];
  info.textContent = `Nome: ${item.nome}`;
  image.src = item.img
}

nextBtn.addEventListener('click', function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});

prevBtn.addEventListener('click', function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});
