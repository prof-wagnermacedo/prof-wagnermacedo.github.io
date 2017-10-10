#!/bin/bash
for i in `seq 1 $#`
do
    dir=`dirname "$1"`
    mkdir "$dir/miniaturas"

    cd "$dir"
    mogrify -format gif -path miniaturas -thumbnail 100x100 "$1"

    shift
done
