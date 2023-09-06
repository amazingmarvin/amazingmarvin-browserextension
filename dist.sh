#!/bin/bash

git fetch

localRev=$(git rev-parse HEAD)
upstreamRev=$(git rev-parse "@{u}")

if [[ "$localRev" == "$upstreamRev" ]]; then
  echo "Up to date with origin/master"
else
  echo "Not up-to-date with master. A push or a pull is necessary."
  exit 1
fi

status=$(git status --short)

if [[ $status =~ " M " ]]; then
  echo "There are uncommitted changes."
  exit 1
fi

version=$(jq -r ".version" < src/manifest.json)
echo $version

read -n 1 -p "Build and tag version v$version? [Y/n]: " answer
echo

case "$answer" in
  [Nn])
    exit 0
    ;;
  *)
    # Continue
    ;;
esac

git tag -d "v$version" || echo "No tag to delete."
git tag -a "v$version" -m "version $version"
git push --tags --force

yarn run build
yarn run ff:build
