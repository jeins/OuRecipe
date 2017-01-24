angular
    .module('app.user')
    .controller('UserShowController', UserShowController);

UserShowController.$inject = ['$log', '$stateParams', '$location', 'ApiUser', 'ApiRecipe', 'ApiFavorite'];
function UserShowController($log, $stateParams, $location, ApiUser, ApiRecipe, ApiFavorite) {
    var vm = this;
    vm.loadFavoriteRecipeData = loadFavoriteRecipeData;
    vm.loadPersonalRecipeData = loadPersonalRecipeData;

    init();

    function init() {
        vm.userId = $stateParams.userId;
        vm.selectedPage = ($stateParams.page !== undefined) ? $stateParams.page : 0;
        vm.filter = {userId: vm.userId, sort: "title_asc"};
        vm.loadSort = _getSortRecipes();

        if(vm.userId === undefined) $location.path('/');

        loadUserInfo();
        loadFavoriteRecipeData();
        loadPersonalRecipeData();

        $log.info("Show User Profile Id: %s Page Opened", vm.userId);
    }

    function loadUserInfo(){
        ApiUser.getUserById({userId: vm.userId}, function(res){
            vm.userData = res;
        });
    }

    function loadFavoriteRecipeData(){
        vm.favoriteRecipepagination = {current: 1, limit: 6, steps: 5};
        var reqBody = {
            filter: vm.filter,
            currPage: vm.favoriteRecipepagination.current,
            limit: vm.favoriteRecipepagination.limit
        };

        ApiFavorite.getFavoriteRecipeByUserId(reqBody, function (res) {
            vm.loadFavoriteRecipe = res.data;
            vm.favoriteRecipepagination.total = res.pagination.totalPage;

            $log.info("FavoriteRecipe: " + JSON.stringify(vm.loadFavoriteRecipe));
            $log.info("Filter: %s", JSON.stringify(vm.filter));
        });
    }

    function loadPersonalRecipeData(){
        vm.personalRecipePagination = {current: 1, limit: 5, steps: 5};
        var reqBody = {
            filter: vm.filter,
            currPage: vm.personalRecipePagination.current,
            limit: vm.personalRecipePagination.limit
        };

        $log.info("Request: " + JSON.stringify(reqBody));

        ApiRecipe.getRecipeList(reqBody, function(res){
            vm.loadPersonalRecipe = res.data;
            vm.personalRecipePagination.total = res.pagination.totalPage;

            $log.info("PersonalRecipe: " + JSON.stringify(vm.loadPersonalRecipe));
        });
    }

    function _getSortRecipes() {
        return {
            "title_desc": "Title (descending)",
            "title_asc": "Title (ascending)",
            // "rating_desc": "Ratings (highest first)",
            // "rating_asc": "Ratings (lowest first)",
            "date_desc": "Date (newest first)",
            "date_asc": "Date (oldest first)"
        };
    }
}