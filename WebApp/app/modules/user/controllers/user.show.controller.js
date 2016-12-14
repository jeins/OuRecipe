angular
    .module('app.user')
    .controller('UserShowController', UserShowController);

UserShowController.$inject = ['$log', '$stateParams', '$location', 'ApiUser', 'ApiRecipe', 'ApiFavorite'];
function UserShowController($log, $stateParams, $location, ApiUser, ApiRecipe, ApiFavorite) {
    var vm = this;
    vm.onPageChanged = onPageChanged;
    vm.doSearch = doSearch;

    init();

    function init() {
        vm.userId = $stateParams.userId;
        vm.selectedPage = ($stateParams.page !== undefined) ? $stateParams.page : 0;
        vm.filter = {};
        vm.loadSort = _getSortRecipes();
        vm.favoriteRecipepagination = {current: 1, limit: 6, steps: 5};
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
        var reqBody = {
            filter: {
                userId: vm.userId
            },
            currPage: vm.favoriteRecipepagination.current,
            limit: vm.favoriteRecipepagination.limit
        };
        ApiFavorite.getFavoriteRecipeByUserId(reqBody, function (res) {
            vm.loadFavoriteRecipe = res.data;
            vm.favoriteRecipepagination = res.pagination.totalPage;

            $log.info("FavoriteRecipe: " + JSON.stringify(vm.loadFavoriteRecipe));
        });
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

            $log.info("PersonalRecipe: " + JSON.stringify(vm.loadPersonalRecipe));
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