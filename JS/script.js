//EndPoint de Integrantes - API
const API_URL = "https://retoolapi.dev/PVcvco/Integrantes";


//Funcion que manda a traer el JSON con GET
async function ObtenerIntegrates(){

    //Respuesta del servidor 
    const respuesta = await fetch(API_URL);

    //Pasamos a JSON la respuesta del servidor
    const data = await respuesta.json(); //Esto es un JSON

    //Eviamos el JSON a la funcion que genera las filas en la tabla
    MostrarDatos(data);
}

//Funcion para crear las filas de las tablas en base a un JSON
//"datos" representara al JSON donde viene la informacion
function MostrarDatos(datos){

    //Se llama a la tabla con el "id" y luego al tbody
    const tabla = document.querySelector("#Tabla tbody");

    //Para inyectar codigo HTML usamos una propiedad "innerHTML"
    tabla.innerHTML = "" //Vaciamos el contenido de la tabla 

    datos.forEach(Integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${Integrante.id}</td>
                <td>${Integrante.Nombre}</td>
                <td>${Integrante.Apellido}</td>     
                <td>${Integrante.Correo}</td>       
                <td>    
                    <button>Editar</button>    
                    <button>Eliminar</button>   
                </td>
            </tr>
        `;
    } );
}

ObtenerIntegrates();




//Procesos para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para agregar registro
const btnCerrar = document.getElementById("btnCerrar"); //Boton paraa cerrar el popup

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir el modal al hcer click boton
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar el modal al hacer click
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa a "submit". Evita que el formulario se envíe de un solo.

    //Capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getAnimations("txtApellido").value.trim();
    const Correo = document.getElementById("txtCorreo").value.trim();

    //Validacion basica
    if(!Nombre || !Apellido || !Correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST"
    });


});

