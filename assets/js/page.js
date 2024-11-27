/*
Author: Joe Tan (joetan54@gmail.com)

THIS CODE MAY NOT BE REDISTRIBUTED WITHOUT EXPLICIT PERMISSION
*/

window.console =
  window.console ||
  (function () {
    var c = {};
    c.log =
      c.warn =
      c.debug =
      c.info =
      c.error =
      c.time =
      c.dir =
      c.profile =
      c.clear =
      c.exception =
      c.trace =
      c.assert =
        function () {};
    return c;
  })();

var tabletBreakpoint = 767;

jQuery.support.placeholder = (function () {
  var i = document.createElement("input");
  return "placeholder" in i;
})();
jQuery(function ($) {
  if (
    !document.implementation.hasFeature(
      "http://www.w3.org/TR/SVG11/feature#Image",
      "1.1"
    )
  ) {
    $(document.body).addClass("no-svg");
  } else {
    $(document.body).addClass("svg");
  }
});

if (typeof isIE == "undefined") isIE = false;
var _gaq = _gaq || [];
var isBrowser = {
  Android: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPod|iPad/i) ? true : false;
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
  },
  Safari: function (version) {
    var agent = navigator.userAgent;
    if (!agent.match(/AppleWebKit/i)) return false;

    if (!version) return true;

    if (agent.match(new RegExp("Version/" + version))) {
      return true;
    }
    return false;
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Windows()
    );
  },
};
function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.search
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}
function oceangetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
function oceansetCookie(cookie_name, value, days) {
  var cookie = cookie_name + "=" + value + ";path=/;";

  if (days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    cookie = cookie + "expires=" + exdate.toGMTString();
  }

  document.cookie = cookie;
}

// misc formatting
jQuery(function ($) {
  $(document.body).removeClass("no-js").addClass("has-js");

  $("p:has(a.more)").addClass("hasMore");

  $("img[align=right]").addClass("alignright");
  $("img[align=left]").addClass("alignleft");

  $("ul,ol").each(function (j, ul) {
    $(ul)
      .find("> *")
      .each(function (i, li) {
        $(li).addClass(
          "nth-child-" + (i + 1) + " nth-child-" + (i % 2 == 0 ? "odd" : "even")
        );
      });
    $(ul).find("> *:last").addClass("last");
  });

  $("#content hr").each(function () {
    $(this).wrap('<div class="hr ' + $(this).attr("class") + '"></div>');
  });

  // pop open URLs that are now in the allowedDomains list into a new window
  var DOMAINS = DOMAINS || [];
  var hostName = window.location.hostname;
  var allowedDomains = DOMAINS || [];
  allowedDomains.push(hostName);

  var services = [
    "facebook.com/sharer",
    "twitter.com/intent",
    "pinterest.com/pin/create",
    "plus.google.com/share",
    "api.addthis.com",
    "linkedin.com/shareArticle",
  ];
  $(document).on(
    "click",
    'a.popup,a[href*="' + services.join('"],a[href*="') + '"]',
    function () {
      var w = $(this).data("width");
      var h = $(this).data("height");
      if (!w) w = 750;
      if (!h) h = 480;
      var w = window.open(
        $(this).attr("href"),
        "_blank",
        "width=" + w + ",height=" + h
      );
      return false;
    }
  );
  $(document).on("click", "a", function () {
    var a = $(this);
    var href = a.attr("href");
    if (!href) return;
    if (a.attr("target")) return;
    if (href.indexOf("//") == 0) {
      href = "http:" + href;
    }
    if (href.indexOf("http") != 0) return;

    var domain = href.match(/:\/\/(.[^/]+)/)[1];
    if ($.inArray(domain, allowedDomains) < 0) {
      a.attr("target", "_blank");
    }
  });

  // hide and reveal for styleguide
  jQuery(function ($) {
    $(".clickme").click(function () {
      $(this)
        .next()
        .slideToggle("fast", function () {
          // Animation complete.
        });
    });
  });

  //image rollovers
  $("img[hover]").each(function (i, img) {
    var hover = new Image();
    hover.src = $(img).attr("hover");
    var orig_src = $(img).attr("src");
    $(img).hover(
      function () {
        $(img).attr("src", hover.src);
      },
      function () {
        $(img).attr("src", orig_src);
      }
    );
  });
});

// table formatting
jQuery(function ($) {
  $("table").each(function (i, table) {
    var headers = [];
    table = $(table);
    var thead = table.find("> thead > tr > td, > thead > tr > th");
    for (var j = 0; j < thead.length; j++) {
      headers.push(
        thead
          .eq(j)
          .text()
          .replace(/^\s+|\s+$/g, "")
      );
    }
    table
      .find("> tbody > tr")
      .each(function (r, row) {
        var cells = $(row).find("> td");
        if (cells.length == headers.length) {
          cells.each(function (t, td) {
            td = $(td);
            if (!td.data("label")) {
              td.attr("data-label", headers[t]);
            }
          });
        }
      })
      .addClass("table-responsive");
  });
});

jQuery(function ($) {
  if (!$.support.placeholder) {
    $("[placeholder]")
      .focus(function () {
        var input = $(this);
        if (input.val() == input.attr("placeholder")) {
          input.val("");
          input.removeClass("placeholder");
        }
      })
      .blur(function () {
        var input = $(this);
        if (input.val() == "" || input.val() == input.attr("placeholder")) {
          input.addClass("placeholder");
          input.val(input.attr("placeholder"));
        }
      })
      .blur();
    $("[placeholder]")
      .parents("form")
      .submit(function () {
        $(this)
          .find("[placeholder]")
          .each(function () {
            var input = $(this);
            if (input.val() == input.attr("placeholder")) {
              input.val("");
            }
          });
      });
  }
  /*	$('[placeholder]:not(.noclear)').focus(function() {
		if (!$(this).data('placeholder')) {
			$(this).data('placeholder', $(this).attr('placeholder'))
		}
		$(this).attr('placeholder', '');
	}).blur(function() {
		$(this).attr('placeholder', $(this).data('placeholder'));
	});*/
});

// drop down menu handlers
jQuery(function ($) {
  if (typeof jQuery.fn.hoverIntent == "undefined") return;
  var win = $(window);

  var nav = $("#nav");
  nav.find("> ul > li > a").on("click", function () {
    var m = $(this).closest("li");
    var ul = m.find("> ul");
    if (ul.length > 0) {
      m.toggleClass("hover");
      if (m.hasClass("hover")) {
        ul.slideDown({
          start: function () {
            var d = $(window).outerWidth() < 971 ? "block" : "flex";
            $(this).css({ display: d });
            $("body").addClass("meganav-open");
          },
          duration: "fast",
        }).addClass("opened");
        m.siblings()
          .removeClass("hover")
          .find("> ul")
          .hide()
          .removeClass("opened");
      } else {
        ul.slideUp("fast").removeClass("opened");
        $("body").removeClass("meganav-open");
      }
      return false;
    }
  });

  $(document.body).on("click", function (e) {
    if ($(e.target).closest("#nav").length > 0) {
      return true;
    }

    nav.find("> ul ul").slideUp("fast").removeClass("opened");
    nav.find("li").removeClass("hover");
    $("body").removeClass("meganav-open");
    return true;
  });
});

