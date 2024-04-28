#include <iostream>
#include <cstring>

using namespace std;

bool searchHorizontal(char matrix[max_rows][max_cols], int rows, int cols, string word) {
    for (int i = 0; i < rows; i++) {
        string rowStr = "";
        for (int j = 0; j < cols; j++) {
            rowStr += matrix[i][j];
        }
        if (rowStr.find(word) != string::npos) {
            return true;
        }
    }
    return false;
}

bool searchVertical(char matrix[max_rows][max_cols], int rows, int cols, string word) {
    for (int j = 0; j < cols; j++) {
        string colStr = "";
        for (int i = 0; i < rows; i++) {
            colStr += matrix[i][j];
        }
        if (colStr.find(word) != string::npos) {
            return true;
        }
    }
    return false;
}

bool searchDiagonalRight(char matrix[max_rows][max_cols], int rows, int cols, string word) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            string diagStrR = "";
            for (int k = 0; k < word.length(); k++) {
                if (i + k < rows && j + k < cols) {
                    diagStrR += matrix[i + k][j + k];
                }
            }
            if (diagStrR == word) {
                return true;
            }
        }
    }
    return false;
}

bool searchDiagonalLeft(char matrix[max_rows][max_cols], int rows, int cols, string word) {
    for (int i=0; i<rows; i++) {
        for (int j=cols-1; j>=0; j--) {
            string diagStrL = "";
            for (int k = 0; k < word.length(); k++) {
                if (i + k < rows && j - k >= 0) {
                    diagStrL += matrix[i - k][j - k];
                }
            }
            if (diagStrL == word) {
                return true;
            }
        }
    }
    
    return false;
}

bool searchDiagonalRightUp(char matrix[max_rows][max_cols], int rows, int cols, string word) {
    for (int i=rows-1; i>=0; i--) {
        for (int j=0; j<cols; j++) {
            string diagStrRU = "";
            for (int k=0; k<word.length(); k++) {
                if (i - k >= 0 && j + k < cols) {
                    diagStrRU += matrix[i - k][j + k];
                }
            }
            if (diagStrRU == word) {
                return true;
            }
        }
    }
    return false;
}

