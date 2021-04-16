import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPokemonComponent } from './list-pokemons/list-pokemons.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { AuthGuard } from '../auth-guard.service';

const pokemonsRoutes: Routes = [
  {
    path: 'pokemon',
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: ListPokemonComponent },
      { path: 'add', component: AddPokemonComponent },
      { path: 'edit/:id', component: EditPokemonComponent },
      { path: ':id', component: DetailPokemonComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pokemonsRoutes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
