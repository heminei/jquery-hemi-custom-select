/*!
 * author: Heminei
 * site: https://github.com/heminei/jquery-hemi-custom-select
 * email: heminei@heminei.com
 * v2.4
 */
(function ($) {
	var pluginName = "hemiCustomSelect";

	$[pluginName] = function (element, userOptions) {
		var plugin = this;

		var defaultOptions = {
			wrapper: {
				'class': "hcs-select-wrapper",
				'element': $("<div/>")
			},
			select: {
				'class': ""
			},
			title: {
				'class': "hcs-select-title",
				'element': $("<span/>")
			},
			arrow: {
				'class': "hcs-select-arrow",
				'element': $("<span/>")
			},
			responsive: true,
			dropdown: {
				enable: false,
				element: $("<div/>"),
				'class': "hcs-dropdown",
				'classOpen': "hcs-dropdown-open",
				option: {
					element: $("<div/>"),
					'class': "hcs-dropdown-option",
					'classSelected': "selected",
					'classDisabled': "disabled"
				},
				optgroup: {
					element: $("<div/>"),
					'class': "hcs-dropdown-optgroup",
					'classDisabled': "disabled",
					'label': {
						element: $("<div/>"),
						'class': "hcs-dropdown-optgroup-label"
					}
				}
			},
			init: function (element) {

			},
			onLoad: function (element) {

			},
			onChange: function (element) {

			},
			onClick: function (element) {

			},
			onRefresh: function (element) {

			},
			onResize: function (element) {

			}
		};

		var $element = $(element);
		var optionsAttr = $element.attr("data-hemi-custom-select");
		if (typeof optionsAttr != "undefined") {
			optionsAttr = $.parseJSON(optionsAttr);
		} else {
			optionsAttr = {};
		}
		plugin.options = $.extend(true, defaultOptions, userOptions, optionsAttr);
		plugin.options.init($element); //CALLBACK

		/*PUBLIC methods*/
		plugin.getSelectedOptionText = function () {
			return $('option:selected', $element).text();
		};
		plugin.refresh = function () {
			if (plugin.options.dropdown.enable === true) {
				generateDropdownItems();
			}
			plugin.options.onRefresh($element); //CALLBACK
		};
		plugin.resize = function () {
			if ($element.width() != plugin.options.wrapper.element.outerWidth() || $element.height() != plugin.options.wrapper.element.outerHeight()) {
				$element.css({
					"width": plugin.options.wrapper.element.outerWidth(),
					"height": plugin.options.wrapper.element.outerHeight()
				});
				plugin.options.onResize($element); //CALLBACK
			}
		};

		function generateDropdownItems() {
			function generateItem(option) {
				var id = uniqId.get();
				option.data("hcs-uniqId", id);
				var itemOption = plugin.options.dropdown.option.element.addClass(plugin.options.dropdown.option.class).clone();
				itemOption.html(option.text()).data("hcs-uniqId", id);
				if (option.attr("disabled")) {
					itemOption.addClass(plugin.options.dropdown.option.classDisabled);
				}
				return itemOption;
			}
			plugin.options.dropdown.element.find("> *").remove();
			$element.find("> *").each(function () {
				var selectItem = $(this);
				if (selectItem.prop("tagName") == "OPTION") {
					plugin.options.dropdown.element.append(generateItem(selectItem));
				}
				if (selectItem.prop("tagName") == "OPTGROUP") {
					var label = selectItem.attr("label");
					var optgroup = plugin.options.dropdown.optgroup.element.addClass(plugin.options.dropdown.optgroup.class).clone();
					if (selectItem.is(":disabled")) {
						optgroup.addClass(plugin.options.dropdown.optgroup.classDisabled);
					}
					var itemLabel = plugin.options.dropdown.optgroup.label.element.addClass(plugin.options.dropdown.optgroup.label.class).clone().html(label);
					optgroup.prepend(itemLabel);
					selectItem.find("> *").each(function () {
						var item = generateItem($(this));
						if (selectItem.is(":disabled")) {
							item.addClass(plugin.options.dropdown.option.classDisabled);
						}
						optgroup.append(item);
					});
					plugin.options.dropdown.element.append(optgroup);
				}
			});
		}

		function setTitle() {
			plugin.options.title.element.html(plugin.getSelectedOptionText());
		}

		function openDropdown() {
			plugin.options.wrapper.element.addClass(plugin.options.dropdown.classOpen);
			plugin.options.dropdown.element.stop().fadeIn();
		}
		function closeDropdown() {
			plugin.options.wrapper.element.removeClass(plugin.options.dropdown.classOpen);
			plugin.options.dropdown.element.stop().fadeOut();
		}

		var uniqId = {
			counter: 0,
			get: function () {
				var id = "uniqid-" + uniqId.counter++;
				return id;
			}
		};

		$element.wrap(plugin.options.wrapper.element);
		plugin.options.wrapper.element = $element.parent();
		plugin.options.wrapper.element.addClass(plugin.options.wrapper['class']);
		plugin.options.title.element.addClass(plugin.options.title['class']);
		plugin.options.arrow.element.addClass(plugin.options.arrow['class']);
		$element.css({
			"opacity": 0,
			"width": plugin.options.wrapper.element.outerWidth(),
			"height": plugin.options.wrapper.element.outerHeight(),
			"position": "absolute",
			"left": 0,
			"top": 0,
			"padding": 0,
			"margin": 0,
			"border": 0
		});

		plugin.options.wrapper.element.prepend(plugin.options.arrow.element);
		plugin.options.wrapper.element.prepend(plugin.options.title.element.html(plugin.getSelectedOptionText()));
		$element.addClass(plugin.options.select['class']);

		if (plugin.options.dropdown.enable === false) {
			plugin.options.wrapper.element.css({
				"position": "relative",
				"overflow": "hidden"
			});
		}

		//CUSTOM DROPDOWN
		if (plugin.options.dropdown.enable === true) {
			plugin.options.wrapper.element.css({
				"position": "relative"
			});

			$element.hide();

			plugin.options.wrapper.element.append(plugin.options.dropdown.element);

			plugin.options.dropdown.element.addClass(plugin.options.dropdown.class);
			plugin.options.dropdown.element.hide();

			generateDropdownItems();

			plugin.options.dropdown.element.on("click", "*", function (e) {
				var clickItem = $(this);
				if (clickItem.data("hcs-uniqId")) {
					var option;
					$element.find("option").each(function (index, item) {
						if ($(item).data("hcs-uniqId") == clickItem.data("hcs-uniqId")) {
							option = $(item);
							return false;
						}
					});
					if (!option.is(":disabled")) {
						option.prop('selected', true).siblings("option").prop('selected', false);
						plugin.options.dropdown.element.find("*").removeClass(plugin.options.dropdown.option.classSelected);
						$(this).addClass(plugin.options.dropdown.option.classSelected);
						closeDropdown();
						$element.trigger("change");
					}
				}
				e.preventDefault();
				e.stopPropagation();
			});
		}



		plugin.options.onLoad($element); //CALLBACK

		$element.on("refresh", function () {
			plugin.refresh();
		});
		$element.on("change", function () {
			setTitle();
			plugin.options.onChange($element); //CALLBACK
		});
		plugin.options.wrapper.element.on("click", function (e) {
			if (plugin.options.dropdown.enable) {
				if (plugin.options.dropdown.element.is(":visible")) {
					closeDropdown();
				} else {
					openDropdown();
				}
				e.stopPropagation();
			}
			plugin.options.onClick($element); //CALLBACK
		});

		$(document).on("click", function () {
			closeDropdown();
		});



		//RESPONSIVE
		var resizeTimeout;
		$(window).resize(function () {
			if (plugin.options.responsive === true) {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function () {
					plugin.resize();
				}, 50);
			}
		});
		setInterval(function () {
			if (plugin.options.responsive === true) {
				plugin.resize();
			}
		}, 100);

	};

	$.fn[pluginName] = function (userOptions) {
		return this.each(function () {
			if (typeof $(this).data(pluginName) == "undefined") {
				var plugin = new $[pluginName](this, userOptions);
				$(this).data(pluginName, plugin);
			}
		});
	};
})(jQuery);