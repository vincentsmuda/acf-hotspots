#ACF Hotspots Extension
An extension for the Advanced Custom Fields plugin for Wordpress. If you would like to use, grab the acf-hotspots folder and put it into your plugins directory.

##Notes
- Only supports ACF v5 which means the free version of ACF is not supported.

##TODO
- Save image sizes to field
- Add tinymce to textarea per point
- Make point textfields prettier
- x-browser
- General QA

##Saved content structure example (subject to change)
```PHP
Array (
  [image] => 64
  [points] => Array(
    [1] => Array(
      [x] => 0.19047619047619047
      [y] => 0.1288135593220339
      [title] =>  'title'
      [description] => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      [link] => Array (
        [url] => 'http://some.url'
        [text] => 'link text'
      )
    ),
    [2] => Array(
      [x] => 0.5542857142857143
      [y] => 0.24067796610169492
      [title] => 'Another Title'
      [description] => 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      [link] => Array(
        [url] => 'http://some.someplace'
        [text] => 'buy now'
      )
    )
  )
)
```
