cmake_minimum_required(VERSION 3.26.3)
project(wslsm-server VERSION 1.0.0)

set(CMAKE_CXX_FLAGS "-O1")

file(MAKE_DIRECTORY bin)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
add_executable(cpu_usage exes/cpu_usage.cpp)
# target_precompile_headers(${PROJECT_NAME}.exe PUBLIC src/pch.hpp)
