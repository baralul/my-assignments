void generaterNumber(int n, const std::string& filename) {
    std::ofstream outFile(filename);

    if (!outFile) {
        std::cerr << "Error opening file!" << std::endl;
        return;
    }

    for (int i = 0; i < n; i++) {
        outFile << rand() % 1000 << ", ";
        if (i % 14 == 0 && i != 0) {
            outFile << std::endl << "\t";
        }
    }

    outFile.close(); 
}

