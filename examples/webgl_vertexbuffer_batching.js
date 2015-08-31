/*
External sample from: http://stackoverflow.com/questions/15561871/the-fastest-way-to-batch-calls-in-webgl
*/
var MAX_QUADS_PER_BATCH = 100;
var VERTS_PER_QUAD = 6;
var FLOATS_PER_VERT = 2;
var verts = new Float32Array(MAX_QUADS_PER_BATCH * VERTS_PER_QUAD * FLOATS_PER_VERT);

var quadCount = 0;
function addQuad(left, top, bottom, right) {
    var offset = quadCount * VERTS_PER_QUAD * FLOATS_PER_VERT;

    verts[offset] = left; verts[offset+1] = top;
    verts[offset+2] = right; verts[offset+3] = top;
    // etc...

    quadCount++;

    if(quadCount == MAX_QUADS_PER_BATCH) {
        flushQuads();
    }
}

function flushQuads() {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW); // Copy the buffer we've been building to the GPU.

    // Make sure vertexAttribPointers are set, etc...

    gl.drawArrays(gl.TRIANGLES, 0, quadCount + VERTS_PER_QUAD);
}

// In your render loop

for(sprite in spriteTypes) {
    gl.bindTexture(gl.TEXTURE_2D, sprite.texture);

    for(instance in sprite.instances) {
        addQuad(instance.left, instance.top, instance.right, instance.bottom);  
    }

    flushQuads();
}