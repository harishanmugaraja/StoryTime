
API_URL = "http://localhost:8080";

function generate(){
    var story = document.getElementById("textarea").value;
    data = {"story": story};
    fetch(API_URL + "/generate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(data),
    }).then(response => {
        response.json().then(data => {
            console.log(data);
        })
    }
        //download
    );
}