// expandable sections
jQuery(function ($) {
  /*
	var more = $('<li class="show-more">...See More</li>');
	more.click(function() {
		$(this).hide('fast').siblings().slideDown('fast');
	});
	$('#sidebar .expandable').each(function(i, obj) {
		$(obj).click(function() {
			$(this).toggleClass('opened')
			$(this).next('ul').slideToggle()
			if ($(this).hasClass('opened')) {
				$(this).find('span.status').text('[-]')
			} else {
				$(this).find('span.status').text('[+]')
			}
			return false;
		});
		var list = $(obj).next('ul');
		if ($(obj).hasClass('opened') || list.find('li.selected, li.current-cat').length > 0) {
			$(obj).append(' <span class="status">[-]</span>')
			$(obj).addClass('opened')
		} else {
			$(obj).append(' <span class="status">[+]</span>')
			list.hide();
		}
		var listAll = $(obj).hasClass('list-all');
		if (!listAll) {
			var elems = list.find('> li')
			if (elems.length > 10 && elems.filter(':not(.current-cat)').length <= 0) {
				elems.eq(8).nextAll().hide();
				list.append(more.clone(true));
			}
		}

	});

	$('dl.expandable dt').click(function() {
		$(this).next('dd').slideToggle();
		return false;
	});
*/
  $(".main-content .expandable").each(function (i, hdr) {
    var tagName = $(this).prop("tagName").toUpperCase();
    if (tagName == "H5") {
      tagName = "H5,H4,H3,H2,H1";
    } else if (tagName == "H4") {
      tagName = "H4,H3,H2,H1";
    } else if (tagName == "H3") {
      tagName = "H3,H2,H1";
    } else if (tagName == "H2") {
      tagName = "H2,H1";
    }

    $(this)
      .nextUntil(".expandable,hr,.hr," + tagName)
      .wrapAll('<div class="expand-content"></div>');
    var expand = $(this).next(".expand-content");
    $(this)
      .click(function () {
        $(this).toggleClass("opened");
        if ($(this).hasClass("opened")) {
          expand.slideDown("fast");
        } else {
          expand.slideUp("fast");
        }
      })
      .append('<span class="i"></span>');
    if ($(this).hasClass("opened")) {
      expand.show();
    }
  });
});

// expandable boxes
jQuery(function ($) {
  var boxes = $(".expandable-box");
  if (boxes.length <= 0) return;

  boxes.each(function () {
    var box = $(this);
    var label = box.data("view-label");
    console.log("label", label, box);
    if (!label) label = "Read more";
    $('<span class="more">' + label + "</span>")
      .click(function () {
        box.toggleClass("on");
        if (box.hasClass("on")) {
          $(this).text("Less");
        } else {
          $(this).text("Read more");
        }
      })
      .appendTo(box);
  });
});

// print preview
jQuery(function ($) {
  var links = $("link[rel=stylesheet]");
  var print = links.filter("link[media=print]");
  var screen = links.filter("link:not([media=print])");
  $("a.print").click(function () {
    create_preview();
    return false;
  });
  function create_preview() {
    $(print).each(function (i, stylesheet) {
      $(stylesheet).attr("media", "all");
    });
    $(screen).each(function (i, stylesheet) {
      $(stylesheet).attr("disabled", "disabled");
    });
    var done = $('<input type="button" value="Done" />');
    done.click(function () {
      close_preview();
    });
    var preview = $(
      '<form id="print-preview" style="margin: 0 0 2em 0; padding:0.75em; border-bottom:1px solid #555;background:#ccc;"><strong>Print Preview</strong> &nbsp; &nbsp; <input type="button" value="Print this Page" onclick="window.print()" /> &nbsp; &nbsp; <style media="print">#print-preview { display:none} </style></form>'
    );
    preview.append(done).prependTo("body");

    setTimeout(function () {
      window.print();
    }, 1000);
  }

  function close_preview() {
    $(print).each(function (i, stylesheet) {
      $(stylesheet).attr("media", "print");
    });
    $(screen).each(function (i, stylesheet) {
      $(stylesheet).attr("disabled", false);
    });
    $("#print-preview").remove();
  }
});

jQuery(function ($) {
  var body = $(document.body);
  $(document).on("click", ".clickable", function (e) {
    if (e.target.tagName.toUpperCase() == "A") {
      return;
    }
    var href = $(this).data("href");
    if (!href) {
      href = $(this).find("a").attr("href");
    }
    href = href + "";

    if (href) {
      if (href.match(/:\/\/(.[^/]+)/)) {
        var DOMAINS = DOMAINS || [];
        var hostName = window.location.hostname;
        var allowedDomains = DOMAINS || [];
        allowedDomains.push(hostName);

        var domain = href.match(/:\/\/(.[^/]+)/)[1];
        if ($.inArray(domain, allowedDomains) < 0) {
          window.open(href, "_blank");
          return false;
        } else {
          window.location = href;
        }
      }

      window.location = href;
    }
  });
  $(".toggle").click(function (e) {
    var toggleClass = $(this).data("toggle-class");
    body.toggleClass(toggleClass);
    if (body.hasClass(toggleClass)) {
      $(this).addClass("on");
      $(this)
        .siblings(".toggle")
        .each(function () {
          $(this).removeClass("on");
          body.removeClass($(this).data("toggle-class"));
        });
    } else {
      $(this).removeClass("on");
    }
    body.trigger("toggle-class:" + toggleClass);

    return false;
  });
  body.removeClass("no-js");
});

// sticky
jQuery(function ($) {
  var sticky = $(".sticky");
  if (sticky.length <= 0) return;

  var body = $(document.body);
  var win = $(window);
  var refreshTimer = false;

  function refreshStickyPositions() {
    sticky.removeClass("init bottom fixed").each(function () {
      var me = $(this);
      me.data("objTop", me.offset().top);
      var parent = me.parent();
      me.data(
        "objBottom",
        parent.offset().top + parent.outerHeight() - me.outerHeight()
      );
    });
    win.scroll();
  }
  win
    .load(function () {
      refreshStickyPositions();
    })
    .bind("resize", function () {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = false;
      }
      refreshTimer = setTimeout(function () {
        refreshStickyPositions();
      }, 50);
    });

  win.scroll(function () {
    var scrollTop = window.scrollY || win.scrollTop();
    sticky.each(function () {
      var me = $(this);
      position(me, scrollTop);
    });
  });
  win.scroll();

  function position(obj, scrollTop) {
    var offset = parseInt(obj.data("offset-top"));
    if (!offset || isNaN(offset)) offset = 100;
    if (scrollTop >= obj.data("objBottom") - offset) {
      if (!obj.hasClass("bottom")) {
        obj.addClass("bottom");
      }
    } else {
      if (obj.hasClass("bottom")) {
        obj.removeClass("bottom");
      }

      if (scrollTop >= obj.data("objTop") - offset) {
        if (!obj.hasClass("fixed")) {
          obj.addClass("fixed");
          obj.data("top", obj.position().top);
        }
      } else {
        if (obj.hasClass("fixed")) {
          obj.removeClass("fixed");
        }
      }
    }
  }
});

