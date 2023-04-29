#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

using namespace std;

int main() {
  ifstream infile("/proc/meminfo");
  string line;
  long long mem_total, mem_available, mem_used;
  getline(infile, line);
  istringstream iss_mem_total(line.substr(9));
  iss_mem_total >> mem_total;
  for (int i = 0; i < 2; i++)
    getline(infile, line);
  istringstream iss_mem_available(line.substr(13));
  iss_mem_available >> mem_available;
  infile.close();
  mem_used = mem_total - mem_available;
  double used_mem_gb = static_cast<double>(mem_used) / (1024.0 * 1024.0);
  cout << used_mem_gb;
  return 0;
}
