#include <iostream>
using namespace std;

void findCommon(int A1[], int B1[], int C1[], int N1, int N2, int N3){
    for(int i=0; i<N1; i++){
        for(int j=0; j<N2; j++){
            if(A1[i]==B1[j]){
                for(int k=0; k<N3; k++){
                    if(B1[j]==C1[k]){
                        cout << C1[k] << " ";
                    }
                    if(B1[j]<C1[k]){
                        break;
                    }
                }
            }
            if(A1[i]<B1[j]){
                break;
            }
            
        }
    }
}