// subscribe to window messages
jQuery(function ($) {
  var eventMethod = window.addEventListener
    ? "addEventListener"
    : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(
    messageEvent,
    function (e) {
      if (e.data.action) {
        if (e.data.action == "setIFrameHeight") {
          $("iframe").css({ minHeight: e.data.value });
        } else if (e.data.action == "scroll-to-top") {
          $("html, body").animate({ scrollTop: "0px" });
        }
      } else {
        console.log("Received message", e);
      }
    },
    false
  );

  //if (window.parent) {
  //	window.parent.postMessage({action:'setIFrameHeight', value:$(document.body).height()}, '*');
  //}
});

// fit text
jQuery(function ($) {
  var texts = $(".fit-text");
  if (texts.length <= 0) return;
  update();
  var rTimer = null;
  $(window).resize(function () {
    if (rTimer) {
      clearTimeout(rTimer);
    }
    rTimer = setTimeout(function () {
      update();
    }, 10);
  });

  function update() {
    texts.each(function () {
      var text = $(this);
      var container = text.data("container")
        ? text.closest(text.data("container"))
        : text.parent();
      var contentWidth = container.width();
      var i = 0;
      text.attr("style", "");
      if (text.width() > contentWidth) {
        text.addClass("resizing");
        var fontSize = parseInt(text.css("fontSize"));
        while (text.width() > contentWidth && fontSize > 16 && i++ < 100) {
          fontSize = fontSize - 1;
          text.css({ fontSize: fontSize + "px" });
        }
        text.removeClass("resizing");
      }
    });
  }
});

// overlays
jQuery(function ($) {
  var overlay = $("#overlay");
  var overlayContent = overlay.find(".content");
  var delay = 500;

  var mask = $("#overlay-mask");
  var body = $(document.body);
  body.on("overlay:load", function (e) {
    body.addClass("mask-on overlay-init overlay-loading");
    mask.addClass("on");
  });

  body.on("overlay:show", function (e, html) {
    overlayContent.html(html);
    var p = overlayContent.position();
    var winHeight = $(window).height();
    overlayContent.css({ height: winHeight - p.top });
    overlay.css({ height: winHeight });
    body.removeClass("overlay-loading").addClass("overlay-on overlay-init");

    $.when(overlay.fadeIn(delay)).then(function () {
      overlay.addClass("on");
    });
  });
  body.on("overlay:hide", function (e) {
    body.removeClass("mask-on overlay-on overlay-loading");
    mask.removeClass("on");
    $.when(overlay.fadeOut(delay)).then(function () {
      overlayContent.html("").css({ height: "auto" }).attr("style", "");
      overlay.attr("class", "").attr("style", "");
      body.removeClass("overlay-init");
    });
  });

  overlay.find(".close").click(function () {
    body.trigger("overlay:hide");
    return false;
  });
  mask.click(function () {
    body.trigger("overlay:hide");
  });
  $(document).on("keypress keydown", function (e) {
    if (e.which == 27) {
      body.trigger("overlay:hide");
    }
  });
});

// popup embed
jQuery(function ($) {
  var popups = $(".play");
  if (popups.length <= 0) return;
  var body = $(document.body);

  popups.click(function () {
    var href = $(this).attr("href");
    body.trigger("overlay:load");
    $("#overlay").addClass("player");

    $.post(
      THEME.ajaxurl,
      {
        action: "oembed_get",
        url: href,
      },
      function (response) {
        if (response["status"] == "ok") {
          body.trigger("overlay:show", response["html"]);
        } else {
          console.log("Error retrieving media for " + href);
          body.trigger("overlay:hide");
        }
      },
      "json"
    );
    return false;
  });
});

// scrolled a bit
jQuery(function ($) {
  var win = $(window);
  var body = $(document.body);
  win.scroll(function () {
    update();
  });
  update();
  setTimeout(function () {
    update();
  }, 300);

  function update() {
    var scrollTop = window.scrollY || win.scrollTop();
    if (scrollTop > 100) {
      body.addClass("scrolled");
    } else {
      body.removeClass("scrolled");
    }
  }
});

// scroll handler
jQuery(function ($) {
  var sections = $(
    [
      ".appear",
      //'.count-up',
      //'.posts',
      ".section:not(.no-appear)",
      ".step-visible:not(.manual)",
    ].join(",")
  );
  var winH = $(window).height();
  var offsetH = winH * 0.05;
  $(window).on("scroll resize scroll:setup", function () {
    var scrollTop = window.scrollY || $(window).scrollTop();

    sections.each(function () {
      var section = $(this);
      var position = section.offset();
      if (scrollTop + winH > position.top + offsetH) {
        if (!section.data("visible")) {
          section.data("visible", true);
          setTimeout(function () {
            section.addClass("visible").trigger("visible");
          }, 10);
        }
      }
    });
  });

  setTimeout(function () {
    $(window).trigger("scroll:setup");
  }, 200);
});

