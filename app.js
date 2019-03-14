(function(window,document){
    'use strict';
    window.app = {};

    app.data = null;

    //show movies on load
    app.showMovies = function(){
        let html = '';
        for( let movie in app.data ){
            let m = app.data[movie];
            let dateObj = app.getDateYear(m.ShowDate);

            html += `
                <div class="movie">
                    <div class="movie-wrap" id="${m.EventCode}">
                        <div class="movie-img-wrap">
                            <img class="movie-img" src="https://in.bmscdn.com/events/moviecard/${m.EventCode}.jpg" alt="movie">
                            <div class="stats-wrap">
                                <div class="stats">
                                    <div class="likes">
                                        <div class="thumb"></div>
                                        <div class="percentage">${m.wtsPerc}%</div>
                                    </div>
                                    <div class="votes">${m.wtsCount} votes</div>
                                </div>
                            </div>
                        </div>
                        <div class="movie-title">${m.EventTitle}</div>
                        <div class="date">
                            <div class="month">${dateObj.date}</div>
                            <div class="year">${dateObj.year}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('gallery').innerHTML = html;
    }

    //show trailer box on click
    app.openMovieTrailer = function(){
        let self = this;
        let trailerWrap = document.querySelector('.movie-trailer-wrap');

        if (trailerWrap) trailerWrap.remove();

        app.showActiveState(self);

        let html = app.getTrailerBox(self.id);
        document.querySelector('#gallery').insertBefore(html,self.parentNode);

        let offset = document.querySelector('.movie-trailer-wrap').offsetTop;
        document.documentElement.scrollTop = offset;

        document.querySelector('#close').addEventListener('click',function(){
            document.querySelector('.movie-trailer-wrap').remove();
            app.showActiveState();
        });
    }

    app.showActiveState = function(element){
        document.querySelectorAll('.movie-wrap').forEach(function(e){
            e.classList.remove("active");
        });
        element.classList.add("active");
    }

    //generate trailer box html
    app.getTrailerBox = function(eventCode){
        let movie = app.data[eventCode];
        let date = app.getDateYear(movie.ShowDate);
        let ytid = app.youTubeVideoid(movie.TrailerURL);
        let geners = movie.EventGenre.split("|");

        let html = `
        <div class="movie-trailer-wrap">
            <div class="movie-trailer-left">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="movie-trailer-right">
                <div class="close" id="close">
                    <svg style="width:35px;height:35px" viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </div>
                <div class="movie-info">
                    <div class="movie-trailer-name">${movie.EventTitle}</div>
                    <div class="movie-trailer-language">${movie.EventLanguage}</div>
                    <div class="movie-trailer-gener">
        `;
        geners.forEach(function(gener){
            html += `
                            <span class="gener-name">${gener}</span>
                    `;
        });
        html += `
                    </div>
                    <div class="movie-trailer-stats">
                        <div class="mts-item">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" d="M0 0h24v24H0V0z" />
                                    <path
                                        fill="#fff"
                                        d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                    </svg>
                            </div>
                            <div class="content">
                                <div class="percentage">${movie.wtsPerc}%</div>
                                <div class="votes">${movie.csCount} votes</div>
                            </div>
                        </div>
                        <div class="mts-item">
                            <div class="icon">
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="#ffffff"
                                        d="M7,12H9V14H7V12M21,6V20A2,2 0 0,1 19,22H5C3.89,22 3,21.1 3,20V6A2,2 0 0,1 5,4H6V2H8V4H16V2H18V4H19A2,2 0 0,1 21,6M5,8H19V6H5V8M19,20V10H5V20H19M15,14V12H17V14H15M11,14V12H13V14H11M7,16H9V18H7V16M15,18V16H17V18H15M11,18V16H13V18H11Z" />
                                </svg>
                            </div>
                            <div class="content">
                                <div class="percentage">${date.date}</div>
                                <div class="votes">${date.year}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="movie-stats-wrap">
                    <div class="movie-stats movie-stats-green">
                        <span class="movie-stats-icon movie-stats-icon-green">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z" />
                                <path
                                    fill="#40a458"
                                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                </svg>
                        </span>
                        <span class="movie-stats-text">will watch</span>
                        <span class="movie-stats-number">${movie.wtsCount}</span>
                    </div>
                    <div class="movie-stats movie-stats-orange">
                        <span class="movie-stats-icon movie-stats-icon-orange">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="#fea502"
                                    d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />
                            </svg>
                        </span>
                        <span class="movie-stats-text">maybe</span>
                        <span class="movie-stats-number">${movie.maybeCount}</span>
                    </div>
                    <div class="movie-stats movie-stats-red movie-stats-icon-red">
                        <span class="movie-stats-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                    fill="#b24142"
                                    d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                                </svg>
                        </span>
                        <span class="movie-stats-text">wont watch</span>
                        <span class="movie-stats-number">${movie.dwtsCount}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        let div = document.createElement('div');
        div.innerHTML = html;
        return div;
    }

    //get youtube id from url
    app.youTubeVideoid = function(url){
        let parameters = url.split("?")[1];
        let id = parameters.substr(parameters.indexOf("=") + 1);
        return id;
    }

    // helper function to get date,year
    app.getDateYear = function(date){
        if(!date){ return false; }
        let showDate = date.split(",");
        let d = showDate[0].split(" ")[1];
        let y = showDate[1];
        return {
            date: d,
            year: y,
        }
    }

    //attach event listeners
    app.attachListener = function () {
        document.querySelectorAll('.movie-wrap').forEach(function(e){
            e.addEventListener('click', app.openMovieTrailer);
        });
    }

    //fetch data from json
    app.getData = function(){
        fetch('./data.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                app.data = myJson;
                app.showMovies();
                app.attachListener();
            });
    }

    //call for data on init
    app.init = function(){
        app.getData();
    }

    //init the app
    app.init();
})(window,document);