<main class="container my-4">
    <section class="productos text-center">
        <form class="login-form" id="registroForm" action="/registrarse" method="post">
            <h2>Registrarse</h2>

            <!-- Campo de nombre -->
            <div class="input-group" title="Nombre del usuario">
                <div class="label">
                    <label for="nombre" >Nombre</label>
                    <span class="error" id="errornombre"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="nombre" name="nombre" placeholder="Antonio">
                </div>
            </div>

            <!-- Campo de apellidos -->
            <div class="input-group" title="Apellidos del usuario">
                <div class="label">
                    <label for="apellidos" >Apellidos</label>
                    <span class="error" id="errorapellidos"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="apellidos" name="apellidos" placeholder="El Mago">
                </div>
            </div>
            <!-- Campo de telefono -->
            <div class="input-group" title="telefono">
                <div class="label">
                    <label for="telefono" >Telefono</label>
                    <span class="error" id="errortelefono"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="telefono" name="telefono" placeholder="654321987">
                </div>
            </div>

            <!-- Campo de correo -->
            <div class="input-group" title="Email">
                <div class="label">
                    <label for="email" >Email</label>
                    <span class="error" id="erroremail"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="email" name="email" placeholder="ejemplo@ejemplo.com">
                </div>
            </div>

            <!-- Campo de usuario -->
            <div class="input-group" title="El usuario debe tener entre 4 y 15 caracteres, y solo puede contener letras y números.">
                <div class="label">
                    <label for="username" >Usuario</label>
                    <span class="error" id="errorusuario"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="usuario" name="usuario" placeholder="AntonioMagic">
                </div>
            </div>

            <!-- Campo de contraseña -->
            <div class="input-group" title="La contraseña debe tener al menos 8 caracteres, con una letra mayúscula, una minúscula y un número.">
                <div class="label">
                    <label for="password" >Contraseña</label>
                    <span class="error" id="errorpassword"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="password" id="password" name="password" placeholder="Contraseña123@">
                    <!-- Icono de ojo para mostrar/ocultar la contraseña -->
                    <span id="togglePassword" class="eye-icon" title="Mostrar contraseña">
                        <i class="fa fa-eye"></i> <!-- Icono de FontAwesome -->
                    </span>
                </div>
            </div>

            <!-- Campo de via -->
            <div class="input-group" title="Via">
                <div class="label">
                    <label for="direccion" >Direccion</label>
                    <span class="error" id="errordireccion"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="direccion" name="direccion" placeholder="calle ejemplo">
                </div>
            </div>
            <!-- Campo de numero -->
            <div class="input-group" title="numero de la calle">
                <div class="label">
                    <label for="resto" >Resto de la direccion</label>
                    <span class="error" id="errornumero"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="numero" name="numero" placeholder="123">
                </div>
            </div>
            <!-- Campo de resto -->
            <div class="input-group" title="Resto de la direccion">
                <div class="label">
                    <label for="resto" >Resto de la direccion</label>
                    <span class="error" id="errorresto"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="resto" name="resto" placeholder="Bloque, Portal, Escalera, Piso, Puerta">
                </div>
            </div>
            <!-- Campo de provincia -->
            <div class="input-group" title="Provincia">
                <div class="label">
                    <label for="provincia" >Provincia</label>
                    <span class="error" id="errorprovincia"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <select name="provincia" id="provincia">
                        <option value="Seleccione una provincia">Seleccione una provincia</option>  
                        <!-- <option value="provincia2">Provincia2</option>  
                        <option value="provincia3">Provincia3</option> -->
                    </select>
                </div>
            </div>

            <!-- Campo de localidad -->
            <div class="input-group" title="Localidad">
                <div class="label">
                    <label for="localidad" >Localidad</label>
                    <span class="error" id="errorlocalidad"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <select name="localidad" id="localidad" disabled>
                        <option value="Seleccione una localidad">Seleccione una localidad</option>  
                        <!-- <option value="localidad2">localidad2</option>
                        <option value="localidad3">localidad3</option> -->
                    </select>
                </div>
            </div>
            <!-- Campo de codigo postal -->
            <div class="input-group" title="Codigo postal">
                <div class="label">
                    <label for="codigopostal" >Codigo postal</label>
                    <span class="error" id="errorcodigopostal"> </span> <!-- Mensaje de error -->
                </div>
                <div class="login">
                    <input type="text" id="codigopostal" name="codigopostal" placeholder="23000">
                </div>
            </div>
            
            <!-- Botón de login -->
            <button type="button" class="btn-login" id="enviar">Registrarse</button>

            <!-- Enlace de registro -->
            <div class="register-link">
                <p id="redirect"><a href="login">Logeate</a> <span id="registrado"></span></p>
                <p class="mensaje" id="errorlogin"></p> <!-- Mensaje de error -->
                
            </div>
        </form>
    </section>
</main>