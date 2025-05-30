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