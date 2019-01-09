#!/usr/bin/env bash

for file in yeoman-generator; do
  cp -R "src/${file}/templates" "generators/${file}";
done;
unset file;
