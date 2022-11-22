$r.dom();
//variables a utilzar en todo el sistema
let categorias = [];
let productoSeleccionado = {};
let historialFiltros = [];
$r.cls('carrito', JSON.stringify([]));
let tiempoEnActualizarInfo = 3;

//carga iniciar
{
    procesa_respuesta_inicial = function(data)
    {
        if(data.hasOwnProperty('terminos'))
        {
            document.getElementById('terminos-condiciones').innerHTML = data.terminos;
        }
        if(data.hasOwnProperty('informacion'))
        {
            let informacion = data.informacion;

            document.getElementById("nuestros-telefonos").innerHTML = '';
            informacion.telefonos.forEach(telefono => {
                let p = document.createElement('p');
                    p.innerHTML = telefono;
                    document.getElementById("nuestros-telefonos").appendChild(p);
            });

            document.getElementById("consultas-por-mail").innerHTML = '';
            informacion.emails.forEach(email => {
                let p = document.createElement('p');
                    p.innerHTML = email;
                    document.getElementById("consultas-por-mail").appendChild(p);
            });

            document.getElementById("horarios-de-atencion").innerHTML = '';
            informacion.horarios.forEach(horario => {
                let p = document.createElement('p');
                    p.innerHTML = horario;
                    document.getElementById("horarios-de-atencion").appendChild(p);
            });

            document.getElementById("ubicaciones").innerHTML = '';
            informacion.ubicaciones.forEach(ubicacion => {
                let p = document.createElement('p');
                    p.innerHTML = ubicacion;
                    document.getElementById("ubicaciones").appendChild(p);
            });

            document.getElementById("sitio-web").innerHTML = informacion.sitio;

        }

    }
    let _obd = {"url": url_public+'contenido-app.json', "metodo": 'GET', "datos": 'h=categorias', "recibe": procesa_respuesta_inicial };
    $r.ajax(_obd);  
    delete procesa_respuesta_inicial;
}

//fin carga inicial

//valido sesion del usuario
validoSesion();

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
const _login_registro = function(){
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
                
                document.getElementById('cont-resultados-opciones-sub').classList.add('dinone');
                document.getElementById('lista-categorias').classList.add('dinone');
                document.getElementById('categorias-cotizar').classList.remove('dinone');
                document.querySelector('.cont-resul-calc-conti').classList.add('dinone');
                document.getElementById('btn-add-cart-resul-coti').classList.add('dinone');
                document.getElementById('mt-cuadrados-cot').value = 1;
                document.getElementById('lista-categorias').querySelectorAll('.card-categoria-lista').forEach(item => {item.classList.remove('selected');})
                
                borrarHistorialFiltros()

                // si no hay categorías descargadas pre

            break;
            case 'informacion':
                
            break;
            case 'carrito':
                {
                    let carrito = $r.gls('carrito');
                    if(carrito.length > 0)
                    {
                        mostrarItemsCarrito(carrito);
                    }
                    else
                        alert('no hay elementos en el carrito de compras');
                }
            break;
            case 'terminos':
                console.log('terminos');
            break;
        
            default:
            break;
        }
        // oculto nav
        document.querySelector('.hamburger').classList.remove('is-active'); document.querySelector('nav').classList.remove('show')

        if(element.dataset.accion !== undefined){
            if(element.dataset.accion == 'cerrar')
            {
                document.querySelectorAll('[data-show]').forEach(element => { element.classList.remove('show'); });
                document.querySelector('.cont-elementos-emergentes').classList.toggle('show');
            }
        }
    }
});

// seteo de cantidades
document.querySelectorAll('span[data-set-cant]').forEach(bton => 
{
    bton.onclick = function() 
    {
        let valueActual = document.getElementById(this.dataset.idInput).value
        if(this.dataset.setCant == 'subir')
        {
            valueActual = Number(Number(valueActual)+1);
        }
        else if(this.dataset.setCant == 'bajar')
        {
            if(valueActual>1)
            {
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
    if(respuesta === false)
    {
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
                                let data = { 'muestro': ['lista-categorias', 'cont-efec-loading-subt'], 'oculto': ['categorias-cotizar'] };
                                ocultoMuestro(data);
                                // ver como hacer
                            
                                //borro historial de los filtros de subcategorias
                                borrarHistorialFiltros()
                                //traigo la lista de subcategorias de este elmento
                                traerSubcategorias('cont-resultados-opciones-sub', 'cotizable', categoria.id)
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
                            traerSubcategorias('cont-resultados-opciones-sub', 'cotizable', categoria.id)
                        }
                    document.getElementById('lista-categorias').appendChild(cardCate2);
                });
                
            }
        break;

        case 'cont-resultados-opciones-sub':

        break;
    
        default:
        break;
    }
}

