import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import {DataService} from "./web-api/data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { NewOwnerComponent } from './new-owner/new-owner.component';
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    OwnerListComponent,
    NewOwnerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
