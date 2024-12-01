n=1;
max=24;
while [ "$n" -le "$max" ]; do
  mkdir "day$n"
  n=`expr "$n" + 1`;
done
