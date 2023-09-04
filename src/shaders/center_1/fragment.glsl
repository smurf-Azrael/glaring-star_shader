varying vec3 vNormal;
varying float r_atom;
varying float r_sphere;
varying float i_white;
void main() 
{
	float intensity = pow( r_atom - dot( vNormal, vec3( 0.0, 0.0, 1 ) ), r_sphere ); 
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity * i_white;
}