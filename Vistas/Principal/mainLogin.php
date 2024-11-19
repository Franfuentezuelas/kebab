<main class="container my-4">
    <section class="productos text-center">
        <form class="login-form" id="loginForm" action="/login" method="post">
            <h2>Iniciar sesión</h2>

            <!-- Campo de usuario -->
            <div class="input-group" title="El usuario debe tener entre 4 y 15 caracteres, y solo puede contener letras y números.">
                <div class="label">
                    <label for="usuario" >Usuario</label>
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

            <!-- Botón de login -->
            <button type="button" class="btn-login" id="enviar">Iniciar sesión</button>

            <!-- Enlace de registro -->
            <div class="register-link">
                <p>No tienes cuenta? <a href="registro">Regístrate</a></p>
                <p class="mensaje" id="errorlogin"></p> <!-- Mensaje de error -->
            </div>
        </form>
    </section>
</main>

