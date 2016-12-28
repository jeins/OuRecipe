import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecipeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecipeService {
  private _recipeApiUrl = 'http://ourecipe.tk/api/recipe';

  constructor(public http: Http) {
    console.log('Hello RecipeService Provider');
  }

  loadRecipes(currPage: number, limit: number) {
    let reqBody = {currPage: currPage, limit: limit, filter: {}};

    return this.http
        .post(this._recipeApiUrl + '/list', reqBody)
        .map(res => res.json());
  }

  loadRecipeDetail(recipeId: number){
    let reqBody = {recipeId: recipeId};

    return this.http
        .post(this._recipeApiUrl + '/view', reqBody)
        .map(res => res.json());
  }
}
