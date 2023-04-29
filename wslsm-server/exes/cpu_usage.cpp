#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

using namespace std;

int main() {
  double loadavg[3];
  ifstream infile("/proc/loadavg");
  string line;
  getline(infile, line);
  istringstream iss(line);
  iss >> loadavg[0] >> loadavg[1] >> loadavg[2];
  infile.close();
  cout << loadavg[0];
  return 0;
}
