#### ctrlVIZ :see_no_evil:

-   [ ] Write up proper documentation about how to build elements
    -   hide sections with the `hidden` attribute
    -   `data-*` and class options
        -   `< data-hide-expects="VALUE" />`
        -   `< data-hide-controls="SECTIONNAME" />`
        -   `.js-hide_SECTIONNAME` + `< hidden >` attribute
-   [ ] Give examples
    -   Can you do working HTML and JS in GitHub Markdown?
    -   Possibly link to documentation [:link: :book:](https://dev.excelerondesigns.com) instead

### EXAMPLES:

-   [ ] simplify / clean up cause wow horrendous

```html
<input
	type="checkbox"
	name="phys-exam"
	id="physExam"
	class="js-hide_input"
	data-hide-controls="physExamTypes"
	aria-label="Do you need a physical examination?"
/>
... ...
<div class="col-sm-8 js-hide_physExamTypes" hidden>
	<div class="select-option">
		<i class="ti-angle-down"></i>
		<!-- prettier-ignore -->
		<select>...</select>
	</div>
</div>
<!-- Example of a conditional input -->
<select
	class="js-hide_conditional"
	data-hide-controls="physExamOther"
	data-hide-expects="Other"
	name="phys-exam-type"
	id="physExamType"
>
	<option value="Other">Other</option>
</select>
... ...
<input
	id="physExamOther"
	class="js-hide_physExamOther"
	hidden
	name="phys-exam-other"
	type="text"
	placeholder="Other"
/>
```
