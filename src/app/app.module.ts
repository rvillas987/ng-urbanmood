import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { EncryptionService } from './encryption.service';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from './users/users.component';
import { SalesComponent } from './sales/sales.component';
import { LoginComponent } from './login/login.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersComponent,
    SalesComponent,
    LoginComponent,
    NewEntryComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    TableModule,
    MessageModule,
    MessagesModule,
    RippleModule,
    ToggleButtonModule,
    TabViewModule,
    AccordionModule,
    DropdownModule,
    HttpClientModule
  ],
  providers: [EncryptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
