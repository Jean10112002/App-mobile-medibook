import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosCrearPageRoutingModule } from './pagos-crear-routing.module';

import { PagosCrearPage } from './pagos-crear.page';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';


export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosCrearPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ReactiveFormsModule
    
  ],
  declarations: [PagosCrearPage]
})
export class PagosCrearPageModule {}
