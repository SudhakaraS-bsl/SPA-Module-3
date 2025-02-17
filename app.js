(function () {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    MenuCategoriesController.$inject = ['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) {
        var menu = this;
        menu.search_menuitems = "";
        menu.foundArray = [];
        menu.message = "";
        menu.NarrowDownMenuItems = function () {

            console.log(menu.search_menuitems);

            var promise = MenuCategoriesService.getMenuForCategory('A');

            promise.then(function (response) {
                menu.categories = response.data;
                angular.forEach(menu.categories, function (value, key) {
                    angular.forEach(value.menu_items, function (value1, key1) {
                        console.log(value1);
                        menu.foundArray.push(value1);
                        // if (value1.includes(menu.search_menuitems)) 
                        //     { menu.foundArray.push(value1); }
                    });
                });
                // menu.totalItems = menu.foundArray.length;
            })
                .catch(function (error) {
                    console.log(error);
                });

        }


        menu.removeMenuItems = function (shortName) {

            for (var i = 0; i < menu.foundArray.length; i++) {
                if (menu.foundArray[i].short_name == shortName) {
                    menu.foundArray.splice(i, 1); // removes the matched element
                    i = menu.foundArray.length;  // break out of the loop. Not strictly necessary
                }
            }
            // menu.totalItems = menu.foundArray.length;
            // var promise = MenuCategoriesService.getMenuForCategory(shortName);

            // promise.then(function (response) {
            //     console.log(JSON.parse(response.data));
            // })
            //     .catch(function (error) {
            //         console.log(error);
            //     })
        };

    }


    MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });

            return response;
        };


        service.getMenuForCategory = function (shortName) {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: shortName
                }
            });

            return response;
        };

    }

})();