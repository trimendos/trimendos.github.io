document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    const form = document.querySelector("#search-form");
    form.addEventListener("submit", function (e) {
        const selector = "a[name='" + form.querySelector("input").value +"']";
        document.querySelector(selector).scrollIntoView();
        e.preventDefault();
    }, false);

    function makeAutoComplete(teamList) {
        const dataList = document.getElementById("search_field");
        for(let i in teamList){
            const option = document.createElement("option");
            option.text = teamList[i];
            dataList.appendChild(option);
        }
    }

    function hideAnimation() {
        const loadingAnimation = document.querySelector(".animation"),
            table = document.querySelector("table");
        loadingAnimation.style.display = "none";
        table.style.display = "table";
    }

    function replaceProtocol(url){
        return url.replace("http:", "https:")
    }

    function fillNullData(str) {
        return str !== null ? str : " - ";
    }

    function fillTable(data) {
        const t = document.querySelector("#teams_row"),
            td = t.content.querySelectorAll("td");

        data.forEach((el) => {
            td[0].firstChild.setAttribute("src",
                el.crestUrl !== null ? replaceProtocol(el.crestUrl) : "./img/default-icon.svg");
            td[0].lastChild.setAttribute("name", el.name);
            td[1].textContent = fillNullData(el.code);
            td[2].textContent = fillNullData(el.name);
            td[3].textContent = fillNullData(el.shortName);

            const tb = document.getElementsByTagName("tbody");
            const clone = document.importNode(t.content, true);
            tb[0].appendChild(clone);
        });
    }

    const url = "https://api.football-data.org/v1/competitions/";
    const headers = {"X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"};
    fetch(url, {"headers": headers})
        .then((resp) =>
            resp.json()
        )
        .then(data => {
            const headers = {"X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"};
            const competitionIds = data.map(el => el.id);
            const urls = competitionIds.map(
                el => "https://api.football-data.org/v1/competitions/id/teams".replace("id", el));
            Promise.all(urls.map(url => fetch(url, {"headers": headers})))
                .then(response => Promise.all(response.map(resp => resp.json())))
                .then(data => {
                    let teams = [];
                    let teamsNameList = [];
                    data.forEach(el => {
                        if( el.teams !== undefined) {
                            for(let i=0; i < el.teams.length; i++){
                                teams.push(el.teams[i]);
                                teamsNameList.push(el.teams[i].name);
                            }
                        }
                    });
                    teamsNameList = teamsNameList.filter(function(item, pos) {
                        return teamsNameList.indexOf(item) === pos;
                    });
                    makeAutoComplete(teamsNameList);
                    hideAnimation();
                    fillTable(teams);
                })
                .catch(error => console.log("error", error));
        })
        .catch(error => console.log("error", error));
});