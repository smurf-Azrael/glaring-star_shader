uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec2 resolution;

varying vec3 vColor;
varying vec3 vNormal;
varying vec2 resol;

attribute float aScale;
attribute float id;

void main() {
    vColor = color;
    resol = resolution;

    vNormal = normalize( normalMatrix * normal );

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(id * 0.5 + 0.2 * uTime) * 8.0;
    modelPosition.x -= cos(id * 0.5 + 0.1 * uTime) * 8.5;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 + sin(id * 0.1 * uTime)) * 3.0;
    gl_PointSize *= (1.0 / -viewPosition.z);
}