uniform float center_r;
uniform float sphere_r;
uniform float r_scale;
uniform float white_ins;
varying vec3 vNormal;
varying float r_atom;
varying float r_sphere;
varying float i_white;
void main() 
{
    vNormal = normalize( normalMatrix * normal );
    r_atom = center_r;
    r_sphere = sphere_r;
    i_white = white_ins;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, r_scale );
}