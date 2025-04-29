#include <iostream>
using namespace std;

int check(int n){
    int a=n;
    int rem=0;
    int sum=0;
    while (a>0)
    {
        
        rem=a%10;
        sum=sum+rem;
        a=a/10;
    }
    return sum; 
    
}

int main(int argc, char const *argv[])
{
    int n=36;

    int out=check(n);
    cout<<out;
    
    return 0;
}

