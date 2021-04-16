import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService,
    private titleService: Title
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.params.id;
    // Récuperer un pokemon grace à l'appel de la fonction dans le pokemon service
    this.pokemonsService.getPokemon(id).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.titleService.setTitle(`Editer ${pokemon.name}`);
    });
  }
}
