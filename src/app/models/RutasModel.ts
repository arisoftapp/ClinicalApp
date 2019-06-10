export class Ruta {
    path;
    label;
    icon;
    material : boolean ;
    constructor(ruta, etiqueta, icono, material : boolean){
        this.path = ruta;
        this.label = etiqueta;
        this.icon = icono;
        this.material = material;
    }
}



