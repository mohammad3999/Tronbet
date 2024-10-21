(function ($) {

    var WidgetSliderHerowidthElementorHandler = function ($scope, $) {

        var carousel_elem = $scope.find('.netfusion-elementor').eq(0);

        if (carousel_elem.length > 0) {

            var settings = carousel_elem.data('slider_options');
            carousel_elem.slick(settings);
        }

    };

    // Make sure you run this code under Elementor..
    $(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/netfusion-elementor.default', WidgetSliderHerowidthElementorHandler);

    });


    /**
     * Start Testimonial Slider
     */
    function testimonialSliderOne($scope, $) {
        const $this = $scope.find('.te-testimonial-slider-wrapper');
        const $currentID = '#' + $this.attr('id');

        const testimonialSliderOneoId = $($currentID);

        testimonialSliderOneoId.slick({
            slidesToShow: $this.data('slides-show-desktop'),
            autoplaySpeed: $this.data('autoplay-speed'),
            speed: $this.data('slide-speed'),
            infinite: $this.data('loop'),
            autoplay: $this.data('autoplay'),
            swipeToSlide: $this.data('swipe-slide'),
            arrows: $this.data('arrows'),
            slidesToScroll: $this.data('slides-scroll'),
            pauseOnHover: $this.data('pause-hover'),
            dots: $this.data('dots'),
            rtl: false,
            prevArrow: "<button type='button' class='testimonial-arrow-btn prev-btn'><div class='swip'><div class='title-wrapper'><i class='icon-left-arrow title-1'></i><i class='icon-left-arrow title-2'></i></div></div></button>",
            nextArrow: "<button type='button' class='testimonial-arrow-btn next-btn'><div class='swip'><div class='title-wrapper'><i class='icon-right-arrow title-1'></i><i class='icon-right-arrow title-2'></i></div></div></button>",
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: $this.data('slides-show-tablet'),
                        autoplay: $this.data('autoplay'),
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: $this.data('slides-show-mobile'),
                        autoplay: $this.data('autoplay'),
                    },
                },
            ],
        });
    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/netfusion-testimonial.default', testimonialSliderOne);
    });

    /**End Testimonial Slider */

})(jQuery);
