document.querySelector('.hamburger').addEventListener('click', function(){this.classList.toggle('is-active'); document.querySelector('nav').classList.toggle('show')})

_login_registro = function() { document.querySelector('[data-show="'+this.getAttribute('id')+'"]').classList.toggle('show'); }
    document.querySelector('#iniciar').addEventListener('click', _login_registro, false);
    document.querySelector('#registrarme').addEventListener('click', _login_registro, false);
delete _login_registro;

_cerrar_login_registro = function(e){
    if(e.target.classList.contains('cont-login') || e.target.classList.contains('cont-registro'))
        e.target.classList.toggle('show')
}
document.querySelector('.cont-login').addEventListener('click', _cerrar_login_registro, false);
document.querySelector('.cont-registro').addEventListener('click', _cerrar_login_registro, false);
delete _cerrar_login_registro;