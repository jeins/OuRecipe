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
            {name: "Salad", icon: "icofont-broccoli", uri: 'salad'},
            {name: "Drinks", icon: "icofont-cocktail", uri: 'drinks'},
            {name: "Soups", icon: "icofont-soup-bowl", uri: 'soups'},
            {name: "Pasta and Noodles", icon: "icofont-noodles", uri: 'pasta_and_noodles'},
            {name: "Main Dishes", icon: 'icofont-restaurant', uri: 'main_dishes'},
            {name: "Seafood", icon: "icofont-fish", uri: 'seafood'},
            {name: "Cake and Snacks", icon: "icofont-cup-cake", uri: 'cake_and_snacks'},
            {name: "Diet", icon: "icofont-waiter-alt", uri: 'diet'},
            {name: "Simple Recipe", icon: "icofont-fast-food", uri: 'simple_recipe'},
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