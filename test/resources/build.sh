#!/bin/bash
usage (){
  echo -n "
    $0 [ -u USER ] [ -p JS_PATH ]
  "
  exit 2;
}

# defaults
flarum_user="flarum"
flarum_wdir="$( realpath $0 | sed "s|\(.*\)/vendor.*|\1|")" #"/var/www/flarum"
npm_user="$flarum_user"
npm_wdir="$flarum_wdir/vendor/webbinaro/flarum-calendar/js"

while getopts 'u:p:?h' opt
do
  case $opt in
    u) 
      flarum_user=$OPTARG
      npm_user="$flarum_user"
      ;;
    p)
      flarum_wdir=$OPTARG
      npm_wdir="$flarum_wdir/vendor/webbinaro/flarum-calendar/js"
      ;;
    h|?) usage ;;
  esac
done

# check dependencies
[[ -f "$( which npm )" ]] || apt install npm
[[ -f "$( which gulp )" ]] || apt install gulp
cd $npm_wdir
[[ -d "./node_modules" ]] || sudo -u $npm_user npm install

# build
cd "$npm_wdir"
sudo -u $npm_user npm run build

cd $flarum_wdir
sudo -u $flarum_user php flarum cache:clear
