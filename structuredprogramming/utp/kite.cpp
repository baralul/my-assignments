#include <iostream>
#include <cmath>
#include <vector>
using namespace std;

template <typename T>
class Kite {
    T diagonal1, diagonal2;
    
public:
    Kite(T myDiagonal1 = 10, T myDiagonal2 = 10) : diagonal1(myDiagonal1), diagonal2(myDiagonal2) {}
        
    void setDiagonal1(T new_diagonal1) {
        diagonal1 = new_diagonal1;
    }
    void setDiagonal2(T new_diagonal2) {
        diagonal2 = new_diagonal2;
    }
    T getDiagonal1() {
        return diagonal1;
    }
    T getDiagonal2() {
        return diagonal2;
    }
    
    T calculateArea() {
        return 0.5 * diagonal1 * diagonal2;
    }
    
    T calculatePerimeter() {
        T side = sqrt(pow((diagonal1 / 2), 2) + pow((diagonal2 / 2), 2));
        return 2 * (side + side);
    }
};

int main() {
    Kite<double> *kite1 = new Kite<double>();
    Kite<double> *kite2 = new Kite<double>(10.0, 10.0);
    vector<Kite<double>> *kites = new vector<Kite<double>>;

    kites->push_back(*kite1);
    kites->push_back(*kite2);

    int i = 1;
    for (auto kite: *kites) {
        cout << "Kite " << i << " : " << endl;
        cout << "Diagonal 1: " << kite.getDiagonal1() << endl;
        cout << "Diagonal 2: " << kite.getDiagonal2() << endl;
        cout << "Area: " << kite.calculateArea() << endl;
        cout << "Perimeter: " << kite.calculatePerimeter() << endl;
        cout << endl;
        i++;
    }

    return 0;
}
