import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipeService } from '../components/recipes/recipe.service';
import {Http, Response} from '@angular/http';



@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-5c186.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  getRecipes(){
    this.http.get('https://ng-recipe-book-5c186.firebaseio.com/recipes.json')
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
