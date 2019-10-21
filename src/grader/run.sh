g++ -o src src.c -O2 -w
cd test
tests=$(ls -1 | sed -e 's/\..*$//' | sort | uniq)
cd ..
result=""
for test in $tests; do
    testResult=$(timeout 1 ./src < ./test/$test.in)
    if [[ -z $testResult ]]; then
        result=$result"T"
    else
        testCase=$(cat ./test/$test.out)
        if [[ "$testResult" == "$testCase" ]]	
        then
            result=$result"P"
        else
            result=$result"-"
        fi
    fi
done
echo $result