// forms
jQuery(function ($) {
  $(document).on("nfFormReady", function () {
    setup_selects();
  });
  $(document.body).on("init:form-selects", function () {
    setup_selects();
  });
  setup_selects();
  function setup_selects() {
    var selects = $("select:not(.initialized)");
    if (selects.length <= 0) return;

    selects.each(function () {
      var select = $(this);

      if (select.hasClass("system")) return;

      var wrapHTML = $(
        '<div class="select input ' +
          (select.attr("class") ? select.attr("class") : "") +
          '"></div>'
      );
      select.wrap(wrapHTML);
      wrapHTML = select.closest(".select.input");

      wrapHTML.prepend(
        '<strong><span class="text"></span> <span class="icon fa fa-angle-down"></span></strong>'
      );

      var defaultText = wrapHTML.find("strong .text").text();
      if (defaultText == "") {
        defaultText = select.find("option:first").text();
        wrapHTML.find("strong .text").text(defaultText);
      }

      var selected = select.find("option:selected");

      if (
        selected.length > 0 &&
        selected.val() != "" &&
        !selected.hasClass("none")
      ) {
        var text = selected.text();
        wrapHTML.find("strong .text").text(text);
      }

      select.on("change", function () {
        var selected = select.find("option:selected");
        var text = selected.text();
        if (selected.val() == "") {
          text = defaultText;
          wrapHTML.removeClass("selected");
        } else {
          wrapHTML.addClass("selected");
        }

        wrapHTML.find("strong .text").text(text);
      });
      select.on("select:change", function (e, option) {
        var text = option.text;

        if (option.value == "") {
          text = defaultText;
          wrapHTML.removeClass("selected");
        } else {
          wrapHTML.addClass("selected");
        }
        wrapHTML.find("strong .text").text(text);
      });
      select.on("select:reset", function () {
        select.find("option:selected").prop("selected", false);
        select.trigger("select:change", {
          value: "",
        });
        wrapHTML.find(".option.selected").removeClass("selected");
      });

      select.on("enable-options", function (e, opts) {
        select.find('option:not([value=""])').prop("disabled", true);
        wrapHTML.find('.option:not([data-value=""])').addClass("disabled");
        for (var i in opts) {
          select
            .find('option[value="' + opts[i] + '"]')
            .prop("disabled", false);
          wrapHTML
            .find('.option[data-value="' + opts[i] + '"]')
            .removeClass("disabled");
        }
      });
      select.on("enable-all-options", function () {
        select.find("option").prop("disabled", false);
        wrapHTML.find(".option").removeClass("disabled");
      });

      var ul = $('<div class="select"></div>').appendTo(wrapHTML);
      var pubLabel = false;

      select.find("option").each(function (i) {
        var opt = $(this);
        var text = opt.data("text") ? opt.data("text") : opt.text();

        var li = $(
          '<div class="option ' +
            (opt.data("is_pub") ? "publication" : "") +
            '" data-value="' +
            opt.attr("value") +
            '">' +
            text +
            "</div>"
        ).appendTo(ul);
        li.click(function () {
          if ($(this).hasClass("disabled")) {
            return false;
          }

          var value = $(this).data("value");
          $(this).addClass("selected").siblings().removeClass("selected");

          opt.prop("selected", true);
          ul.slideUp("fast");
          select.trigger("select:change", {
            value: value,
            text: $(this).text(),
          });
          wrapHTML.removeClass("on");
          return false;
        });

        if (i == 0) {
          opt.text("Show All").addClass("show-all");
          li.addClass("show-all");
        }
      });

      wrapHTML.find(">strong").click(function (e) {
        if ($(e.target).hasClass("icon") && wrapHTML.hasClass("selected")) {
          select.trigger("select:reset");
          return false;
        }

        wrapHTML.toggleClass("on");
        if (wrapHTML.hasClass("on")) {
          //wrapHTML.find('>.select').show();//.slideDown('fast');
          select.trigger("select:show");
        } else {
          //wrapHTML.find('>.select').hide();//.slideUp('fast');
          select.trigger("select:hide");
        }
        $(".select.input.on")
          .not(wrapHTML)
          .removeClass("on")
          .find(".select")
          .slideUp("fast");
        return false;
      });
      select.addClass("initialized");
    });

    $(document).click(function () {
      $(".select.input.on").removeClass("on").find(".select").slideUp("fast");
    });

    return;
  }
});

// posts-carousel
jQuery(function ($) {
  var carousels = $("#query-posts.carousel");
  if (carousels.length <= 0) return;

  carousels.each(function () {
    var self = $(this);
    var nav = $(
      '<div class="nav-wrap"><div class="spacer"></div><div class="nav"></div></div>'
    );
    if (self.find(">*").length > 1) {
      self.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        nextArrow:
          '<div class="slick-next"><span class="icon fa fa-angle-right"></span></div>',
        prevArrow:
          '<div class="slick-prev"><span class="icon fa fa-angle-left"></span></div>',
        appendArrows: nav.find(".nav"),
        appendDots: nav.find(".nav"),
        adaptiveHeight: true,
      });
      //nav.wrap('');
      self.append(nav);
    }
  });
});

// header search
jQuery(function ($) {
  var form = $("#header form");
  var s = form.find('input[name="s"]');

  form.find(".close").on("click", function () {
    form.removeClass("on");
    $(document.body).removeClass("search-on");
    s.val("");
    return false;
  });

  form.on("submit", function () {
    if (s.val()) {
      return true;
    } else {
      form.toggleClass("on");
      if (form.hasClass("on")) {
        s.focus();
        $(document.body).addClass("search-on");
      } else {
        $(document.body).removeClass("search-on");
      }
      return false;
    }
  });
});

// banner
jQuery(function ($) {
  var banner = $(".section.banner");
  if (banner.length <= 0) return;

  var bg = banner.find(".bg");

  var t = null;
  $(window).on("resize load", function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(function () {
      refresh();
    }, 100);
  });
  refresh();

  function refresh() {
    var imgHeight = banner.find(".featured-image").height();
    bg.css({ maxHeight: imgHeight - 80 });
  }
});
// scroll linked sections
jQuery(function ($) {
  var slides = $(".theme-block.scrollable");
  if (slides.length <= 0) return;

  var winHeight = $(window).height();

  var body = $(document.body);

  refresh();
  setTimeout(function () {
    refresh();
    update();
  }, 200);

  var t = null;
  $(window)
    .on("scroll", function () {
      update();
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(function () {
        refresh();
      }, 200);
    })
    .on("load resize scroll:refresh", function () {
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(function () {
        refresh();
      }, 100);
    });
  function update(scrollTop) {
    if (!scrollTop) {
      scrollTop = window.scrollY || $(window).scrollTop();
    }
    if (scrollTop <= 4) {
      $(window).trigger("scroll:beforeStart");
    }

    var winHeightPadding = winHeight / 3;

    slides.each(function (i) {
      var slide = $(this);
      var slideHeight = slide.data("height");
      var contentHeight = 0; //slide.data('contentHeight');
      var id = slide.attr("id");

      var offsetPosition = slide.data("offset"); //slide.offset();
      var transitionPercent = 0;
      var percent = 0;

      if (
        // if visible
        scrollTop + winHeight >= offsetPosition.top &&
        scrollTop + winHeight <= offsetPosition.top + slideHeight + winHeight
      ) {
        if (!slide.hasClass("visible")) slide.addClass("visible");

        percent =
          (scrollTop + winHeight - offsetPosition.top) /
          (slideHeight + winHeight);

        slide.trigger("scroll:tick", [percent, scrollTop]);
      } else {
        slide.removeClass("visible");
      }

      if (scrollTop + winHeight >= offsetPosition.top + winHeight / 3) {
        if (!slide.hasClass("start")) {
          slide.addClass("start");
          body.trigger("slide-start-on", [id, slide]);
        }
      } else {
        if (slide.hasClass("start")) {
          slide.removeClass("start");
          body.trigger("slide-start-off", [id, slide]);
        }
      }
      if (
        scrollTop + winHeight >=
        offsetPosition.top + slideHeight + winHeight / 3
      ) {
        if (!slide.hasClass("end")) {
          slide.addClass("end");
          body.trigger("slide-end-on", [id, slide]);
        }
      } else {
        if (slide.hasClass("end")) {
          slide.removeClass("end");
          body.trigger("slide-end-off", [id, slide]);
        }
      }
    });
  }
  function refresh() {
    winHeight = $(window).height();
    slides.each(function () {
      $(this).data("height", $(this).outerHeight());
      $(this).data("offset", $(this).offset());
      //$(this).attr('data-debug-height', $(this).data('offset').top);

      //$(this).data('contentHeight', $(this).find('.content').outerHeight());
    });
  }
});

