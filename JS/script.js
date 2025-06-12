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
                    <button onclick = "AbrirModalEditar('${Integrante.id}','${Integrante.Nombre}','${Integrante.Apellido}','${Integrante.Correo}' )">Editar</button>    
                    <button onclick = "EliminarPersona(${Integrante.id})">Eliminar</button>   
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
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();

    //Validacion basica
    if(!Nombre || !Apellido || !Correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", //Tipo de solicitud
        headers: {'Content-Type':'application/json'}, //Tipo de dato enviado
        body: JSON.stringify({Correo, Nombre, Apellido}) //Datos enviados
    });

    //Verificar si la API responde que los datos fueron enviados correctamente 
    if(respuesta.ok){
        alert("El registro fue enviado correctamamente");

        //Limpiamos el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        ObtenerIntegrates();
    }
    else 
    {
        //En caso de que la API devuelva un codigo diferente a 200-299
        alert("El registro no pudo ser agregado")
    }
});

//Fucion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro");

    //Validamos si el Usuario si escogio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method : "DELETE"
        });

        //Recargar la tabla despues de eliminar
        ObtenerIntegrates();
    }
}

/* Procesos para editar un registro */
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerramos el modal
})

function AbrirModalEditar(id, Nombre, Apellido, Correo){
    //Se agregan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = Nombre;
    document.getElementById("txtApellidoEditar").value = Apellido;
    document.getElementById("txtCorreoEditar").value = Correo;

    //Abrimo el modal despues de pasar
    modalEditar.showModal();
}

// Cuando programamos con formularios vamos a trabajar el formulario completo

document.getElementById("frmEditar").addEventListener("submit", async e =>{
    e.preventDefault(); //Evita que el formulario se envie

    //Capturamos los valores de los input 
    const id = document.getElementById("txtIdEditar").value;
    const Nombre = document.getElementById("txtNombreEditar").value.trim();
    const Apellido = document.getElementById("txtApellidoEditar").value.trim();
    const Correo = document.getElementById("txtCorreoEditar").value.trim();

    //Validaciones de las constantes
    if(!id || !Nombre || !Apellido || !Correo){
        alert("Complete los campos vacios");
        return; //Evita que el campo se siga ejecutando
    }

    //Llamada a la API
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({Correo, Nombre, Apellido})
    });

    if(respuesta.ok){
        alert("El registro fue actualizado con exito"); //Confirmacion
        modalEditar.close(); //Cerramos el modal
        ObtenerIntegrates();
    }
    else{
        alert("El registro no pudo se actualizado correctamente");
    }
});