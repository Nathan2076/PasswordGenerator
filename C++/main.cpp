#include "chars.h"
#include <iostream>
#include <random>
#include <io.h>
#include <fcntl.h>

int main()
{
    std::cout << "Welcome to SharpPassword (now in C++)!\n";
    std::cout << "Type the password length: ";

    int length{};
    std::cin >> length;

    std::random_device rd;
    std::uniform_int_distribution<int> dist(0, 3);

    _setmode(_fileno(stdout), _O_U16TEXT);

    for (int i{0}; i < length; ++i)
    {
        switch (dist(rd))
        {
            case 0:
            {
                std::uniform_int_distribution<int> dist(0, 25);
                std::wcout << Chars::uppercaseLetters[dist(rd)];
                break;
            }
            case 1:
            {
                std::uniform_int_distribution<int> dist(0, 25);
                std::wcout << Chars::lowercaseLetters[dist(rd)];
                break;
            }
            case 2:
            {
                std::uniform_int_distribution<int> dist(0, 9);
                std::wcout << Chars::numbers[dist(rd)];
                break;
            }
            case 3:
            {
                std::uniform_int_distribution<int> dist(0, 31);
                std::wcout << Chars::symbols[dist(rd)];
                break;
            }
        }
    }

    return 0;
}