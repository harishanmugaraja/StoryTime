
API_URL = "localhost:8080";

function generate(){
    var story = document.getElementById("textarea").value;
    data = {"story": story};
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(response =>
        {
            
        }
        //download
    );
}