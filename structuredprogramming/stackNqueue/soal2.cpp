#include <iostream>
using namespace std;

int main() {
	int N;
	cin >> N;
	int arr[N];
	
	for(int i=0; i<N; i++) {
	    cin >> arr[i];
	}
	for(int i=1; i<N; i+=2) {
        cout << arr[i] << " ";
	}
	
    return 0;
}
