#include<iostream>
using namespace std;

void hitung(char operasi) {
    bool lanjut = true;
    while(lanjut) {
        int angka1, angka2;
        cout << "Masukan angka pertama: ";
        cin >> angka1;
        cout << "Masukan angka kedua: ";
        cin >> angka2;
        
        if (operasi == '1') {
            cout << angka1 + angka2 << endl;
            break;
        }
        else if (operasi == '2') {
            cout << angka1 * angka2 << endl;
            break;
        }
        else if (operasi == '3') {
            cout << angka1 - angka2 << endl;
            break;
        }
        else if (operasi == '4') {
            if (angka2 != 0) {
                cout << angka1 / angka2 << endl;
                break;
            }
            else {
                cout << "Error: Pembagian dengan angka 0 tidak diperbolehkan" << endl;
            }
        }
    }
}

void menu() {
    char operasi;
    bool lagi = true;
    while(true){
        cout << "Pilih operasi (1-4)\n1. Pertambahan\n2. Perkalian\n3. Perkurangan\n4. Pembagian\nX. Keluar\n";
        cin >> operasi;
        if (operasi == 'X') {
            exit(0);
        }
        else if(operasi != '1' && operasi != '2' && operasi != '3' && operasi != '4') {
            cout << "Operasi tidak valid\n";
            continue;
        }
        else{
            hitung(operasi);
            while(lagi) {
                char jawaban;
                cout << "Anda ingin menghitung lagi ? (Y/T)" << endl;
                cin >> jawaban;
                if(jawaban=='Y') {
                    hitung(operasi);
                    continue;
                }
                else if(jawaban=='T') {
                    lagi = false;
                    break;
                }
                else{
                    cout << "Perintah tidak dimengerti\n";
                    continue;
                }
            }
        }
    }
}

int main() {
    menu();
}
