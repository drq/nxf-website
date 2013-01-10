(function ($) {

    $(function() {

        // fix sub nav on scroll
        var $win = $(window), $nav = $('.subnav'), navHeight = $('.navbar').first().height(), navTop = $('.subnav').length && $('.subnav').offset().top - navHeight, isFixed = 0;

        processScroll();

        $win.on('scroll', processScroll);

        function processScroll() {
            var i, scrollTop = $win.scrollTop();
            if (scrollTop >= navTop && !isFixed) {
                isFixed = 1;
                $nav.addClass('subnav-fixed');
            } else if (scrollTop <= navTop && isFixed) {
                isFixed = 0;
                $nav.removeClass('subnav-fixed');
            }
        }

        // start the slider
        var images = [
            "logo-128.png",
            "ios-logo.png",
            "android-logo.png",
            "alfresco-logo.png",
            "drupal-logo.png",
            "java.png",
            "spring-logo.png",
            "html5.png",
            "jquery-logo.png",
            "mongodb-logo.png"
        ];
        var imageList = $("<ul></ul>");
        $.each(images, function(i, v) {
            imageList.append('<li><img height="100%" src="img/' + v + '"/></li>');
        });
        $('.wmuSlider').append(imageList).wmuSlider({
            autoplay:true,
            animation: 'fade'
        });

        // Build contact us form
        if (typeof Alpaca != "undefined") {
            Alpaca.registerMessages({
                "invalidEmail": "Invalid email address."
            });

            Alpaca.defaultView = "VIEW_WEB_EDIT_TWITTER_BOOTSTRAP";

            $("#contact-us").alpaca({
                "schema": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "email": {
                            "type": "string",
                            "required" : true
                        },
                        "company": {
                            "type": "string"
                        },
                        "phone": {
                            "type": "string"
                        },
                        "comments": {
                            "type": "string"
                        }
                    }
                },
                "options": {
                    "fields": {
                        "name": {
                            "label": "Your Name"
                        },
                        "email": {
                            "label": "Email Address",
                            "type": "email",
                            "hideInitValidationError": true
                        },
                        "company": {
                            "label": "Company Name"
                        },
                        "phone": {
                            "label": "Phone Number",
                            "type": "phone"
                        },
                        "comments": {
                            "label": "Project Description",
                            "type": "textarea"
                        }
                    }
                },
                "postRender": function(renderedForm) {
                    $('<button type="submit" class="btn">Send</button>').click(function() {
                        var val = renderedForm.getValue();
                        renderedForm.showHiddenMessages();
                        if (renderedForm.isValid(true)) {
                            $.ajax({
                                type: "POST",
                                url: "actions/contact-us.php",
                                data: {json:JSON.stringify(val)},
                                success: function(msg) {
                                    var modalDialog = '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                                        + '<div class="modal-header">'
                                        + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
                                        + '<h3 id="myModalLabel">Thank you!</h3>'
                                        + '</div>'
                                        + '<div class="modal-body">'
                                        + '<p>Hello,</p>'
                                        + '<p>Your information was received.</p>'
                                        + '<p>We will be in touch with you shortly.</p>'
                                        + '<p>Best wishes,</p>'
                                        + '<p>Yong Qu / NXF Tech Inc.</p>'
                                        + '</div>'
                                        + '<div class="modal-footer">'
                                        + '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
                                        + '</div>'
                                        + '</div>';
                                    $(modalDialog).modal('show');
                                }
                            });
                        }
                    }).appendTo(renderedForm.outerEl);
                }
            });
        }

    });

})(window.jQuery);