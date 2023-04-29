#include <iostream>
#include <string>

int main() {
  char buffer[4];
  FILE *fp = popen("lscpu | grep 'scaling MHz:' | awk '{print $4}'", "r");
  fgets(buffer, 4, fp);
  pclose(fp);
  std::cout << buffer << std::endl;
  return 0;
}
