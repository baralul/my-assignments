#include <iostream> 
using namespace std;

struct Mahasiswa{
	public:
		string nama, npm;
		
		void Perkenalan(){
			cout << "Nama: " << nama << endl;
			cout << "NPM: " << nama << endl;
		}
};

int main(){
	Mahasiswa Mhs;
	
	cin >> Mhs.nama;
	cin >> Mhs.npm;
	
	mhs.perkenalan();
}
