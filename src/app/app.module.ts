import { UserService } from './shared/guard/user.service';
import { RouterModule } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { MatDialogModule,MatSelectModule,MatButtonModule, 
         MatOptionModule,MatFormFieldModule, MatInputModule, MatRadioButton} from '@angular/material';
import {MatRadioModule} from '@angular/material';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule, } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import 'hammerjs';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core.module';
import { routes } from './app-routing.module';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule ,
        HttpClientModule,
        FormsModule,ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,AngularFireAuthModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,  
        // RouterModule,

        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CoreModule,
        FormsModule, 
        ReactiveFormsModule,
        MatRadioModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,FirebaseService,AuthService,UserService],
    bootstrap: [AppComponent]
})
export class AppModule {}
