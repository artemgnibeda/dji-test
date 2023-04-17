$(document).ready(function () {
    $(document).on('click','.js-show-more',function (){
        $(this).hide().siblings('.js-news-text').addClass('show-all').css('height','100%');
    })

    $('.js-btn-burger').on('click',function (){
        $(this).toggleClass('active').siblings('.js-nav').fadeToggle();
    })

    $('select').customSelect({
        block: 'select-wrap',
    });

    function checkNewstText() {
        let allNews = $('.js-news-text'),
           lengthRow = 70;
        allNews.each(function (){
            if(!$(this).siblings('js-show-more').length){
                let str = $(this).text();
                if(str.length > lengthRow) {
                    let firstSet = str.substring(0, lengthRow);
                    let secdHalf = str.substring(lengthRow, str.length);
                    $(this).html(firstSet +"<span class='points'>...</span>"+ "<span class='second-section'>" + secdHalf + "</span>").after('<button type="button" class="show-more js-show-more">Show more...</button>')
                }
            }
        });
    }
    function createCard(data) {
        let cards = data,
            container = $('.js-news-list');
        for (let card in cards) {
            let thisCard = cards[card];
            container.append('<div class="col-sm-6">\n' +
                '                                <div class="news__item">\n' +
                '                                    <div class="news__img">\n' +
                '                                        <img src="'+thisCard.download_url+'" alt="">\n' +
                '                                    </div>\n' +
                '                                    <div class="news__info">\n' +
                '                                        <div class="news__title h2-title">'+thisCard.author+'</div>\n' +
                '                                        <p class="js-news-text hide-lines">Here goes some sample</p>\n' +
                '                                    </div>\n' +
                '                                    <div class="news__buttons">\n' +
                '                                        <a href="" class="btn btn_orange">Save to collection</a>\n' +
                '                                        <a href="" class="btn btn_transparent">Share</a>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>')
        }
    }

    checkNewstText()


    let page = 1;

    $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            console.log(++page);
            $.ajax({
                url: 'https://picsum.photos/v2/list?page='+page+'&limit=9',
                dataType: 'JSON',
                type: 'GET',
                timeout: 600000,
                success: function (e,textStatus) {
                    if (textStatus == 'success') {
                        createCard(e)
                    } else {
                        alert(textStatus)
                    }
                }
            })
        }
    });
});