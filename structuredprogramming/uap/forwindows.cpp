#include <iostream>
#include <iomanip>
#include <string>
#include <ctime>
#include <vector>
#include <stdlib.h>
#include <unistd.h>

using namespace std;

class Cake;
class User;

int selectCake();
int selectFlavor();
int selectSize();
double calculateTotal(Cake array[], int n);
Cake listingCake();
void orderCake();
void confirmOrder(Cake array[], int n);
void mainMenu();
void showCatalog();
void itemList();
void showReceipt(Cake array[], int n);
void registerUser();
void showTime();
bool loginUser();
User* findUser(const string& username);

bool in_loop = true;
bool cart_empty = true;
bool is_logged_in = false;
User* current_user = nullptr;
const pair<string, double> options[] = {
    {"cookies", 4.50},
    {"cupcake", 5.50},
    {"birthday cake", 6.90}
};
const string sizes[4] = {"Small", "Medium", "Large", "Extra Large"};
const string flavors[4] = {"Vanilla", "Chocolate", "Red Velvet", "Strawberry"};
const double sizeMultiplier[4] = {1.0, 1.5, 2.0, 2.5};

class User {
    string username;
    string password;
    
    public:
        User(string u, string p) : username(u), password(p) {}
        
        string getUsername() {
            return username;
        }
        
        bool checkPassword(string p) {
            return password == p;
        }
};

vector<User> users;

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
       int navigate = -1;
            cout << "1. Login\n2. Register\n3. Exit" << endl;
        
        while(!(navigate >= 1 && navigate <= 3)) {
            cout << "Please select from the available option: ";
            cin >> navigate;
            system("clear"); // todo: for windows it is "cls"
        }
        
        if (navigate == 1) {
            if (loginUser()) {
                cout << "Login successful!" << endl;
                sleep(2);
                system("clear");
                is_logged_in = true;
                while (is_logged_in) {
                    int action = -1;
                    cout << "Welcome to Hammer Bakery! How can we help you?" << endl;
                    cout << "1. Order\n2. Show menu\n3. Logout" << endl;
                    
                    while (!(action >= 1 && action <= 3)) {
                        cout << "Please select from the available option: ";
                        cin >> action;
                        system("clear");
                    }
                    
                    if (action == 1) {
                        orderCake();
                    } else if (action == 2) {
                        showCatalog(); 
                        cout << "Press enter to return";
                        cin.ignore(1000, '\n');
                        cin.get(); 
                        system("clear");
                    } else if (action == 3) {
                        cout << "Logging out." << endl;
                        sleep(1);
                        system("clear");
                        cout << "Logging out.." << endl;
                        sleep(1);
                        is_logged_in = false;
                        system("clear");
                    }
                }
            } else {
                cout << "Login failed" << endl;
                sleep(2);
                system("clear");
            }
        } else if (navigate == 2) {
            registerUser();
        } else if (navigate == 3) {
            int really;
            while(really != 1 || really != 2){
                cout << "are you sure want to exit?\n1. Yes\n2. No\nPlease select from the available option: ";
                cin >> really;
                system("clear");
                if(really == 1){
                    in_loop = false;
                    system("clear");
                    cout << "See you next time!" << endl;
                    break;
                }
                else if(really == 2){
                    system("clear");
                    break;
                }
            }
        }
    }
}

void registerUser() {
    string username, password;
    cout << "Register an account" << endl;
    cout << "Enter username: ";
    cin >> username;
    cout << "Enter password: ";
    cin >> password;
    system("clear");
    
    if (findUser(username) == nullptr) {
        users.push_back(User(username, password));
        cout << "Registration successful!" << endl;
        sleep(2);
        system("clear");
    } else {
        cout << "Username already exists!" << endl;
        sleep(2);
        system("clear");
    }
}

bool loginUser() {
    string username, password;
    cout << "Login to your account" << endl;
    cout << "Enter username: ";
    cin >> username;
    cout << "Enter password: ";
    cin >> password;
    system("clear");
    
    User* user = findUser(username);
    if (user != nullptr && user->checkPassword(password)) {
        current_user = user;
        return true;
    }
    return false;
}

