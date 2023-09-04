varying vec3 vNormal;
varying float r_atom;
varying float r_sphere;
void main() 
{
	float intensity = pow( r_atom - dot( vNormal, vec3( 0.0, 0.0, 1 ) ), r_sphere ); 
    gl_FragColor = vec4( 0.0, 0.5, 1.0, 1.0 ) * intensity;
}