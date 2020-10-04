import { Ingredient } from '../../shared/ingredient.modal';
import * as ShoppingListActions from './shopping-list.actions';

// ! Interfaces
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// ! Init
const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 9)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// ! Reducer
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      // * Get the current ingredient value.
      const ingredient = state.ingredients[state.editedIngredientIndex];
      // * Get the updated ingredient value.
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      // * Turn into an array.
      const updatedIngredients = [...state.ingredients];
      // * Update the ingredient in the array.
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        // * Update the store.
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        // * Filter each ingredient, return true to keep.
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        })
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
