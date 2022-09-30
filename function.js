/*
3.1. La primera vez que se ingrese a la página web, el “Formulario para solicitar Vianda” debe estar oculto y solo se debe mostrar la sección de la tabla “Mis pedidos de Viandas”.
*/

const formularioWrapper = document.getElementById('formularioWrapper');
formularioWrapper.style.display = 'none';

/*
3.2. La tabla se debe construir dinámicamente en base a los datos de una variable de tipo array, la cual debe contener objetos del tipo “vianda” con todos sus atributos.
*/

class Vianda{
    constructor(frecuencia, tipoMenu, items, fechaInicio, cantidad, estado, accion)
    {
        this.frecuencia = frecuencia;
        this.tipoMenu = tipoMenu;
        this.items = items;
        this.fechaInicio = fechaInicio;
        this.cantidad = cantidad;
        this.estado = estado;
        this.accion = accion;
    }
}
let vianda1 = new Vianda("Mensual", "Normal", "Entrada - Plato Principal - Postre", new Date(2022,10,1),2,"Confirmada","Cancelar subscripción");
let vianda2 = new Vianda("Quincenal", "Vegetariano", "Entrada - Plato Principal", new Date(2022,10,15),1,"Pendiente","Eliminar");

const listaVianda = [];
listaVianda.push(vianda1);
listaVianda.push(vianda2);



const tablaViandas = document.getElementById("listaViandas");
tablaViandas.innerHTML = "";

const trTitulos = document.createElement("tr");
trTitulos.innerHTML = `
                    <tr>
                      <th scope="row">Frecuencia</th>
                      <th scope="row">Tipo menu</th>
                      <th scope="row">Items incluidos</th>
                      <th scope="row">Fecha inicio</th>
                      <th scope="row">Cantidad</th>
                      <th scope="row">Estado</th>
                      <th scope="row">Acciones</th>
                    </tr>
                    `;
tablaViandas.appendChild(trTitulos);
for (let i = 0; i < listaVianda.length; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = 
    `
        <td>${listaVianda[i].frecuencia}</td>
        <td>${listaVianda[i].tipoMenu}</td>
        <td>${listaVianda[i].items}</td>
        <td>${listaVianda[i].fechaInicio.toISOString().substring(0,10)}</td>
        <td>${listaVianda[i].cantidad}</td>
        <td>${listaVianda[i].estado}</td>
        <td>
            <div class="text-center">
                <button class="btn btn-lg btn-outline-dark botonEliminar">${listaVianda[i].accion}</button>
         </div>
        </td>
    `;
    tablaViandas.appendChild(tr);    
}

/*
3.3. Cuando el usuario haga un click en el botón “Nueva Vianda”, se debe mostrar el “Formulario para solicitar Vianda”.
*/

const botonNuevaVianda = document.getElementById('botonNuevaVianda');
function mostrarFormulario()
{
    formularioWrapper.style.display = 'block';
    botonNuevaVianda.setAttribute('disabled',"");
}

botonNuevaVianda.addEventListener('click', mostrarFormulario);


/*
3.4. Una vez que el usuario ingrese los datos en el formulario y haga un click en el botón “Solicitar Viandas”, se debe realizar lo siguiente:
*/
const formulario = document.getElementById("contactForm");
const botonSubmit = document.getElementById("submitButton");

const textoError = document.getElementById("textoError");
textoError.style.visibility = "hidden";

let check1 = false;
let check2 = false;
let check3 = false;

// 3.4.1. Controlar que en el campo “Items a incluir”, al menos una opción esté seleccionada.

function revisarCheckbox(event)
{
    let form_data = new FormData(formulario);
    
    if(!form_data.has("itemsAIncluir"))
    {
        event.preventDefault();
        textoError.style.visibility = "visible";
        check1 = false;
    }
    else{
        textoError.style.visibility = "hidden";
        check1 = true;
    }
    
}
botonSubmit.addEventListener("click", revisarCheckbox);


// 3.4.2. Controlar que la “Fecha Inicio” sea por lo menos 5 días posterior a la fecha actual.
const fechaAuxiliar = new Date();
fechaAuxiliar.setDate(fechaAuxiliar.getDate() + 5);

const inputFechaIngresada = document.getElementById("fechaInicio");
function revisarFechaIngresada(event)
{
    const fechaIngresada = new Date(inputFechaIngresada.value);
    if (fechaAuxiliar.getTime() > fechaIngresada.getTime())
    {
        event.preventDefault();
        textoError.style.visibility = "visible";
        check2 = false;
    }
    else
    {
        textoError.style.visibility = "hidden";
        check2 = true;
    }
}


