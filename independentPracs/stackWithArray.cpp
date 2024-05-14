#include <iostream> 
#include <string.h>

const int SIZE = 100;

using namespace std;

template <typename T>
class Stack {
    T arr[SIZE];
    int point = -1;
    
    public:
        Stack() {
            cout << "object created" << endl;
        }
        
        void push(T x) {
            if(point<SIZE-1) {
                point ++;
                arr[point] = x;
            } else {
                cout << "push failed stack is full" << endl;
            }
        }
        
        void pop() {
            if(point!=-1) {
                point --;
            } else {
                cout << "pop failed stack is empty" << endl;
            }
        }
        
        T peek() {
            if(point!=-1) {
                return arr[point];
            }
        }
        
        bool IsEmpty() {
            if(point==-1) {
                return true;
            } else {
                return false;
            }
        }
        
        int Size() {
            return point+1;
        }
};

template <typename T>
void printStack(Stack<T> your_stack, int stack_size) {
    for(int i=stack_size-1; i>=0; i--) {
        cout << your_stack.peek() << " ";
        your_stack.pop();
    }
    
}

int main() {
    Stack<int> mystack;
    mystack.push(1);
    mystack.push(2);
    mystack.push(3);
    mystack.push(4);
    
    printStack(mystack, mystack.Size());
    
    cout << "popping stack" << endl;
    mystack.pop();
    
    printStack(mystack, mystack.Size());


    return 0;
}