User* findUser(const string& username) {
    for (auto& user : users) {
        if (user.getUsername() == username) {
            return &user;
        }
    }
    return nullptr;
}

int selectCake() {
    int cake = -1;
    showCatalog();
    while(cake < 1 || cake > sizeof(options)/sizeof(options[0])) {
        cout << "Please select from the available option: ";
        cin >> cake;
        system("clear");
    }
    
    return cake;
}

int selectFlavor() {
    int flavor = -1;
    cout << "Select flavor:\n1. Vanilla\n2. Chocolate\n3. Red Velvet\n4. Strawberry" << endl;
    while(!(flavor == 1 || flavor == 2 || flavor == 3 || flavor == 4)) {
        cout << "Please select from the available option: ";
        cin >> flavor;
        system("clear");
    }
    
    return flavor;
}

int selectSize() {
    int size = -1;
    cout << "Select size:\n1. Small\n2. Medium\n3. Large\n4. Extra Large" << endl;
    while(!(size == 1 || size == 2 || size == 3 || size == 4)) {
        cout << "Please select from the available option: ";
        cin >> size;
        system("clear");
    }
    return size;
}

Cake listingCake() {
    int cake, flavor, size;
    
    cake = selectCake()-1;
    flavor = selectFlavor()-1;
    size = selectSize()-1;

    double basePrice = options[cake].second;
    double finalPrice = basePrice * sizeMultiplier[size];
    
    Cake cake_object(options[cake].first, sizes[size], flavors[flavor], finalPrice);
    
    return cake_object;
}

void orderCake() {
    int n;
    
    cout << "How many cakes do you want to buy?: ";
    cin >> n;
    system("clear");
    
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
    for(int i = 0; i < n; i++) {
        cout << i + 1 << ". " << options[i].first << ":" << endl;
        for(int j = 0; j < 4; j++) {
            cout << "   " << sizes[j] << " : " << fixed << setprecision(2) 
                << options[i].second * sizeMultiplier[j] << endl;
        }
    }
}

void itemList(Cake array[], int n) {
    cout << "------------------------------------------------------------" << endl;
    cout << "| " << setw(15) << left << "Flavor" 
         << "| " << setw(15) << "Cake" 
         << "| " << setw(15) << "Size" 
         << "| " << setw(5) << "Price" << " |" << endl;
    cout << "------------------------------------------------------------" << endl;
    for(int i = 0; i < n; i++) {
        cout << "| " << setw(15) << left << array[i].getFlavor() 
             << "| " << setw(15) << array[i].getName() 
             << "| " << setw(15) << array[i].getSize() 
             << "| " << setw(5) << array[i].getPrice() << " |" << endl;
    }
    cout << "------------------------------------------------------------" << endl;
}

void confirmOrder(Cake array[], int n) {
    int answer;
    
    cout << "Here's your order list: " << endl;
    itemList(array, n);
    cout << "Proceed with the order?\n1. Yes\n2. No\nPlease select from the available option: ";
    cin >> answer;
    system("clear");
    
    if(answer==1){
        showReceipt(array, n); // todo: write to a file 
    }
}

void showTime(){
    time_t now = time(0);
    tm *gmtm = gmtime(&now);
    gmtm->tm_hour += 7;  
    mktime(gmtm);  
    char dt[30];
    strftime(dt, sizeof(dt), "%Y-%m-%d %H:%M:%S WIB", gmtm); 
    cout << setw(50) << left << dt << endl;
}

double calculateTotal(Cake array[], int n){
    double total = 0;
    for (int i = 0; i < n; i++) {
        total += array[i].getPrice();
    }
    return total;
}

void showReceipt(Cake array[], int n) {
    double total;
    
    showTime();
    itemList(array, n);
    total = calculateTotal(array, n);
    
    cout << "| " << setw(51) << left << "Total" << setw(5) << total << " |" << endl;
    cout << "------------------------------------------------------------" << endl;
    cout << setw(50) << left << "Thank you for purchasing in our shop!" << endl;
    cout << "Press enter to continue";
    cin.ignore(1000, '\n');
    cin.get(); 
    system("clear");
}

int main() {
    
    mainMenu();

    return 0;
}
