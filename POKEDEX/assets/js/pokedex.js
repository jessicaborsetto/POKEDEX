const pokemonCount = 151;
var pokedex = {};   //{1: {"name": "bulbsaur", "img":url, "type":["grass", "poison"], "desc":"..."}}

window.onload = async function(){
    // getPokemon(1)    //get Bulbsaur

    // fare un ciclo for per tutti i pokemon
    for (let i = 1; i <= pokemonCount; i++){    //no pokemon 0
        await getPokemon(i);

        //creazione elementi html
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemonName");
        //click sul pokemon per cambiarlo
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemonList").appendChild(pokemon)
    }

    document.getElementById("pokemonDescription").innerText = pokedex[1]["desc"];
   

    console.log(pokedex)
}

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();        
    let response = await fetch(url);                                        // Attendiamo che la richiesta HTTP venga completata
    let pokemon = await response.json()                                     // Attendiamo il parsing del corpo della risposta come JSON
    // console.log(pokemon);

    /* La funzione getPokemon è dichiarata come asincrona (async) perché coinvolge operazioni asincrone, come la richiesta HTTP con fetch.
    L'uso di 'await' all'interno di getPokemon permette di attendere il completamento della richiesta fetch prima di procedere, assicurando che i dati del Pokemon siano disponibili prima di continuare l'esecuzione del codice. */


    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    //per la descrizione del pokedex

    response = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await response.json();

    // console.log(pokemonDesc)
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    //creazione pokedex dati

    pokedex[num] = {
        "name": pokemonName, 
        "img" : pokemonImg, 
        "types" : pokemonType, 
        "desc" : pokemonDesc, }

}

function updatePokemon(){
    document.getElementById("pokemonImg").src = pokedex[this.id]["img"]
    //clear il tipo
    let typesDiv = document.getElementById("pokemonTypes");
    while (typesDiv.firstChild){
        typesDiv.firstChild.remove()
    }

    //update tipo
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++){
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase()     //c'è un array di tipi con il nome del tipo [types > index > type > name]
        type.classList.add("typeBox")
        type.classList.add(types[i]["type"]["name"]);               //aggiungere il background color e font color
        typesDiv.appendChild(type)
    }

    //description
    document.getElementById("pokemonDescription").innerText = pokedex[this.id]["desc"];
}