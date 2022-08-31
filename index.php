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
                    <a href="#home" data-link="home">
                        <div>
                            <img src="" alt="">
                            Home
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#perfil" data-link="perfil">
                        <div>
                            <img src="" alt="">
                            Perfil
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#productos" data-link="productos">
                        <div>
                            <img src="" alt="">
                            Productos
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#cotizar" data-link="cotizar">
                        <div>
                            <img src="" alt="">
                            Cotizar
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#informacion" data-link="informacion">
                        <div>
                            <img src="" alt="">
                            Información
                        </div>
                        <span>></span>
                    </a>
                </li>
                <li class="item-menu">
                    <a href="#terminos" data-link="terminos">
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
            <div data-seccion="home" class="seccion">
                <div class="banner">
                    <img src="" alt="">
                </div>
                <div class="op-seccion">
                    <form action="" method="post" id="form-buscar-prod">
                        <input type="text" value="" name="buscar" id="buscar-item">
                    </form>
                    <button>COTIZADOR ONLINE</button>
                </div>
                <div class="btn-categorias">
                    <p>Productos más buscados</p>
                    <div>
                        <button>TECHO</button>
                        <button>PARED</button>
                        <button>TERMINACION</button>
                        <button>IMPERMEABILIDAD</button>
                    </div>
                </div>
                <div>
                    <section class="lista-items" id="lista-items">
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                        <div class="item">
                            <div class="img-item"><img src="" alt="">img</div>
                            <div class="info-item">
                                <div class="categoria-item">Techo / Construcción húmeda</div>
                                <div class="valor-item">$956</div>
                                <div class="descripcion-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, rem explicabo magni praesentium delectus cupiditate vitae</div>
                            </div>
                            <div class="btn-item"><img src="" alt="">img</div>
                        </div>
                    </section>
                </div>

                
            </div>
            <div data-seccion="perfil" class="seccion">
                <h1>perfil</h1>
            </div>
            <div data-seccion="productos" class="seccion">
                <h1>productos</h1>
            </div>
            <div data-seccion="cotizar" class="seccion">
                <h1>cotizar</h1>
            </div>
            <div data-seccion="informacion" class="seccion">
                <h1>informacion</h1>
            </div>
            <div data-seccion="terminos" class="seccion">
                <h1>terminos</h1>
            </div>
        </main>
        <script src="js/app.js"></script>
    </body>
</html>