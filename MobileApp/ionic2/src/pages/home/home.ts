import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipeService } from '../../providers/recipe-service';
import { RecipeDetailPage } from "../recipe-detail/recipe-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public recipes: Object[] = [];

  constructor(public navCtrl: NavController, private recipeService: RecipeService) {
      recipeService
          .loadRecipes(1, 5)
          .subscribe(recipes => {
              this.recipes = recipes.data;
          });
  }

  public viewDetailRecipe(recipeId: number){
    this.navCtrl.push(RecipeDetailPage, {recipeId});
  }
}
