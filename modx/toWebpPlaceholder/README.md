## Output Modifier `toWebpPlaceholder`

Convert the file path to an image to one with a `.webp` file and add to a placeholder.

Minimum usage example:

```php
[[+image:toWebpPlaceholder=`prefix=image-placeholder&replacePath=assets/images/`]]
```

Created by: [Connor](https://github.com/frankie-tech)

```php
// All Options
[[+image:toWebpPlaceholder=`prefix=image-placeholder&replacePath=assets/images/&appendPath=webp-source/&force=1`]]
```

### Options

All options are passed in as if they were the input to an output modifier. Even though it is categorized with other snippets, the options can only be interpreted from a string like `optionA=value1&optionB=value2`.

| Option      | Required | Description                                                                                                                    | Example                                                                                                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prefix      | Yes      | Prefix to the output placeholder                                                                                               | `&prefix=image` then placeholder defaults to `[[+image-webp]]`                                                                                                                |
| replacePath | Yes      | The path leading up to the image file                                                                                          | File is at `assets/images/file-name.jpeg` then `&replacePath=assets/images/` or `&replacePath=images/` would transform the file path into `assets/images/webp/file-name.webp` |
| appendPath  | No       | Specify a different path to append, default is `webp/`                                                                         | `replacePath=assets/images/&appendPath=specific/path/` would change `assets/images/file-name.jpeg` to `assets/images/specific/path/file-name.webp`                            |
| force       | No       | Make the `appendPath` option the full file path, useful if the file destination is not related to the current images file path | `replacePath=assets/images/&appendPath=assets/webp/images/&force=1` would change `assets/images/file-name.jpeg` to `assets/webp/images/file-name.webp`                        |

#### Chunk Example

`[[+image]] == assets/images/chunk-example/file-name.jpeg`

```php
[[+image:toWebpPlaceholder=`prefix=image&replacePath=/chunk-example/`]]
<div class="example-chunk">
    <picture>
        <source type="image/webp" srcset="[[+image-webp]]" />
        <img alt="" aria-hidden="true" src="[[+image]]" loading="lazy" />
    </picture>
</div>
```

Output:

```html
<div class="example-chunk">
	<picture>
		<source
			type="image/webp"
			srcset="assets/images/chunk-example/webp/file-name.webp"
		/>
		<img
			alt=""
			aria-hidden="true"
			src="assets/images/chunk-example/file-name.jpeg"
			loading="lazy"
		/>
	</picture>
</div>
```

#### File Does Not Exist

In case the `.webp` file does not exist, you can add a `:notempty` output filter to the created placeholder

```php
[[+image:toWebpPlaceholder=`prefix=image&replacePath=/chunk-example/`]]
<div class="example-chunk">
    <picture>
        [[+image-webp:notempty=`<source type="image/webp" srcset="[[+image-webp]]" />`]]
        <img alt="" aria-hidden="true" src="[[+image]]" loading="lazy" />
    </picture>
</div>
```

Output:

```html
<div class="example-chunk">
	<picture>
		<img
			alt=""
			aria-hidden="true"
			src="assets/images/chunk-example/file-name.jpeg"
			loading="lazy"
		/>
	</picture>
</div>
```
