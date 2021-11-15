//--------------------------- get top sites(most visited) -------------------------------
let topsitesdivlist = document.querySelector(".top-sites-div-list")
//--------------------------------------- slicing url and fatching img ----------------

function slicingUrlandfatchingimg(topsiteitemUrl) {
    let LinkSliceStart = topsiteitemUrl.indexOf("://")
    let LinkSliceEnd = topsiteitemUrl.indexOf(".com")
    let LinkSliced = topsiteitemUrl.slice(LinkSliceStart + 3, LinkSliceEnd + 4)
    let TitleSliced = topsiteitemUrl.includes("www.") ? topsiteitemUrl.slice(LinkSliceStart + 7, LinkSliceEnd) : topsiteitemUrl.slice(LinkSliceStart + 3, LinkSliceEnd)
    //-----------------------------
    let ImageLink = `https://icons.duckduckgo.com/ip3/${LinkSliced}.ico`
    return [ImageLink, TitleSliced]
}
//--------------------------------------- title fetghing ----------------

function creatinglistitem(topsiteitem, topsiteitemUrl) {
    let topsiteitemli = document.createElement("li")
    //--------------
    let topsiteitemlink = document.createElement("a")
    //---------------slicing link url to find home page
    let linkUrlEnd = topsiteitem.url.indexOf(".com")
    let slicedLinkedUrl = topsiteitem.url.includes(".com") ? topsiteitem.url.slice(0, linkUrlEnd + 4) : topsiteitem.url
    // console.log(slicedLinkedUrl);
    topsiteitemlink.href = slicedLinkedUrl
    topsiteitemlink.setAttribute("customize-text", "text-color-feild")
    // ---------------- setting img link
    let imglink = slicingUrlandfatchingimg(topsiteitemUrl)
    topsiteitemlink.textContent = imglink[1];

    let topsiteitemimg = document.createElement("img")
    topsiteitemimg.src = imglink[0]
    //---------------
    topsiteitemli.appendChild(topsiteitemimg)
    topsiteitemli.appendChild(topsiteitemlink)
    return topsiteitemli
}
// ---------------------------------
window.addEventListener("DOMContentLoaded", () => {

    chrome.topSites.get(
        (topsitelist) => {
            // console.log(topsitelist);
            topsitelist.forEach(topsiteitem => {
                let topsiteitemUrl = topsiteitem.url
                // creating all list item
                let topsitelistitem = creatinglistitem(topsiteitem, topsiteitemUrl)
                // appending all items
                topsitesdivlist.appendChild(topsitelistitem)
            });
        }
    )
})
