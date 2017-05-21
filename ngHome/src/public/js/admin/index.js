/**
 * Created by Tianzhen on 17-3-14.
 * app.js for admin
 */
angular.module("myAdmin", ["myAdminRoute"])
    .directive("adminSidemenu", function () {
        return  {
            restrict: "E",
            templateUrl: "../admin/sidemenu.html"
        }
    })
    // .directive("adminHeader", function () {
    //     return  {
    //         restrict: "E",
    //         templateUrl: "admin/header.html"
    //     }
    // })
    // .directive("adminFooter", function () {
    //     return  {
    //         restrict: "E",
    //         templateUrl: "admin/footer.html"
    //     }
    // })