// project filters
jQuery(function ($) {
  var project_filters = $("#project-filters");
  if (project_filters.length <= 0) return;

  var projectsList = $("#projects-list");

  if (projectsList.length <= 0) return;

  var projects = projectsList.find(">.hentry.excerpt");

  var body = $(document.body);
  var results = $("#results");

  var more = $(
    '<div class="more"><a href="#more">Load More</a></div>'
  ).appendTo(projectsList);

  var filters = project_filters.find("select");
  filters.on("change select:change", function (e, selected) {
    updateList();
  });

  project_filters.on("submit", function () {
    updateList();
    return false;
  });

  body.on("map:show map:hide", function () {
    updateList();
  });
  updateList();

  more.on("click", function () {
    projects
      .filter(".hidden.on")
      .slice(0, 12)
      .removeClass("hidden")
      .each(function (i) {
        var self = $(this);
        setTimeout(function () {
          self.fadeIn("fast");
        }, i * 100);
      });
    if (projects.filter(".hidden.on").length <= 0) {
      more.addClass("done");
    }
    return false;
  });

  function resetList() {
    projects.attr("style", "").removeClass("hidden");

    if (projects.filter(".on").length >= 12) {
      //projects.slice(0, 7).show();
      projects.filter(".on").slice(12).addClass("hidden").hide();
      more.removeClass("done");
      //console.log(projects.filter('.on').length, projects.filter('.on').slice(12).length);
    } else {
      if (more && more.length > 0) {
        more.addClass("done");
      }
    }
  }

  function updateList() {
    projects.data("show", true);
    filters.each(function () {
      var val = $(this).find("option:selected").val();
      var taxonomy = $(this).data("taxonomy");
      if (val) {
        projects.each(function () {
          var p = $(this);
          if (!p.hasClass(taxonomy + "-" + val)) {
            p.data("show", false);
          }
        });
      }
    });
    var showMap = !$(document.body).hasClass("map-off");

    var ad = $("#projects-list > .hentry.ad").detach();

    var visible = 0;
    projects.each(function () {
      var p = $(this);
      if (showMap && !p.data("lat")) {
        p.data("show", false);
      }
      if (p.data("show")) {
        p.addClass("on").removeClass("off");
        visible = visible + 1;
        if (visible == 6) {
          p.after(ad);
        }
      } else {
        p.removeClass("on").addClass("off");
      }
    });

    if (visible <= 0) {
      body.trigger("map:reset");
      results.html("No results found.");
    } else {
      results.html("Showing " + visible + " results.");
    }

    body.trigger("map:update");
    resetList();
  }
});

// map
function initMap() {
  var body = jQuery(document.body);
  body.addClass("map-ready");

  setup_map(jQuery);
  body.on("toggle-class:map-off", function () {
    oceansetCookie("map-on", body.hasClass("map-off") ? -1 : 1);
    if (body.hasClass("map-off")) {
      body.trigger("map:hide");
    } else {
      body.trigger("map:show");
    }
  });
  if (oceangetCookie("map-on") > 0 || getURLParameter("show-map")) {
    body.removeClass("map-off");
    body.trigger("map:show");
  } else {
    body.addClass("map-off");
    body.trigger("map:hide");
  }
}

