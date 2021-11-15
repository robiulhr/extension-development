(() => {
    let searchEngineoptions = document.querySelectorAll(".search-Engine-options")
    // geting stored selected search engine 
    let getSelectedSearchEngine
    if (window.localStorage.getItem("selectedSearchEngine")) {
        getSelectedSearchEngine = window.localStorage.getItem("selectedSearchEngine")
    } else {
        window.localStorage.setItem("selectedSearchEngine", "not-selected")

    }

    // function for shiwing and hiding the selected button
    function showingTheSelectedButton(element) {
        // geting stored selected search engine 
        getSelectedSearchEngine = window.localStorage.getItem("selectedSearchEngine")
        if (getSelectedSearchEngine === element.firstElementChild.textContent) {
            element.style.visibility = "visible"
            element.style.opacity = "1"
            element.style.zIndex = "1"
        }
        searchEngineoptions.forEach((ele) => {
            if (getSelectedSearchEngine !== ele.firstElementChild.textContent) {
                ele.style.zIndex = "-10"
            }
        })
    }

    searchEngineoptions.forEach((element) => {
        //-------------------------- showing the user selected search engine beside the input feild after user click
        element.addEventListener("click", (e) => {
            // storing the selected search engine in local storage 
            window.localStorage.setItem("selectedSearchEngine", element.firstElementChild.textContent)

            showingTheSelectedButton(element)
        })
        //-------------------------- showing the user selected search engine beside the input feild afer window load
        window.addEventListener("DOMContentLoaded", () => {
            showingTheSelectedButton(element)
        })
    });
})();
(() => {

    let differentsearchEngineinput = document.querySelector("#differentsearchEngineinput")
    let differentsearchEngineSubmit = document.querySelector("#differentsearchEngineSubmit")
    let SearchDifferentsearchEngineForm = document.querySelector("#SearchDifferentsearchEngineForm")
    function AllEndpoindAndSearchQuery(userInputValue) {
        // storing the user input 
        let query = userInputValue
        let googleEndpoint = `https://www.google.com/search?q=${query}`
        let bingEndpoint = `https://www.bing.com/search?q=${query}`
        let duckduckgoEndpoint = `https://duckduckgo.com/?q=${query}`
        let starpageEndpoint = `https://www.startpage.com/do/search?q=${query}&segment=startpage.brave`
        let youtubeEndpoint = `https://www.youtube.com/results?search_query=${query}`
        OpeningNewTab(googleEndpoint, bingEndpoint, duckduckgoEndpoint, starpageEndpoint, youtubeEndpoint)
    }
    // defining a function for opining new tab of different search engine
    function OpeningNewTab(googleEndpoint, bingEndpoint, duckduckgoEndpoint, starpageEndpoint, youtubeEndpoint) {
        // get selected search engine from local storage
        let getSelectedSearchEngine = window.localStorage.getItem("selectedSearchEngine")
        // opening new tab and seaching in different search engine 
        if (getSelectedSearchEngine === "Google" && differentsearchEngineinput.value !== "") {
            chrome.tabs.create({ "url": googleEndpoint }, function (tab) {
                // Tab opened.
            });
        } else if (getSelectedSearchEngine === "Bing" && differentsearchEngineinput.value !== "") {
            chrome.tabs.create({ "url": bingEndpoint }, function (tab) {
                // Tab opened.
            });
        } else if (getSelectedSearchEngine === "Duck Duck Go" && differentsearchEngineinput.value !== "") {
            chrome.tabs.create({ "url": duckduckgoEndpoint }, function (tab) {
                // Tab opened.
            });
        } else if (getSelectedSearchEngine === "Start Page" && differentsearchEngineinput.value !== "") {
            chrome.tabs.create({ "url": starpageEndpoint }, function (tab) {
                // Tab opened.
            });
        }
        else if (getSelectedSearchEngine === "Youtube" && differentsearchEngineinput.value !== "") {
            chrome.tabs.create({ "url": youtubeEndpoint }, function (tab) {
                // Tab opened.
            });
        }
        else if (getSelectedSearchEngine === "not-selected" && differentsearchEngineinput.value !== "") {
            differentsearchEngineinput.placeholder = "please select a search engine"
            differentsearchEngineSubmit.type = "button"
            SearchDifferentsearchEngineForm.method = ""
        }
        else if (differentsearchEngineinput.value === "") {
            differentsearchEngineinput.placeholder = "Please write something"
            differentsearchEngineSubmit.type = "button"
            SearchDifferentsearchEngineForm.method = ""
        }
    }

    // functionality for clicking submit button
    differentsearchEngineSubmit.addEventListener("click", () => {
        // calling the function
        AllEndpoindAndSearchQuery(differentsearchEngineinput.value)
        differentsearchEngineinput.value = ""

    })
})();
