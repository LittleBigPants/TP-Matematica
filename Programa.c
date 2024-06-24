#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int cambiarBase(char *numero, int baseInicial, int baseFinal)
{
    long int decimal;
    char resultado[100];
    char *puntero;

    decimal = strtol(numero, &puntero, baseInicial);

    ltoa(decimal, resultado, baseFinal);

    if (*puntero == '\0')
    {
        printf("El numero es: %s\n", resultado);
    }
    else
    {
        printf("error en la conversion.\n");
    }

    return 0;
}

int MenuBases()
{
    int baseIngresada, baseDeseada;
    char numero[100];
    int opcion;
    do
    {
        printf("\ningrese el numero en la base deseada\n");
        scanf("%s", numero);
        printf("\nIngrese la base del numero ingresado\n");
        scanf("%d", &baseIngresada);
        printf("\nIngrese la base en la que quiere pasar el numero\n");
        scanf("%d", &baseDeseada);
        cambiarBase(numero, baseIngresada, baseDeseada);

        printf("desea salir de la calculadora?\n1-deseo continuar\n0-deseo salir\n");
        scanf("%d", &opcion);
    } while (opcion == 1);

    return 0;
}

void calcularMCDyMCM(int numero1, int numero2)
{

    int resto;
    int mayor;
    int menor;

    if (numero1 > numero2)
    {
        mayor = numero1;
        menor = numero2;
    }
    else
    {
        mayor = numero2;
        menor = numero1;
    }

    do
    {

        resto = mayor % menor;

        if (resto != 0)
        {

            mayor = menor;
            menor = resto;
        }

    } while (resto != 0);

    int mcd = menor;
    int mcm = (numero1 * numero2) / mcd;

    printf("El MCD es igual a %d\n", mcd);
    printf("El MCM es igual a %d\n", mcm);
}

int menuMCDyMCM()
{
    int numero1;
    int numero2;

    printf("Ingrese el primer numero\n");
    scanf("%d", &numero1);

    printf("Ingrese el segundo numero\n");
    scanf("%d", &numero2);

    calcularMCDyMCM(numero1, numero2);

    return 0;
}

void enterosDivision()
{
    int numero;
    printf("Ingrese un numero entero\n");
    scanf("%d", &numero);
    printf("El numero ingresado es divisible por el siguiente conjunto de numeros :\n");
    for (int i = 1; i < numero; i++)
    {
        int resto = numero % i;

        if (resto == 0)
        {
            printf("%d\n", i);
        }
    }
}

void esPrimo()
{

    int num, i;
    printf("Ingrese un numero entero: \n");
    scanf("%d", &num);

    int contador = 0;

    for (int i = 2; i <= num; i++)
    {
        if (num % i == 0)
        {
            contador++;
        }
    }

    if (contador > 1)
    {
        printf("\n%d es un numero compuesto\n", num);
    }
    else
    {
        printf("\n%d es un numero primo\n", num);
    }
}

int main()
{

    int opcion;

    do
    {
        printf("\nMenu\n1-Calculadora de cambio de bases\n2-Calcular MCD y MCM\n3-Enteros y division\n4-Calcular si es primo\n5-salir\n");
        scanf("%d", &opcion);

        switch (opcion)
        {
        case 1:
            MenuBases();
            break;
        case 2:
            menuMCDyMCM();
            break;

        case 3:
            enterosDivision();
            break;

        case 4:
            esPrimo();
            break;

        default:
            printf("Opcion no valida\n");
            break;
        }

    } while (opcion != 5);

    printf("Gracias por usar nuestro programa\n");

    return 0;
}