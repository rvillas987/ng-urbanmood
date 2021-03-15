import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SalesComponent } from './sales/sales.component';
import { LoginComponent } from './login/login.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', component: SalesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new', component: NewEntryComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
