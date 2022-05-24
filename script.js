let pokemons = [];
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);


async function init() {
	try {
		await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
		console.log('Fertig');
	} catch (e) {
		console.log('Fehler aufgetreten');
	}
}

async function pokedex() {
	let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
	let response = await fetch(url);
	let responseAsJson = await response.json()
	console.log('responseAsJson :>> ', responseAsJson);
	for (let i = 0; i < responseAsJson.results.length; i++) {
		let url = responseAsJson.results[i]['url'];
		let response = await fetch(url);
		let PokemponAsJson = await response.json()
		pokemons.push(PokemponAsJson)

	}
init()
	pokemonRenderId()
}

function pokemonRenderId() {

	for (let i = 0; i < 100; i++) {
		const poke_types = pokemons[i].types.map(type => type.type.name);
		const type = main_types.find(type => poke_types.indexOf(type) > -1);
		const color = colors[type];
		document.getElementById('name').innerHTML += /*html*/`
		<div onclick="openPokemon(${i})" class="card" style="background-color:${color};">
			<div class="images" >
				<img src="" id="imgs_${i}" alt="">
			</div>
			<div class="names" >
				<h3 id="names_${i}">${pokemons[i]['name']}</h3>
				<p>#${pokemons[i]['id'].toString().padStart(3, '0')}</p>
				<p>Type: <b>${pokemons[i]['types'][0]['type']['name']}</b></p>

			</div>
	
		</div>
		`
		document.getElementById('imgs_' + i).src = pokemons[i]['sprites']['other']['dream_world']['front_default'];
	}



	// document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
	// document.getElementById('id').innerHTML = currentPokemon['id']
	// document.getElementById('image').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
}



function openPokemon(i) {
	const poke_types = pokemons[i].types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const color = colors[type];
	document.getElementById('name').innerHTML = /*html*/`
	<div class="card2" style="background-color:${color};">
			<i onclick="goclose()" class="fa-solid fa-circle-arrow-left close"></i>
			<div class="names2" >
				<h3 >${pokemons[i]['name']}</h3>
				<p>#${pokemons[i]['id'].toString().padStart(3, '0')}</p>
			</div>
			<h5>Type: ${pokemons[i]['types'][0]['type']['name']}</h5>
			<div class="images2" >
				<img src="${pokemons[i]['sprites']['other']['dream_world']['front_default']}"  alt="">
			</div>
			<div>
				<p>weight: <b>${pokemons[i]['weight']}</b></p>
				<p>height: <b>${pokemons[i]['height']}</b></p>
			</div>
		</div>
	`

}



function goclose() {

	window.history.go();
	pokemonRenderId()
}