import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { EMPTY } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'list-pokemon',
  templateUrl: './list-pokemons.component.html',
})
export class ListPokemonComponent implements OnInit {
  pokemons: Pokemon[];
  isNotFound: boolean;
  term: string;
  private searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;
  private result = EMPTY.pipe(isEmpty());
  constructor(
    private router: Router,
    private pokemonsService: PokemonsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // attendre 300ms de pause entre chaque requête
      debounceTime(300),
      // ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      // on retourne la liste des résultats correpsondant aux termes de la recherche
      switchMap((term: string) => this.pokemonsService.searchPokemons(term))
    );
    this.pokemons$.subscribe((pokemons) => this.setPokemons(pokemons));
    this.getPokemons();
  }

  search(term: string): void {
    this.term = term;
    this.searchTerms.next(term);
  }

  getPokemons(): void {
    this.titleService.setTitle('Liste des pokémons');
    this.pokemonsService
      .getPokemons()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }

  selectPokemon(pokemon: Pokemon): void {
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  getItems(): any {
    return this.pokemons;
  }

  setPokemons(pokemons: Pokemon[]) {
    if (pokemons.length > 0) {
      this.pokemons = pokemons;
    } else if (!this.term.trim()) {
      this.isNotFound = false;
      this.getPokemons();
    } else {
      this.isNotFound = true;
    }
  }
}
