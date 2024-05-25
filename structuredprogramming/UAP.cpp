#include <iostream>
#include <iomanip>
#include <string>
#include <ctime>

using namespace std;

class Cake;
class Receipt;

void mainMenu();
int selectCake();
int selectFlavor();
int selectSize();
Cake orderCake();
void showCatalog();

const pair<string, double> options[] = {
    {"cake1", 4.50},
    {"cake2", 5.50},
    {"cake3", 6.90}
};
const string sizes[5] = {"Small", "Medium", "Large", "Extra Large"};
const string flavors[5] = {"Vanilla", "Chocolate", "Red Velvet", "Strawberry"};

class Cake {
    string name, size, flavor;
    double price;
    
    public:
        Cake() : name("None"), size("None"), flavor("None"), price(0.0) {}
        Cake(string the_name, string the_size, string the_flavor, double the_price) {
            name = the_name;
            size = the_size;
            flavor = the_flavor;
            price = the_price;
        }
        
        string getName() {
            return name;
        }
        
        string getSize() {
            return size;
        }
        
        string getFlavor() {
            return flavor;
        }
        
        double getPrice() {
            return price;
        }
};

void mainMenu() {
    int navigate;
    
    cout << "Welcome to Hammer Bakery! How can we help you?" 
        << "\n1. Order\n2. Show menu\n3. Purchase history\n4. Log out" << endl;
    while(!(navigate == 1 || navigate == 2 || navigate == 3 || navigate == 4)) {
        cout << "Please select from the available option: ";
        cin >> navigate;
    }
    
    if(navigate == 1){
        orderCake();
    }
    else if(navigate == 2){
        showCatalog();
    }
}

int selectCake() {
    int cake = -1;
    showCatalog();
    while(cake < 1 || cake > sizeof(options)/sizeof(options[0])) {
        cout << "Please select from the available option: ";
        cin >> cake;
    }
    
    return cake;
}

int selectFlavor() {
    int flavor = -1;
    cout << "Select flavor:\n1. Vanilla\n2. Chocolate\n3. Red Velvet\n4. Strawberry" << endl;
    while(!(flavor == 1 || flavor == 2 || flavor == 3 || flavor == 4)) {
        cout << "Please select from the available option: ";
        cin >> flavor;
    }
    
    return flavor;
}

int selectSize() {
    int size = -1;
    cout << "Select size:\n1. Small\n2. Medium\n3. Large\n4. Extra Large" << endl;
    while(!(size == 1 || size == 2 || size == 3 || size == 4)) {
        cout << "Please select from the available option: ";
        cin >> size;
    }
    return size;
}

Cake orderCake() {
    int cake, flavor, size;
    
    cake = selectCake()-1;
    flavor = selectFlavor()-1;
    size = selectSize()-1;
    
    Cake cake_object(options[cake].first, sizes[size], flavors[flavor], options[cake].second);
    
    return cake_object;
}

void showCatalog() {
    int n = sizeof(options)/sizeof(options[0]);
    
    cout << "Hammer Bakery's Menu" << endl;
    for(int i=0; i<n; i++) {
        cout << i+1 << ". " << options[i].first << " : " << fixed << setprecision(2) 
            << options[i].second << endl;
    }
}

int main() {
    int n;
    
    cout << "How many cakes do you want to buy?: ";
    cin >> n;
    
    Cake *array = new Cake[n];
    for(int i=0; i<n; i++) {
        array[i] = orderCake();
    }
    
    cout << setw(50) << mid << "DD-MM-YYYY Purchase" << endl;
    cout << setw(35) << left << "Item" << setw(15) << right << "Price" << endl;
    for(int i=0; i<sizeof(array)/sizeof(array[0]); i++) {
        cout << setw(35) << left << array[i].getFlavor() << " " 
            << array[i].getName() << " (" << array[i].getSize() << ") "
            << setw(15) << right << array[i].getPrice() << endl;
    }
    cout << setw(50) << mid << "Thank you for purchasing in our shop!" << endl;
    
    

    return 0;
}
