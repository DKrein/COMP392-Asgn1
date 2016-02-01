/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public scaleX: number = 1;
        public scaleY: number = 1;
        public scaleZ: number = 1;
        public positionX: number = 0;
        public positionY: number = 4;
        public positionZ: number = 0;
        public rotationX: number = 0;
        public rotationY: number = 0;
        public rotationZ: number = 0;
        public scale: number = 1;
        public translateX: number = 0;
        public translateY: number = 0;
        public translateZ: number = 0;
        public mesh: Mesh;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(mesh: Mesh) {
            this.mesh = mesh;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public translate(): void {
            this.mesh.translateX(this.translateX);
            this.mesh.translateY(this.translateY);
            this.mesh.translateZ(this.translateZ);
            this.positionX = this.mesh.position.x;
            this.positionY = this.mesh.position.y;
            this.positionZ = this.mesh.position.z;
        }
    }
}
