var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment']);

app.config(function($routeSegmentProvider, $routeProvider) {

    $routeSegmentProvider

        .when('/:section', 's1')
        .when("/somename", "tr")
        .when('/search/:stext', "search")
        .when('/:section/:menu', "s1.s2")
        .when('/:section/:menu/:id', "s1.s2.s3")
        .segment('s1', {
            templateUrl: 'templates/initial.html',
            controller: 'MainCtrl',
            dependencies: ["section"]
        })
        .within()
        .segment('s2', {
            default: true,
            templateUrl: 'templates/link.html',
            controller: 'LCtrl',
            dependencies: ["section", "menu"]
        })
        .within()
        .segment('s3', {
            default: "true",
            templateUrl: 'templates/linkData.html',
            controller: 'LDataCtrl',
            dependencies: ["section", "menu", "id"]
        })
        .up()
        .up()
        .segment('search', {
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl',
        })
        .segment('tr', {
            templateUrl: 'templates/initial.html',
            controller: 'MainCtrl'
        })

    $routeProvider.otherwise({
        redirectTo: '/section1'
    });

});
app.controller("someCtrl", function($scope, $routeSegment, dataFactory, $location) {
   /* $("#pageData").niceScroll({
        autohidemode: true
    });*/
    $("#clickMe").click(function() {
        $("#myModal").modal('show');
    })
});
app.controller("MainCtrl", function($scope, $routeSegment, dataFactory) {
    console.log(4);
    $scope.menus = ["menu1", "menu2", "menu3"];
    $scope.section = $routeSegment.$routeParams.section || "section1";
    /*if ($scope.section == "section2") {
        //$scope.myData = "srinath";
        dataFactory.setData("srinath");
    }*/
    $scope.menu = "menu1";
});
app.controller("LCtrl", function($scope, $routeSegment, dataFactory) {
    console.log(5);
    $scope.section = $routeSegment.$routeParams.section || "section1";
    $scope.menu = $routeSegment.$routeParams.menu || "menu1";
    $scope.sideLinks = dataFactory.mainData[$scope.section]["/" + $scope.menu];
    $scope.id = $scope.sideLinks[0].id;
     $("#pageData").niceScroll({
        autohidemode: true
    });

    /* $scope.item = dataFactory.getLinkData($scope.menu, $scope.id);*/
})
app.controller("LDataCtrl", function($scope, $routeSegment, dataFactory) {
    console.log(6)
    $scope.section = $routeSegment.$routeParams.section || "section1";
    $scope.menu = $routeSegment.$routeParams.menu || "menu1";
    //$scope.myData = dataFactory.getData();
    $scope.sideLinks = dataFactory.mainData[$scope.section]["/" + $scope.menu];
    $scope.id = $routeSegment.$routeParams.id || $scope.sideLinks[0].id;
    $scope.item = dataFactory.getLinkData($scope.section, $scope.menu, $scope.id);
})
app.controller("SearchCtrl", function($scope, $routeSegment, dataFactory) {
    
})
app.factory("dataFactory", function() {

    var factory = {};
    var defaultData = "";
    factory.mainData = {
        "section1": {
            "/menu1": [{
                id: 1,
                content: "link1 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link1"
            }, {
                id: 2,
                content: "link2 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link2"
            }, {
                id: 3,
                content: "link3 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link3"
            }],
            "/menu2": [{
                id: 4,
                content: "link4 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link4"
            }, {
                id: 5,
                content: "link5 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link5"
            }, {
                id: 6,
                content: "link6 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link6"
            }],
            "/menu3": [{
                id: 7,
                content: "link7 creen-reader users, click here to turn off Google Instant. About 55,30,000 results (0.27 seconds) Search Results Navbar Template for Bootstrap getbootstrap.com/examples/navbar/ ",
                "data": "This is from link7"
            }, {
                id: 8,
                content: "link8",
                "data": "This is from link8"
            }, {
                id: 9,
                content: "link9",
                "data": "This is from link9"
            }]
        },
        "section2": {
            "/menu1": [{
                id: 1,
                content: "link10",
                "data": "This is from link11"
            }, {
                id: 2,
                content: "link11",
                "data": "This is from link12"
            }, {
                id: 3,
                content: "link12",
                "data": "This is from link13"
            }],
            "/menu2": [{
                id: 4,
                content: "link13",
                "data": "This is from link14"
            }, {
                id: 5,
                content: "link14",
                "data": "This is from link15"
            }, {
                id: 6,
                content: "link15",
                "data": "This is from link16"
            }],
            "/menu3": [{
                id: 7,
                content: "link16",
                "data": "This is from link17"
            }, {
                id: 8,
                content: "link8",
                "data": "This is from link18"
            }, {
                id: 9,
                content: "link19",
                "data": "This is from link19"
            }]
        }

    };
    factory.setDefaultData = function(path) {
        defaultData = factory.mainData[path][0].data;
    }
    factory.setData = function(data) {
        factory.myData = data;
        return data;
    }
    factory.getData = function(data) {
        return factory.myData;
    }
    factory.getLinkData = function(section, menu, id) {
        if (id) {
            var menu = factory.mainData[section]["/" + menu];
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].id == id) {
                    return menu[i].data;
                }
            }
        } else {
            return defaultData;
        }
    }

    return factory;
});
app.directive('customHref', function($location) {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    $location.path(attrs.customHref);
                });
                event.preventDefault();
            }
        });
    };
});
