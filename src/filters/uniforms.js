import * as Textures from "./resources";

const Uniforms = ( type, image ) => {
    switch(type){
        case 'Amaro':
            return {
                inputImageTexture: image,
                inputImageTexture2: Textures.blackboard1024,
                inputImageTexture3: Textures.overlayMap,
                inputImageTexture4: Textures.amaroMap
            }
        case 'Brannan':
            return {
                inputImageTexture: image,
                inputImageTexture2: Textures.brannanProcess,
                inputImageTexture3: Textures.brannanBlowout,
                inputImageTexture4: Textures.brannanContrast,
                inputImageTexture5: Textures.brannanLuma,
                inputImageTexture6: Textures.brannanScreen
            }
    }
};

export default Uniforms;
