import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecipeDetailPage } from '../pages/recipe-detail/recipe-detail';

import { RecipeService } from '../providers/recipe-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecipeDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecipeDetailPage
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      RecipeService
  ]
})
export class AppModule {}
