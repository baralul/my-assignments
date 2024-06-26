#include <iostream>
#include <ctime>
#include <fstream>
#include <iomanip>
#include "sorting.hpp"
#include "numbergenerator.hpp"
#include "data.hpp"
#include "arraymanipulator.hpp"

int main() {
    
    clock_t start, end;
    double duration;
    
    int *array = array10000;
    int n = 10000;
    sortArray(array, 0, n - 1);
    reverseArray(array, n);
    
    /*
    for(int i=0; i<n; i++){
        std::cout << array[i] << ", ";
    }
    */
    
    // Memanggil fungsi
    start = clock();
    //bubbleSort(array, n);
    //insertionSort(array, n);
    //selectionSort(array, n);
    //mergeSort(array, 0, n - 1);
    quickSort(array, 0, n - 1);
    end = clock();
    duration = double(end - start) / CLOCKS_PER_SEC;
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Waktu sorting: " << duration << " detik" << std::endl;
    
    /* start = clock();
    insertionSort(array, n);
    end = clock();
    duration = double(end - start) / CLOCKS_PER_SEC;
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Insertion sort: " << duration << " detik" << std::endl;
    
    start = clock();
    selectionSort(array, n);
    end = clock();
    duration = double(end - start) / CLOCKS_PER_SEC;
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Selection sort: " << duration << " detik" << std::endl;
    
    start = clock();
    mergeSort(array, 0, n - 1);
    end = clock();
    duration = double(end - start) / CLOCKS_PER_SEC;
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Merge sort: " << duration << " detik" << std::endl;
    
    start = clock();
    quickSort(array, 0, n - 1);
    end = clock();
    duration = double(end - start) / CLOCKS_PER_SEC;
    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Quick sort: " << duration << " detik" << std::endl;
    */

    std::ofstream outFile("detik");
    if (!outFile) {
        std::cerr << "Error opening file!" << std::endl;
    }

    outFile << std::fixed << std::setprecision(6) << duration;
    outFile.close(); 
    
    
    /*
    for(int i=0; i<n; i++){
        std::cout << array[i] << ", ";
    }
    */
    
    return 0;
}
