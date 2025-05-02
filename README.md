
#  application-quiz

<p style="text-align: center;"><img src="./__images/app.png" ></p>

# Technolgies
- Taon v19 (taon.dev)
- Angular v19
- NgRx v19
- TypeORM (SQL.js in browser/ SQLite in Nodejs server)



# Development

1. Instal taon:
```
npm i -g taon
```

2. Go do *taon-quiz* folder.

**There is no need for node_modules installation with taon framework !!!** 

3. Start application with TypeORM/SQL.js db inside BROWSER - simplest way to develop.
```
taon start --websql
```

or start normal NodeJS server from vscode

```
taon start
```
      
<p style="text-align: center;"><img src="./__images/sqlite-server-start.png" ></p>

# Bugs / Todo
- typos fixes
- exhaustMap rxjs for buttons routing
- fromEvent rxjs for buttons
- remove firstValueFrom -> make it reactive
- production bug (TypeORM is adding on production empty entities to db - better validation)
- answers statistics algorithm needs logic fix
- tests: unit (jest, cucumber component tests) + e2e (cucumber e2e)


# DEMO SQL.JS DATABASE IN BROWSER

https://darekf77.github.io/application-quiz/#/quiz


<p style="text-align: center;"><img src="./__images/websql.png" ></p>
