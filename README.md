jquery-hemi-custom-select
=========================

jQuery custom select plugin. Custom responsive design.

How to use:
-----------

```html
<select class="js-hemi-custom-select">
	<option>1</option>
	<option>2</option>
	<option disabled="">3</option>
	<option>4</option>
	<option>5</option>
</select>
```

```javascript
$(function () {
	$(".js-hemi-custom-select").hemiCustomSelect({
	});
});
```

Options:
-----------
```javascript
$(function () {
	$(".js-hemi-custom-select").hemiCustomSelect({
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
	});
});
```
