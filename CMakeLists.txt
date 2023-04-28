cmake_minimum_required(VERSION 3.0.0)
project(Hello VERSION 1.0.0)

add_executable(Hello ./C++/hello.cpp)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
