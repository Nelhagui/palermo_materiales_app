$r.dom();
//variables a utilzar en todo el sistema
let categorias = [];
let productos = [];
let carrito = [];
let tiempoEnActualizarInfo = 3;

document.querySelector('.hamburger').addEventListener('click', function(){this.classList.toggle('is-active'); document.querySelector('nav').classList.toggle('show')})

_cerrar_login_registro = function(e) {
    if(e.target.classList.contains('cont-login') || e.target.classList.contains('cont-registro') || e.target.classList.contains('cont-add-items-cart') || e.target.classList.contains('cont-edit-perfil')) {
        e.target.classList.toggle('show');
        document.querySelector('.cont-elementos-emergentes').classList.toggle('show');
    }
}
document.querySelector('.cont-login').addEventListener('click', _cerrar_login_registro, false);
document.querySelector('.cont-registro').addEventListener('click', _cerrar_login_registro, false);
document.querySelector('.cont-edit-perfil').addEventListener('click', _cerrar_login_registro, false);
document.querySelector('.cont-add-items-cart').addEventListener('click', _cerrar_login_registro, false);
delete _cerrar_login_registro;
// apertura de login o registro
_login_registro = function(){
    document.querySelectorAll('[data-show]').forEach(element => { element.classList.remove('show'); });
    if(this.dataset.accion != "cerrar"){
        console.log(this.dataset.accion);
        document.querySelector('[data-show="'+this.dataset.accion+'"]').classList.toggle('show');
        document.querySelector('.cont-elementos-emergentes').classList.add('show');
    }
    else
    {
        document.querySelector('.cont-elementos-emergentes').classList.toggle('show');
    }
}
document.querySelectorAll('[data-accion]').forEach(element => { element.onclick = _login_registro; });
delete _login_registro;

// secciones
document.querySelectorAll('a[data-link]').forEach(element => {
    element.onclick = function()
    {
        console.log('cargooo')
        document.querySelectorAll('[data-seccion]').forEach(element => { element.classList.remove('show') });
        document.querySelector('[data-seccion="'+this.dataset.link+'"]').classList.add('show');
        switch (this.dataset.link) 
        {
            case 'home':
                //valido si ya tiene en local storage las categorás descargadas.
            break;
            case 'perfil':
                console.log('perfil');
            break;
            case 'productos':
                console.log('productos');
            break;
            case 'cotizar':
                console.log('cotizar'); 
                console.log(categorias);
                if(!contenidoActualizado(categorias)) 
                {
                    console.log('mando ajax')
                    let procesa_respuesta = function(data)
                    {    console.log('respuesta')
                        if(!Array.isArray(data))
                        {
                            alert('No se encontraron categorías, reinicie la app');
                        }
                        else
                        {
                            if(data.length > 0 )
                            {
                                categorias = categorias.concat(data);
                                categorias.tiempo = Number($r.date('YmdHi'));
                                //MAQUETO LAS CATEGORIAS
                                maquetoCategorias('categorias-cotizar', categorias);
                            }
                            else
                            {
                                alert('No se encontraron categorías, reinicie la app por favor');
                            }
                        }          
                    }   
                    var _obd = {"url": url_ajax+'categoria', "metodo": 'GET', "datos": 'h=categorias', "recibe": procesa_respuesta };
                    $r.ajax(_obd);  
                    delete procesa_respuesta;
                }

                // si no hay categorías descargadas pre

            break;
            case 'informacion':
                console.log('informacion');   
            break;
            case 'terminos':
                console.log('terminos');
            break;
        
            default:
            break;
        }
        // oculto nav
        document.querySelector('.hamburger').classList.remove('is-active'); document.querySelector('nav').classList.remove('show')
    }
});