function get_map_styles() {
  return [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    { featureType: "poi", stylers: [{ visibility: "on" }] },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    { featureType: "road", stylers: [{ visibility: "on" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    { featureType: "transit", stylers: [{ visibility: "on" }] },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ];
}

function setup_map($) {
  var mapDOM = $("#map-embed");
  if (mapDOM.length <= 0) return;

  var body = $(document.body);
  var map = null,
    bounds = null,
    updateTimer = null;
  var initialCenter = null;

  var markers = [];

  var propertiesList = $("#projects-list");

  var styles = get_map_styles();

  var infoWindowCombined = null;

  $(document).on("click", ".hentry.project", function (e) {
    if (body.hasClass("map-on")) {
      if ($(e.target).hasClass("thumbnail")) {
        window.location = $(e.target).attr("href");
      }
      return false;
    }
  });

  body
    .on("map:reset", function () {
      if (map) {
        map.setZoom(10);
        map.setCenter(initialCenter);
      }
    })
    .on("map:show", function () {
      if (!map) {
        setup();
      } else {
        updateMap();
      }
    })
    .on("map:update", function () {
      if (map) updateMap();
    })
    .on("marker:highlight", function (e, marker_id) {
      var markerDOM = $("#" + marker_id);
      var marker = getMarker(marker_id);

      if (marker.highlight()) {
        markerDOM.addClass("on").siblings().removeClass("on");
        /*
                setTimeout(function() {
                    var top = markerDOM.position().top + propertiesList.scrollTop();
                    propertiesList.animate({scrollTop:top - 100});
                }, 100);
                */
      }
    })
    .on("marker:hover", function (e, marker_id) {
      var markerDOM = $("#" + marker_id);
      var marker = getMarker(marker_id);

      markerDOM.addClass("hover").siblings().removeClass("hover");
      //markerDOM.data('marker').hover();
      marker.hover();
    })
    .on("marker:off", function (e, marker_id) {
      var markerDOM = $("#" + marker_id);
      var marker = getMarker(marker_id);
      markerDOM.removeClass("hover");
      //markerDOM.data('marker').off();
      marker.off();
    });

  function getMarker(id) {
    var indexOf = markers
      .map(function (e) {
        return e["id"];
      })
      .indexOf(id);
    if (indexOf >= 0) {
      return markers[indexOf];
    }
    return null;
  }

  function setup() {
    initialCenter = new google.maps.LatLng(38.9042714, -77.0374796);
    map = new google.maps.Map(mapDOM.get(0));
    map.setOptions({
      maxZoom: 12,
      zoom: 8,
      center: initialCenter,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
      scrollwheel: false,
    });
    var styledMap = new google.maps.StyledMapType(styles, {
      name: "Styled Map",
    });
    map.mapTypes.set("map_style", styledMap);
    map.setMapTypeId("map_style");

    infoWindowCombined = new LocationInfo();

    google.maps.event.addListener(map, "bounds_changed", function () {
      updateList();
    });
    updateMap();
  }

  function updateList() {
    if (updateTimer) {
      clearTimeout(updateTimer);
      timer = false;
    }
    updateTimer = setTimeout(function () {
      _updateList();
    }, 50);
  }
  function _updateList() {
    var mapBounds = map.getBounds();
    for (var i = 0, m; (m = markers[i]); i++) {
      if (m.visible && mapBounds.contains(m.getLatLng())) {
        m.getDom().removeClass("off");
      } else {
        m.getDom().addClass("off");
      }
    }
  }

  function updateMap() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].hide(); //setMap(null);
    }
    //markers = [];

    bounds = new google.maps.LatLngBounds();
    var visible = propertiesList.find(">.hentry[data-lat][data-lng].on");

    visible.each(function () {
      var self = $(this),
        marker;
      //console.log('hentry title', self.find('.title').text())
      var indexOf = markers
        .map(function (e) {
          return e["id"];
        })
        .indexOf(self.attr("id"));
      if (indexOf < 0) {
        marker = new LocationMarker(self);

        self
          .on("click", function () {
            body.trigger("marker:highlight", self.attr("id"));
          }) //.data('marker', marker)
          .on("mouseover", function () {
            body.trigger("marker:hover", self.attr("id"));
          })
          .on("mouseout", function () {
            body.trigger("marker:off", self.attr("id"));
          });

        markers.push(marker);
      } else {
        marker = markers[indexOf];
        marker.show(); //setMap(map);
      }

      bounds.extend(marker.getLatLng());
    });
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  }
  /*
    LocationGroup.prototype = new google.maps.OverlayView();
    LocationGroup.prototype.show = function() {

    }
    LocationGroup.prototype.draw = function() {
        var $ = jQuery;
        var projection = this.getProjection();

        var point = projection.fromLatLngToDivPixel(this.bounds.getCenter());

        var x = point.x;
        var y = point.y;
        $(this.html).html('<strong class="count">'+this.nodes.length+'</strong>');

        $(this.html).css({top:y,left:x});
    }
    LocationGroup.prototype.onAdd = function() {
        var me = this;
        me.getPanes().overlayMouseTarget.appendChild(me.html);
    }
    LocationGroup.prototype.onRemove = function() {
        this.html.parentNode.removeChild(this.html)
    }
    LocationGroup.prototype.getLatLng = function() {
        return this.latLng;
    }
    LocationGroup.prototype.getDom = function() {
        return this.dom;
    }
    LocationGroup.prototype.addNode = function(dom) {
        this.nodes.push(dom);
        this.bounds.extend(new google.maps.LatLng(parseFloat(dom.data('lat')), parseFloat(dom.data('lng'))))
    }

    function LocationGroup(location) {
        var $ = jQuery;
        var me = this;

        this.nodes = [];

        this.html = document.createElement('div');
        $(this.html).addClass('location-group').addClass('location-'+location);


        this.setMap(map);
        this.bounds  = new google.maps.LatLngBounds();

        google.maps.event.addListener(map, 'zoom_changed', function(e) {
            var zoom = map.getZoom();
            if (zoom < 11) {
                me.setMap(map);
            } else {
                me.setMap(null);
            }
        });
        google.maps.event.addDomListener(me.html, 'click', function(e) {
            console.log('clicked', me.bounds);
            map.fitBounds(me.bounds);
            if (map.getZoom() < 11) {
                map.setZoom(11);
            }

        });

    }
    */

  LocationInfo.prototype = new google.maps.OverlayView();
  LocationInfo.prototype.show = function () {
    this.setMap(map);
  };
  LocationInfo.prototype.hide = function () {
    this.setMap(null);
  };
  LocationInfo.prototype.draw = function () {
    var $ = jQuery;
    var projection = this.getProjection();

    var point = projection.fromLatLngToDivPixel(this.latLng);

    var x = point.x;
    var y = point.y;

    $(this.html).css({ top: y, left: x });
  };
  LocationInfo.prototype.onAdd = function () {
    var me = this;
    me.getPanes().overlayMouseTarget.appendChild(me.html);
  };
  LocationInfo.prototype.onRemove = function () {
    this.html.parentNode.removeChild(this.html);
  };
  LocationInfo.prototype.getLatLng = function () {
    return this.latLng;
  };
  LocationInfo.prototype.setLatLng = function (latLng) {
    this.latLng = latLng;
  };
  LocationInfo.prototype.resetLocations = function (which) {
    this.info.html("");
  };
  LocationInfo.prototype.addLocation = function (which) {
    var $ = jQuery;
    var dom = $("#" + which);
    var location = $('<div class="location"></div>');

    location.append(dom.find(".thumbnail").clone());
    location.append(dom.find(".title").clone());

    this.info.append(location);
  };

  function LocationInfo() {
    var $ = jQuery;
    var me = this;

    this.latLng = null;

    this.html = document.createElement("div");
    $(this.html).addClass("location-info");

    this.info = $('<div class="info">test</div>');
    $(this.html).append(this.info);
  }

  LocationMarker.prototype = new google.maps.OverlayView();
  LocationMarker.prototype.show = function () {
    this.setMap(map);
    this.visible = true;
  };
  LocationMarker.prototype.hide = function () {
    this.setMap(null);
    this.visible = false;
  };
  LocationMarker.prototype.draw = function () {
    var $ = jQuery;
    var projection = this.getProjection();

    var point = projection.fromLatLngToDivPixel(this.latLng);

    var x = point.x;
    var y = point.y;

    $(this.html).css({ top: y, left: x });
  };
  LocationMarker.prototype.onAdd = function () {
    var me = this;
    me.getPanes().overlayMouseTarget.appendChild(me.html);
  };
  LocationMarker.prototype.onRemove = function () {
    this.html.parentNode.removeChild(this.html);
  };
  LocationMarker.prototype.getLatLng = function () {
    return this.latLng;
  };
  LocationMarker.prototype.getDom = function () {
    return this.dom;
  };
  LocationMarker.prototype.highlight = function () {
    var $ = jQuery;
    var me = this;
    $(".location-marker").not(me.html).removeClass("on");
    $(me.html).toggleClass("on");
    if ($(me.html).hasClass("on")) {
      if (!me.getMap()) {
        me.show();
      }
      if (map.getZoom() < 11) {
        //map.setZoom(11);
        map.setCenter(me.getLatLng());
        //map.panTo(me.getPosition());
      }

      var containerWidth = mapDOM.width();
      //var width = me.info.outerWidth();
      //var height = me.info.outerHeight();
      var panned = false;
      var projection = this.getProjection();
      var newCenter = projection.fromLatLngToContainerPixel(map.getCenter());
      var markerPoint = projection.fromLatLngToContainerPixel(me.latLng);

      infoWindowCombined.resetLocations();
      infoWindowCombined.setLatLng(me.getLatLng());

      var found = 0;
      $(markers).each(function () {
        var m = this;
        if (!m.getMap()) return;

        var p = projection.fromLatLngToContainerPixel(m.latLng);
        if (distance(markerPoint.x, markerPoint.y, p.x, p.y) < 10) {
          infoWindowCombined.addLocation(m.id);
          m.hover();
          found = found + 1;
        } else {
          m.off();
        }
      });

      if (found > 1) {
        $(infoWindowCombined.html).addClass("multiple");
      } else {
        $(infoWindowCombined.html).removeClass("multiple");
      }

      infoWindowCombined.show();

      /*
            if ((markerPoint.y - height - 80) <= 0) {
                panned = true;
                newCenter.y -= ((height - markerPoint.y) + 80);
            }

            if ((markerPoint.x - width/2 - 25) <= 0) {
                panned = true;
                newCenter.x -= (width/2 - markerPoint.x + 25);
            } else if ((markerPoint.x + width/2 + 25) >= containerWidth) {
                panned = true;
                newCenter.x += width/2 + 25;
            }
*/
      if (panned) {
        map.panTo(projection.fromContainerPixelToLatLng(newCenter));
      }
      return true;
    } else {
      me.dom.removeClass("on hover");
      infoWindowCombined.hide();
      $(markers).each(function () {
        var m = this;
        m.off();
      });

      return false;
    }
  };
  LocationMarker.prototype.hover = function () {
    var $ = jQuery;
    var me = this;
    $(me.html).addClass("hover");
  };
  LocationMarker.prototype.off = function () {
    var $ = jQuery;
    var me = this;
    $(me.html).removeClass("hover").removeClass("hover2");
  };

  function LocationMarker(dom) {
    var $ = jQuery;
    var me = this;

    this.dom = dom;
    this.id = dom.attr("id");

    this.latLng = new google.maps.LatLng(
      parseFloat(dom.data("lat")),
      parseFloat(dom.data("lng"))
    );

    this.html = document.createElement("div");
    $(this.html)
      .addClass("location-marker")
      .addClass("type-" + dom.data("type"));
    $(this.html).append('<div class="icon marker"></div>');
    /*
        this.info = $('<div class="info"></div>');
        this.info.append(dom.find('.thumbnail').clone());
        this.info.append(dom.find('.title').clone());

        $(this.html).append(this.info);
        this.info.on('click', function() {
            window.location=this.info.find('a').attr('href');
            return false;
        });
*/
    this.show();

    google.maps.event.addDomListener(me.html, "click", function (e) {
      body.trigger("marker:highlight", dom.attr("id"));
    });
    /*
        google.maps.event.addDomListener(me.html, 'mouseover', function(e) {
            body.trigger('marker:hover', dom.attr('id'));
        });
        google.maps.event.addDomListener(me.html, 'mouseout', function(e) {
            body.trigger('marker:off', dom.attr('id'));
        });
        google.maps.event.addListener(map, 'zoom_changed', function(e) {
            var zoom = map.getZoom();
            if (zoom >= 11) {
                //$(me.html).removeClass('tiny')
                me.setMap(map);
            } else {
                //$(me.html).addClass('tiny')
                me.setMap(null);
            }
        });
        */
  }

  function distance(x1, y1, x2, y2) {
    var xs = x2 - x1,
      ys = y2 - y1;

    xs *= xs;
    ys *= ys;

    return Math.sqrt(xs + ys);
  }
}

