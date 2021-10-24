let clockOptions = document.querySelectorAll(".clock-options")
let clockItems = document.querySelectorAll(".clock-items")
// ----------------------------- function for showing and hiding div --------------------------
let showingHidingclockItems = (storedclockItemId) => {
    clockItems.forEach((element) => {
        if (storedclockItemId === element.id) {
            element.style.display = "flex"
        } else {
            element.style.display = "none"
        }
    })
}
// ---------------------------------------- main functionality ------------------------------
clockOptions.forEach((ele) => {
    ele.addEventListener("click", (() => {
        let clockItemId = ele.id
        window.localStorage.setItem('clockItemId', clockItemId);
        let storedclockItemId = window.localStorage.getItem('clockItemId');
        showingHidingclockItems(storedclockItemId)
    }))
})

// ----------------------------- loading div after loading page refresh --------------------------
window.addEventListener("DOMContentLoaded", () => {
    let storedclockItemId = window.localStorage.getItem('clockItemId');
    showingHidingclockItems(storedclockItemId)
})
