# README #

This is the file with the guidelines for the Todo Sample project.

### What is the Todo Sample Project ###

* Django + Django Rest Framework + AngularJS sample project
* Version 1.0.0

### Setup ###

You're encouraged to setup a virtualenv to work in prior to configuring the dependencies.

If you are not familiar how to, please follow the link: http://virtualenvwrapper.readthedocs.org/en/latest/install.html

1.  Install Project dependencies:
```
#!shell
pip install -r requirements.txt

```
2. Install Node on the system (https://nodejs.org/download/)
3. Install Node dependencies:

```
#!shell

npm install
```
4. Install Bower:

```
#!shell

npm install bower
```
5. Install Gulp:

```
#!shell

npm install gulp
```

6. Install Bower dependencies:

```
#!shell

bower install
```
7. Install TSD:

```
#!shell

npm install tsd
```
8. Install Typescript definitions:

```
#!shell

tsd reinstall
```
9. Build the assets

```
#!shell

gulp build
```
10. Edit Django configuration file:

```
#!shell

/todo/todolist/todolist/settings.py
```
11. Run the migrations:

```
#!shell

python manage.py migrate
```
12. Collect static files (for production):

```
#!shell

python manage.py collectstatic
```

13. Run the Django tests (optional):


```
#!shell

python manage.py test
```

If you are deploying for a production like system, you will find some sample configuration files in the release_support directory of the project.

In order to run as a test app, you can always use the internal testserver of Django (*not for production*):

```
#!shell

python manage.py runserver <ipaddress>:<port>
```

### Who do I talk to? ###

* Kostas Petrakis <petkostas@gmail.com>