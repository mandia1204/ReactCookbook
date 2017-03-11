import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const recipes = { data: [ { _id:"P0293",
            name:"Pizza Americana",
            chef:"Jhon Smith",
            category:'Pastas',
            url:"http://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/02/a-evid-672x372.jpg"
        },
        {
          _id:"PWDIW3",
          name:"Hawaiian pizza",
          chef:"Jose Alanya",
          category:'Pastas',
          url:"http://sabinasgrill.com/wp-content/uploads/2015/04/Lifestyle_Taste_PastaPizzaAndSandwiches_HawaiianPizza_LifestyleArticle_FEATURED.png"
        },
        {
          _id:"PIWREWU",
          name:"Lasagna",
          chef:"Joaquim Ventrolosky",
          category:'Pastas',
          url:"http://mediaresources.idiva.com/media//photogallery/2014/Oct/lasagna_italy1.jpg"
        },
        {
          _id:"PEOE933",
          name:"Salad Village Gourmet",
          chef:"Charlie Phewsfg",
          category:'Salads',
          url:"http://www.italianvillagesummit.com/uploads/4/6/3/0/46305989/__2813085_orig.jpg"
        }
      ]};

// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, 'g'), replace);
// }

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, 'g'), replace);
};

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (recipe) => {
  return replaceAll(recipe.id, ' ', '-');
};

class RecipeApi {
  static getAllRecipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], recipes));
      }, delay);
    });
  }

  static getRecipesByCategory(category) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const res = recipes.data.filter(recipe => recipe.category===category);
        resolve(Object.assign([], res));
      }, delay);
    });
  }

  static saveRecipe(recipe) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTitleLength = 1;
        if (recipe.title.length < minTitleLength) {
          reject(`Title must be at least ${minTitleLength} characters.`);
        }

        if (recipe.id) {
          const existingIndex = recipes.data.findIndex(a => a.id == recipe.id);
          recipes.data.splice(existingIndex, 1, recipe);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new pastas in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          recipe.id = generateId(recipe);
          recipes.data.push(recipe);
        }

        resolve(Object.assign({}, recipe));
      }, delay);
    });
  }

  static deleteRecipe(recipeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfToDelete = recipes.data.findIndex(recipe => {
          recipe.recipeId == recipeId;
        });
        recipes.data.splice(indexOfToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default RecipeApi;
