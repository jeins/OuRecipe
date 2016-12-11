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
            {name: "Salad", icon: ""},
            {name: "Drinks", icon: ""},
            {name: "Soups", icon: ""},
            {name: "Pasta and Noodles", icon: ""},
            {name: "Main Dishes", icon: ""},
            {name: "Seafood", icon: ""},
            {name: "Cake and Snacks", icon: ""},
            {name: "Diet", icon: ""},
            {name: "Simple Recipe", icon: ""},
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