bool searchDiagonalLeftUp(char matrix[max_rows][max_cols], int rows, int cols, string word) {
    for (int i=rows-1; i>=0; i--) {
        for (int j=cols-1; j>=0; j--) {
            string diagStrLU = "";
            for (int k=0; k<word.length(); k++) {
                if (i - k >= 0 && j - k >= 0) {
                    diagStrLU += matrix[i - k][j - k];
                }
            }
            if (diagStrLU == word) {
                return true;
            }
        }
    }
    return false;
}
void searchWordsInMatrix(char matrix[max_rows][max_cols], int rows, int cols, string arr[], int N) {
    for (int i = 0; i < N; i++) {
        string word = arr[i];
        bool found = false;
        if  (searchHorizontal(matrix, rows, cols, word) || 
        searchVertical(matrix, rows, cols, word) || 
        searchDiagonalRight(matrix, rows, cols, word) ||
        searchDiagonalLeft(matrix, rows, cols, word) || 
        searchDiagonalRightUp(matrix, rows, cols, word) ||
        searchDiagonalLeftUp(matrix, rows, cols, word)
            ) {
            cout << "Ada" << endl;
        } else {
            cout << "Tidak Ada" << endl;
        }
    }
}
//Adding a void search words in matrix to find the answer
int main() {
    int N;
    cin >> N;
    string arr[N];
    
    for(int i=0; i<N; i++) {
        cin >> arr[i];
    }

    char matrix[23][23] = {
    {'a', 'a', 'f', 'l', 'k', 'h', 'p', 'f', 's', 's', 'u', 'f', 'i', 'c', 'i', 'c', 'l', 'e', 's', 'g', 'n', 'n', 'h'},
    {'s', 'f', 'v', 'r', 'e', 'o', 'm', 'r', 'w', 'l', 'r', 't', 't', 's', 'x', 'o', 'q', 'q', 'n', 'a', 'o', 'a', 'o'},
    {'q', 'e', 'i', 'a', 'i', 'f', 'x', 'a', 'e', 'i', 'r', 'f', 'v', 'f', 'y', 's', 'x', 'i', 'm', 'i', 'n', 'j', 'i'},
    {'w', 's', 't', 'r', 'l', 'g', 'o', 'c', 'a', 'p', 'b', 'i', 'a', 'f', 'i', 'w', 'i', 'w', 't', 'u', 'a', 'c', 'm'},
    {'f', 'e', 'y', 'a', 'e', 'a', 'i', 's', 't', 'p', 'c', 'r', 'l', 'u', 'j', 'k', 'o', 'a', 'k', 'c', 'e', 'r', 's'},
    {'r', 'v', 'd', 'a', 'k', 'p', 'n', 'd', 'e', 'e', 'h', 'd', 'e', 'm', 's', 'n', 'c', 'k', 'k', 'f', 'o', 'a', 'h'},
    {'m', 'r', 'n', 'e', 'd', 's', 'l', 'c', 'r', 'r', 'i', 'w', 'n', 'r', 's', 'a', 'a', 'f', 'i', 't', 'm', 'm', 'i'},
    {'y', 'a', 'a', 'e', 'c', 'i', 'e', 'a', 'h', 'y', 'm', 'o', 't', 'a', 'v', 'h', 'r', 's', 's', 't', 'i', 's', 'b'},
    {'r', 'j', 's', 'e', 'w', 'e', 'l', 'c', 'c', 'e', 'n', 'n', 'i', 'e', 't', 'o', 'h', 'w', 's', 'g', 'l', 's', 'e'},
    {'a', 't', 'a', 'n', 'y', 'y', 'm', 'o', 'i', 'e', 'e', 's', 'n', 'e', 's', 'i', 'o', 'i', 'r', 'e', 'l', 't', 'r'},
    {'u', 't', 'e', 'n', 'e', 'w', 'e', 'b', 'h', 'm', 'y', 'b', 'e', 't', 'n', 'n', 'r', 'a', 'i', 'e', 'b', 'e', 'n'},
    {'r', 'c', 'l', 'k', 'u', 't', 'e', 'a', 'e', 'q', 'j', 'l', 's', 'g', 's', 'h', 't', 'g', 'd', 's', 'k', 'o', 'a'},
    {'b', 'h', 'o', 'i', 'c', 'a', 't', 'n', 'r', 'r', 's', 'd', 'd', 'e', 'c', 'e', 'h', 'o', 'o', 'l', 'g', 'i', 't'},
    {'e', 'n', 's', 'l', 'u', 'a', 'r', 'i', 'r', 's', 'e', 't', 'a', 'l', 'o', 'c', 'o', 'h', 'c', 't', 'o', 'h', 'e'},
    {'f', 'z', 'f', 'u', 'd', 'q', 'j', 'y', 'm', 'a', 'd', 'o', 'y', 'i', 'w', 'y', 'g', 'l', 'o', 'v', 'e', 's', 'u'},
    {'t', 'e', 'k', 'a', 'l', 'f', 'w', 'o', 'n', 's', 'n', 'a', 'e', 'b', 'm', 'i', 'e', 'j', 't', 'z', 'n', 't', 'g'},
    {'e', 's', 'w', 'p', 'o', 's', 'j', 'x', 'e', 'u', 't', 'u', 'y', 'o', 'z', 'u', 'w', 'a', 'k', 'e', 'z', 'h', 'm'},
    {'k', 'z', 'u', 'h', 'b', 'p', 'e', 'z', 'e', 'e', 'r', 'f', 'l', 'm', 's', 'n', 'o', 'w', 'b', 'a', 'l', 'l', 'h'},
    {'n', 's', 'n', 'o', 'w', 'b', 'o', 'a', 'r', 'd', 'y', 't', 'v', 'w', 'y', 'c', 'l', 'e', 'v', 'o', 'h', 's', 'a'},
    {'a', 'c', 'o', 'c', 'r', 'o', 'l', 'g', 'z', 'i', 'y', 'c', 'h', 'o', 'd', 'r', 'a', 'z', 'z', 'i', 'l', 'b', 'i'},
    {'l', 'b', 'v', 'k', 'k', 'w', 'a', 'n', 'z', 'a', 'a', 'q', 'i', 'n', 'w', 'o', 'l', 'p', 'w', 'o', 'n', 's', 'l'},
    {'b', 'f', 'r', 'e', 'e', 'z', 'i', 'n', 'g', 'r', 'a', 'i', 'n', 's', 'l', 'i', 'l', 'g', 't', 'm', 'e', 'l', 't'},
    {'h', 'q', 'p', 'y', 'l', 'w', 'h', 'f', 'm', 'n', 'f', 'f', 'u', 'f', 'p', 's', 'w', 'x', 'n', 'u', 'm', 'm', 'v'}
};
    
    return 0;
}
