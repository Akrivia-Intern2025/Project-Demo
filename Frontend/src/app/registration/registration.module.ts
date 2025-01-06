// Angular Imports
import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// This Module's Components
import { RegistrationComponent } from './registration.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        RegistrationRoutingModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
        RegistrationComponent,
    ]
})
export class RegistrationModule {

}
