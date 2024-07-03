import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { InstructionsDialogComponent } from './pages/instructions-dialog/instructions-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PreloaderComponent } from './pages/preloader/preloader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PreloaderService } from './services/preloader.service';
import { HttpInterceptorService } from './interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    QuizComponent,
    ResultComponent,
    WelcomeComponent,
    InstructionsDialogComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    PreloaderService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
