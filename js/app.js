document.querySelector('.hamburger').addEventListener('click', function(){this.classList.toggle('is-active'); document.querySelector('nav').classList.toggle('show')})

document.querySelectorAll('a[data-link]').forEach(element => {

    element.onclick = function(){document.querySelector('.hamburger').classList.toggle('is-active'); document.querySelector('nav').classList.toggle('show')};   
    
});

_cerrar_login_registro = function(e){
    if(e.target.classList.contains('cont-login') || e.target.classList.contains('cont-registro'))
    {
        e.target.classList.toggle('show')
        document.querySelector('.cont-login-registro').classList.toggle('show')
    }
}
document.querySelector('.cont-login').addEventListener('click', _cerrar_login_registro, false);
document.querySelector('.cont-registro').addEventListener('click', _cerrar_login_registro, false);
delete _cerrar_login_registro;

_login_registro = function(){
    document.querySelectorAll('[data-show]').forEach(element => { element.classList.remove('show'); });
    document.querySelector('[data-show="'+this.dataset.accion+'"]').classList.toggle('show');
    document.querySelector('.cont-login-registro').classList.add('show')
}
document.querySelectorAll('[data-accion]').forEach(element => {
    element.onclick = _login_registro;
});
delete _login_registro;