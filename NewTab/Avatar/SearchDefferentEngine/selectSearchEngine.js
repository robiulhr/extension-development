(() => {

    let searchEngineoptions = document.querySelectorAll(".search-Engine-options")
    //-------------------------- showing the user selected search engine beside the input feild
    searchEngineoptions.forEach((element) => {
        element.addEventListener("click", (e) => {
            console.log(element);
            element.style.visibility = "visible"
            element.style.opacity = "1"
            element.style.zIndex = "1"
            searchEngineoptions.forEach((ele) => {
                if (element !== ele) {
                    ele.style.zIndex = "-10"
                }
            })
        })

    });




















})()
