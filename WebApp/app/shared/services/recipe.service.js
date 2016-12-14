angular
    .module('app.shared')
    .factory('Recipe', Recipe);

Recipe.$inject = ['$log'];
function Recipe($log) {
    return {
        difficultyLevel: difficultyLevel,
        categories: categories,
        cuisine: cuisine
    };

    function categories(){
        return [
            {name: "Salad", icon: "fa-home", uri: 'salad'},
            {name: "Drinks", icon: "fa-home", uri: 'drinks'},
            {name: "Soups", icon: "fa-home", uri: 'soups'},
            {name: "Pasta and Noodles", icon: "fa-home", uri: 'pasta_and_noodles'},
            {name: "Main Dishes", icon: "fa-home", uri: 'main_dishes'},
            {name: "Seafood", icon: "fa-home", uri: 'seafood'},
            {name: "Cake and Snacks", icon: "fa-home", uri: 'cake_and_snacks'},
            {name: "Diet", icon: "fa-home", uri: 'diet'},
            {name: "Simple Recipe", icon: "fa-home", uri: 'simple_recipe'},
        ];
    }

    function cuisine(){
        return [
            "Asian",
            "African",
            "Arabic",
            "Indian",
            "Western",
            "Southern"
        ];
    }

    function difficultyLevel(){
        return ["Easy", "Medium", "Advance"];
    }
}