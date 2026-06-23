import { data as casesFPQRS } from "../../data/index.js";

$(window).on("load", function(){

  const tbodyCases = document.querySelector("#tbodyCases");

  const tabsFpqrsDetails = document.querySelectorAll("[data-tab]");
  const tabContents = document.querySelectorAll("#contentTab > div");
  const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validatePass = /^.{7,}$/;

  function styleType(value){
    switch(value){
      case "Reclamo": {
        return "text-danger fw-semibold bg-danger p-1 rounded-2 bg-opacity-10"
      }
      case "Queja" :{
        return "text-warning fw-semibold bg-warning p-1 rounded-2 bg-opacity-10"
      }
      case "Petición": {
        return "text-primary fw-semibold bg-primary p-1 rounded-2 bg-opacity-10"
      }
      case "Felicitación": {
        return "text-success fw-semibold bg-success p-1 rounded-2 bg-opacity-10"
      }
    }
  }

  function stylePriority(value){
    //text-success fw-semibold bg-success p-1 rounded-2 bg-opacity-10
    switch(value){
      case "Baja": {
        return "text-success fw-semibold bg-success p-1 rounded-2 bg-opacity-10"
      }
      case "Crítica" :{
        return "text-danger fw-semibold bg-danger p-1 rounded-2 bg-opacity-10"
      }
      case "Normal": {
        return "text-primary fw-semibold bg-primary p-1 rounded-2 bg-opacity-10"
      }
      case "Alta": {
        return "text-warning fw-semibold bg-warning p-1 rounded-2 bg-opacity-10"
      }
    }
  }

  function styleStatus(value){
    console.log(value);
    
    switch(value){
      case "Cerrado": {
        return "badge my-badged"
      }
      case "Respondido": {
        return "text-small2 text-success fw-semibold bg-success p-1 rounded-2 bg-opacity-10"
      }
      case "En Gestión": {
        return "text-small2 text-warning fw-semibold bg-warning p-1 rounded-2 bg-opacity-10"
      }
      case "Radicado": {
        return "text-small2 text-primary fw-semibold bg-primary p-1 rounded-2 bg-opacity-10"
      }
      case "Pendiente de Información": {
        return "text-small2 fw-semibold bg-gestion p-1 rounded-2 bg-opacity-10"
      }
      case "Asignado": {
        return "text-small2 fw-semibold bg-asignado p-1 rounded-2 bg-opacity-10"
      }
    }
  }

  function filterDate(valueDate){
    const date1 = new Date(valueDate);

    if(date1 > new Date("01/09/2024")){
      return "text-danger"
    }
    
    return "cl-card-text"
  }

  function styleSemaforo(value){
    //badge d-inline-flex align-items-center gap-1 my-badged
    switch(value){
      case "En tiempo":{
        return "text-small2 text-success fw-semibold bg-success p-1 rounded-2 bg-opacity-10"
      }
      case "Próximo a vencer": {
        return "text-small2 fw-semibold bg-gestion p-1 rounded-2 bg-opacity-10"
      }
      case "Vencido": {
        return "text-small2 text-danger fw-semibold bg-danger p-1 rounded-2 bg-opacity-10"
      }
      case "Cerrado": {
        return "badge d-inline-flex align-items-center gap-1 my-badged"
      }
    }
  }

  

  $("#btnMenuAction").on("click", () => {
    $(".hide-nav-child").toggle({
      "visibility": "hidden",
      "display": "none"
    })
  })

  tabsFpqrsDetails.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const select = e.currentTarget.dataset.tab;

      tabContents.forEach(content => content.classList.add("d-none"));
      document.querySelector(`#${select}`).classList.remove("d-none");

      tabsFpqrsDetails.forEach(t => t.classList.remove("btn-tab-active"));
      e.currentTarget.classList.add("btn-tab-active");
    });
  });
  
  if (tbodyCases !== null) {
    const nuevoCasoLocal = JSON.parse(localStorage.getItem("dataCaso"));

    if (nuevoCasoLocal) {
      casesFPQRS.unshift(nuevoCasoLocal);
    }

    casesFPQRS.slice(0, 99).map(casePqrs => {
      tbodyCases.innerHTML += `
        <tr>
          <td class="fw-medium text-nowrap text-small clr-primary">${casePqrs.id}</td>
          <td class="text-nowrap text-small cl-card-text">${casePqrs.date}</td>
          <td class="text-nowrap text-small2"><span class="${styleType(casePqrs.type)}">${casePqrs.type}</span></td>
          <td class="text-nowrap text-small">${casePqrs.category}</td>
          <td class="text-small text-break"><span>${casePqrs.subcategory}</span></td>
          <td class="text-nowrap text-small text-truncate cl-card-text" style="max-width:140px">${casePqrs.description}</td>
          <td class="text-nowrap text-small text-truncate" style="max-width:140px">${casePqrs.client}</td>
          <td class="text-nowrap text-small text-truncate cl-card-text" style="max-width:140px">${casePqrs.assignedTo}</td>
          <td class="text-nowrap text-small2"><span class="${stylePriority(casePqrs.priority)}">${casePqrs.priority}</span></td>
          <td class="text-nowrap text-small"><span class="${styleStatus(casePqrs.status)}">${casePqrs.status}</span></td>
          <td class="text-nowrap text-small ${filterDate(casePqrs.dueDate)}">${casePqrs.dueDate}</td>
          <td class="text-nowrap text-small">
            <span class="${styleSemaforo(casePqrs.slaStatus)}">
              <span class="rounded-circle bg-secondary d-inline-block" style="width:8px;height:8px"></span>
              ${casePqrs.slaStatus}
            </span>
          </td>
          <td>
            <button class="border-0 bg-transparent text-body-secondary text-opacity-10"><i class="bi bi-eye"></i></button>
          </td>
        </tr>
      `;
    });
  }

  $("[data-card-role='button']").on("click", function(){
    const container = $(this).closest("[data-card-container]");

    container.find("[data-card-role='content']").toggleClass("d-none");
    container.find(".footerCard").toggleClass("d-none")
    $(this).find('i').toggleClass("bi-chevron-up");
  })

  $("#btnChangeState").on("click", function() {
    $("#contentState").toggleClass("d-none")
  });

  $("[data-user-type]").on("click", function(){
    const user = $(this).closest("[data-user]")
    let userInfo = {email: "", paswword: ""}
    console.log(user.prevObject[0].dataset.userType);
    
    switch(user.prevObject[0].dataset.userType){
      case "admin": 
        userInfo.email = "admin@coopfinanzas.com.co";
        userInfo.password = "Admin@2026!";
      break;
      case "user1": 
        userInfo.email = "operador@coopfinanzas.com.co";
        userInfo.password = "Oper@2026!";
      break;
      case "user2": 
        userInfo.email = "supervisor@coopfinanzas.com.co";
        userInfo.password = "Super@2026!";
      break;
    }
    $("#email").val(userInfo.email);
    $("#password").val(userInfo.password);
  });

  $("#btnInputPass").on("click", function(e){
    e.preventDefault();

    const pass = $("#password");

    const type = pass.attr("type") == "password" ? "text" : "password";

    $("#password").attr("type", type);
    $(this).find("i").toggleClass("bi-eye bi-eye-slash");
  });

  $("[name='formLogin']").on("submit", function(e){
    e.preventDefault()
    $(".error-email, .error-pass").remove();
    $("#email, #password").removeClass("border-danger");

    const email = $("#email");
    if (email.val().trim() === "" || !validateEmail.test(email.val())) {
      email.addClass("border-danger");
      email.after("<p class='text-danger text-small mb-0 mt-1 error-email'>El correo electrónico no es válido u obligatorio</p>");
      return false;
    }

    const password = $("#password");
    if (password.val().trim() === "") {
      password.addClass("border-danger");
      password.parent().after("<p class='text-danger text-small mb-0 mt-1 error-pass'>La contraseña es obligatoria</p>");
      return false;
    }
    if(!validatePass.test( $("#password").val() )){
      password.addClass("border-danger");
      password.parent().after("<p class='text-danger text-small mb-0 mt-1 error-pass'>Mínimo 6 caracteres</p>");
      return false;
    }

    $("#inputBtnSend").css({
      "opacity": ".75"
    })
    $("#inputBtnSend").text("");
    $("#inputBtnSend").html('<div class="spinner-border text-light spinner-border-sm" role="status"></div> <span class="ms-1">Verificando credenciales...</span>');
    setTimeout(function(){
      window.location.href = "caseManagement.html";
    }, 3000)
  });

  $("#password").on("input", function(){
    if(!validatePass.test( $("#password").val() )){
      password.addClass("border-danger");
      password.parent().after("<p class='text-danger text-small mb-0 mt-1 error-pass'>Mínimo 6 caracteres</p>");
      return false;
    }else{
      $(".error-email, .error-pass").remove();
    $("#email, #password").removeClass("border-danger");
    }
  });

  $("#btnAddFPQRS").on("click", function(e){
    e.preventDefault();
    const nuevoCaso = {
      id: `#00${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleDateString(),
      type: $("#typeAcoso").val(),
      category: $("#typeCategory").val(),
      subcategory: $("#typeSubCategory").val(),
      description: $("#descriptionDetails").val(),
      client: $("#names").val(),
      assignedTo: "Sin asignar",
      priority: "Media",
      status: "Abierto",
      dueDate: new Date().toLocaleDateString(),
      slaStatus: "Activo"
    };

    console.log(nuevoCaso);
    
    localStorage.setItem("dataCaso", JSON.stringify(nuevoCaso))
    window.location.href = "caseManagement.html"
  })
});