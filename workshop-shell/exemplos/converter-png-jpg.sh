#!/bin/bash
find "$1" -type f -name '*.png' |
while read imagem
do
    convert "$imagem" "$imagem".jpg
done
