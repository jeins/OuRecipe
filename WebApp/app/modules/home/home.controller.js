angular
    .module('app.home')
    .controller('HomeController', HomeController);

function HomeController() {
    var vm = this;
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
        }
    ];
    vm.loadTopRecipes = [
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
        }
    ];
    vm.loadTopAuthors = [
        {
            name: "Demo 1",
            photo: ""
        },
        {
            name: "Demo 2",
            photo: ""
        },
        {
            name: "Demo 3",
            photo: ""
        },
        {
            name: "Demo 4",
            photo: ""
        },
        {
            name: "Demo 5",
            photo: ""
        },
        {
            name: "Demo 6",
            photo: ""
        }
    ];
}