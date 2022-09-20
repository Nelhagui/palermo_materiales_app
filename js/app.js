$r.dom();
//variables a utilzar en todo el sistema
let categorias = [];
let productos = [];
let historialFiltros = [];
let carrito = [];
let tiempoEnActualizarInfo = 3;

document.querySelector('.hamburger').addEventListener('click', function(){this.classList.toggle('is-active'); document.querySelector('nav').classList.toggle('show')})

_mostrar_elemento_emergente = function(e) {
    if(e.target.classList.contains('elemento-emergente')) {
        e.target.classList.toggle('show');
        document.querySelector('.cont-elementos-emergentes').classList.toggle('show');
    }
}
document.querySelector('.elemento-emergente').addEventListener('click', _mostrar_elemento_emergente, false);
delete _mostrar_elemento_emergente;

// apertura de login o registro
_login_registro = function(){
    document.querySelectorAll('[data-show]').forEach(element => { element.classList.remove('show'); });
    if(this.dataset.accion != "cerrar")
    {
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
                        cardCate.innerHTML = '<p>'+categoria.titulo.toUpperCase()+'</p>';

                        // caja para fondo
                        let divImg = document.createElement('div');
                            divImg.classList.add('backImagen');
                            divImg.style.backgroundImage = 'url('+categoria.foto+')';
                            // center center no-repeat scroll transparent'
                            divImg.style.backgroundPosition = "center center";
                            divImg.style.backgroundSize = "cover";
                            divImg.style.backgroundRepeat = 'repeat';
                            divImg.style.filter = "brightness(0.6)"
                            divImg.style.borderRadius = "var(--border-radius-btn)";
                            cardCate.appendChild(divImg);
                        cardCate.onclick = function()
                        {
                            //marco el boton seleccionado
                                document.getElementById('lista-categorias').querySelector('[data-id-item="'+this.dataset.idItem+'"]').classList.add('selected');

                            //oculto la lista de cards grandes y muestro las chicas
                                let data = { 'muestro': ['lista-categorias', 'opciones-subcategorias'], 'oculto': ['categorias-cotizar'] };
                                ocultoMuestro(data);
                                // ver como hacer
                            
                                //borro historial de los filtros de subcategorias
                                borrarHistorialFiltros()
                                //traigo la lista de subcategorias de este elmento
                                traerSubcategorias('opciones-subcategorias', 'cotizable', categoria.id)
                                //armar funcion para traida de subcategorias

                        }
                    document.getElementById(idElemento).appendChild(cardCate);

                    //cards 2
                    let cardCate2 = document.createElement('div');
                        cardCate2.classList.add('card-categoria-lista');
                        cardCate2.dataset.idItem = categoria.id;
                        cardCate2.innerHTML = '<p>'+categoria.titulo.toUpperCase()+'</p>';

                        // caja para fondo
                        let divImg2 = document.createElement('div');
                            divImg2.classList.add('backImagen');
                            divImg2.style.backgroundImage = 'url('+categoria.foto+')';
                            // center center no-repeat scroll transparent'
                            divImg2.style.backgroundPosition = "center center";
                            divImg2.style.backgroundSize = "cover";
                            divImg2.style.backgroundRepeat = 'repeat';
                            divImg2.style.filter = "brightness(0.6)"
                            divImg2.style.borderRadius = "var(--border-radius-btn)";
                            cardCate2.appendChild(divImg2);

                        cardCate2.onclick = function()
                        {
                            //cambio el estilo del boton seleccionado y los que no
                            document.getElementById('lista-categorias').querySelectorAll('.card-categoria-lista').forEach(card => {
                                card.classList.remove('selected');
                            });
                            this.classList.add('selected')

                            //borro historial de los filtros de subcategorias
                            borrarHistorialFiltros()
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
                data.forEach( item => 
                {
                    let cardSub = document.createElement('div');
                    // valido el tipo de elemento que llega. Categoria o Producto combinado tienen diferente maquetado
                    if(item.tipo == "categoria")
                    {
                        cardSub.classList.add('opcion-subcategoria');
                        cardSub.onclick = function() 
                        {
                            //muestro los filtros
                            document.getElementById('cont-filtros').classList.add('show');
                            addPasosEnFiltro(item);
                            
                            traerSubcategorias('opciones-subcategorias', 'cotizable', item.id)
                        }
                        cardSub.innerHTML = '<div class="icon-opc-sub">\
                                                <img src="" alt="">\
                                            </div>\
                                            <p>'+item.titulo+'</p>';

                    }
                    else if ( item.tipo == "producto_combinado" ) 
                    {
                            cardSub.classList.add('item');
                            cardSub.innerHTML = '<div class="img-item">\
                                                    <img src="'+item.foto+'" alt="">\
                                                </div>\
                                                <div class="info-item">\
                                                    <div class="categoria-item">Techo / Construcción húmeda</div>\
                                                    <div class="titulo-item">'+item.titulo+'</div>\
                                                </div>';
                                let btnCotizar = document.createElement('div');
                                    btnCotizar.classList.add('btn-item', 'cotizar');
                                    btnCotizar.onclick = function () {
                                        console.log('quiero vista de cotizar');
                                    };
                                    btnCotizar.innerHTML = '<img src="./resources/icon-cotizar.svg" alt="">\
                                                            <span class="comentario">Cotizar</span>';
                            cardSub.appendChild(btnCotizar);
                    }
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

function ocultoMuestro(data)
{
    if(data.muestro != undefined)
    {
        if(data.muestro.length > 0){
            data.muestro.forEach(element => {
                document.getElementById(element).classList.remove('dinone');
            });
        }
    } 
    if(data.oculto != undefined)
    {
        if(data.oculto.length > 0)
        {
            data.oculto.forEach(element => {
                document.getElementById(element).classList.add('dinone');
            });
        }
    }
}
function addPasosEnFiltro(data)
{
    historialFiltros.push(data);
    let div = document.createElement('div');
        div.classList.add('filtro');
            let titulo = document.createElement('p');
                titulo.innerHTML = data.titulo;
            let sacarItem = document.createElement('span');
                sacarItem.innerHTML = 'X';
        div.appendChild(titulo);
        div.appendChild(sacarItem);
    document.getElementById('filtros').appendChild(div);
    // <div class="filtro">
    //     <p>Construcción en seco</p>
    //     <span>X</span>
    // </div>

}
function borrarHistorialFiltros(){
    historialFiltros = [];
    document.getElementById('cont-filtros').classList.remove('show');
    document.getElementById('filtros').innerHTML = '';
}

{
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
        });
}}