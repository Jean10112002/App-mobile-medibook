import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePacientePageRoutingModule } from './profile-paciente-routing.module';

import { ProfilePacientePage } from './profile-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePacientePageRoutingModule
  ],
  declarations: [ProfilePacientePage]
})
export class ProfilePacientePageModule {}