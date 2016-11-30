angular
    .module('app.user')
    .controller('UserShowController', UserShowController);

UserShowController.$inject = ['$log', '$stateParams', '$location', 'ApiUser', 'ApiRecipe'];
function UserShowController($log, $stateParams, $location, ApiUser, ApiRecipe) {
    var vm = this;
    vm.onPageChanged = onPageChanged;
    vm.doSearch = doSearch;

    init();

    function init() {
        vm.userId = $stateParams.userId;
        vm.selectedPage = ($stateParams.page !== undefined) ? $stateParams.page : 0;
        vm.filter = {};
        vm.loadSort = _getSortRecipes();
        vm.pagination = {total: 10, current: 1, steps: 5};
        vm.personalRecipePagination = {current: 1, limit: 6, steps: 5};

        if(vm.userId === undefined) $location.path('/');

        loadUserInfo();
        loadFavoriteRecipe();
        loadPersonalRecipe();

        $log.info("Show User Profile Id: %s Page Opened", vm.userId);
    }

    function loadUserInfo(){
        ApiUser.getUserById({userId: vm.userId}, function(res){
            vm.userData = res;
        });
    }

    function loadFavoriteRecipe(){
        vm.loadFavoriteRecipe = [
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
    }

    function loadPersonalRecipe(){
        var reqBody = {
            filter: {
                userId: vm.userId
            },
            currPage: vm.personalRecipePagination.current,
            limit: vm.personalRecipePagination.limit
        };

        ApiRecipe.getRecipeList(reqBody, function(res){
            vm.loadPersonalRecipe = res.data;
            vm.personalRecipePagination.total = res.pagination.totalPage;
        });
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