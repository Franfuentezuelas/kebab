<!-- Main Content -->
<main class="container my-4">
        <div class="producto-container">
            <div class="producto-box">
                <div class="row">
                    
                    <!-- Columna 1: Imagen y descripción -->
                    <div class="column" id="columna1">
                        <h4>FOTO</h4>
                        <img src="" alt="Kebab" id="imagen">
                        <h4>NOMBRE</h4>
                        <textarea id="nombre" placeholder="Nombre del Kebab" rows="2" cols="27"></textarea>
                        <h4>DESCRIPCIÓN</h4>
                        <textarea id="descripcion" placeholder="Descripción del Kebab" rows="5" cols="27"></textarea>


                    </div>

                    <!-- Columna 2: Ingredientes -->
                    <div class="column" id="columna2">
                        <h4>Ingredientes</h4>
                        <div class="items" id="ingredientes">

                        </div>
                    </div>

                    <!-- Columna 3: Personalización -->
                    <div class="column" id="columna3">
                        <h4>Personalizar</h4>
                        <div class="items" id="personalizar">
         
                        </div>
                    </div>
                </div>

                <!-- Bloque inferior con precio, alergenos y botones -->
                <div class="bottom-section" id="botones">
                    <!-- Precio -->
                    <div class="price">
                        <div>
                        <h5>Precio</h5>
                        <strong><p id="precioreal"><input type="text" maxlength="5" size="7" id="precioEmpresa"><spam>€</spam></p></strong>
                        </div>
                        <div>
                        <h5>Precio Al Gusto</h5> 
                        <strong><p id="precio">Precio: $9.99</p></strong>
                        </div>
                    </div>

                    <!-- Alergenos -->
                    <div class="alergenos">
                        <h5>Alergenos</h5>
                        <div id="alergenos">
                        </div>
                        
                    </div>

                    <!-- Botones -->
                    <div class="actions">
                        <!-- <button class="btn btn-secondary">Volver</button> -->
                        <button class="btn btn-primary" id="guardar">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>