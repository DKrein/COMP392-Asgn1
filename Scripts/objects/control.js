/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(mesh) {
            //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
            this.scaleX = 1;
            this.scaleY = 1;
            this.scaleZ = 1;
            this.positionX = 0;
            this.positionY = 4;
            this.positionZ = 0;
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this.translateZ = 0;
            this.mesh = mesh;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.translate = function () {
            this.mesh.translateX(this.translateX);
            this.mesh.translateY(this.translateY);
            this.mesh.translateZ(this.translateZ);
            this.positionX = this.mesh.position.x;
            this.positionY = this.mesh.position.y;
            this.positionZ = this.mesh.position.z;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map