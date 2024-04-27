#include <iostream>
#include <cstring>

using namespace std;


int main() {
    int N;
    cin >> N;
    string arr[N];
    
    for(int i=0; i<N; i++) {
        cin >> arr[i];
    }
    for(int i=0; i<N; i++) {
        cout << arr[i] << endl;
    }
}