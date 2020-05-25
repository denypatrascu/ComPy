import json
import re

inputCode = """\
import math
import os
import random
import re
import sys

# Complete the sockMerchant function below.
def sockMerchant(n, ar):
    socks = dict()
    result = 0
    for sock in ar:
        if socks.get(sock) is False:
            socks.update({sock: True})
            result += 1
        else:
            socks.update({sock: False})
    return result

if __name__ == '__main__':
    n = int(input())
    ar = list(map(int, input().rstrip().split()))
    result = sockMerchant(n, ar)
    print(result)
"""

inputData = """\
9
10 20 20 10 10 30 50 10 20
"""

with open("code.json", "w") as output:
    output.write(json.dumps({
        'inputData': inputData,
        'inputCode': inputCode,
        'problemId': '507f191e810c19729de860ea',
        'userId': 'denypatrascu@gmail.com'
    }))