botonSubmit.addEventListener("click", revisarFechaIngresada);
// 3.4.3. Controlar que la “Cantidad” de viandas sea mayor o igual a 1.
const inputCantidad = document.getElementById("cantidad");

function controlarCantidad(event)
{
    if (inputCantidad.value < 1)
    {
        event.preventDefault();
        textoError.style.visibility = "visible";
        check3 = false;
    }
    else
    {
        textoError.style.visibility = "hidden";
        check3 = true;
    }
}
botonSubmit.addEventListener("click", controlarCantidad);

// 3.4.4. Si alguna de las condiciones anteriores no se cumple, mostrar un mensaje de error al inicio del formulario.
// Realizado en los incisos anteriores

// 3.4.5. Si todos los datos son correctos, agregar los mismos al array global, con lo cual se deben actualizar los datos de la tabla para que se muestre el registro que se acaba de agregar. Tener en cuenta que, para los nuevos registros de pedidos de viandas, el estado debe ser “Pendiente” y tener asociado un botón “Eliminar”.

const selectFrecuencia = document.getElementById("frecuencia");

const radioTipoMenuNormal = document.getElementById("normal");
const radioTipoMenuDiabetico = document.getElementById("diabetico");
const radioTipoMenuVegetariano =  document.getElementById("vegetariano");

const checkBoxEntrada = document.getElementById("entrada");
const checkBoxPlatoPrincipal = document.getElementById("platoPrincipal");
const checkBoxPostre = document.getElementById("postre");

const inputFechaInicio = document.getElementById("fechaInicio");

const inputCantidadVianda = document.getElementById("cantidad");

function agregarVianda()
{
    if ((check1) && (check2) && (check3))
    {
        let frecuencia = selectFrecuencia.options[selectFrecuencia.selectedIndex].value;

        let tipoMenu;
        if (radioTipoMenuNormal.checked)
        {
            tipoMenu = "Normal";
        }
        else if (radioTipoMenuDiabetico.checked)
        {
            tipoMenu = "Diabetico";
        }
        else
        {
            tipoMenu = "Vegetariano";
        }

        let items = "";
        if (checkBoxEntrada.checked)
        {
            items = "Entrada"
        }
        if (checkBoxPlatoPrincipal.checked && items != "")
        {
            items = items + " - Plato principal";
        }
        else
        {
            items = "Plato principal"
        }
        if (checkBoxPostre.checked && items != "")
        {
            items = items + " - Postre";
        }
        else
        {
            items = "Postre"
        }

        let fechaInicio = new Date(inputFechaInicio.value);

        let cantidad = inputCantidadVianda.value;

        const nuevaVianda = new Vianda(frecuencia, tipoMenu, items, fechaInicio, cantidad, "Pendiente", "Eliminar");

        const nuevoTr = document.createElement("tr");
        nuevoTr.innerHTML = 
        `
            <td>${nuevaVianda.frecuencia}</td>
            <td>${nuevaVianda.tipoMenu}</td>
            <td>${nuevaVianda.items}</td>
            <td>${nuevaVianda.fechaInicio.toISOString().substring(0,10)}</td>
            <td>${nuevaVianda.cantidad}</td>
            <td>${nuevaVianda.estado}</td>
            <td>
                <div class="text-center">
                    <button class="btn btn-lg btn-outline-dark">${nuevaVianda.accion}</button>
            </div>
            </td>
        `;
        tablaViandas.appendChild(nuevoTr);
        // 3.4.6. Ocultar el formulario de solicitud de viandas.
        formularioWrapper.style.display = 'none';
        botonNuevaVianda.removeAttribute("disabled");
    }
}
botonSubmit.addEventListener("click", agregarVianda);

/*   
3.5. Cuando el usuario haga un click en el botón “Eliminar”, se debe mostrar una ventana de alerta para preguntar al usuario si desea Eliminar el registro. Si el usuario acepta, se debe eliminar el registro de la tabla (y de la variable array global).
*/

const botonEliminar = document.getElementsByClassName("botonEliminar");

for(let i = 0; i < botonEliminar.length; i++) { 

    botonEliminar[i].addEventListener('click', function()
    {
        if (confirm('Esta seguro que desea eliminar esta vianda?')) {
            this.parentElement.parentElement.parentElement.remove()
          } else {
            // Do nothing!
            console.log('La vianda no ha sido borrada');
        }
    });
}