## Extrapolate once list is completed

#### ctrlVIZ :see_no_evil:

-   [ ] Write up proper documentation about how to build elements
    -   hide sections with the `hidden` attribute
    -   `data-*` and class options
        -   `< data-hide-expects="VALUE" />`
        -   `< data-hide-controls="SECTIONNAME" />`
        -   `.js-hide_SECTIONNAME` + `< hidden >` attribute
-   [ ] Give examples
    -   Can you do working HTML and JS in GitHub Markdown?
    -   Possibly link to documentation [:link: :book:](https://dev.excelerondesigns.com) instead.
        -   See: [:link: :white_check_mark:](https://github.com/excelerondesign/documentation/projects/1#card-31430826)
-   [ ] account for fieldsets and disabling inputs for better form submission
    -   will this affect php form submission?
    -   formIt?
-   [ ] still need to come up with a better name
-   [ ] make a better data attribute shorthand
    -   [ ] or would it be better to just use our own attributes? are their drawbacks to that?

### EXAMPLES:

-   [x] simplify / clean up cause wow horrendous

```html
<!--
    * Example of a simple toggle input
    1. Include the class
    2. Specify which element to control
-->
<input class="js-hide_input" data-hide-controls="physExamTypes" />

<!--
    * Now this elements visibility will be toggled by the above input
    1. Class uses the same prefix
    2. Class suffix matches the data-hide-controls value
    3. it has the hidden attribute
-->
<div class="col-sm-8 js-hide_physExamTypes" hidden>
	<div class="select-option">
		<i class="ti-angle-down"></i>
		<!-- prettier-ignore -->
		<select>...</select>
	</div>
</div>
```

```html
<!-- 
    * Example of a conditional input
    1. Include the class
    2. Specify which element is being controlled (data-hide-controls)
    3. Specify the expected value (data-hide-expects)
-->
<select
	class="js-hide_conditional"
	data-hide-controls="physExamOther"
	data-hide-expects="Other"
>
	<option value="Other">Other</option>
</select>
<!--
    * Now this elements visibility will be toggled by the previous select
    * only if the value selected is same as the specific data-hide-expects
    1. Class uses the same prefix
    2. Class suffix is the same value as the selects data-hide-controls
    3. It has the hidden attr
-->
<input class="js-hide_physExamOther" hidden />
```
