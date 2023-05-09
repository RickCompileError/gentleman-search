let websiteUrl = new Map([
    [1, "https://cn.pornhub.com/"],
    [2, "https://www.xvideos.com"],
    [3, "https://www.tktube.com/"],
    [4, "https://jable.tv/"],
    [5, "https://www.wnacg.com/"],
    [6, "https://nhentai.net/"],
    [7, "https://www.comicbox.xyz/"],
    [8, "https://18comic.vip/"],
]);

let searchUrl = new Map([
    [1, "https://cn.pornhub.com/video/search?search="],
    [2, "https://www.xvideos.com/?k="],
    [3, "https://tktube.com/search/"],
    [4, "https://jable.tv/search/"],
    [5, ["https://www.wnacg.com/search/?q=", "https://www.wnacg.com/photos-index-aid-"]],
    [6, ["https://nhentai.net/search/?q=", "https://nhentai.net/g/"]],
    [7, ["https://www.comicbox.xyz/search?keyword=", "https://www.comicbox.xyz/book/"]],
    [8, ["https://18comic.vip/search/photos?main_tag=0&search_query=", "https://18comic.vip/album/"]]
]);

var incognitoWindow = null;

// prevent any jquery code from running before the document is finished loading
$(function(){
$(".typeButton").click(function(event){
    switch (event.target.innerHTML){
        case "Video":
            $(".videoBoard").css("display", "flex");
            $(".comicBoard").css("display", "none");
            $(":text").attr("placeholder", "Search...");
            break;
        case "Comic":
            $(".videoBoard").css("display", "none");
            $(".comicBoard").css("display", "flex");
            $(":text").attr("placeholder", "Search... (number or text)");
            break;
    }   
});

function searchTrigger(){
    let userInput = $(":text:visible").val();
    let selectVal = parseInt($(":checked:visible").val());
    let url = "";
    if (userInput.length == 0){
        url = "";
    } else if (selectVal <= 4){
        url += searchUrl.get(selectVal) + userInput;
        if (selectVal >= 3) url += "/";
    } else if (isNaN(parseInt(userInput))){
        url += searchUrl.get(selectVal)[0] + userInput;
    } else{
        url += searchUrl.get(selectVal)[1] + userInput;
        if (selectVal == 5) url += ".html";
        if (selectVal == 6) url += "/";
    }
    createIncognito(url);
    $(":text").val("");
}

function createIncognito(url = ""){
    if (url == "")
        url = websiteUrl.get(parseInt($(":checked:visible").val()));
    
    chrome.windows.create(
        {
            "url": url,
            "incognito": true,
            "state": "maximized",
        }
    );
}

$(".searchBar > :text").keypress(function(event){
    if (event.which == 13){
        searchTrigger();
    }
});

$(".searchBar > :button").click(function(){
    searchTrigger();
});

$(".urlIcon").dblclick(function(){
    createIncognito(websiteUrl.get(parseInt($(":checked:visible").val())));
});

});