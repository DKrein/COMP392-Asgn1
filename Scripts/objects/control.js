/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(defaultColor, group) {
            //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.feetColor = defaultColor;
            this.legsColor = defaultColor;
            this.armsColor = defaultColor;
            this.torsoColor = defaultColor;
            this.headColor = defaultColor;
            this.group = group;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.resetPosition = function () {
            group.rotation.x = 0;
            group.rotation.y = 0;
            group.rotation.z = 0;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map