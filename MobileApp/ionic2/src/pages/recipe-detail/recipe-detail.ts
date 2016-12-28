import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecipeService } from '../../providers/recipe-service';

/*
  Generated class for the RecipeDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  public recipe: Object;
  private recipeId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService) {
    this.recipeId = navParams.get('recipeId');

    recipeService
        .loadRecipeDetail(this.recipeId)
        .subscribe(recipe => {
          this.recipe = recipe;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
  }
}
