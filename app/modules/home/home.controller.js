angular
    .module('app.home')
    .controller('HomeController', HomeController);

function HomeController() {
    let vm = this;
    vm.loadCategories = [
        {
            "name": "Categorie 1",
            "icon": "home"
        },
        {
            "name": "Categorie 2",
            "icon": "home"
        },
        {
            "name": "Categorie 3",
            "icon": "home"
        },
        {
            "name": "Categorie 4",
            "icon": "home"
        },
        {
            "name": "Categorie 5",
            "icon": "home"
        },
        {
            "name": "Categorie 6",
            "icon": "home"
        }
    ];
}