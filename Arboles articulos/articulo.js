class Producto{
    constructor(codigo, nombre, precio, cantidad, descripcion)
    {
        this._codigo = codigo;
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
        this._hiIzq = null;
        this._hiDer = null;
    }
    get codigo()
    {
        return this._codigo;
    }
    toString()
    {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nombre + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion ;
    }
}

class Articulo {
    constructor(tabla, clave) 
    {
        this._articulo = 0;
        this._tabla = tabla;
        this._clave = clave;
        this._order = "";
        this._inorder = "";
        this._posorder = "";
        this._preorder = "";
        this._artbuscado;
    }
    crearProducto(nombre, precio, cantidad, descripcion, clave) 
    {   
                this._clave = clave;
                let aux;
                aux = new Producto(this._clave, nombre, precio, cantidad, descripcion);
                this.agregar(aux);
    }
    agregar(aux)
    {
        let auxR = this._articulo;
        if (this._articulo === 0)
        {
            this._articulo = aux;
        }
        else if(auxR._codigo < aux._codigo)
        {
            this.agregarDer(auxR, aux);
        }
        else if(auxR._codigo > aux._codigo)
        {
            this.agregarIzq(auxR, aux);
        }
        this.impresion();
    }
    agregarIzq(auxR, aux)
    {
        if(auxR._hiIzq=== null)
            {
                auxR._hiIzq= aux;
            }
        else
        {
            auxR = auxR._hIzq;
            this.agregarIzq(auxR, aux);
        }
    }
    agregarDer(auxR, aux)
    {
        if(auxR._hiDer === null)
            {
                auxR._hiDer = aux;
            }
        else
            {
                auxR = auxR._hiDer;
                this.agregarDer(auxR, aux);
            }
    }
    buscar(codigo) 
    {
        let buscador;
        codigo = Number(codigo);
        let aux = this._articulo;
            if (aux._codigo === codigo) 
                {
                    buscador = aux.toString();
                    alert('Articulo encontrado. ');
                }
            else
                {
                    this.buscarArbol(aux, codigo);
                    buscador = this._artbuscado;
                }
            return buscador;
    }
    buscarArbol(aux, codigo)
    {
        if(aux._codigo === codigo) 
        {
            this._artbuscado = aux.toString();
            alert('Articulo encontrado. ');
        }
        else if(aux === undefined)
        {
            this._artbuscado = "No encontrado";
            alert("Articulo no encontrado. ");
        }
        else
        {
            if(aux._codigo > codigo)
            {
                aux = aux._hIzq;
                this.buscarArbol(aux, codigo);
            }
            else if (aux._codigo < codigo)
            {
                aux = aux._hiDer;
                this.buscarArbol(aux, codigo);
            }
        }
    }
    impresion() {
        this._order = "";
        let aux = this._articulo;
        if (aux != null)
        {
            this.impresionArbol(aux);
        }
        this._tabla.innerHTML = this._order;
    }
    impresionArbol(aux)
    {
        if(aux != null)
        {
            this.impresionArbol(aux._hIzq);
            this._order += aux.toString() + "<br>";
            this.impresionArbol(aux._hiDer);
        }
    }

    inorder()
    {
        let aux = this._articulo;
        if (aux != null)
        {
            this.impresioninorder(aux);
        }
        let tabla = document.querySelector('#tablainorder');
        tabla.innerHTML = this._inorder;
    }
    impresioninorder(aux)
    {
        if(aux != null)
        {
            this.impresioninorder(aux._hIzq);
            this._inorder += aux.toString() + "<br>";
            this.impresioninorder(aux._hiDer);
        }
    }

    preorder()
    {
        let aux = this._articulo;
        if (aux != null)
        {
            this.impresionPreorder(aux);
        }
        let tabla = document.querySelector('#tablapreorder');
        tabla.innerHTML = this._preorder;
    }
    impresionPreorder(aux)
    {
        if(aux != null)
        {
            this._preorder += aux.toString() + "<br>";
            this.impresionPreorder(aux._hIzq);
            this.impresionPreorder(aux._hiDer);
        }
    }

    posorder()
    {
        let aux = this._articulo;
        if (aux != null)
        {
            this.impresionPosorder(aux);
        }
        let tabla = document.querySelector('#tablaposorder');
        tabla.innerHTML = this._posorder;
    }
    impresionPosorder(aux)
    {
        if(aux != null)
        {
            this.impresionPosorder(aux._hIzq);
            this.impresionPosorder(aux._hiDer);
            this._posorder += aux.toString() + "<br>";
        }
    }
    get articulo() 
    {
        return this._articulo;
    }
    get clave() 
    {
        return this._clave;
    }
}

var inventario = new Articulo(document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
document.querySelector('#agregar').addEventListener('click', () => {
    let clave = Number(document.querySelector('#codigo').value);
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let cantidad = document.querySelector('#cantidad').value;
    let descripcion = document.querySelector('#descripcion').value;

    inventario.crearProducto(nombre, precio, cantidad, descripcion, clave);
    document.querySelector('#codigo').value = inventario.clave;
});
document.querySelector('#buscar').addEventListener('click', () => {
    let buscarArticulo = inventario.buscar(document.querySelector('#buscarCodigo').value);
    document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
});
document.querySelector('#inorder').addEventListener('click', () => {
    inventario.inorder();
});
document.querySelector('#preorder').addEventListener('click', () => {
    inventario.preorder();
});
document.querySelector('#posorder').addEventListener('click', () => {
    inventario.posorder();
});