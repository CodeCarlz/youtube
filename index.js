const hamburgerMenu = document.querySelector('.hamburger-menu')
const topScrollbar = document.querySelector('.top-scrollbar')
const sidebar = document.querySelector('.sidebar')
const videoLink = document.getElementById("videoLink")
const searchBoxInput = document.querySelector('.search-box')
const searchBoxBtn = document.querySelector('.search-button')

const videoPreview = document.querySelector('.video-preview')


hamburgerMenu.addEventListener('click', function () {
    const clientWidth = document.body.clientWidth;

    if(clientWidth <= 600){

        sidebar.classList.toggle("hidden-sidebar-class");
        topScrollbar.classList.toggle("topScroolbartoggle")
        document.body.classList.toggle("body");
        sidebar.classList.remove("hidden-sidebar-midium");
    }
    else if(clientWidth >= 601 || clientWidth <= 1000){
        sidebar.classList.remove("hidden-sidebar-class");
   
    }
})

searchBoxBtn.addEventListener('click', () => {
    performSearch();
});

searchBoxInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        performSearch();
    }
});

function performSearch() {
    const searchValue = searchBoxInput.value.trim();

    if (searchValue) {
        youtube(searchValue);
    }else {
        youtube();
    }
}

let youtube = async (search)  => {
    let url = ''
    if(search !== undefined && search !== null && search.trim() !== ""){
        url = `https://yt-api.p.rapidapi.com/search?query=${search}`; 
   }else{
        url = 'https://yt-api.p.rapidapi.com/trending?geo=PH';
    }
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b0cbc9dd9emsh3b5b00f6d3497a3p1f8af4jsnc034605e7647',
            'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data);
        // videoList(result)
        videoArray(result.data)
    } catch (error) {
        console.error(error);
    }
}



function videoArray (result){
    videoPreview.innerHTML = ''
    result.forEach(element => {
        // console.log(element)
        if(element.type === "video"){
        const views = (element.viewCount)
        const viewers = Intl.NumberFormat('en-US');
        videoPreview.innerHTML += `
                <div class="video-grid">
            <div class="thumbnail-row">
                <a id="videoLink" href="https://www.youtube.com/watch?v=${element.videoId}"><img class="thumnail-img" src="${element.thumbnail[0].url}" alt=""></a>
                <div class="thumbnail-time">${element.lengthText}</div>
            </div>
            <div class="channel-info">
                <div class="profile-container">
                    <img class="profile-picture" src="${element.channelThumbnail[0].url}" alt="">
                    <div class="asd">
                        <div class="channel-profile">
                            <img class="channel-picture" src="${element.channelThumbnail[0].url}" alt="">
                            <div class="channel-info">
                                <p class="channel-author">${element.channelTitle}</p>
                                <p class="channel-stats">172M Subscribers</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="video-info">
                    <p class="video-title">${element.title} </p>
                    <p class="video-author">${element.channelTitle}</p>
                    <p class="video-stats">${viewers.format(views)} views &#183; ${element.publishedTimeText}</p>
                </div>
        </div>
        `
        }
        
        // else if(element.type === "shorts_listing"){
        //     element.data.forEach(shorts => {
        //         videoPreview.innerHTML += `
        //             <div class="video-grid">
        //             <div class="thumbnail-row">
        //                 <a id="videoLink" href="https://www.youtube.com/watch?v=${shorts.videoId}"><img class="thumnail-img" src="${shorts.thumbnail[0].url}" alt=""></a>
        //                 <div class="thumbnail-time">${shorts?.lengthText}</div>
        //             </div>
        //             <div class="channel-info">
        //                 <div class="profile-container">
        //                     <img class="profile-picture" src="${shorts?.thumbnail[0]?.url}" alt="">
        //                     <div class="asd">
        //                         <div class="channel-profile">
        //                             <img class="channel-picture" src="${shorts.thumbnail[0].url}" alt="">
        //                             <div class="channel-info">
        //                                 <p class="channel-author">${shorts.title}</p>
        //                                 <p class="channel-stats">172M Subscribers</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
                        
        //                 <div class="video-info">
        //                     <p class="video-title">${shorts.title} </p>
        //                     <p class="video-author">asd</p>
        //                     <p class="video-stats">${shorts.viewCountText}</p>
        //                 </div>
        //         </div>
        //      `
                
        //     });
        // }
       
     });
   
}



youtube()