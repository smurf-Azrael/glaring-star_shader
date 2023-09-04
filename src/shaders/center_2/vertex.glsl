uniform float center_r;
uniform float sphere_r;
uniform float r_scale;
varying vec3 vNormal;
varying float r_atom;
varying float r_sphere;
void main() 
{
    vNormal = normalize( normalMatrix * normal );
    r_atom = center_r;
    r_sphere = sphere_r;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, r_scale );
}