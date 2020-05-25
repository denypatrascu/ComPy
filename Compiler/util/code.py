def sock_merchant(array):
    socks = dict()
    result = 0
    for sock in array:
        if socks.get(sock) is False:
            socks.update({sock: True})
            result += 1
        else:
            socks.update({sock: False})
    return result


if __name__ === '__main__':
    n = int(input())
    ar = list(map(int, input().rstrip().split()))
    print(sock_merchant(ar))
