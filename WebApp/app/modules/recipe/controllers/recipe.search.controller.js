angular
    .module('app.recipe')
    .controller('RecipeSearchController', RecipeSearchController);

RecipeSearchController.$inject = ['$log'];
function RecipeSearchController($log) {
    var vm = this;
    vm.doSearch = doSearch;
    vm.onPageChanged = onPageChanged;

    init();

    function init() {
        vm.loadNewRecipes = [
            {
                name: "French Onion Soup Gratinee",
                description: "About as good as it gets! This is the version of French Onion Soup that people seek when they go to restaurants. Healthy and easy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Avocado panzanella salad",
                description: "This high fibre salad is a vibrant mix of tomatoes, avocado and crunchy pieces of ciabatta. Thissalad is full of the authentic flavours of Italy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Kale and Feta Salad",
                description: "Salads can be healthy, satisfying meals on their own or perfect accompaniments to main dishes. We’ve got a great selection of salads.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Avocado panzanella salad",
                description: "This high fibre salad is a vibrant mix of tomatoes, avocado and crunchy pieces of ciabatta. Thissalad is full of the authentic flavours of Italy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Kale and Feta Salad",
                description: "Salads can be healthy, satisfying meals on their own or perfect accompaniments to main dishes. We’ve got a great selection of salads.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Avocado panzanella salad",
                description: "This high fibre salad is a vibrant mix of tomatoes, avocado and crunchy pieces of ciabatta. Thissalad is full of the authentic flavours of Italy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Kale and Feta Salad",
                description: "Salads can be healthy, satisfying meals on their own or perfect accompaniments to main dishes. We’ve got a great selection of salads.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Avocado panzanella salad",
                description: "This high fibre salad is a vibrant mix of tomatoes, avocado and crunchy pieces of ciabatta. Thissalad is full of the authentic flavours of Italy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Kale and Feta Salad",
                description: "Salads can be healthy, satisfying meals on their own or perfect accompaniments to main dishes. We’ve got a great selection of salads.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Avocado panzanella salad",
                description: "This high fibre salad is a vibrant mix of tomatoes, avocado and crunchy pieces of ciabatta. Thissalad is full of the authentic flavours of Italy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Kale and Feta Salad",
                description: "Salads can be healthy, satisfying meals on their own or perfect accompaniments to main dishes. We’ve got a great selection of salads.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Avocado panzanella salad",
                description: "This high fibre salad is a vibrant mix of tomatoes, avocado and crunchy pieces of ciabatta. Thissalad is full of the authentic flavours of Italy.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            },
            {
                name: "Kale and Feta Salad",
                description: "Salads can be healthy, satisfying meals on their own or perfect accompaniments to main dishes. We’ve got a great selection of salads.",
                author: "Nick Slick",
                "people": "4",
                "time": "5m"
            }
        ];
        vm.filter = {};
        vm.loadCategories = ["a", "b", "c"];
        vm.loadCuisine = ["a", "b", "c"];
        vm.loadSort = _getSortRecipes();
        vm.pagination = {total: 10, current: 1, steps: 5};
    }

    function doSearch() {
        $log.info("Filter: %s", JSON.stringify(vm.filter));
    }

    function onPageChanged() {
        $log.info("Current page is: %s", vm.pagination.current);
        // TODO: load current page data
    }

    function _getSortRecipes() {
        return {
            "title_desc": "Title (descending)",
            "title_asc": "Title (ascending)",
            "rating_desc": "Ratings (highest first)",
            "rating_asc": "Ratings (lowest first)",
            "date_desc": "Date (newest first)",
            "date_asc": "Date (oldest first)"
        };
    }
}