export class Ruta {
    path;
    label;
    icon;
    material : boolean ;
    permitido: boolean;
    constructor(ruta, etiqueta, icono, material : boolean, permitido: boolean){
        this.path = ruta;
        this.label = etiqueta;
        this.icon = icono;
        this.material = material;
        this.permitido = permitido;
    }
}



