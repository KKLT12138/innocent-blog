/**
 * Created by Tianzhen on 17-2-25.
 * app.js
 */
angular.module("myBlog", ["myBlogRoute"])
    .directive("blogSidebar", function () {
        return  {
            restrict: "E",
            templateUrl: "sidebar.html"
        }
    })
    .directive("blogHeader", function () {
        return  {
            restrict: "E",
            templateUrl: "header.html"
        }
    })
    .directive("blogFooter", function () {
        return  {
            restrict: "E",
            templateUrl: "footer.html"
        }
    })