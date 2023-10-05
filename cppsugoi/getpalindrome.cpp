#include <iostream>
#include <string>
using namespace std;

int main() {
    int t, k;
    bool again;
    cin >> t;

    for (int i = 0; i < t; i++) {
        cin >> k;
        again = true;
        if (1 < t && t < 11) {
        if (k < 10) {
            cout << k + 1 << endl;
        } else if (9 < k && k < 1000000) {
            k++;
            while (k < 100 && again) {
                string check = to_string(k);
                if (check[0] == check[1]) {
                    cout << k << endl;
                    again = false;
                    break;
                } else {
                    k++;
                }
            }
            while (k < 1000 && again) {
                string check = to_string(k);
                if (check[0] == check[2]) {
                    cout << k << endl;
                    again = false;
                    break;
                } else {
                    k++;
                }
            }
            while (k < 10000 && again) {
                string check = to_string(k);
                if (check[0] == check[3] && check[1] == check[2]) {
                    cout << k << endl;
                    again = false;
                    break;
                } else {
                    k++;
                }
            }
            while (k < 100000 && again) {
                string check = to_string(k);
                if (check[0] == check[4] && check[1] == check[3]) {
                    cout << k << endl;
                    again = false;
                    break;
                } else {
                    k++;
                }
            }
            while (k < 1000000 && again) {
                string check = to_string(k);
                if (check[0] == check[5] && check[1] == check[4] && check[2] == check[3]) {
                    cout << k << endl;
                    again = false;
                    break;
                } else {
                    k++;
                }
            }
        }
    }
    }


    return 0;
}
