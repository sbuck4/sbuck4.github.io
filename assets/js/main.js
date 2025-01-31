/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '361px',   '736px'  ],
		xsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	$nav_links.on('click', function(event) {

		var href = $(this).attr('href');

		// Not a panel link? Bail.
		if (href.charAt(0) != '#'
			|| $panels.filter(href).length == 0)
			return;

		// Prevent default.
		event.preventDefault();
		event.stopPropagation();

		// Change panels.
		if (window.location.hash != href)
			window.location.hash = href;

	});

	// Add Tab-Switching Functionality
	var $bioTab = $('#bio-tab'); // Tab for Bio
	var $projectsTab = $('#projects-tab'); // Tab for Projects
	var $bioPanel = $('#bio-panel'); // Panel for Bio content
	var $projectsPanel = $('#projects-panel'); // Panel for Projects content

	// Initial state: Show Bio panel and hide Projects panel
	$bioPanel.addClass('active').show();
	$projectsPanel.removeClass('active').hide();

	// Handle Bio tab click
	$bioTab.on('click', function(event) {
		event.preventDefault();

		// Show Bio panel, hide Projects panel
		$bioPanel.addClass('active').show();
		$projectsPanel.removeClass('active').hide();

		// Set active tab styling
		$bioTab.addClass('active');
		$projectsTab.removeClass('active');
	});

	// Handle Projects tab click
	$projectsTab.on('click', function(event) {
		event.preventDefault();

		// Show Projects panel, hide Bio panel
		$projectsPanel.addClass('active').show();
		$bioPanel.removeClass('active').hide();

		// Set active tab styling
		$projectsTab.addClass('active');
		$bioTab.removeClass('active');
	});

	// Panels.

	// Initialize.
	(function() {

		var $panel, $link;

		// Get panel, link.
		if (window.location.hash) {

			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter('[href="' + window.location.hash + '"]');

		}

		// No panel/link? Default to first.
		if (!$panel
			|| $panel.length == 0) {

			$panel = $panels.first();
			$link = $nav_links.first();

		}

		// Deactivate all panels except this one.
		$panels.not($panel)
			.addClass('inactive')
			.hide();

		// Activate link.
		$link
			.addClass('active');

		// Reset scroll.
		$window.scrollTop(0);

	})();

	// Hashchange event.
	$window.on('hashchange', function(event) {

		var $panel, $link;

		// Get panel, link.
		if (window.location.hash) {

			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter('[href="' + window.location.hash + '"]');

			// No target panel? Bail.
			if ($panel.length == 0)
				return;

		}

		// No panel/link? Default to first.
		else {

			$panel = $panels.first();
			$link = $nav_links.first();

		}

		// Deactivate all panels.
		$panels.addClass('inactive');

		// Deactivate all links.
		$nav_links.removeClass('active');

		// Activate target link.
		$link.addClass('active');

		// Set max/min height.
		$main
			.css('max-height', $main.height() + 'px')
			.css('min-height', $main.height() + 'px');

		// Delay.
		setTimeout(function() {

			// Hide all panels.
			$panels.hide();

			// Show target panel.
			$panel.show();

			// Set new max/min height.
			$main
				.css('max-height', $panel.outerHeight() + 'px')
				.css('min-height', $panel.outerHeight() + 'px');

			// Reset scroll.
			$window.scrollTop(0);

			// Delay.
			window.setTimeout(function() {

				// Activate target panel.
				$panel.removeClass('inactive');

				// Clear max/min height.
				$main
					.css('max-height', '')
					.css('min-height', '');

				// IE: Refresh.
				$window.triggerHandler('--refresh');

				// Unlock.
				locked = false;

			}, (breakpoints.active('small') ? 0 : 500));

		}, 250);

	});

	var $window = $(window),
        $body = $('body'),
        $overlay = $('<div id="overlay"></div>'); // Dynamically create the overlay
    $('body').append($overlay); // Add overlay to the body

    // Image Expand/Collapse Functionality
    $(document).ready(function () {
		var $overlay = $('<div id="overlay"></div>').appendTo('body').hide();
	
		$('.expandable').on('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
	
			var $this = $(this);
	
			if ($this.hasClass('expanded')) {
				// Collapse the image
				$this.removeClass('expanded').css({
					position: $this.data('originalPosition'),
					top: $this.data('originalTop'),
					left: $this.data('originalLeft'),
					width: $this.data('originalWidth'),
					height: $this.data('originalHeight'),
					transform: '',
					zIndex: '',
				});
	
				$overlay.fadeOut();
			} else {
				// Store original properties
				$this.data('originalPosition', $this.css('position'));
				$this.data('originalTop', $this.offset().top);
				$this.data('originalLeft', $this.offset().left);
				$this.data('originalWidth', $this.width());
				$this.data('originalHeight', $this.height());
	
				// Get viewport dimensions
				var viewportWidth = $(window).width();
				var viewportHeight = $(window).height();
	
				// Calculate new position for centering
				var newLeft = (viewportWidth - $this.width() * 1.5) / 2;
				var newTop = (viewportHeight - $this.height() * 1.5) / 2;
	
				// Expand the image and center it
				$this.addClass('expanded').css({
					position: 'fixed',
					top: newTop,
					left: newLeft,
					width: $this.width() * 1.5,  // Adjust scale
					height: $this.height() * 1.5,
					transform: 'translate(0, 0)',
					zIndex: 1000,
				});
	
				$overlay.fadeIn();
			}
		});
	
		// Clicking on the overlay closes the image
		$overlay.on('click', function () {
			$('.expandable.expanded').trigger('click');
		});

	});	
	
})(jQuery);
