let times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const day_planner = "DAY_PLANNER";
let local_storage_plan;
const reg = /([\d]+)([\w]+)/;

let ProcessTime = (time) => {
    let match = time.match(reg);
    let hours = parseInt(match ? match[1] : 0);
    let am_pm = match ? time.match(reg)[2] : "am";    
    hours = hours + ((am_pm.toUpperCase() == "PM") ? 12 : 0);
    hours = (hours == 24) ? 12 : hours;
    return hours;
}

let CompareHour = (time) => {
    let hours = ProcessTime(time);
    let current_hours = ProcessTime(moment().format("ha"));
    
    if(hours == current_hours) return "red";
    if(hours < current_hours) return "gray";
    if(hours > current_hours) return "green";
}

let CreatePlanner = () => {
    let tableBody = $("#tblPlanner");
    local_storage_plan = localStorage.getItem(day_planner);
    try{
        local_storage_plan = JSON.parse(local_storage_plan);
    }
    catch{
        local_storage_plan = null;
    }
    
    $.each(times, (index, element) => {
        let text = "";
        if(local_storage_plan != null){
            try{
                text = local_storage_plan[index].text;
            }
            catch{
                text = "";
            }
        }
        let tr = $("<tr>").appendTo(tableBody);
        $("<td width='80px'>").appendTo(tr).html(element);
        $(`<td class='savePlan ${CompareHour(element)}' contenteditable='true' width='*' time-attribute='${element}'>`).appendTo(tr).html(text);
        $(`<td width='80px' class='saveTD'>`).appendTo(tr).html("<i class='fa fa-save' style='font-size:24px;'></i>");
    });
}

function SavePlan(target){
    let plan = [];
    $(".savePlan").each( (i, element) => {        
        plan.push({time: element.getAttribute("time-attribute"), text: $(element).html()})
    });
    localStorage.setItem(day_planner, JSON.stringify(plan));
}

$(document).ready(() => {
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    setInterval(() => {
        $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));    
    }, 1000);
    CreatePlanner();
    $(".saveTD").on("click", (e) => SavePlan());
});
