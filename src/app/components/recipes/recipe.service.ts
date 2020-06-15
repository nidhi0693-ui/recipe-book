import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../../shared/ingredients.model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('1st Test Recipe',
      'This is a Test Recipe',
      'https://www.ndtv.com/cooks/images/Vegetarian%20Khow%20Suey.' +
      'jpg?downsize=650:400&output-quality=70&output-format=webp',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]),
    new Recipe('2nd Test Recipe',
      'This is a Test Recipe',
      'https://www.ndtv.com/cooks/images/Vegetarian%20Khow%20Suey.' +
      'jpg?downsize=650:400&output-quality=70&output-format=webp',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 2)
          ]),
    new Recipe('3rd Test Recipe',
      'This is a Test Recipe',
      'https://www.ndtv.com/cooks/images/Vegetarian%20Khow%20Suey.' +
      'jpg?downsize=650:400&output-quality=70&output-format=webp',
          [
            new Ingredient('Shawrama-Roti', 1),
            new Ingredient('Meat', 2)
          ])
  ];
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsTOShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
