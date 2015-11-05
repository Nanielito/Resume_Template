var setCookie = function(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
    return false;
}

var getCookie = function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return '';
}

$(function() {
    var cookie = getCookie('i18next');
    var lng = (cookie != '' ? cookie : navigator.language || navigator.userLanguage);
    
    var option = {
        lng: (/^es-\d+$/).test(lng) ? 'es' : lng,
        useCookie: true,
        resGetPath: 'resources/locales/__lng__/__ns__.json',
        fallbacking: 'es'
    };
    
    $.i18n.init(option, function() {
        $('[id$="_section"]').i18n();
        return false;
    });
    
    $('.language input').on('click', function() {
        switch ($(this).attr('class')) {
            case 'spanish': lng = 'es'; break;
            case 'english': lng = 'en'; break;
            default       : lng = 'es';
        }
        
        setCookie("i18next", lng);
        window.location.reload();
        return false;
    });
    
    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {
        $('.level-bar-inner').each(function() {
            var itemWidth = $(this).data('level');
            $(this).animate({ width: itemWidth }, 800);
        });
        return false;
    });
    
    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    $("#rss-feeds").rss(
    
        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",
        
        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,
        
        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',
        
        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='item'>{entries}</div>",
        
        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        
        }
    );
    
    /* Github Activity Feed - https://github.com/nanielito/github-activity */
    GitHubActivity.feed({ username: "nanielito", selector: "#ghfeed" });
    
    return false;
});