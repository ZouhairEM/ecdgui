$(document).ready(function() {
    document.getElementsByTagName("html")[0].style.visibility = "visible";

    // Hide submenus
    $('#body-row .collapse').collapse('hide');

    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left');

    // Collapse click
    $('[data-toggle=sidebar-colapse]').click(function() {
        SidebarCollapse();
    });


    var numItems = $('.melding').length;
    $(".tabNumber").html(numItems);
    var darkModeEnabled = localStorage.getItem('darkModeEnabled');


    function SidebarCollapse() {
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

        // Treating d-flex/d-none on separators with title
        var SeparatorTitle = $('.sidebar-separator-title');
        if (SeparatorTitle.hasClass('d-flex')) {
            SeparatorTitle.removeClass('d-flex');
        } else {
            SeparatorTitle.addClass('d-flex');
        }

        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }

    /************************************************ Hamburger menu ************************************************/
    $('.open').click(function() {
        $(this).toggleClass('active');
        $('#body-row').toggleClass('active');
        $('.topNavRight').toggleClass('active');

        if ($(this).find("i").hasClass("fa-bars")) {
            $(this).find("i").addClass("fa-times").removeClass("fa-bars");
            $(".navigation-bar").hide();
            $("#notification-section").hide();
            $(".client-dossier").hide();
            $("#sidebar-container").removeClass("d-none").css({ "margin-left": "10%" });
            $(".menu-collapsed").removeClass("d-none");
            $(".open, .close").css({ "color": "white" });
            $("#sidebar-container > ul > a:nth-child(12)").css({ "display": "none!important;" });
            $(".notification-section").css({ "position": "fixed", "z-index": "-2" });
        } else {
            $(".notification-section").css({ "position": "initial", "z-index": "2" });
            $(this).find("i").addClass("fa-bars").removeClass("fa-times");
            $(".navigation-bar").show();
            $("#notification-section").show();
            $(".client-dossier").show();
            $("#sidebar-container").addClass("d-none");
            $(".menu-collapsed").addClass("d-none");
            $(".open, .close").css({ "color": "#254d71" });
            $("#sidebar-container > ul > a:nth-child(12)").css({ "display": "block!important;" });

        }
    });
    /************************************************ MELDINGEN ************************************************/
    $('.melding').click(function() {

        var $id = $(this).data("id");
        var $selected = $(this);
        $("tr.melding.activeMelding").mousedown(function(ev) {
            if (ev.which == 3) {

                $(".grid-wrapper").css({ "grid-template-rows": "0fr 1fr 9fr 3fr" }), $(".inluister-section").css({ "display": "block" }), $("#openstaandeMeldingen").css({ "max-height": "48vh" })

            }
        });

        $('tr.melding.activeMelding').click(function() {
            $(".grid-wrapper").css({ "grid-template-rows": "0fr 1fr 12fr" }), $(".inluister-section").css({ "display": "none" }), $("#openstaandeMeldingen").css({ "max-height": "73vh" });
        });

    });
    /************************************************ FILTEREN  ************************************************/
    $('.filter').click(function() {

        var $id = $(this).data("id");
        var $selected = $(this);

        $(".filter-section").css({ "display": "block" });
        $(".history-wrapper").css('grid-template-areas','"navigation navigation navigation navigation navigation""side statusbalk statusbalk statusbalk statusbalk""side title title title date""side history history history filter""side history history history filter""side history history history filter"');
    });

    $('.closeFilter').click(function() {
        $(".filter-section").css({ "display": "none" });
        $(".history-wrapper").css('grid-template-areas','"navigation navigation navigation navigation navigation""side statusbalk statusbalk statusbalk statusbalk""side title title title date""side history history history history""side history history history history""side history history history history"');
    });

    $('#afmeldenMelding').click(function() {
        removeAlarm();
    });

$(".replay").click(function(){
        $('.alert').html('<img src="images/misc/replay.png" height="50px;">');
        $(".alert").fadeIn();

$(".replay").click(function(){
        $(".alert").hide();
})

});


    function removeAlarm() {
        let meldingName = $(".melding.activeMelding > td.meldingType> div.meldingTypeName").text();

        $(".meldingNameType").html(meldingName);
        $(".alert").fadeIn().delay(4000).fadeOut();
        $('.alert').html('<span class="material-icons">warning</span><span>Alarm met type <span class="meldingNameType"></span> afgemeld<span class="undo">- ongedaan maken</span></span><span class="material-icons roundedIcon">close</span>');
        $(".melding.activeMelding").remove();
        $(".tabNumber").html($('.melding').length);
    }

    var undo = $('.melding.activeMelding');
    $('.undo').click(function() {
        $('#openstaandeMeldingen').append(undo);
    });



    /************************************************ TABS ************************************************/
    $(".tab").click(function() {
        $(".tab").removeClass("active");
        $(this).addClass("active");
    });

    $('a').on("click", function() {
        $(this).prev("div").toggleClass('hide');
    });
    /************************************************ Collapsibles ************************************************/
    $(".collapseTab").click(function() {

        $collapseTab = $(this);
        $content = $collapseTab.next();
        $content.slideToggle(500, function() {
            $collapseTab.text(function() {
                return $content.is(":visible") ? 'keyboard_arrow_up' : "keyboard_arrow_down";
            });
        });

    });
    /************************************************ Ranges ************************************************/
    const allRanges = document.querySelectorAll(".range_container");
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".range");
        const bubble = wrap.querySelector(".bubble");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    });

    function setBubble(range, bubble) {
        const val = range.value;
        const min = range.min ? range.min : 0;
        const max = range.max ? range.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.innerHTML = val;
        bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    }
    /************************************************ AUOT-COLLAPSE SIDEBAR ************************************************/

    $(document).ready(function() {
        function doneResizing() {
            if (Modernizr.mq('screen and (min-width:1400px)')) {
                $("#sidebar-container").removeClass('d-none d-md-block sidebar-collapsed');
                $("#sidebar-container").addClass('d-none d-md-block sidebar-expanded');
                $("#collapse-icon").removeClass('fa fa-2x mr-3 fa-angle-double-right');
                $("#collapse-icon").addClass('fa fa-2x mr-3 fa-angle-double-left');
                $(".menu-collapsed").removeClass("d-none");


            } else if (Modernizr.mq('screen and (max-width:1400px)')) {
                $("#sidebar-container").removeClass('d-none d-md-block sidebar-expanded');
                $("#sidebar-container").addClass('d-none d-md-block sidebar-collapsed');


                $("#collapse-icon").removeClass('fa fa-2x mr-3 fa-angle-double-left');
                $("#collapse-icon").addClass('fa fa-2x mr-3 fa-angle-double-right');
                $(".menu-collapsed").addClass("d-none");


            }
        }

        var id;
        $(window).resize(function() {
            clearTimeout(id);
            id = setTimeout(doneResizing, 0);
        });

        doneResizing();
    });


    /************************************************ TABLESORT ************************************************/
    $(function() {

        $("#myTable").tablesorter({ 
            sortList: [[0,1],[0,0]]
        });
        // $('.tablepager').tablepager();
    });


    /************************************************ PRODUCT TOUR ************************************************/
    
    $('.tour').click(function() {
        startTour();
    });
        function startTour() {
    
        // Initialize the tour
        tour.init();
        // Restart from begining
        tour.restart();
        // Start the tour
        tour.start(true);
    }
    var tour = new Tour({
        smartPlacement: false,
        backdrop: true,
        steps: [{
            element: ".notification-section",
            placement: 'right',
            title: "Bewaking ",
            content: "Dit is de bewaking. In dit vak staan de nog openstaande meldingen op een rijtje."
        }, {
            element: ".lint",
            placement: 'bottom',
            title: "Lint",
            content: "U kunt nu sorteren op de meldingen zodat u zelf zicht hebt op meldingen van dezelfde bewoner/locatie."
        }, {
            element: "#openstaandeMeldingen > tr:nth-child(2)",
            placement: 'bottom',
            title: "Melding",
            content: "De melding heeft een nieuwe, meer logische volgorde. Van links naar rechts staat de meest belangrijke informatie."
        }, {
            element: ".client-dossier",
            placement: 'left',
            title: "Bewonersinformatie",
            content: "In dit dossier vindt u meer informatie over een melding waarop is geklikt, welke bewoner het betreft en zijn of haar individuele zorgplan etc.",
            onNext: function(tour) {
                $(".client-dossier > div > label.tab.active").removeClass("active");
                $(".client-dossier > div > label:nth-child(5)").addClass("active");
                $(".client-dossier__panel-section.alarm").hide();
                $(".client-dossier__panel-section.plattegrondTab").show();
                $(".client-dossier__panel-section.videoTab").hide();
                $(".client-dossier__panel-section.instellingenTab").hide();
            }
        }, {
            element: ".client-dossier",
            placement: 'left',
            title: "Plattegrond",
            content: "In dit tabblad vindt u een plattegrond van de route naar de bewoner in kwestie.",
            onPrev: function(tour) {
                $(".client-dossier > div > label.tab.active").removeClass("active");
                $(".client-dossier > div > label:nth-child(2)").addClass("active");
                $(".client-dossier__panel-section.alarm").show();
                $(".client-dossier__panel-section.plattegrondTab").hide();
                $(".client-dossier__panel-section.videoTab").hide();
                $(".client-dossier__panel-section.instellingenTab").hide();
            },
            onNext: function(tour) {
                $(".client-dossier > div > label.tab.active").removeClass("active");
                $(".client-dossier > div > label:nth-child(8)").addClass("active");
                $(".client-dossier__panel-section.alarm").hide();
                $(".client-dossier__panel-section.plattegrondTab").hide();
                $(".client-dossier__panel-section.videoTab").show();
                $(".client-dossier__panel-section.instellingenTab").hide();
            }
        }, {
            element: ".client-dossier",
            placement: 'left',
            title: "Video",
            content: "Als een camera is geïnstalleerd binnen de woning van de betreffende bewoner kunt u deze hier bedienen.",
            onPrev: function(tour) {
                $(".client-dossier > div > label.tab.active").removeClass("active");
                $(".client-dossier > div > label:nth-child(5)").addClass("active");
                $(".client-dossier__panel-section.alarm").hide();
                $(".client-dossier__panel-section.plattegrondTab").show();
                $(".client-dossier__panel-section.videoTab").hide();
                $(".client-dossier__panel-section.instellingenTab").hide();
            },
            onNext: function(tour) {
                $(".client-dossier > div > label.tab.active").removeClass("active");
                $(".client-dossier > div > label:nth-child(11)").addClass("active");
                $(".client-dossier__panel-section.alarm").hide();
                $(".client-dossier__panel-section.plattegrondTab").hide();
                $(".client-dossier__panel-section.videoTab").hide();
                $(".client-dossier__panel-section.instellingenTab").show();
            }
        }, {
            element: ".client-dossier",
            placement: 'left',
            title: "Instellingen",
            content: "In dit laatste tabblad vind u de instellingen met betrekking tot de melding. Hier kunt u bijvoorbeeld het inluistervolume regelen.",
            onPrev: function(tour) {
                $(".client-dossier > div > label.tab.active").removeClass("active");
                $(".client-dossier > div > label:nth-child(8)").addClass("active");
                $(".client-dossier__panel-section.alarm").hide();
                $(".client-dossier__panel-section.plattegrondTab").hide();
                $(".client-dossier__panel-section.videoTab").show();
                $(".client-dossier__panel-section.instellingenTab").hide();
            }
        }],
        onEnd: function(tour) {
            $(".client-dossier > div > label.tab.active").removeClass("active");
            $(".client-dossier > div > label:nth-child(2)").addClass("active");
            $("input[type=radio],.client-dossier__panel-section").hide();
            $(".client-dossier__panel-section.alarm").show();

        },

    });

    var modal = document.getElementById("myModalContainer");

    $('.settings-section').click(function() {
        $("#myModal").show();
        $("#myModalContainer").show();
        $(".settings-panel").show();
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            $("#myModal").hide();
            $("#myModalContainer").hide();
            $(".settings-panel").hide();
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            $("#myModal").hide()
            $("#myModalContainer").hide();
            $(".settings-panel").hide();
        }
    }

    $('.block-switch > label > input[type=checkbox]:checked').parent().parent().find('.block-switch-off').css('visibility', 'hidden');
    $('.block-switch > label > input[type=checkbox]:checked').parent().parent().find('.block-switch-on').css('visibility', 'visible');
    $('.block-switch > label > input[type=checkbox]:not(:checked)').parent().parent().find('.block-switch-off').css('visibility', 'visible');
    $('.block-switch > label > input[type=checkbox]:not(:checked)').parent().parent().find('.block-switch-on').css('visibility', 'hidden');

    $('.block-switch > label > input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {
            $(this).parent().parent().find('.block-switch-on').css('visibility', 'visible');
            $(this).parent().parent().find('.block-switch-off').css('visibility', 'hidden');
        } else if (!$(this).is(':checked')) {
            $(this).parent().parent().find('.block-switch-off').css('visibility', 'visible');
            $(this).parent().parent().find('.block-switch-on').css('visibility', 'hidden');
        }
    });


     if(darkModeEnabled == "true"){

        $('body, .open-section, .favorites-section, .settings-section, .total-section, .tips-section, .chart-section, .alarms-section, .modal-content').toggleClass('dark');
        $('.title-section, .date-section, .statusbalk, .tabIcon, .meldingStatus, .meldingType, .open, .close, .subTitle-section, .list-group-item, .side-bar, .client-dossier__tab-section>div, .lint, .gauge, .tabNumber').toggleClass('dark');
        $('.client-dossier>div>label.active, label.active>span.material-icons.tabIcon, .dashboardLint, .slider, hr, .tabName, .subTitle, .filter-section, .meldingTypeName, .navigation-bar, .range').toggleClass('dark');
        $('.notification-section, .client-dossier>div>label.active, .client-dossier>div>label, .boxfield, .box, .widebox, .inluister-section, .overviewlist > li').toggleClass('dark');
        $('#openstaandeMeldingen .melding, .client-dossier>div>label.active, .history-section, .statusbalk-section, .kus-section, .cameras-section, .alarmeringen-section, .sensoren-section, .domotica-section, .storingen-section, .statusAlarms').toggleClass('dark');

        if($('body').hasClass('dark')){
            $('.toggleDarkMode').trigger('click');
        } 
     };


    $('.grafiek > label > input[type=checkbox]').click(function (){

            if($(this).is(':checked')){
                $(".chart-section").show();
            } else{
                $(".chart-section").hide();
            }


    });

    $('.toggleDarkMode').click(function (){

        $('body, .open-section, .favorites-section, .settings-section, .total-section, .tips-section, .chart-section, .alarms-section, .modal-content').toggleClass('dark');
        $('.title-section, .date-section, .statusbalk, .tabIcon, .meldingStatus, .meldingType, .open, .close, .subTitle-section, .list-group-item, .side-bar, .client-dossier__tab-section>div, .lint, .gauge, .tabNumber').toggleClass('dark');
        $('.client-dossier>div>label.active, label.active>span.material-icons.tabIcon, .dashboardLint, .slider, hr, .tabName, .subTitle, .filter-section, .meldingTypeName, .navigation-bar, .range').toggleClass('dark');
        $('.notification-section, .client-dossier>div>label.active, .client-dossier>div>label, .boxfield, .box, .widebox, .inluister-section, .overviewlist > li').toggleClass('dark');
        $('#openstaandeMeldingen .melding, .client-dossier>div>label.active, .history-section, .statusbalk-section, .kus-section, .cameras-section, .alarmeringen-section, .sensoren-section, .domotica-section, .storingen-section, .statusAlarms').toggleClass('dark');

            darkModeEnabled = localStorage.setItem("darkModeEnabled", true);

        if($('body').hasClass('dark')){


            // $('.toggleDarkMode').trigger('click');
            darkModeEnabled = localStorage.setItem("darkModeEnabled", true);
        } else{
            darkModeEnabled = localStorage.setItem("darkModeEnabled", false);
        }

    })

var timerDiv = document.getElementsByClassName('timerDiv')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timerDiv.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "0") + " min. " + (seconds > 9 ? seconds : " sec. " + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();

});



