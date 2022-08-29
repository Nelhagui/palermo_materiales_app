<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Palermo Materiales</title>
        <link rel="stylesheet" href="css/root.css">
        <link rel="stylesheet" href="css/style.css">
        <style>
             
        </style>
    </head>
    <body>
        <header>
            <div class="hamburger" id="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </header>
        <nav>
            <div>
                <img src="" alt="">
                <h1>Inicia Sesión</h1>
                <p>Inicia sesión para comenzar a comprar</p>
                
                <button data-accion='iniciar'>Iniciar sesión</button>
                <button data-accion="registrarme">Registrame</button>
            </div>
            <ul>
                <li class="item-menu">
                    <a href="#home" data-link>
                        <div>
                            <img src="" alt="">
                            Home
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#perfil" data-link>
                        <div>
                            <img src="" alt="">
                            Perfil
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#productos" data-link>
                        <div>
                            <img src="" alt="">
                            Productos
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#cotizar" data-link>
                        <div>
                            <img src="" alt="">
                            Cotizar
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#informacion" data-link>
                        <div>
                            <img src="" alt="">
                            Información
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#terminos" data-link>
                        <div>
                            <img src="" alt="">
                            Terminos y condiciones
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#cerrar-sesion" data-link>
                        <div>
                            <img src="" alt="">
                            Cerrar sesión
                        </div>
                        <span>></span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="cont-login-registro">
            <div class="cont-login" data-show="iniciar">
                <div class="login">
                    <form action="">
                        <h1>Iniciar Sesión</h1>
                        <p>Ingresa a tu cuenta para continuar</p>
                        <div>
                            <label for="">Ingresa tu email</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">Ingresa la contraseña</label>
                            <input type="password">
                        </div>
                        <button>INGRESAR</button>
                        <a href="">Olvide la contraseña</a>
                    </form>
                    <p>¿No posees cuenta de usuario? Registrate ahora</p>
                    <button data-accion='registrarme'>REGISTRARME</button>
                </div>
            </div>
            <div class="cont-registro" data-show="registrarme">
                <div class="registro">
                    <form action="">
                        <h1>Registrame</h1>
                        <p>Registrate para continuar</p>
                        <div>
                            <label for="">Ingresa tu nombre y apellido</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">Ingresa tu telefono/celular</label>
                            <input type="number">
                        </div>
                        <div>
                            <label for="">Ingresa tu email</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">Ingresa la contraseña</label>
                            <input type="password">
                        </div>
                        <div>
                            <label for="">Ingresa nuevamente la contraseña</label>
                            <input type="password">
                        </div>
                        <button>CONTINUAR</button>
                        <a href="">Olvide la contraseña</a>
                    </form>
                    <p>¿Ya tenes una cuenta de usuario? Ingresa ahora</p>
                    <button data-accion='iniciar'>INICIAR SESION</button>
                </div>
            </div>
        </div>
        <main>
            
        </main>
        <script src="js/app.js"></script>
    </body>
</html>