#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

using namespace std;

int main() {
  ifstream infile("/proc/meminfo");
  string line;
  long long total_mem;
  getline(infile, line);
  istringstream iss(line.substr(9));
  iss >> total_mem;
  infile.close();
  double total_mem_gb = static_cast<double>(total_mem) / (1024.0 * 1024.0);
  cout << total_mem_gb;
  return 0;
}
