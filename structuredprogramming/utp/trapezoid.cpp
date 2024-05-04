#include <iostream>
#include <cmath>
#include <vector>

using namespace std;

template <typename T>
class Trapezoid {
    T base1, base2, height;
    
    public:
        Trapezoid(T mybase1 = 10, T mybase2 = 10, T myheight = 10) : base1(mybase1), base2(mybase2), height(myheight) {}
        
        void setBase1(T new_base1) {
            base1 = new_base1;
        }
        void setBase2(T new_base2) {
            base2 = new_base2;
        }
        void setHeight(T new_height) {
            height = new_height;
        }
        T getBase1() {
            return base1;
        }
        T getBase2() {
            return base2;
        }
        T getHeight() {
            return height;
        }
        
        T calculateArea() {
            return ((base1 + base2)/2) * height;
        }
        
        T calculatePerimeter() {
            return 2 * sqrt(pow((base1-base2)/2, 2)+pow(height, 2)) + base1 + base2;
        }
};


int main() {
    
    cout << "Case 2:" << endl;
    Trapezoid<double> * trap1 = new Trapezoid<double>(3.0,7.0,4.0);
    Trapezoid<double> * trap2 = new Trapezoid<double>();
    
    double *new_height_trap1 = new double(5.0);
    trap1->setHeight(*new_height_trap1);
    
    double *new_height_trap2 = new double(7.0);
    trap2->setHeight(*new_height_trap2);
    
    vector<Trapezoid<double>>* kumpulan_tp = new vector<Trapezoid<double>>;
    kumpulan_tp->push_back(*trap1);
    kumpulan_tp->push_back(*trap2);
    
    int i = 1;
    
    for(auto kumpulan : *kumpulan_tp){
        cout<<"Trapezoid "<<i<<" : " <<endl;
        cout<<"Height : "<<kumpulan.getHeight()<<endl;
        cout<<"Base 1 : " <<kumpulan.getBase1()<<endl;
        cout<<"Base 2 : "<<kumpulan.getBase2()<<endl;
        cout<<"Area : "<<kumpulan.calculateArea()<<endl;
        cout<<"Perimeter : "<<kumpulan.calculatePerimeter()<<endl;
        cout<< endl;
        
        i++;
    }
    return 0;
}