function traerSubcategorias(idElemento, tipo, idCategoria)
{
    document.getElementById(idElemento).innerHTML = "";
    document.getElementById('cont-efec-loading-subt').classList.remove('dinone');
    let procesa_respuesta = function(data)
    {    
        // oculto efecto loading
        document.getElementById('cont-efec-loading-subt').classList.add('dinone');
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
                            dataClick = {'idElemento':idElemento, 'tipo': tipo, 'idCategoria': idCategoria };
                            addPasosEnFiltro(item, dataClick);
                            
                            traerSubcategorias('cont-resultados-opciones-sub', 'cotizable', item.id)
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
                                    btnCotizar.data = item;
                                    btnCotizar.onclick = function () 
                                    {
                                        document.getElementById('id-prodcombi-coti').value = this.data.id;
                                        document.querySelector('[data-seccion="cotizar"]').classList.remove('show');
                                        document.querySelector('[data-seccion="cotizar-calculo"]').classList.add('show');
                                        document.getElementById('cod-cot-cal').innerHTML = this.data.id;
                                        document.getElementById('titulo-cot-cal').innerHTML = this.data.titulo != null || this.data.titulo != undefined ? this.data.titulo : '';
                                        document.getElementById('descrip-cot-cal').innerHTML = this.data.descripcion_corta != null || this.data.descripcion_corta != undefined ? this.data.descripcion_corta : '';
                                        document.getElementById('img-cot-cal').src = this.data.foto
                                    };
                                    btnCotizar.innerHTML = '<img src="./resources/icon-cotizar.svg" alt="">\
                                                            <span class="comentario">Cotizar</span>';
                            cardSub.appendChild(btnCotizar);
                    }
                    document.getElementById(idElemento).appendChild(cardSub);
                    document.getElementById(idElemento).classList.remove('dinone');
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
function addPasosEnFiltro(data, dataClick = false)
{
    document.getElementById('cont-filtros').classList.add('show');
    historialFiltros.push(data);
    let div = document.createElement('div');
        let nroubi = $r.date('YmdHis');
        div.setAttribute('data-ubi-fil', nroubi);
        div.classList.add('filtro');
            let titulo = document.createElement('p');
                titulo.innerHTML = data.titulo;
            let sacarItem = document.createElement('span');
                sacarItem.innerHTML = 'X';
                sacarItem.nroBtn = nroubi;
                if(dataClick !== false){
                    sacarItem.onclick = function()
                    {
                        idElemento = dataClick.idElemento;
                        tipo = dataClick.tipo;
                        idCategoria = dataClick.idCategoria;
                        traerSubcategorias(idElemento, tipo, idCategoria)
                        sacarBtnsFiltros(this.nroBtn)
                    }
                }
        div.appendChild(titulo);
        div.appendChild(sacarItem);
    document.getElementById('filtros').appendChild(div);
    // <div class="filtro">
    //     <p>Construcción en seco</p>
    //     <span>X</span>
    // </div>

}
function borrarHistorialFiltros()
{
    historialFiltros = [];
    document.getElementById('cont-filtros').classList.remove('show');
    document.getElementById('filtros').innerHTML = '';
}

function sacarBtnsFiltros(nroBtn){
    console.log(nroBtn);
    if(document.getElementById('filtros').querySelectorAll('[data-ubi-fil]').length > 0){
        document.getElementById('filtros').querySelectorAll('[data-ubi-fil]').forEach(btn => {
            if(btn.getAttribute('data-ubi-fil') >= nroBtn){
                btn.remove();
            }
        });
    }
    if(document.getElementById('filtros').querySelectorAll('[data-ubi-fil]').length == 0){
        document.getElementById('cont-filtros').classList.remove('show');
    }
}

// accordion
{
    function verContenidoAccordion(elemento)
    {
        elemento.classList.toggle("active");
        let panel = elemento.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;

        if (panel.style.maxHeight) 
        {
            panel.style.maxHeight = null;
        } 
        else 
        {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }    
    }
}

//

//login
_envio_login = function(event)
{
    event.preventDefault();
    let error = 0;
    let email = document.getElementById('email-login').value;
    let pass = document.getElementById('pass-login').value;
    if(email == '')
        error = "Ingrese email";
    if(pass == '')
        error = "Ingrese contraseña";
    if(error === 0)
    {
        document.getElementById('form-login').querySelector('button[type="submit"]').disabled = true;
        document.getElementById('form-login').querySelector('button[type="submit"]').classList.add('disabled');
        document.getElementById('form-login').querySelector('button[type="submit"]').innerHTML = 'Iniciando...';
        document.getElementById('form-login').querySelectorAll('input').forEach(input => {
            input.disabled = true;
        })
    
        const procesa_respuesta_login = function(data)
        {
            console.log(data);
            if(data == 404)
            {
                alert('El usuario no se encuentra en nuestros registros')   
            }
            document.getElementById('form-login').querySelector('button[type="submit"]').disabled = false;
            document.getElementById('form-login').querySelector('button[type="submit"]').classList.remove('disabled');
            document.getElementById('form-login').querySelector('button[type="submit"]').innerHTML = 'INGRESAR';
            document.getElementById('form-login').querySelectorAll('input').forEach(input => {
                input.disabled = false;
            })
            if(data.user !== undefined)
            {
                $r.cls('user', JSON.stringify(data.user));
                $r.cls('token', data.token);
                mostrarDatosUsuario();
                //verifico si se esta logueando en el proceso del carrito, si es así muestro el siguiente paso
                if(document.querySelector('[data-paso="detalle"]').classList.contains('paso-actual')){
                    document.getElementById('cont-carrito-detalle').classList.add('dinone');
                    document.getElementById('carrito-pago').classList.remove('dinone');
                    document.querySelector('[data-paso="detalle"]').classList.remove('paso-actual')
                    document.querySelector('[data-paso="pago"]').classList.add('paso-actual')

                }

            }
        }
        var _obd = {"url": url_ajax+'auth/login', "metodo": 'POST', "datos": 'h=login&'+$r.serialize(document.getElementById('form-login')), "recibe": procesa_respuesta_login };
        $r.ajax(_obd);  
        delete procesa_respuesta_login;
    } else {
        alert(error);
    }
    
    
}
document.getElementById('form-login').addEventListener('submit', _envio_login, false);
delete _envio_login;

//registro
_envia_registro = function(event){
    event.preventDefault();
    document.getElementById('form-registro').querySelector('button[type="submit"]').disabled = true;
    document.getElementById('form-registro').querySelector('button[type="submit"]').classList.add('disabled');
    document.getElementById('form-registro').querySelector('button[type="submit"]').innerHTML = 'Enviando datos...';
    document.getElementById('form-registro').querySelectorAll('input').forEach(input => {
        input.disabled = true;
    })

    procesa_respuesta_registro = function(data)
    {
        console.log(data);
        document.getElementById('form-registro').querySelector('button[type="submit"]').disabled = false;
        document.getElementById('form-registro').querySelector('button[type="submit"]').classList.remove('disabled');
        document.getElementById('form-registro').querySelector('button[type="submit"]').innerHTML = 'CONTINUAR';
        document.getElementById('form-registro').querySelectorAll('input').forEach(input => {
            input.disabled = false;
        })
        if(data.aviso == true)
        {
            if(data.user !== undefined)
            {
                $r.cls('user', JSON.stringify(data.user));
                $r.cls('token', data.token);
                mostrarDatosUsuario();
            }
        }
        else
        {
            alert(data.errors[0])
        }
    }
    var _obd = {"url": url_ajax+'user/crear', "metodo": 'POST', "datos": 'h=registro&'+$r.serialize(document.getElementById('form-registro')), "recibe": procesa_respuesta_registro };
    $r.ajax(_obd);  
    delete procesa_respuesta_registro;
}
document.getElementById('form-registro').addEventListener('submit', _envia_registro, false);
delete _envia_registro;

function cambiarVisibilidad(elements){
    if(elements.mostrar !== undefined){
        elements.mostrar.forEach(element => {
            document.querySelectorAll('[data-visibilidad="'+element+'"]').forEach(elementAcual => {
                elementAcual.classList.remove('dinone');
            });
        });
    }
    if(elements.ocultar !== undefined){
        elements.ocultar.forEach(element => {
            document.querySelectorAll('[data-visibilidad="'+element+'"]').forEach(elementAcual => {
                elementAcual.classList.add('dinone');
            })
        });
    }
}

function ocultarElementoEmergente(dataShow){
    document.querySelectorAll('[data-show="'+dataShow+'"]').forEach(element => {
        element.classList.remove('show');
    });
    document.querySelector('.cont-elementos-emergentes').classList.remove('show');
}
function mostrarDatosUsuario(){
    //recorro los data donde se insertan los datos del usuario:
    document.querySelectorAll('[data-user]').forEach(dataUser => {
        //ahora busco los inputs para insertar values
        if(dataUser.querySelectorAll('[data-user-value]').length > 0){
            dataUser.querySelectorAll('[data-user-value]').forEach(inputUser => {
                // ahora busco el valor del input en el objeto del user
                for(key in $r.gls('user')){
                    if(key != undefined){
                        if(key == inputUser.getAttribute('name')){
                            let valor = $r.gls('user')[key] == null ? '' : $r.gls('user')[key];
                            inputUser.setAttribute('value', valor    )
                        }
                    }
                }
            });
        }
        // ahora busco los que solo muestran la info
        if(dataUser.querySelectorAll('[data-user-info]').length > 0){
            dataUser.querySelectorAll('[data-user-info]').forEach(elementInfo =>{
                //ahora comparo si el valor del elemento esta en el obje user
                for(key in $r.gls('user')){
                    if(key != undefined){
                        if(key == elementInfo.getAttribute('data-user-info')){
                            let valor = $r.gls('user')[key] == null ? '' : $r.gls('user')[key];
                            elementInfo.innerHTML = valor;
                        }
                        else if(elementInfo.getAttribute('data-user-info') == 'nombre-apellido'){
                            let nombre = $r.gls('user')['nombre'] == null ? '' : $r.gls('user')['nombre'];
                            let apellido = $r.gls('user')['apellido'] == null ? '' : $r.gls('user')['apellido'];
                            elementInfo.innerHTML = nombre+' '+apellido;
                        }
                    }
                }
            })
        }
        
    });

    ocultarElementoEmergente('iniciar')
    let elements = {'ocultar': ['login-no-activo'], 'mostrar':['login-activo']};
    cambiarVisibilidad(elements);
}

function cerrarSesion(){
    $r.lls();
    //recorro los data donde se insertan los datos del usuario:
    document.querySelectorAll('[data-user]').forEach(dataUser => {
        //ahora busco los inputs para insertar values
        if(dataUser.querySelectorAll('[data-user-value]').length > 0){
            dataUser.querySelectorAll('[data-user-value]').forEach(inputUser => {
                inputUser.setAttribute('value', '');
            });
        }
        // ahora busco los que solo muestran la info
        if(dataUser.querySelectorAll('[data-user-info]').length > 0){
            dataUser.querySelectorAll('[data-user-info]').forEach(elementInfo =>{
                elementInfo.innerHTML = '';
            })
        }
        
    });

    let elements = {'mostrar': ['login-no-activo'], 'ocultar':['login-activo']};
    cambiarVisibilidad(elements);
}

//cotizacion
_envio_coti_combi = function(event)
{
    productoSeleccionado = {};
    document.querySelector('.cont-resul-calc-conti').classList.add('dinone')
    document.getElementById('items-resul-cotizacion').innerHTML= "";
    event.preventDefault();
    document.getElementById('form-envio-coti-combinado').querySelector('button[type="submit"]').disabled = true;
    document.getElementById('form-envio-coti-combinado').querySelector('button[type="submit"]').classList.add('disabled');
    document.getElementById('form-envio-coti-combinado').querySelector('button[type="submit"]').innerHTML = 'Cotizando...';
    document.getElementById('form-envio-coti-combinado').querySelectorAll('input').forEach(input => {
        input.disabled = true;
    })
    // cotizador/cotizar
    let procesa_respuesta_cotizacion = function(data)
    {
        document.getElementById('form-envio-coti-combinado').querySelector('button[type="submit"]').disabled = false;
        document.getElementById('form-envio-coti-combinado').querySelector('button[type="submit"]').classList.remove('disabled');
        document.getElementById('form-envio-coti-combinado').querySelector('button[type="submit"]').innerHTML = 'COTIZAR';
        document.getElementById('form-envio-coti-combinado').querySelectorAll('input').forEach(input => {
            input.disabled = false;
        })
        if(data.hasOwnProperty('producto_combinado')) 
        {
            if(data.producto_combinado.hasOwnProperty('productos_simples')) 
            {
                let cantidad_productos_simples = 0;
                if(data.producto_combinado.productos_simples.length > 0)
                {
                    data.producto_combinado.productos_simples.forEach(producto_simple => 
                    {
                        cantidad_productos_simples = cantidad_productos_simples + producto_simple.cantidad;
                        let div = document.createElement('div');
                            div.classList.add('item-list-res');
                            div.innerHTML = `<p>${producto_simple.titulo}</p>
                                            <p>${producto_simple.cantidad}</p>
                                            <p>$${producto_simple.precio_x_unidad}</p>`;
                        document.getElementById('items-resul-cotizacion').appendChild(div);    
                    });
                    productoSeleccionado = data;
                    document.getElementById('total-cot').innerHTML = data.subtotal;
                    document.getElementById('total-items-cot').innerHTML = cantidad_productos_simples;
                    document.getElementById('btn-add-cart-resul-coti').classList.remove('dinone')
                    document.querySelector('.cont-resul-calc-conti').classList.remove('dinone')
                }
                else{
                    alert('este producto no contiene stock');
                }
            }  
        }
        else {
            alert(data.errors[0])
        }
    }
    var _obd = {"url": url_ajax+'cotizador/cotizar', "metodo": 'POST', "datos": $r.serialize(document.getElementById('form-envio-coti-combinado')), "recibe": procesa_respuesta_cotizacion };
    $r.ajax(_obd);  
    delete procesa_respuesta_cotizacion;
}
document.getElementById('form-envio-coti-combinado').addEventListener('submit', _envio_coti_combi, false);
delete _envio_coti_combi;

//sacar producto de  
function sacarProductoDeCarrito(idElmente)
{
    let carrito = $r.gls('carrito');
    let newCarrito = [];
    if(carrito.length > 0 )
    {
        carrito.forEach(item => {
            if(item.id !== idElmente)
                newCarrito.push(item);
        });
        if(newCarrito.length > 0)
        {
            document.getElementById('cant-items-cart').innerHTML = newCarrito.length;
            document.getElementById('cant-items-cart').classList.remove('dinone');
        }
        else {
            document.getElementById('cant-items-cart').innerHTML = '';
            document.getElementById('cant-items-cart').classList.add('dinone');
        }
        $r.cls('carrito', JSON.stringify(newCarrito));
        mostrarItemsCarrito($r.gls('carrito'));
    }
}

//add carrito
function addCart(producto)
{
    let newCart = [];
    let cart = $r.gls('carrito');

    if(cart.some(item => item.producto_combinado_id === producto.producto_combinado_id))
    {
        if(cart.some(item => item.cantidad === producto.cantidad)) // no cambia nada
        {
            alert('El producto ya se encuentra en el carrito');
            return
        }
        else // cambia alguna variable
        {
            newCart =  cart.map( item => {
                                return item.producto_combinado_id == producto.producto_combinado_id ? producto : item;
                            });
        }
    }
    else {
        newCart = [producto,...cart];
    }
    if(newCart.length > 0)
    {
        document.getElementById('cant-items-cart').innerHTML = newCart.length;
        document.getElementById('cant-items-cart').classList.remove('dinone');
    }
    $r.cls('carrito', JSON.stringify(newCart));
}
document.getElementById('btn-add-cart-resul-coti').addEventListener('click', function(){addCart(productoSeleccionado)}, false);

//maquetar items carrito
function mostrarItemsCarrito(productos)
{
    let total = 0;
    document.getElementById('carrito-detalle').innerHTML = '';
    productos.forEach(item => 
    {
        total = total + item.subtotal
        let elementAccordion = document.createElement('table') 
        
            // elementAccordion.onclick = function(){verContenidoAccordion(this)};
            elementAccordion.classList.add('item-accordion');
            elementAccordion.innerHTML = `<tr class="item-combinado">
                                                <td colspan="2">${item.producto_combinado.titulo} </td>
                                                <td>$${item.monto}</td>
                                                <td class="icon-opciones">
                                                    <div>
                                                        <img class="btn-del" src="./resources/icon-eliminar.svg" alt="" onclick="sacarProductoDeCarrito(${item.id})">
                                                        <img class="btn-show" src="./resources/flecha-derecha.svg" alt="" onclick="verContenidoAccordion(this)">
                                                    </div>
                                                </td>
                                            </tr>`;
        
        let productosSimples = item.producto_combinado.productos_simples;
        let contenedorProductos = document.createElement('div');
            contenedorProductos.classList.add('contenido-accordion');
        let tablaContenidoProductos = document.createElement('table');
            tablaContenidoProductos.classList.add('grupo-items');
            contenedorProductos.appendChild(tablaContenidoProductos);
        productosSimples.forEach(producto => 
        {
            let trElement = document.createElement('tr');
                trElement.classList.add('detalle');
                trElement.innerHTML = `<td>${producto.alias} </td>
                                        <td>Cant.: ${producto.cantidad}</td>
                                        <td colspan="2">Precio: $${producto.precio_x_unidad}</td>`
            
            tablaContenidoProductos.appendChild(trElement);
        });
    
        document.getElementById('carrito-detalle').appendChild(elementAccordion);
        document.getElementById('carrito-detalle').appendChild(contenedorProductos);
        
    });
    document.getElementById('valor_total_carrito').innerHTML = '$'+total.toFixed(2);
    document.getElementById('cont-carrito-detalle').classList.remove('dinone');
}



//pasos carrito
_siguienteCarrito = function()
{
    let carrito = $r.gls('carrito');
    if(carrito.length > 0)
    {
        if($r.vls('user'))
        {
            // tengo que enviar la cotización para generar la orden
            // https://test.api.palermomateriales.com.ar/api/orden?cotizaciones=[{{array_de_id_de_cotizaciones}}]
            let arrayCotizacion = carrito.map(item => item.id);
            
            _enviar_cotizacion = function(data)
            {
                console.log(data);
                document.getElementById('descargar_orden_compra_actual').setAttribute('href', url_public+"uploads/"+data.pdf);
                document.getElementById('cont-carrito-detalle').classList.add('dinone');
                document.getElementById('carrito-pago').classList.remove('dinone');
                document.querySelector('[data-paso="detalle"]').classList.remove('paso-actual')
                document.querySelector('[data-paso="pago"]').classList.add('paso-actual')

            }
            var _obd = {"url": url_ajax+'orden', "metodo": 'POST', "datos": "h=_crea_orden&cotizaciones="+arrayCotizacion, "recibe": _enviar_cotizacion };
            $r.ajax(_obd);  
            delete _enviar_cotizacion;
        }
        else
        {
            document.querySelector('[data-show="iniciar"]').classList.add('show');
            document.querySelector('.cont-elementos-emergentes').classList.add('show');
        }
    }
    else {
        alert('no hay productos en el carrito');
    }
}
document.getElementById('btn-continuar-pasos-carrito').addEventListener('click', _siguienteCarrito, false);
delete _siguienteCarrito;

ver_carrito = function()
{
    if(document.querySelector('[data-seccion="carrito"').classList.contains('show') == false)
    {
        console.log('muestro');
        let carrito = $r.gls('carrito');
        if(carrito.length > 0)
        {
            mostrarItemsCarrito(carrito);
            document.querySelectorAll('[data-seccion]').forEach(seccion => 
            {
                if(seccion.getAttribute('data-seccion') == 'carrito')
                {
                    seccion.classList.add('show');
                }
                else
                {
                    seccion.classList.remove('show');
                }
            });
        }
        else 
        {
            alert('No hay productos en el carrito');
        }
    } else {
        console.log('no muestro');
    }
}
document.querySelector('.cont-icon-cart-noti').addEventListener('click', ver_carrito, false);
delete ver_carrito;