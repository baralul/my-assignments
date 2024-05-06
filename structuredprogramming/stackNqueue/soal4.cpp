#include <iostream>
#include <stack>
#include <string>

using namespace std;


int main() {
    int N;
    stack<long> stack1;
    cin >> N;
    
    for(int i=0; i<N; i++) {
        string command;
        cin >> command;
        
        if(command == "push") {
            long x;
            cin >> x;
            stack1.push(x);
        }
        else if (command == "pop" && !stack1.empty()) {
            stack1.pop();
        }
        
        stack<long> temp = stack1;
        while(!temp.empty()) {
            cout << temp.top() << " ";
            temp.pop();
        }
        if(!stack1.empty()) {
            cout << endl;
        }
    }
    
    return 0;
}
