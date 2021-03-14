//info.js

//runs when page is loaded
window.addEventListener("DOMContentLoaded", () => {
  let infoModal = document.getElementById("info-modal");
  let infoBtn = document.getElementById("info-btn");
  let infoSpan = document.getElementById("info-span");

  infoBtn.onclick = function () {
    infoModal.style.display = "block";
  };

  infoSpan.onclick = function () {
    infoModal.style.display = "none";
  };

  window.addEventListener("click", function (event) {
    if (event.target == infoModal) {
      infoModal.style.display = "none";
    }
  });

  const englishRadioBut = document.getElementById("english");
  const SpanishRadioBut = document.getElementById("spanish");

  SpanishRadioBut.addEventListener("input", ChangeToSpanish);
  englishRadioBut.addEventListener("input", ChangeToEnglish);
});
function ChangeToEnglish() {
  let unorderedLi = document.getElementById("language-option");
  while (unorderedLi.firstChild) {
    unorderedLi.removeChild(unorderedLi.firstChild);
  }
  let arr = [
    "Click the Settings button in the top right corner and configure your settings.",
    "Add tasks to the task list to the right. You can click Delete if you added a task by mistake.",
    "Select the task you want and click Start to start the timer.",
    "After you have completed a session you can click Complete to complete the selected task and Undo if you clicked Complete by mistake.",
    "You can click the Pomodoro Log button on the left to view a log of completed sessions and statistics.",
  ];
  for (let i = 0; i < arr.length; i++) {
    let tag = document.createElement("li");
    tag.innerText = arr[i];
    unorderedLi.appendChild(tag);
  }
}

function ChangeToSpanish() {
  let unorderedLi = document.getElementById("language-option");
  while (unorderedLi.firstChild) {
    unorderedLi.removeChild(unorderedLi.firstChild);
  }
  let arr = [
    "CHaga clic en el botón Configuración en la esquina superior derecha y configure sus ajustes.",
    "Agregue tareas a la lista de tareas de la derecha. Puede hacer clic en Eliminar si agregó una tarea por error.",
    "Seleccione la tarea que desee y haga clic en Iniciar para iniciar el temporizador.",
    "Una vez que haya completado una sesión, puede hacer clic en Completar para completar la tarea seleccionada y Deshacer si hizo clic en Completar por error.",
    "Puede hacer clic en el botón Registro Pomodoro a la izquierda para ver un registro de las sesiones completadas y las estadísticas.",
  ];
  for (let i = 0; i < arr.length; i++) {
    let tag = document.createElement("li");
    tag.innerText = arr[i];
    unorderedLi.appendChild(tag);
  }
}

export {ChangeToEnglish, ChangeToSpanish};