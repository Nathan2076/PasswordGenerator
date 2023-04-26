#ifndef CHARS_H
#define CHARS_H

#include <array>

struct Chars
{
    constexpr static std::array<wchar_t, 26> uppercaseLetters = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
    constexpr static std::array<wchar_t, 26> lowercaseLetters = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };
    constexpr static std::array<wchar_t, 10> numbers = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
    constexpr static std::array<wchar_t, 32> symbols = { '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', '\\', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/', L'´', '`' };
};

#endif