import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ToolbarModule } from 'primeng/toolbar'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
