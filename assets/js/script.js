import { data as casesFPQRS } from "../../data/index.js";

$(window).on("load", function(){

  const tbodyCases = document.querySelector("#tbodyCases");

  const tabsFpqrsDetails = document.querySelectorAll("[data-tab]");
  const tabContents = document.querySelectorAll("#contentTab > div");

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
  
  if(tbodyCases !== null){
    casesFPQRS.slice(0,99).map(casePqrs => {
      tbodyCases.innerHTML += `
        <tr>
          <td class="fw-medium text-nowrap text-small clr-primary">${casePqrs.id}</td>
          <td class="text-nowrap text-small cl-card-text">${casePqrs.date}</td>
          <td class="text-nowrap text-small2"><span class="${styleType(casePqrs.type)}">${casePqrs.type}</span></td>
          <td class="text-nowrap text-small">${casePqrs.category}</td>
          <td class="text-small text-break">
            <span>${casePqrs.subcategory}</span>
          </td>
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
      `
    });
  }

  $("[data-card-role='button']").on("click", function(){
    const container = $(this).closest("[data-card-container]");

    container.find("[data-card-role='content']").toggleClass("d-none");
    container.find(".footerCard").toggleClass("d-none")
    $(this).find('i').toggleClass("bi-chevron-up");
  })
});