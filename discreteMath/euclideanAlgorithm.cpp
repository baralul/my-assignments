#include <iostream>
using namespace std;

int GCF(int smaller_num, int bigger_num) {
	int r;

	while(smaller_num != 0) {
		r = bigger_num % smaller_num;
		bigger_num = smaller_num;
		smaller_num = r;
	}

	return bigger_num;
}

int main() {
	cout << "GCF(50, 155) is: "  <<  GCF(50, 115) << endl;
	cout << "GCF(122, 5693) is: " << GCF(122, 5693) << endl;

	return 0;
}
