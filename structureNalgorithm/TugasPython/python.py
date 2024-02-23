def hitung(operasi):
    while True:
        angka1 = int(input("Masukan angka pertama: "))
        angka2 = int(input("Masukan angka kedua: "))
        
        if operasi == '1':
            print(angka1 + angka2)
            break
        elif operasi == '2':
            print(angka1 * angka2)
            break
        elif operasi == '3':
            print(angka1 - angka2)
            break
        elif operasi == '4':
            if angka2 != 0:
                print(angka1 / angka2)
                break
            else:
                print("Error: Pembagian dengan angka 0 tidak diperbolehkan")
        else:
            print("Operasi tidak valid")

def menu():
    while True:
        operasi = input("Pilih operasi (1-4)\n1. Pertambahan\n2. Perkalian\n3. Perkurangan\n4. Pembagian\nX. Keluar\n")
        if operasi == 'X':
            exit(0)
        elif operasi not in {'1', '2', '3', '4'}:
            print("Operasi tidak valid")
            continue
        else:
            hitung(operasi)
            while True:
                jawaban = input("Anda ingin menghitung lagi ? (Y/T)\n")
                if jawaban == 'Y':
                    hitung(operasi)
                elif jawaban == 'T':
                    break
                else:
                    print("Perintah tidak dimengerti")

menu()
