cd tests
tests=$(ls -1 | sed -e 's/\..*$//' | sort | uniq)
cd ..
result=""
for test in $tests; do
    testResult=$(timeout 1 ./src < ./tests/$test.in || [ $? -eq 124 ] && echo "TLE")
    if [[ "$testResult" == "TLE" ]]; then
        result=$result"T"
    else
        testCase=$(cat ./tests/$test.out)
        if [[ "$testResult" == "$testCase" ]]	
        then
            result=$result"P"
        else
            result=$result"-"
        fi
    fi
done
echo $result