#include <iostream>

using namespace std;


bool searchHorizontal(char matrix[105][105], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            string diagStrR = "";
            for (int k = 0; k < 5; k++) {
                if (j + k < cols) {
                    diagStrR += matrix[i][j + k];
                }
            }
            if (diagStrR == "snuke") {
                for (int k = 0; k < 5; k++) {
                    cout << i + 1 << " " << j + k + 1 << endl;
                }
                return true;
            }
        }
    }
    return false; 
}


bool searchVertical(char matrix[105][105], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            string diagStrR = "";
            for (int k = 0; k < 5; k++) {
                if (i + k < rows) {
                    diagStrR += matrix[i + k][j];
                }
            }
            if (diagStrR == "snuke") {
                for (int k = 0; k < 5; k++) {
                    cout << i + k + 1 << " " << j + 1 << endl;
                }
                return true;
            }
        }
    }
    return false; 
}

bool searchDiagonalRight(char matrix[105][105], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            string diagStrR = "";
            for (int k = 0; k < 5; k++) {
                if (i + k < rows && j + k < cols) {
                    diagStrR += matrix[i + k][j + k];
                }
            }
            if (diagStrR == "snuke") {
                for (int k = 0; k < 5; k++) {
                    cout << i + k + 1 << " " << j + k + 1 << endl;
                }
                return true;
            }
        }
    }
    return false;
}

bool searchDiagonalLeft(char matrix[105][105], int rows, int cols) {
    for (int i=0; i<rows; i++) {
        for (int j=cols-1; j>=0; j--) {
            string diagStrL = "";
            for (int k = 0; k < 5; k++) {
                if (i + k < rows && j - k >= 0) {
                    diagStrL += matrix[i + k][j - k];
                }
            }
            if (diagStrL == "snuke") {
                for (int k = 0; k < 5; k++) {
                    cout << i + k+1 << " " << j - k+1 << endl;
                }
                return true;
            }
        }
    }
    return false;
}

bool searchDiagonalRightUp(char matrix[105][105], int rows, int cols) {
    for (int i=rows-1; i>=0; i--) {
        for (int j=0; j<cols; j++) {
            string diagStrRU = "";
            for (int k=0; k<5; k++) {
                if (i - k >= 0 && j + k < cols) {
                    diagStrRU += matrix[i - k][j + k];
                }
            }
            if (diagStrRU == "snuke") {
                for (int k=0; k<5; k++) {
                    cout << i - k+1 << " " << j + k+1 << endl;
                }
                return true;
            }
        }
    }
    return false;
}

bool searchDiagonalLeftUp(char matrix[105][105], int rows, int cols) {
    for (int i=rows-1; i>=0; i--) {
        for (int j=cols-1; j>=0; j--) {
            string diagStrLU = "";
            for (int k=0; k<5; k++) {
                if (i - k >= 0 && j - k >= 0) {
                    diagStrLU += matrix[i - k][j - k];
                }
            }
            if (diagStrLU == "snuke") {
                for (int k=0; k<5; k++) {
                    cout << i - k+1 << " " << j - k+1 << endl;
                }
                return true;
            }
        }
    }
    return false;
}

void searchWordsInMatrix(char matrix[105][105], int rows, int cols) {
    searchHorizontal(matrix, rows, cols);
    searchVertical(matrix, rows, cols);
    searchDiagonalRight(matrix, rows, cols);
    searchDiagonalLeft(matrix, rows, cols);
    searchDiagonalRightUp(matrix, rows, cols);
    searchDiagonalLeftUp(matrix, rows, cols);
}


int main() {
    int H, W;
    
    cin >> H >> W;
    cin.ignore();

    char matrix[105][105];

    for (int i = 0; i < H; ++i) {
        cin.getline(matrix[i], W+1); 
    }

    searchWordsInMatrix(matrix, H, W);

    return 0;
}

