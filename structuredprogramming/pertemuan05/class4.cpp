#include <iostream> 
using namespace std;

class Mahasiswa{
	private:
		string nama;
	
	public:
		void setNama(string nama) {
			this->nama = nama;
		}
		
		string getNama() {
			return nama;
		}
};

int main(){
	Mahasiswa Mhs;
	
	mhs.setNama("Anta");
	
	cout << "Nama: " << Mhs.getNama() << endl;
}