// images carousel
jQuery(function ($) {
  var carousels = $(".wp-block-theme-blocks-images-carousel");
  if (carousels.length <= 0) return;

  carousels.each(function () {
    var self = $(this);
    var slides = self.find(".slides");
    var num = slides.find(".slide").length;
    if (num > 1) {
      slides.find(".slide .image").each(function (i) {
        $(this).append(
          '<div class="count">' + (i + 1) + " / " + num + "</div>"
        );
      });
      slides.imagesLoaded().always(function () {
        slides.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          adaptiveHeight: true,
          nextArrow:
            '<div class="slick-next"><span class="icon fa fa-angle-right"></span></div>',
          prevArrow:
            '<div class="slick-prev"><span class="icon fa fa-angle-left"></span></div>',
        });
      });
    }
  });
});

// hero parallax
jQuery(function ($) {
  var hero = $("#hero");
  if (hero.length <= 0) return;

  var posts = hero.find(".hentry");
  var featured = posts.eq(0);
  var p1 = posts.eq(1);
  var p2 = posts.eq(2);
  var p3 = posts.eq(3);
  var p4 = posts.eq(3).nextAll();
  var bg = hero.find(".bg");

  var svgPathDOM = $("#clip-hero-bg-path");
  var svgPath = svgPathDOM.attr("d");

  hero.find('.content a[href^="#"]').wrap('<div class="more"></div>');

  hero.on("scroll:tick", function (e, percent, scrollTop) {
    //console.log('hero: ', percent, scrollTop);

    if (featured.length) {
      featured.css("transform", "translate(0px, " + scrollTop * 0.4 + "px)");
    }
    if (p1.length) {
      p1.css("transform", "translate(0px, " + scrollTop * 0.15 + "px)");
    }
    if (p2.length) {
      p2.css("transform", "translate(0px, " + scrollTop * 0.2 + "px)");
    }
    if (p3.length) {
      p3.css("transform", "translate(0px, " + scrollTop * 0.2 + "px)");
    }
    if (p4.length) {
      p4.css("transform", "translate(0px, " + scrollTop * 0.2 + "px)");
    }
    if (bg.length) {
      bg.css("transform", "translate(0px, " + scrollTop * 0.3 + "px)");
    }
  });
});

// wave animations
jQuery(function ($) {
  var body = $(document.body);

  var waveBottom = $("#clip-interrupt-bottom-path");
  var waveBottomPath = "M0,0 L100,0, 100,90 C50,110 25,85 0,90 z";
  var i = 0;
  var dir = 0.3;

  $(window).on("scroll", function (e) {
    var scrollTop = window.scrollY || $(window).scrollTop();

    tick();
  });

  function tick() {
    i = i + dir;
    if (i >= 100 || i <= 0) {
      dir = dir * -1;
    }
    p = i / 100;

    waveBottom.attr(
      "d",
      "M0,0 L100,0, 100," +
        (90 + 5 * p) +
        " C" +
        (50 + 20 * p) +
        "," +
        (110 + 20 * p * -1) +
        " " +
        (25 + 30 * p) +
        "," +
        (90 + 5 * p * -1) +
        " 0," +
        (90 + 5 * p) +
        " z"
    );
  }
});

