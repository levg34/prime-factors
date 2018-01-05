package test;

import java.util.HashMap;
import java.util.Map;

public class Test {
	public static void main(String[] args) {
		int a = 123456;
		
		for (int i=2;i<=150;++i) {
			printFactors(i);
		}
		
		printFactors(a);
	}

	private static void printFactors(int a) {
		Map<Integer,Integer> factors = primeFactors(a);
		String factorString = "";
		
		for (int n:factors.keySet()) {
			if (factors.get(n)==1){
				factorString += n+"*";
			} else {
				factorString += n+"^"+factors.get(n)+"*";
			}
		}
		
		System.out.println("N = "+a+" = "+factorString.substring(0, factorString.length()-1));
	}

	private static Map<Integer,Integer> primeFactors(final int n) {
		Map<Integer, Integer> pf = new HashMap<Integer,Integer>();
		int nx = n;
		int px = 2;
		
		while (!isPrime(nx)) {
			while(nx%px!=0) {
				px = nextPrime(px);
			}
			nx = nx/px;
			if (!pf.containsKey(px)) {
				pf.put(px, 0);
			}
			pf.put(px, pf.get(px)+1);
			px = 2;
		}
		
		if (isPrime(nx)&&nx!=1) {
			if (!pf.containsKey(nx)) {
				pf.put(nx, 0);
			}
			pf.put(nx, pf.get(nx)+1);
		}

		return pf;
	}

	private static int nextPrime(int n) {
		int res = n+1;
		while (!isPrime(res)) {
			res += 1;
		}
		return res;
	}

	//checks whether an int is prime or not.
	private static boolean isPrime(int n) {
	    //check if n is a multiple of 2
		if (n%2==0) return false;
	    //if not, then just check the odds
	    for(int i=3;i*i<=n;i+=2) {
	        if(n%i==0)
	            return false;
	    }
	    return true;
	}
}
