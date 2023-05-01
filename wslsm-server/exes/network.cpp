#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

int main() {
  std::ifstream netdev("/proc/net/dev");
  std::string line;
  long long rx_bytes = 0, tx_bytes = 0;
  std::getline(netdev, line);
  std::getline(netdev, line);
  while (std::getline(netdev, line)) {
    std::istringstream iss(line);
    std::string iface;
    iss >> iface;
    if (iface.back() != ':')
      continue;
    iface.pop_back();
    long long rbytes, rpkt, rerrs, rdrop, rfifo, rframe, rcompressed,
        rmulticast;
    long long tbytes, tpkt, terrs, tdrop, tfifo, tcolls, tcarrier, tcompressed;
    iss >> rbytes >> rpkt >> rerrs >> rdrop >> rfifo >> rframe >> rcompressed >>
        rmulticast >> tbytes >> tpkt >> terrs >> tdrop >> tfifo >> tcolls >>
        tcarrier >> tcompressed;
    if (iface == "lo")
      continue;
    rx_bytes += rbytes;
    tx_bytes += tbytes;
  }
  std::cout << rx_bytes / 1024 << " " << tx_bytes / 1024;
  return 0;
}
