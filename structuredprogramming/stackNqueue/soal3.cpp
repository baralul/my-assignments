#include <iostream>
#include <queue>
#include <string>

using namespace std;


int main() {
    int N;
    queue<long> queue1;
    cin >> N;
    
    for(int i=0; i<N; i++) {
        string command;
        cin >> command;
        
        if (command == "push") {
            long x;
            cin >> x;
            queue1.push(x);
        }
        else if(command == "pop" && !queue1.empty()) {
            queue1.pop();
        }
        
        queue<long> temp = queue1;
        while(!temp.empty()) {
            cout << temp.front() << " ";
            temp.pop();
        }
        if(!queue1.empty()) {
            cout << endl;
        }
        
    }
    
    return 0;
}
