#include <iostream>

using namespace std;

int main(){
	char op;
	float num1, num2;

	cout << "Enter operator (+ or - or * or /)" << endl;
	cin >> op;

	cout << "Enter integer 1; " << endl;
	cin >> num1;
	cout << "Enter integer 2; " << endl;
	cin >> num2;

	switch(op){

	case'+':
	cout << num1 + num2 << endl;
	break;

	case'-':
	cout << num1 - num2 << endl;
	break;

	case'*':
	cout << num1 * num2 << endl;
	break;

	case'/':
	cout << num1 / num2 << endl;
	break;

	default:
	cout << "You typed an invalid operator" << endl;
	}
	return 0;
}
