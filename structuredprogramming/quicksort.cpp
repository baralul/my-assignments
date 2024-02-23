#include<iostream>
using namespace std;


int partitioning(int arr[], int start, int end) {
    int count = 0;
    for (int i = start; i < end; i++) {
        if (arr[i + 1] < arr[start]) {
            count ++;
        }
    }
    int pivotindex = start + count;
    swap(arr[start], arr[pivotindex]);
    int i = start, j = end;
    while(i < pivotindex && j > pivotindex) {
        while(arr[i] < arr[pivotindex]) {
            i++;
        }
        while(arr[j] > arr[pivotindex]) {   
            j--;
        }
        swap(arr[i], arr[j]);
    }
    return pivotindex;
}

void quicksort(int arr[], int start, int end) {
    if (start >= end) {
        return;
    }
    int p = partitioning(arr, start, end);
    quicksort(arr, start, p-1);
    quicksort(arr, p+1, end);
}

int main() {
    int n = 3; int start = 0; int end = n-1;
    int arr[n];
    for (int i=0; i<n; i++) {
        cin >> arr[i];
    }
    quicksort(arr, start, end);
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}
