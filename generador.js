
/* ==========================================
   TARJETAS
   ========================================== */
let auxiliar=0;
const tarjetas = {

  tarjeta1: {

    banco: "BBVA BANCOMER",

    numero: "4152314298825558",

    titular: "Iveth Carrasco Moreno"

  },


  tarjeta2: {

    banco: "SANTANDER",

    numero: "5579087009265130",

    titular: "Iveth Carrasco Moreno"

  },

};


/* ==========================================
   TARJETA ACTUAL
   ========================================== */

let tarjetaActual = "tarjeta1";


/* ==========================================
   FORMATEAR TARJETA
   ========================================== */

function formatearNumero(numero) {

  return numero
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();

}


/* ==========================================
   CAMBIAR BANCO
   ========================================== */

function cambiarTarjeta() {

  tarjetaActual =
    document.getElementById(
      "selectorTarjeta"
    ).value;


  const tarjeta =
    tarjetas[tarjetaActual];

    
  document.getElementById("banco")
    .textContent =
    tarjeta.banco;


  document.getElementById("titular")
    .textContent =
    tarjeta.titular;


  document.getElementById("numero")
    .textContent =
    formatearNumero(
      tarjeta.numero
    );
    auxiliar = tarjeta.numero;
  /* Actualizar QR */

  generarQR();

}


/* ==========================================
   COPIAR
   ========================================== */

async function copiarDato(
  elemento,
  boton
) {

  const tarjeta =
    tarjetas[tarjetaActual];


  let texto;


  if (elemento === "titular") {

    texto = tarjeta.titular;

  } else {

    texto = tarjeta.numero;

  }


  try {

    await navigator.clipboard
      .writeText(texto);

  }

  catch (error) {

    const textarea =
      document.createElement(
        "textarea"
      );

    textarea.value = texto;

    document.body.appendChild(
      textarea
    );

    textarea.select();

    document.execCommand(
      "copy"
    );

    textarea.remove();

  }


  const botonElemento =
    document.getElementById(
      boton
    );


  /* Animación */

  botonElemento
    .classList
    .add("animando");


  setTimeout(() => {

    botonElemento
      .classList
      .remove("animando");

  }, 600);


  botonElemento
    .classList
    .add("copiado");


  const textoOriginal =
    botonElemento.innerHTML;


  botonElemento.innerHTML =
    "✓ ¡Copiado!";


  document.getElementById(
    "mensaje"
  ).textContent =
    "✓ Copiado al portapapeles";


  setTimeout(() => {

    botonElemento
      .classList
      .remove("copiado");

    botonElemento.innerHTML =
      textoOriginal;

    document.getElementById(
      "mensaje"
    ).textContent = "";

  }, 1800);

}


/* ==========================================
   GENERAR QR
   ========================================== */

function generarQR() {
 
  const paginaActual = auxiliar;
  const qrURL =
    "https://api.qrserver.com/v1/create-qr-code/"
    + "?size=300x300&data="
    + encodeURIComponent(
        paginaActual
      );


  document.getElementById(
    "qrImagen"
  ).src = qrURL;

}


/* ==========================================
   INICIO
   ========================================== */

cambiarTarjeta();