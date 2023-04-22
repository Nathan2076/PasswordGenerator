using System.Security.Cryptography;
using System.Text;

namespace SharpPassword
{
    class Program
    {
        public static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.Unicode;
            Console.Title = "SharpPassword";

            Console.WriteLine("Welcome to SharpPassword!");
            Console.Write("Type the length of your password: ");

            int length = Convert.ToInt32(Console.ReadLine());

            string password = GeneratePassword(length);

            File.WriteAllText("./password.txt", password);
            Console.WriteLine("Password created!");
            Console.WriteLine(password);
            Console.WriteLine("Press any key to close the program.");
            Console.ReadKey(true);
        }

        static string GeneratePassword(int length)
        {
            int chosenArray;
            string password = "";

            for (int i = 0; i < length; i++)
            {
                chosenArray = RandomNumberGenerator.GetInt32(4);

                switch (chosenArray)
                {
                    case 0:
                        password += Chars.uppercaseLetters[RandomNumberGenerator.GetInt32(26)];
                        break;
                    case 1:
                        password += Chars.lowercaseLetters[RandomNumberGenerator.GetInt32(26)];
                        break;
                    case 2:
                        password += Chars.numbers[RandomNumberGenerator.GetInt32(10)];
                        break;
                    case 3:
                        password += Chars.symbols[RandomNumberGenerator.GetInt32(32)];
                        break;
                }
            }

            return password;
        }
    }
}
