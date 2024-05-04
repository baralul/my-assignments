#include <iostream>
#include <cmath>
#include <vector>

using namespace std;

template <typename T>

class Kite {
    T diag1, diag2;
    
    public:
        Kite (T diagonal1 = 10, T diagonal2 = 10) : diag1(diagonal1), diag2(diagonal2) {}
        
        void setDiagonal1(T newdiag1) {
            diag1 = newdiag1;
        }
        
        void setDiagonal2(T newdiag2) {
            diag2 = newdiag2;
        }
        
        T getDiagonal1() {
            return diag1;
        }
        
        T getDiagonal2() {
            return diag2;
        }
        
        T calculateArea() {
            return (0.5 * diag1 * diag2);
        }
        
        T calculatePerimeter() {
        T side = sqrt(pow((diag1 / 2), 2) + pow((diag2 / 2), 2));
        return 2 * (side + side);
    }
};

int main() {
    
    Kite<double> *kite1 = new Kite<double>();
    Kite<double> *kite2 = new Kite<double>(8.0, 10.0);
    vector<Kite<double>> *kites = new vector<Kite<double>>;
    
    kites->push_back(*kite1);
    kites->push_back(*kite2);
    
    int i = 1;
    for(auto kite : *kites) {
        cout <<"Kite "<<i<<" : "<<endl;
        cout <<"Diagonal 1 : "<<kite.getDiagonal1()<<endl;
        cout <<"Diagonal 2 : "<<kite.getDiagonal2()<<endl;
        cout <<"Area : "<<kite.calculateArea()<<endl;
        cout <<"Perimeter : "<<kite.calculatePerimeter()<<endl;
        cout <<endl;
        
        i++;
    }
    
    return 0;
}



