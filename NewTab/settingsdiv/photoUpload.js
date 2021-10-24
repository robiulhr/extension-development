
(() => {
    let profileInput = document.querySelector("#profile")
    let CoverphotoInput = document.querySelector("#Cover-photo")
    let ProfileFeild = document.querySelector(".profile-div img")
    let CoverphotoFeild = document.querySelector("body")
    let submit = document.querySelector(".button2.submit")
    let photoData = {
        profile: "",
        Cover: ""
    }
    if (!window.localStorage.getItem('photoData')) {
        window.localStorage.setItem('photoData', JSON.stringify(photoData));
    }
    let storedPhotoData = JSON.parse(window.localStorage.getItem("photoData"))
    //--------------------------------------
    // get user's uploaded image
    //---------------- profile photo
    function previewFile() {
        if (profileInput.value !== "") {
            console.log("Hello");
            const [ProfileFile] = profileInput.files;
            const Profilereader = new FileReader();
            Profilereader.addEventListener("load", () => {
                photoData.profile = Profilereader.result
                window.localStorage.setItem("photoData", JSON.stringify(photoData))
            }, false);
            if (ProfileFile) Profilereader.readAsDataURL(ProfileFile);
        } else {
            storedPhotoData ? photoData.profile = storedPhotoData.profile : photoData.profile = ""
        }
        //------------------ cover photo
        if (CoverphotoInput.value !== "") {
            const [CoverphotoFile] = CoverphotoInput.files;
            const Coverreader = new FileReader();

            Coverreader.addEventListener("load", () => {
                photoData.Cover = Coverreader.result
                window.localStorage.setItem("photoData", JSON.stringify(photoData))
            }, false);
            if (CoverphotoFile) Coverreader.readAsDataURL(CoverphotoFile);
        } else {
            storedPhotoData ? photoData.Cover = storedPhotoData.Cover : photoData.Cover = ""
        }
    }
    //------------------------- show photo function
    let showPhoto = () => {
        storedPhotoData = JSON.parse(window.localStorage.getItem("photoData"))
        // console.log(storedPhotoData);
        ProfileFeild.setAttribute("src", storedPhotoData.profile);
        CoverphotoFeild.style.backgroundImage = `url(${storedPhotoData.Cover})`
    }
    submit.addEventListener("click", () => {
        previewFile()
        showPhoto()
    })
    window.addEventListener("DOMContentLoaded", () => {
        showPhoto()
    })
})();




