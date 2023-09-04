varying vec3 vColor;
varying vec3 vNormal;


void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.1 / distanceToCenter - 1.0;

    float transparencyFactor = 0.2;

    gl_FragColor = vec4(vColor, strength) * transparencyFactor;
}