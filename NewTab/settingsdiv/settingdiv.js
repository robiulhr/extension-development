(() => {
    let settingButton = document.querySelector(".setting-button")
    let modalDiv = document.querySelector(".settings-modal-container")
    let crosssettingsmodal = document.querySelector(".cross-settings-modal")
    let nameInput = document.querySelector("#name")
    let bgColorInput = document.querySelector("#bgColor")
    let textColorInput = document.querySelector("#textColor")
    let profileInput = document.querySelector("#profile")
    let CoverphotoInput = document.querySelector("#Cover-photo")
    let themeColorInput = document.querySelector("#theme-color")
    let submit = document.querySelector(".button2.submit")
    // -----------------------
    let NameFeild = document.querySelector(".Name-feild")
    let Bgfeild = document.querySelector("body")
    let TextFeildArray = document.querySelectorAll("[customize-text='text-color-feild']")
    let themeColorFeildArray = document.querySelectorAll("[customize-theme='theme-div']")
    //---------------------------------------- modal open and close----------------------------------------
    let closeModal = () => {
        modalDiv.style.top = "100vh"
        // ------------ erase all value
        nameInput.value = ""
        bgColorInput.value = ""
        textColorInput.value = ""
        themeColorInput.value = ""
        profileInput.value = ""
        CoverphotoInput.value = ""
    }
    let openModal = () => {
        modalDiv.style.top = "-50vh"
    }
    settingButton.addEventListener("click", () => {
        openModal()
    })
    crosssettingsmodal.addEventListener("click", () => {
        closeModal()
    })
    //  --------------------------------- functioanality for customising interface  -------------------------------
    let userData = {
        Name: "",
        bgColor: "",
        textColor: "",
        themeColor: ""
    }
    // ---------------------get user data from local storage-----------------
    if (!window.localStorage.getItem('userData')) {
        window.localStorage.setItem('userData', JSON.stringify(userData));
    }
    let GetUserDatalocalstrg = JSON.parse(window.localStorage.getItem('userData'));
    //---------------------------------------
    let storeuserdataArray = () => {
        if (nameInput.value !== "") {
            userData.Name = nameInput.value
        } else {
            GetUserDatalocalstrg.Name ? userData.Name = GetUserDatalocalstrg.Name : userData.Name = ""
        }
        if (bgColorInput.value !== "") {
            userData.bgColor = bgColorInput.value
        } else {
            GetUserDatalocalstrg.bgColor ? userData.bgColor = GetUserDatalocalstrg.bgColor : userData.bgColor = ""
        }
        if (textColorInput.value !== "") {
            userData.textColor = textColorInput.value
        } else {
            GetUserDatalocalstrg.textColor ? userData.textColor = GetUserDatalocalstrg.textColor : userData.textColor = ""
        }
        if (themeColorInput.value !== "") {
            userData.themeColor = themeColorInput.value
        } else {
            GetUserDatalocalstrg.themeColor ? userData.themeColor = GetUserDatalocalstrg.themeColor : userData.themeColor = ""
        }
    }

    let setCustomDesign = (storedUserData) => {
        //----------------- setting name-------------
        if (storedUserData.Name !== "") {
            NameFeild.textContent = storedUserData.Name
        }
        // ------------------ setting background-----------------
        if (storedUserData.bgColor !== "") {
            Bgfeild.style.background = storedUserData.bgColor
        }
        // --------------------- setting text color------------------
        if (storedUserData.textColor !== "") {
            TextFeildArray.forEach((element) => {
                element.style.color = storedUserData.textColor
            })
        }
        if (storedUserData.themeColor !== "") {
            themeColorFeildArray.forEach((element) => {
                element.style.background = storedUserData.themeColor
            })
        }
    }
    //-----------------------------------------functioanality for  the submit button------------------
    submit.addEventListener("click", () => {
        storeuserdataArray()
        //      -------------sore user data into local storage----------------
        window.localStorage.setItem('userData', JSON.stringify(userData));
        // ---------------------get user data from local storage-----------------
        GetUserDatalocalstrg = JSON.parse(window.localStorage.getItem('userData'));
        setCustomDesign(GetUserDatalocalstrg)
        // -------------close modal-------------------
        closeModal()
        location.reload();

    })
    // ----------------------------------- showing the stored background after page rejresh------------------------------
    window.addEventListener("DOMContentLoaded", () => {
        GetUserDatalocalstrg = JSON.parse(window.localStorage.getItem('userData'));
        setCustomDesign(GetUserDatalocalstrg)
    })
})()
