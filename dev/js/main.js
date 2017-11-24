document.addEventListener("DOMContentLoaded", function(){
    "use strict";
    // const urlAPI = "api.openweathermap.org";
    /* football-data.org */
/*    const myHeaders = new Headers({
        // "Content-Type": "text/plain",
        // "Content-Length": content.length.toString(),
        // "X-Custom-Header": "ProcessThisImmediately",
        "X-Auth-Token": "YOUR_API_TOKEN"
    });*/

    function fillTable(data) {
        console.log("fillTable[data]", data);
        console.log("fillTable type[data]", typeof data);
        if ('content' in document.createElement('template')) {

            // Instantiate the table with the existing HTML tbody and the row with the template
            const t = document.querySelector('#competition_row'),
                td = t.content.querySelectorAll("td");

            data.forEach((el, id) => {
                td[0].textContent = el.caption;
                td[1].textContent = el.league;
                td[2].textContent = el.numberOfGames;
                td[3].textContent = el.numberOfMatchdays;
                td[4].textContent = el.numberOfTeams;
                td[5].textContent = el.year;
                var tb = document.getElementsByTagName("tbody");
                var clone = document.importNode(t.content, true);
                tb[0].appendChild(clone);

            });
/*            td[0].textContent = "1235646565";
            td[1].textContent = "Stuff";

            // клонируем новую строку и вставляем её в таблицу
            var tb = document.getElementsByTagName("tbody");
            var clone = document.importNode(t.content, true);
            tb[0].appendChild(clone);

            // создаём новую строку
            td[0].textContent = "0384928528";
            td[1].textContent = "Acme Kidney Beans";

            // клонируем новую строку и вставляем её в таблицу
            var clone2 = document.importNode(t.content, true);
            tb[0].appendChild(clone2);*/

        } else {
            // необходимо найти другой способ добавить строку в таблицу т.к.
            // тег <template> не поддерживатся браузером
        }
    }


/* TODO: WORKING EXAMPLE OF CURRENT PAGE */
    const url = 'https://api.football-data.org/v1/competitions/?season=2015';
    const headers = {"X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"};
    console.log("competitions:");
    fetch(url, {"headers": headers})
        .then((resp) =>
            // console.log("resp", resp);
            resp.json()
        )
        .then(data => {
                console.log("data", data);
                fillTable(data);
            }
        )
        .catch(error => console.log("error", error));

    /* Example

    const myHeaders = new Headers({
        // "Content-Type": "text/plain",
        // "Content-Length": content.length.toString(),
        // "X-Custom-Header": "ProcessThisImmediately",
        "X-Auth-Token": "YOUR_API_TOKEN"
    });
    // const headers = { 'X-Auth-Token': 'YOUR_API_TOKEN' };
    const url = 'http://api.football-data.org/v1/fixtures?timeFrame=n1';
*/
/*    const url1 = 'http://api.football-data.org/v1/fixtures?timeFrame=n1';
    fetch(url1, {"headers": {
        // "Content-Type": "application/json",
        "X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"}})
        .then(resp =>
            // console.log("Fixtures");
            // console.log("resp type", typeof resp);
            // console.log("resp.json", resp.json());
            // console.log("resp.text", resp.text());
            resp.json()
        )
        .then(data => (
            // console.log("data:");
                console.log(data)
            )
        )
        .catch(error => console.log(error));*/

    /* example NFLArrests.com*/
/*    const NFLAPIUrl = "http://nflarrest.com/api/v1/crime/topPlayers/Theft";
    const div = document.querySelector("#NFLAPIBlock");

    fetch(NFLAPIUrl)
        .then((resp) => resp.json())
        .then((data) => {
            console.log("data", data);
            // div.innerHTML = JSON.parse(data);
        })
        .catch((error) => console.log(error))*/




    /*
    =================================================================
    example
    =================================================================
    */
/*    const ul = document.getElementById('authors'); // Get the list where we will place our authors
    const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users

    function createNode(element) {
        return document.createElement(element); // Create the type of element you pass in the parameters
    }

    function append(parent, el) {
        return parent.appendChild(el); // Append the second parameter(element) to the first one
    }

    fetch(url) // Call the fetch function passing the url of the API as a parameter
    // Your code for handling the data you get from the API
        .then((resp) => resp.json())
        .then(function(data) {
            let authors = data.results;
            return authors.map(function(author) {
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span');
                img.src = author.picture.medium;
                span.innerHTML = `${author.name.first} ${author.name.last}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        // This is where you run code if the server returns any errors);
        .catch(function(error) {
            console.log(error);
        });*/

});