#include <iostream>
#include <iomanip>
#include <string>
#include <ctime>

using namespace std;

class Cake;
class Receipt;

int selectCake();
int selectFlavor();
int selectSize();
Cake listingCake();
void orderCake();
void confirmOrder(Cake array[], int n);
void mainMenu();
void showCatalog();
void itemList();
void showReceipt(Cake array[], int n);

bool in_loop = true;
bool cart_empty = true;
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
    
    while(in_loop) {
        
        int navigate = -1, item;
        cout << "Welcome to Hammer Bakery! How can we help you?" 
            << "\n1. Order\n2. Show menu" << endl; // todo: 3. Purchase history\n4. Log out
        
        while(!(navigate == 1 || navigate == 2)) {
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

Cake listingCake() {
    int cake, flavor, size;
    
    cake = selectCake()-1;
    flavor = selectFlavor()-1;
    size = selectSize()-1;
    
    Cake cake_object(options[cake].first, sizes[size], flavors[flavor], options[cake].second);
    
    return cake_object;
}

void orderCake() {
    int n;
    
    cout << "How many cakes do you want to buy?: ";
    cin >> n;
    
    Cake *array = new Cake[n];
    for(int i=0; i<n; i++) {
        array[i] = listingCake();
        cart_empty = false;
    }
    
    if(!cart_empty) {
        confirmOrder(array, n);
    }
}

void showCatalog() {
    int n = sizeof(options)/sizeof(options[0]);
    
    cout << "Hammer Bakery's Menu" << endl;
    for(int i=0; i<n; i++) {
        cout << i+1 << ". " << options[i].first << " : " << fixed << setprecision(2) 
            << options[i].second << endl;
    }
}

void itemList(Cake array[], int n) {
    cout << setw(15) << left << "Flavor" << setw(15) << "Cake" << setw(15) 
        << "Size" << setw(5) << "Price" << endl;
    for(int i=0; i<n; i++) {
        cout << setw(15) << left << array[i].getFlavor() 
            << setw(15) << array[i].getName() 
            << setw(15) << array[i].getSize()
            << setw(5) << array[i].getPrice() << endl;
    }
} // todo: print total price

void confirmOrder(Cake array[], int n) {
    int answer;
    
    cout << "\nHere's your order list: " << endl;
    itemList(array, n);
    cout << "Proceed with the order?\n1. Yes\n2. No" << endl;
    cin >> answer;
    
    if(answer==1){
        showReceipt(array, n); // todo: write to a file
    }
}

void showReceipt(Cake array[], int n) {
    cout << setw(50) << left << "DD-MM-YYYY Purchase" << endl; // todo: with ctime record time
    itemList(array, n);
    cout << setw(50) << left << "Thank you for purchasing in our shop!" << endl;
}

int main() {
    
    mainMenu();

    return 0;
}