// seteo de cantidades
document.querySelectorAll('span[data-set-cant]').forEach(bton => {
    bton.onclick = function() {
        let valueActual = document.getElementById(this.dataset.idInput).value
        if(this.dataset.setCant == 'subir'){
            valueActual = Number(Number(valueActual)+1);
        }
        else if(this.dataset.setCant == 'bajar'){
            if(valueActual>1){
                valueActual = Number(Number(valueActual)-1);
            }
        }
        document.getElementById(this.dataset.idInput).value = valueActual
    }
})


//funcion que solo valida si algunos datos están actualizados o no para volver a descargarlos
function contenidoActualizado(array)
{
    let respuesta = false;
    if(array.length > 0 )
    {
        let tiempoActual = Number($r.date('YmdHi'));
        let tiempoArray = Number(array.tiempo);
        let tiempoTranscu = Number(tiempoActual - tiempoArray);
        if(tiempoTranscu < tiempoEnActualizarInfo)
            respuesta = true;
        delete tiempoActual, tiempoArray, tiempoTranscu;
    }
    if(respuesta === false){
        categorias = []; // vacio para que vuelvan a consultar
    }
    return respuesta;
}

// MAQUETADOS
function maquetoCategorias(idElemento, array)
{
    console.log('maquetando');
    document.getElementById(idElemento).innerHTML = "";
    switch (idElemento) {
        case 'categorias-cotizar':
            {
                document.getElementById('lista-categorias').innerHTML = "";
                array.forEach( categoria => 
                {
                    // cards 1
                    let cardCate = document.createElement('div');
                        cardCate.classList.add('card-categoria');
                        cardCate.dataset.idItem = categoria.id;
                        cardCate.innerHTML = '<p>'+categoria.titulo.toUpperCase()+'</p>\
                                        <img src="" alt="">';
                        cardCate.onclick = function()
                        {
                            //marco el boton seleccionado
                            document.getElementById('lista-categorias').querySelector('[data-id-item="'+this.dataset.idItem+'"]').classList.add('selected');
                            //oculto la lista de cards grandes y muestro las chicas
                                // ver como hacer
                            //traigo la lista de subcategorias de este elmento
                                traerSubcategorias('opciones-subcategorias', 'cotizable', categoria.id)
                                //armar funcion para traida de subcategorias

                        }
                    document.getElementById(idElemento).appendChild(cardCate);

                    //cards 2
                    let cardCate2 = document.createElement('div');
                        cardCate2.classList.add('card-categoria-lista');
                        cardCate2.dataset.idItem = categoria.id;
                        cardCate2.innerHTML = '<p>'+categoria.titulo.toUpperCase()+'</p>\
                                        <img src="" alt="">';
                        cardCate2.onclick = function()
                        {
                            //traigo la lista de subcategorias de este elemento;
                            traerSubcategorias('opciones-subcategorias', 'cotizable', categoria.id)
                        }
                    document.getElementById('lista-categorias').appendChild(cardCate2);
                });
                
            }
        break;

        case 'opciones-subcategorias':

        break;
    
        default:
        break;
    }
}

function traerSubcategorias(idElemento, tipo, idCategoria)
{
    let procesa_respuesta = function(data)
    {    
        console.log(data);
        if(!Array.isArray(data))
        {
            alert('No se encontraron categorías, reinicie la app');
        }
        else
        {
            if(data.length > 0 )
            {
                document.getElementById(idElemento).innerHTML = "";
                //vero que hacer
                data.forEach( subcategoria => {
                    let cardSub = document.createElement('div');
                        cardSub.classList.add('opcion-subcategoria');
                        cardSub.innerHTML = '<div class="icon-opc-sub">\
                                                <img src="" alt="">\
                                            </div>\
                                            <p>'+subcategoria.titulo+'</p>';
                    document.getElementById(idElemento).appendChild(cardSub);
                });
                
            }
            else
            {
                alert('No se encontraron categorías, reinicie la app por favor');
            }
        }          
    }   
    var _obd = {"url": url_ajax+'categoria/'+tipo+'/'+idCategoria, "metodo": 'GET', "datos": 'h=categorias', "recibe": procesa_respuesta };
    $r.ajax(_obd);  
    delete procesa_respuesta;

}