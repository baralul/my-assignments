#include <iostream>
#include <cmath>
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
            return sqrt(((base1-base2)/2)*((base1-base2)/2)) + 4*4;
        }
};

int main() {
    Trapezoid <int> tp;
    cout << tp.getHeight() << endl;
    tp.setBase1(7);
    tp.setBase2(3);
    tp.setHeight(4);

    cout << tp.getHeight() << endl;
    cout << "perimeter is: " << tp.calculatePerimeter() << endl;
    cout << "area is: " << tp.calculateArea() << endl;
}
