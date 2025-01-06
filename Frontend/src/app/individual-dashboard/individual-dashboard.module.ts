import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualDashboardComponent } from './individual-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // If you need forms functionality

const routes: Routes = [
  { path: '', component: IndividualDashboardComponent }
];

@NgModule({
  declarations: [
    IndividualDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class IndividualDashboardModule { }
