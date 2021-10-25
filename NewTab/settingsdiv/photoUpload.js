
(() => {
    let profileInput = document.querySelector("#profile")
    let profiledemosuccess = document.querySelector(" #profile-demo-success")
    let profiledemodefault = document.querySelector("#profile-demo-default")
    let profilefiledemo = document.querySelector("#profile-file-demo")
    let CoverphotoInput = document.querySelector("#Cover-photo")
    let Coverdemosuccess = document.querySelector(" #Cover-demo-success")
    let Coverdemodefault = document.querySelector("#Cover-demo-default")
    let coverfiledemo = document.querySelector("#cover-file-demo")
    let ProfileFeild = document.querySelector(".profile-div img")
    let CoverphotoFeild = document.querySelector("body")
    let submit = document.querySelector(".submit-div .form-group .submit")
    let photoData = {
        profile: "",
        Cover: ""
    }
    if (!window.localStorage.getItem('photoData')) {
        window.localStorage.setItem('photoData', JSON.stringify(photoData));
    }
    let storedPhotoData = JSON.parse(window.localStorage.getItem("photoData"))
    //--------------------------------------
    // change some design off file input feild depending on user selected an image 
    setInterval(() => {
        let file = profileInput.files[0]

        if (file) {
            profiledemosuccess.style.display = "inline-block"
            profilefiledemo.style.borderColor = "rgba(0, 255, 0, 0.4)"
            profilefiledemo.style.backgroundColor = "rgba(0, 255, 0, 0.3)"
            profiledemodefault.style.display = "none"
        }
    }, 100)

    setInterval(() => {
        let file = CoverphotoInput.files[0]

        if (file) {
            Coverdemosuccess.style.display = "inline-block"
            coverfiledemo.style.borderColor = "rgba(0, 255, 0, 0.4)"
            coverfiledemo.style.backgroundColor = "rgba(0, 255, 0, 0.3)"
            Coverdemodefault.style.display = "none"
        }
    }, 100)

    // uploading photo and storing it in local storage  
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
        location.reload();
    })
    window.addEventListener("DOMContentLoaded", () => {
        showPhoto()
    })
})();




