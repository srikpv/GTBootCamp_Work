$(document).ready(() => {
    $(".devour").click(e => {
        let id = $(e.target).attr("data-id");
        const response = fetch("/api/"+id, {
            method: 'PUT', 
          })
        .then(data => {
            location.reload(true);
        })
        
    });
    
    $("#submit_form").click(e => {
        let data = {
            "name" : $("#name").val()
        };
        const response = fetch("/api/add", {
            method: 'POST', 
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              }
          })
          .then(data => location.reload(true));
    });

});
