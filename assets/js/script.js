import { data as casesFPQRS } from "../../data/index.js";
$(window).on("load", function(){
  $("#btnMenuAction").on("click", () => {
    $(".hide-nav-child").toggle({
      "visibility": "hidden",
      "display": "none"
    })
  })

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
    console.log(value)
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
    switch(value){
      case "Cerrado": {
        return "badge my-badged"
      }
      case "Respondido": {
        return "badge my-badged"
      }
      case "En Gestión": {
        return "badge my-badged"
      }
      case "Reabierto": {
        return "badge my-badged"
      }
      case "Radicado": {
        return "badge my-badged"
      }
    }
  }


  const tbodyCases = document.querySelector("#tbodyCases");

  casesFPQRS.slice(0,50).map(casePqrs => {
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
        <td class="text-nowrap text-small cl-card-text">09/05/2026</td>
        <td class="text-nowrap text-small"><span class="badge d-inline-flex align-items-center gap-1 my-badged"><span class="rounded-circle bg-secondary d-inline-block" style="width:8px;height:8px"></span>Cerrado</span></td>
        <td><button class="btn btn-sm btn-outline-secondary border-0"><i class="bi bi-eye"></i></button></td>
      </tr>
    `
  });

});