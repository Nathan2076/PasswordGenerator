#include <iostream>
#include <fstream>
#include <random>
#include <io.h>
#include <fcntl.h>
#include "chars.h"

std::wstring generate_password(int);

int main()
{
    _setmode(_fileno(stdout), _O_U16TEXT);

    std::wcout << "Welcome to Password++!\n";
    std::wcout << "Type the password length: ";
    
    int length{};
    std::cin >> length;

    std::wstring password = generate_password(length);

    std::wofstream passwordFile("./password.txt");
    passwordFile << password;
    passwordFile.close();

    std::wcout << "Password created!\n";
    std::wcout << password;

    return 0;
}

std::wstring generate_password(int length)
{
    std::random_device rd;
    std::uniform_int_distribution<int> dist(0, 3);

    std::wstring password{};

    for (int i{0}; i < length; ++i)
    {
        switch (dist(rd))
        {
            case 0:
            {
                std::uniform_int_distribution<int> dist(0, 25);
                password += Chars::uppercaseLetters[dist(rd)];
                break;
            }
            case 1:
            {
                std::uniform_int_distribution<int> dist(0, 25);
                password += Chars::lowercaseLetters[dist(rd)];
                break;
            }
            case 2:
            {
                std::uniform_int_distribution<int> dist(0, 9);
                password += Chars::numbers[dist(rd)];
                break;
            }
            case 3:
            {
                std::uniform_int_distribution<int> dist(0, 31);
                password += Chars::symbols[dist(rd)];
                break;
            }
        }
    }

    return password;
}