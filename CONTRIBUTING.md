# Add a company

Available company properties:

* name (string required)
* created_at (date required. when the company is added in the app)
* logo (url)
* website (url)
* type (array of string). Values must be included in the following
  list. The list can growth if needed but don't forget to update this file and the [translations files](https://github.com/kdisneur/tekusage/tree/master/app/javascripts/config/translations):
  * `webagency`,
  * `service`,
  * `consulting`,
  * `synthetic_images_agency`,
  * `ecommerce`,
  * `software`,
  * `software_as_a_service`,
  * `platform_as_a_service`,
  * `communication`,
  * `marketing`,
  * `social_gaming`,
  * `training`.
* employees (string) Value must be included in:
  * `less_than_5`, 
  * `between_5_and_10`,
  * `between_10_and_20`,
  * `between_20_and_50`,
  * `between_50_and_100`,
  * `more_than_100`.
* technologies (array of string. It must be the more precise technology/framework used (ie: symfony instead of php). And don't forget to check the [synonym file](https://github.com/kdisneur/tekusage/tree/master/elasticsearch/synonyms/technologies.txt) to [add your technology](#add-a-synonym) if missing)
* freelance (boolean. Company working with freelancers (occasionally or everytime))
* remote (boolean)
* part_time (boolean)
* locations  (array of locations required)
  * country (string in lowercase, required)
  * city (string in lowercase, required)
  * coordinates (geopoint (lat/lon), required)

# Add a synonym

* Open the [synonym file](https://github.com/kdisneur/tekusage/blob/master/elasticsearch/synonyms/technologies.txt)
* Search your technology
  * If it already exist: you have nothing to do
  * If it exists with a different name (ie: ror vs rails) :

```diff
@@ -2,3 +2,3 @@
 # ruby synonyms
-sinatra, rails => ruby
+sinatra, rails, ror => ruby
 sinatra
-rails
+rails, ror
```

  * If it doesn't exist, add it:
  
```diff
@@ -1,4 +0,5 @@
# javascript synonyms
-angularjs,coffeescript, emberjs, jquery => javascript
+angularjs, backbonejs, coffeescript, emberjs, jquery => javascript
 angularjs
+backbonejs
 coffeescript
```
