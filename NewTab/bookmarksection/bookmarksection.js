(() => {
    let bookmarkList = document.querySelector(".bookmark-list")
    //----------------------
    function creatingAllListitem(StoredBookmarkArray) {
        bookmarkList.innerHTML = "";
        StoredBookmarkArray.forEach((element, index) => {
            // creating li element 
            let everyListItem = document.createElement("li")
            // creating site image elemnt 
            let everyListItemIcon = document.createElement("img")
            everyListItemIcon.src = element.favIconUrl
            // creating link element
            let everyListItemLink = document.createElement("a")
            everyListItemLink.href = element.url
            //----------------
            element.title === "" ? everyListItemLink.textContent = element.url : everyListItemLink.textContent = element.title
            everyListItemLink.setAttribute("customize-text", "text-color-feild")
            // creating delete element 
            let everyListItemDeletebtn = document.createElement("button")
            let everyListItemDeleteicon = document.createElement("i")
            everyListItemDeletebtn.setAttribute("id", "listItemDeleteButton")
            everyListItemDeleteicon.setAttribute("class", "fas fa-trash-alt")
            everyListItemDeleteicon.setAttribute("data-id", index)
            everyListItemDeletebtn.appendChild(everyListItemDeleteicon)
            // appending all child element 
            everyListItem.appendChild(everyListItemIcon)
            everyListItem.appendChild(everyListItemLink)
            everyListItem.appendChild(everyListItemDeletebtn)
            bookmarkList.appendChild(everyListItem)
        })
    }
    // ------------------------
    window.addEventListener("DOMContentLoaded", () => {
        chrome.storage.sync.get(['name'], function (result) {
            if (result.name) {
                // console.log('Value currently is ' + result.name);
                let StoredBookmarkArray = JSON.parse(result.name)
                creatingAllListitem(StoredBookmarkArray);
            }
        });

    })
    // -------------------------------------------------
    bookmarkList.addEventListener("click", (e) => {

        let valid = false, id
        if (e.target.parentElement.tagName == "svg") {
            valid = true
            id = e.target.parentElement.getAttribute("data-id")
        } else if (e.target.tagName === "svg") {
            valid = true
            id = e.target.getAttribute("data-id")
        }
        else if (e.target.childNodes[0].tagName === "svg") {
            valid = true
            id = e.target.childNodes[0].getAttribute("data-id")
        }
        if (valid) {
            chrome.storage.sync.get(['name'], function (result) {
                if (result.name) {
                    let new_name = JSON.parse(result.name).filter((el, index) => {
                        return index != id;
                    })
                    chrome.storage.sync.set({ name: JSON.stringify(new_name) }, function () {
                        // console.log('Value is set to ' + JSON.stringify(new_name));
                        creatingAllListitem(new_name)
                    });
                }
            })
        }
    })
    // -------------------------------------------------
    let bookmarkSubmit = document.querySelector("#bookmark-submit")
    let bookmarkInput = document.querySelector("#bookmark-input")

    //----------------------------------------- fetching - Title - function
    async function fetchingTitle(userTypedLink) {
        let fetchLink = `https://apps.blogdesire.com/cors/?url=${userTypedLink}`
        let FetchingTitleValue = await fetch(fetchLink)
            .then(response => response.text())
            .then(
                data => {
                    let TitleTagStart = data.indexOf("<title>")
                    let TitleTagEnd = data.indexOf("</title>");
                    let title = data.slice(TitleTagStart + 7, TitleTagEnd)
                    return title
                }
            );
        return FetchingTitleValue
    }
    //----------------------------------------- slicing url function
    function slicinguserUrl(userTypedLink) {
        let userLinkSliceStart = userTypedLink.indexOf("://")
        let userLinkSliceEnd = userTypedLink.indexOf(".com")
        let userLinkSliced = userTypedLink.slice(userLinkSliceStart + 3, userLinkSliceEnd + 4)
        //-----------------------------
        let ImageLink = `https://icons.duckduckgo.com/ip3/${userLinkSliced}.ico`
        return ImageLink
    }
    //----------------------------------------- adding click event 

    bookmarkSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        let userTypedLink = bookmarkInput.value
        if (userTypedLink.includes("http")) {
            //---------------- calling slicing url function
            let slicedImageLink = slicinguserUrl(userTypedLink)
            //--------------------- calling fetching - Title - function
            fetchingTitle(userTypedLink).then((title) => {
                let new_list_item = { favIconUrl: slicedImageLink, title: title, url: userTypedLink }
                // ----------------------
                chrome.storage.sync.get(['name'], function (result) {
                    let new_name = result.name ? JSON.parse(result.name) : [];
                    new_name.push(new_list_item)
                    // ----------------------------
                    chrome.storage.sync.set({ name: JSON.stringify(new_name) }, function () {
                        // console.log('Value is set to ' + JSON.stringify(new_name));
                    });
                    //--------------------
                    creatingAllListitem(new_name)
                })
            })
            bookmarkInput.placeholder = "Enter your link"

        } else if (userTypedLink === "") {
            bookmarkInput.placeholder = "Please enter someting"

        }
        else {
            bookmarkInput.placeholder = "Please enter a valid link"
        }
        //-------------------------
        bookmarkInput.value = ""
    })

})();



