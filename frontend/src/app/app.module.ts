import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiUrlInterceptor } from './core/api/ApiUrlInterceptor';
import { NavigationModule } from './ui/navigation/navigation.module';

@NgModule({
  imports: [
    NavigationModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
