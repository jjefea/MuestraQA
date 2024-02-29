const jsonData= require('../../fixtures/utils.json'); 

/**
 * devuelve la propiedad indicada, en el archivo utils.json,
 * pero sin disparar un error en caso de no existir la propiedad.
 * @param {string} key nombre de la propiedad a obtener
 * @returns undefined si no existe la propiedad o es un string sin texto | data si la propiedad existe.
 */
let jsonGet= (key)=>{
    let data;
    if(!jsonData[key]){
        data=undefined;
    }else{
        if(jsonData[key] != ""){
            data =jsonData[key];
        }else{
            data=undefined;
        }
        
    }
    return data;
}

/**
 * devuelve la propiedad indicada en el archivo utils.json, pero dispara un error
 * en caso de que no exista.
 * 
 * @param {string} key nombre de la propiedad a obtener
 * @returns Throw error en caso de que no exista la propiedad | data si la pripiedad existe
 */
let jsonGetThrow = (key)=>{
    let data;
    if(!jsonData[key]){
        throw 'no existe: '+key.toString()+' dentro de utils.json';
    }else{
        data =jsonData[key];
    }
    return data;
}

/**
 * Agrega una propiedad al archivo utils.json
 * 
 * @param {string} key nombre de la propiedad
 * @param {*} value valor de la propiedad
 */
let jsonSet=(key, value)=>{
    if(value != undefined){
        jsonData[key] = value;
    }else{
        throw 'Valor de la propiedad '+key+' = undefined';
    }
}

function RunTimeExeption(message) {
    this.message = message;
    this.name = 'RunTimeException';
}

module.exports ={
    jsonGet,
    jsonSet,
    RunTimeExeption
}