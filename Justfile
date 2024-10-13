set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

server := "CHANGEME"
appname := "places"

system-info:
    @echo "This is an {{arch()}} machine,"
    @echo "With {{num_cpus()}} CPUs,"
    @echo "Running on {{os()}} ({{os_family()}})."

add-remote:
    git remote add piku piku@{{server}}:{{appname}}

deploy:
    git push -f piku main

lint:
    npm run lint

dev:
    npm run dev

repo:
    Start-Process "https://github.com/seguri/{{appname}}"