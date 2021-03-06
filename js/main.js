document.addEventListener("DOMContentLoaded", function(){
    "use strict";
    const season = (new Date()).getFullYear(),
        page_title = document.querySelector("#page_title");
    page_title.innerText = page_title.innerText + " " + season;

    function fillTable(data) {
        const t = document.querySelector('#competition_row'),
            td = t.content.querySelectorAll("td");

        data.forEach((el) => {
            td[0].textContent = el.caption;
            td[1].textContent = el.league;
            td[2].textContent = el.numberOfGames;
            td[3].textContent = el.numberOfMatchdays;
            td[4].textContent = el.numberOfTeams;
            td[5].textContent = el.year;
            const tb = document.getElementsByTagName("tbody");
            const clone = document.importNode(t.content, true);
            tb[0].appendChild(clone);
        });
    }

    function hideAnimation() {
        const loadingAnimation = document.querySelector(".animation"),
            table = document.querySelector("table");
        loadingAnimation.style.display = "none";
        table.style.display = "table";
    }

    const url = "https://api.football-data.org/v1/competitions/?season=" + season;
    const headers = {"X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"};
    fetch(url, {"headers": headers})
        .then((resp) =>
            resp.json()
        )
        .then(data => {
                hideAnimation();
                fillTable(data);
            }
        )
        .catch(error => console.log("error", error));
});