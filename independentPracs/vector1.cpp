#include <bits/stdc++.h>
using namespace std;

int main() {
	int T;
	cin >> T;
	
	for(int i=0; i<T; i++) {
	    int N;
	    cin >> N;
	    vector<int> v1;
	    for (int j=0; j<N; j++) {
	        cin >> vector[j]; 
	        if(N%3 == 0 && N%2 == 1) {
	            cout << vector[(N+1)/2];
	        }
	        else if(N%3 == 0 && N%2 == 0) {
	            cout << vector[0] << " " << vector[N-1];
	        } else {
	            cout << vector[0] + vector[N-1];
	        }
	    }
	}

}

