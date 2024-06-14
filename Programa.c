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
        printf("error en la conversión.\n");
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

        printf("desea salir de la calculadora?\n1-deseo continuar\n0-deseo salir");
        scanf("%d", &opcion);
    } while (opcion == 1);

    return 0;
}

int main()
{

    int opcion;

    do
    {
        printf("\nMenu\n1-Calculadora de cambio de bases\n");
        scanf("%d", &opcion);

        switch (opcion)
        {
        case 1:
            MenuBases();
            break;

        default:
            break;
        }

    } while (opcion != 2);

    return 0;
}