// mailchimp subscribe
jQuery(function ($) {
  var form = $("form.mailchimp-subscribe");
  if (form.length <= 0) return;

  var submitting = false;
  var checkTimer = null;
  form.submit(function () {
    var self = $(this);
    var message = self.find(".message");
    var messageSuccess = self.find(".message-success");
    var messageError = self.find(".message-error");

    if (submitting) {
      return true;
    }
    var action = self
      .attr("action")
      .replace(/subscribe\/post/, "subscribe/post-json");

    submitting = true;
    checkTimer = setTimeout(function () {
      // check in case content blocked
      self.submit();
    }, 2000);

    $.getJSON(action + "?c=?", self.serialize(), function (data) {
      if (data.result != "success") {
        messageSuccess.attr("hidden");
        messageError.attr("hidden", null).html(data.msg);
        message.addClass("error").html(data.msg);
      } else {
        messageSuccess.attr("hidden", null);
        messageError.attr("hidden");
        message.removeClass("error").text(data.msg);
        self.get(0).reset();
      }
      submitting = false;
      clearTimeout(checkTimer);
    });
    return false;
  });

  var group_container = $("#mce-groups");
  if (group_container.length <= 0) return;

  var group_name = group_container.data("group_name");
  var groups = null;

  group_container.addClass("loading");

  $.post(
    THEME.ajaxurl,
    {
      action: "mailchimp_call",
      method: "lists/interest-groupings",
      params: {
        id: form.find('input[name="id"]').val(),
      },
    },
    function (response) {
      if (response.status == "ok") {
        $(response["response"]).each(function () {
          if (this.name == group_name) {
            groups = this.groups;
          }
        });
        if (groups) {
          $(groups).each(function (i) {
            var group = this;
            group_container.append(
              '<li><input type="checkbox" value="' +
                group.bit +
                '" name="group[' +
                group.id +
                "][" +
                group.bit +
                ']" id="group-' +
                i +
                '"><label for="group-' +
                i +
                '">' +
                group.name +
                "</label></li>"
            );
          });
        }
      }
      group_container.removeClass("loading");
    },
    "json"
  );
});

// bookmarks
jQuery(function ($) {
  $(document).on("click", 'a[href^="#"]', function () {
    var target = $($(this).attr("href"));
    if (target.length > 0) {
      var p = target.offset();
      $("html,body").animate({
        scrollTop: p.top - $("#header").outerHeight() - 50,
      });
      return false;
    }
  });
});

// profiles
/*
jQuery(function($) {
    var block = $('.wp-block-theme-blocks-profiles');
    if (block.length <= 0) return;

    var container = block.find('.query-posts');

    block.find('input[type="radio"]').on('theme:selected', function() {
        var input = $(this);
        refresh(input.val(), 'selected');
    });

    function refresh(category) {
        var h = container.height();
        container.addClass('loading').css({minHeight:h}).html('');
        var params = {
            action:'get_posts',
            query:{
                post_type:'profile',
                posts_per_page:1000,
                tax_query:[],
            }
        };
        if (category) {
            params['query']['tax_query'] = [
                {
                    taxonomy:'profile-category',
                    field:'slug',
                    terms:[category]
                }
            ];
        }
        $.post(THEME.ajaxurl, params, function(response) {
            if (response.status == 'ok') {
                container.html(response.html);
            } else {
                console.error(response.message);
            }

            container.removeClass('loading').css({minHeight:0});
        })
    }
});
*/
// partners / supporters
jQuery(function ($) {
  var block = $(".wp-block-theme-blocks-partners");
  if (block.length <= 0) return;

  var form = block.find("form");

  var container = block.find(".query-posts");
  var controls = block.find(".controls");
  var isSetup = false;
  var posts = container.find(".hentry").clone();
  var status = block.find(".status");

  form.find('input[type="radio"]').on("theme:selected", function () {
    refresh();
  });

  refresh();

  function setup(count) {
    isSetup = true;
    container.slick({
      autoplay: false,
      dots: count && count > 12 ? true : false,
      arrows: true,
      rows: 3,
      slidesPerRow: 4,
      //slidesToShow:12,
      //slidesToScroll:12,
      appendDots: controls,
      appendArrows: controls,
      nextArrow: '<span class="slick-next icon fa fa-angle-right"></span>',
      prevArrow: '<span class="slick-prev icon fa fa-angle-left"></span>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesPerRow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesPerRow: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesPerRow: 1,
          },
        },
      ],
    });
  }
  function refresh() {
    if (isSetup) {
      container.slick("unslick");
      container.html(posts);
    }
    var selected = form.find('input[type="radio"]:checked').val();

    var count = 0;
    if (selected) {
      container.find(".hentry").each(function () {
        if (!$(this).hasClass("supporter-category-" + selected)) {
          $(this).remove();
        } else {
          count = count + 1;
        }
      });
    } else {
      count = posts.length;
    }
    status.text("Showing " + count + " result" + (count == 1 ? "" : "s"));
    setup(count);
  }
});

// form filter
jQuery(function ($) {
  var form = $("form.filters");
  if (form.length <= 0) return;

  form.find('input[type="radio"]').on("click", function () {
    $(this).closest("label").addClass("on").siblings().removeClass("on");
    $(this).trigger("theme:selected");
  });
  form
    .find('input[type="radio"]:checked')
    .trigger("theme:selected")
    .closest("label")
    .addClass("on")
    .siblings()
    .removeClass("on");
});

// donation form helpers
jQuery(function ($) {
  var embed = $("#donate-embed");
  if (embed.length <= 0) return;

  $(document).on("click", "input.IATS_RadioAmtButton", function () {
    $(this)
      .closest(".IATS_AmountItemDiv")
      .addClass("selected")
      .siblings()
      .removeClass("selected");
  });
  $(document).on("click", ".IATS_AmountItemDiv", function () {
    $(this).find("input.IATS_RadioAmtButton").prop("checked", true);

    $(this).addClass("selected").siblings().removeClass("selected");

    var amt = $(this).find("input.IATS_OtherAmount");
    if (amt.length) amt.focus();
  });
  $(document).on("click", "input.IATS_RadioPaymentButton", function () {
    $('label[for="' + $(this).attr("id") + '"]')
      .addClass("selected")
      .siblings()
      .removeClass("selected");
  });
});

// anchors
jQuery(function ($) {
  if (window.location.hash) {
    var target = $(window.location.hash + "-anchor");
    if (target.length) {
      $("html,body").animate({ scrollTop: target.offset().top - 100 });
    }
  }
});

// old safari hack
jQuery(function ($) {
  if (isBrowser.Safari(11) || isBrowser.Safari(10)) {
    $(document.body).addClass("disable-clip-path");
  }
});

jQuery(function ($) {
  var jumps = $("select.jump");
  if (jumps.length <= 0) return;

  jumps.on("change select:change", function (e, obj) {
    var selected = $(this).find("option:selected");
    var url = selected.val();
    if (url) {
      window.location = url;
      return false;
    }
  });
});
