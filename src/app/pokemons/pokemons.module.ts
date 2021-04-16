import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonRoutingModule } from './pokemons.routing.module';

import { ListPokemonComponent } from './list-pokemons/list-pokemons.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { LoaderComponent } from '../loader.component';
import { BorderCardDirective } from './directives/border-card.directive';
import { PokemonTypeColorPipe } from './pipes/pokemon-type-color.pipe';
import { PokemonsService } from './pokemons.service';
import { AuthGuard } from '../auth-guard.service';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [CommonModule, FormsModule, PokemonRoutingModule],
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    PokemonFormComponent,
    LoaderComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
  ],
  providers: [PokemonsService, AuthGuard, AuthService],
})
export class PokemonsModule {}
