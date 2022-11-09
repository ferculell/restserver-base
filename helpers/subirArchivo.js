const path = require('path');
const { v4: uuidv4} = require('uuid');


const extensionesDefault = ['jpg', 'jpeg', 'gif', 'png'];

const subirArchivo = async(archivo, extensionesValidas = extensionesDefault, subcarpeta = '') => {

    return new Promise((resolve, reject) => {
        
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    
        // Validar la extensión
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es válida. Las extensiones permitidas son: ${extensionesValidas}`);
        }
    
        const nombreUpload = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, "../uploads/", subcarpeta, nombreUpload);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
    
            resolve([nombreUpload, uploadPath]);
        });

    });

}

module.exports = {
    subirArchivo
}