#include<iostream>
using namespace std;
bool isValidPassword(string password) {
    bool delapan = false, besar = false, kecil = false, angka = false;
    if (password.length() > 8) {
    }
    else {
        return false;
    }
    
    for (char simbol : password) {
        if (simbol <= 90 && simbol >= 65) {
            besar = true;
            break;
        }
        else {
            continue;
        }
    }
    
    for (char simbol : password) {
        if (simbol <= 122 && simbol >= 97) {
            kecil = true;
            break;
        }
        else {
            continue;
        }
    }
        
    for (char simbol : password) {
        if (simbol <= 57 && simbol >= 48) {
            angka = true;
            break;
        }
        else {
            continue;
        }
    }
    
    if (besar == true && kecil == true && angka == true) {
        return true;
    }
    else {
        return false;
    }
}
int main() {
    string password;
    cin >> password;
    
    if (isValidPassword(password)) {
        cout << "Password valid." << endl;
    } else {
        cout << "Password tidak valid." << endl;
    }
    return 0;
}
