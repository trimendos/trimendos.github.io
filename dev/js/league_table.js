document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    const options = document.getElementsByTagName("option");

    for (let i=0; i < options.length; i++) {
        const childElement = options[i];
        childElement.addEventListener("input", function (e) {
            console.log("option input", e);
        })
    }

    function makeAutoComplete(data) {
        const leagueNamesList = data.map(el => el.caption);
        let leagueObj = {};
        for(let i in data) {
            leagueObj[data[i].caption] = data[i].id;
        }

        const dataList = document.getElementById("search_field");
        for(let i in leagueNamesList){
            const option = document.createElement("option");
            option.text = leagueNamesList[i];
            dataList.appendChild(option);
        }
        console.log(leagueObj);
        return leagueObj;
    }

    function clearTable() {
        const tb = document.getElementsByTagName("tbody");
        console.log("tb:", tb, typeof tb);
        for(let i=0; i < tb.length; i++) {
            tb[i].innerHTML = "";
        }
    }
    
    function fillTable(data) {
        console.log("fillTable[data]", data);
        console.log("fillTable type[data]", typeof data);

        if ('content' in document.createElement('template')) {

            const t = document.querySelector("#league_row"),
                td = t.content.querySelectorAll("td"),
                caption = document.getElementById("caption_row"),
                captionTds = caption.content.querySelectorAll("td");
            captionTds[0].textContent = data.leagueCaption;
            captionTds[1].textContent = data.matchday;
            const captionTb = document.getElementsByTagName("tbody");
            const clone = document.importNode(caption.content, true);
            captionTb[0].appendChild(clone);

            data.standing.forEach((el) => {
                td[0].firstChild.setAttribute("src", el.crestURI !== null ? el.crestURI : "./img/default-icon.svg");
                td[1].textContent = el.teamName;
                td[2].textContent = el.position;
                td[3].textContent = el.points;
                td[4].textContent = el.playedGames;
                td[5].textContent = el.wins;
                td[6].textContent = el.losses;
                td[7].textContent = el.draws;
                td[8].textContent = el.goals;
                td[9].textContent = el.goalsAgainst;
                td[10].textContent = el.goalDifference;
                const tb = document.getElementsByTagName("tbody");
                const clone = document.importNode(t.content, true);
                tb[1].appendChild(clone);
            });

        } else {

        }
    }


    const url = "https://api.football-data.org/v1/competitions/?season=2017";
    const headers = {"X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"};
    console.log("competitions:");
    fetch(url, {"headers": headers})
        .then((resp) =>
            resp.json()
        )
        .then(data => {
                console.log("data", data);
                const list = makeAutoComplete(data);
            const searchField = document.querySelector(".search-field");

            searchField.addEventListener("input", () => {
                if(list.hasOwnProperty(searchField.value)) {
                    console.log(list[searchField.value]);
                    console.log("leagueTable:");
                    const url = "https://api.football-data.org/v1/competitions/" + list[searchField.value] + "/leagueTable";
                    const headers = {"X-Auth-Token": "71d6556f803d4391bf1bede6e10cf5d8"};
                    fetch(url, {"headers": headers})
                        .then((resp) => resp.json())
                        .then(data => {
                            console.log("data", data);
                            clearTable();
                            fillTable(data);
                        })
                        .catch(error => console.log("error", error));
                }

            });
        })
        .catch(error => console.log("error", error));
});